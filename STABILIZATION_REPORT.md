# Echoes of the Gate — Stabilization Report

## Repo Triage (MANDATORY FIRST STEP)

### Runtime entrypoints actually used
- **Browser entry:** `index.html` loads `./src/main.js` as the module entrypoint. The HTML still contains an older dice/actions block with IDs (`roll-dice`, `dice-results`, `faction-select`, `action-list`) that are **not** referenced by the current runtime handlers in `main.js` and `ui.js`.【F:index.html†L1-L63】【F:src/main.js†L445-L470】
- **Runtime boot:** `src/main.js` bootstraps state, loads content, initializes decks, and renders UI via `render()` from `src/ui.js`.【F:src/main.js†L1-L270】

### Content loading path
- **Content loader:** `src/content.js` is supposed to fetch JSON from `data/*.json`, normalize tokens/factions/actions/cards, and return the shape used by `main.js`. However, it currently contains syntax errors and two competing loader APIs (`loadGameContent` and `loadContent`) interleaved, which prevents module parsing. `main.js` calls `loadContent()` and expects fields like `actionsByFaction`, `cards.{empty,system,phenomena}`, `hexMap`, and `tokensById`.【F:src/content.js†L1-L118】【F:src/main.js†L20-L119】

### Current state model used by runtime
- **Runtime state:** `main.js` uses `initialState({ seed })` from `src/state.js`. This model includes `players`, `turn`, `map`, `decks`, `fleetsByHex`, `ui`, `tokensById`, and `cosmicTension`, and is mutated in-place by `rules.js`.【F:src/state.js†L45-L120】【F:src/main.js†L20-L175】
- **Legacy state (tests):** `src/state.js` also contains a separate `createInitialState(content)` model (hexMap/counters/hands/tension/etc.), but the file is syntactically broken because the two models are interleaved without proper structure. This indicates conflicting state models are present in the same module.【F:src/state.js†L1-L120】

### Test runner approach and API alignment
- **Tests:** `npm test` runs `node tests/rules.test.js`. Tests import `createInitialState` and use the legacy effect types (`type: "setBonusDie"`, etc.) and state fields not used by runtime. This diverges from the runtime engine in `main.js` + `rules.js`.【F:package.json†L1-L7】【F:tests/rules.test.js†L1-L141】

### Syntax errors / invalid JSON / broken imports
- **JS parse errors:** `src/content.js`, `src/state.js`, and `src/rules.js` are syntactically broken (mixed engines, missing braces, interleaved exports). These modules cannot be imported by the browser or Node without errors.【F:src/content.js†L1-L118】【F:src/state.js†L1-L120】【F:src/rules.js†L350-L1200】
- **Invalid JSON:** `data/actions.json`, `data/cards_phenomena.json`, and `data/factions.json` are malformed and fail JSON parsing due to missing commas or appended arrays. This prevents `loadContent()` from completing and blocks boot.【F:data/actions.json†L400-L456】【F:data/cards_phenomena.json†L1-L80】【F:data/factions.json†L120-L142】

---

=== CODE-ACCURATE RULEBOOK ===

> This rulebook describes only what the **current code implements today** (even if broken). Missing/stubbed parts are called out explicitly.

### 1) Overview
- The runtime (if it boots) renders a 7×7 hex grid, tracks three factions (Directorate, Choir, Bloom), and supports exploration through fleet movement or scan actions. The flow is driven by `src/main.js`, UI in `src/ui.js`, and rules in `src/rules.js`.【F:src/main.js†L20-L270】【F:src/ui.js†L1-L275】
- There are **two competing engines**:
  - **Runtime/baseline** (used by `main.js`): uses `initialState`, `state.map.hexes`, `state.decks`, and in-place mutations for actions/combat/exploration.【F:src/state.js†L45-L120】【F:src/rules.js†L1-L310】
  - **Legacy/test engine**: uses `createInitialState`, `state.hexMap`, `counters`, `hands`, `tension`, and immutable-style `applyEffects` with `type` fields; currently interleaved and syntactically broken in `rules.js` and `state.js`.【F:src/state.js†L1-L68】【F:src/rules.js†L430-L1200】

### 2) Components

#### Map
- Map is loaded from `data/hex_map.json` and stored in `state.map.hexes` with width/height set in `main.js`. Each hex has `id`, `col`, `row`, `type`, and `revealed` flags; UI renders fog/type/token glyphs based on these fields.【F:src/main.js†L39-L74】【F:src/ui.js†L100-L205】

#### Fleets
- Fleets are tracked in `state.fleetsByHex[hexId][factionId]` as `{ undamaged: [], damaged: [] }` lists of fleet IDs. Helpers include creating fleets, moving stacks, counting, applying hits, and repairs.【F:src/rules.js†L62-L168】
- Boot populates fleets: if none exist, each faction gets a fleet at its capital (or specified player setup).【F:src/main.js†L76-L118】

#### Influence
- Influence is recomputed via `recomputeInfluence(state)`:
  - Base influence: +1 if faction has visited the hex, +2 if any fleets present (damaged or undamaged).
  - Adjacency bonus: +1 per neighboring hex controlled by that faction, based on the **initial** control pass before bonuses.
- Control is re-evaluated after bonuses; ties set `contestedByHex[hexId] = true` and `controllerByHex[hexId] = null`.【F:src/rules.js†L208-L310】

#### Dice
- Dice each round: A and B (2d6), plus a Bonus die only for the first player of the round. `computeAvailableActions` derives valid action numbers and their dice consumption options from A/B/Bonus values and used flags.【F:src/main.js†L125-L166】【F:src/rules.js†L30-L59】

#### Decks / Cards
- `state.decks` has `empty`, `system`, and `phenomena` decks with `draw` and `discard` arrays. Cards are drawn by ID; discard is recycled into draw when empty (currently without shuffle).【F:src/state.js†L92-L109】【F:src/rules.js†L320-L359】
- When a card is pending, the UI presents its choices; resolving a choice applies effects, assigns a token if indicated, discards the card, and logs the resolution. `state.ui.pending` and `state.ui.lastResolution` drive the card modal state.【F:src/rules.js†L540-L603】【F:src/ui.js†L120-L220】

#### Tokens
- Tokens are stored in `hex.token`. The UI renders token glyphs from `tokensById` (or `tokens`, legacy alias) and falls back to the raw token id if missing.【F:src/main.js†L92-L108】【F:src/ui.js†L27-L57】

#### Combat
- Combat is initiated when a fleet moves into a hex with enemy fleets, unless the action specifies `canEngage: false`. `initCombat` opens a modal where the attacker chooses which defenders to engage (defaults to all).【F:src/rules.js†L142-L199】【F:src/main.js†L470-L541】
- Each combat round rolls one die per fleet per side, sorts dice high-to-low, pairs them, and assigns hits to the loser of each pair. Ties are resolved in favor of the controller of that hex if any. Hits are allocated to the faction with **lowest influence** in the contested hex (tie-break by faction id). Hits damage undamaged fleets first, then destroy damaged fleets.【F:src/rules.js†L142-L229】

#### Tension / Global State
- Runtime baseline uses `state.cosmicTension` and a `modifyCosmicTension` effect. The more elaborate `tension` deck/threshold system exists only in legacy rule code and is not part of the runtime flow.【F:src/state.js†L78-L120】【F:src/rules.js†L370-L409】

### 3) Setup (initial state)
- `initialState({ seed })` seeds metadata, creates three players, initializes empty decks and UI state, and leaves map hexes empty for `main.js` to fill from `hex_map.json`.【F:src/state.js†L45-L120】【F:src/main.js†L39-L74】
- Capitals are hardcoded in `main.js` for A1, G1, A7 (factions) and G7 (neutral). These hexes are set to `type: "system"` and `revealed: true`, with capital tokens assigned. `capitalsByFaction` is set accordingly.【F:src/main.js†L58-L92】
- Fleets are seeded per faction if no fleet map exists; default is one fleet at each faction’s capital hex.【F:src/main.js†L76-L118】

### 4) Round/Turn sequence
- When `activePlayerIndex` wraps past the last player, `state.turn.round` increments, `firstPlayerIndex` rotates, dice and per-round flags reset, and `systemActivated` clears. Otherwise, `activePlayerIndex` advances to the next player.【F:src/main.js†L200-L240】

### 5) Dice & action selection
- `computeAvailableActions` calculates which action numbers are available based on A/B/Bonus dice and used flags. Selecting an action sets `state.ui.pendingAction` with a dice-consumption plan. If the action requires a target, the UI enters targeting mode; otherwise the action is executed immediately via `executeActionNumber`.【F:src/rules.js†L30-L59】【F:src/main.js†L340-L430】

### 6) Exploration & card resolution
- Entering an unrevealed hex reveals it; if its type is `unknown`, a weighted random type is assigned. A card is drawn from the matching deck and placed in `state.ui.pending`. Visiting the hex marks it visited for influence calculation.【F:src/rules.js†L520-L589】
- The `revealHex` effect (used by scan actions) reveals adjacent hexes (orthogonal N/S/E/W only) without drawing cards.【F:src/rules.js†L1626-L1665】

### 7) Influence & control
- Base influence: +1 if visited, +2 if any fleet present. Control is the highest influence unless tied; ties mark contested. Final influence adds adjacency bonuses based on the initial control pass, then control is recomputed and stored in `controllerByHex` and `contestedByHex`.【F:src/rules.js†L208-L310】

### 8) Fleet movement
- Standard movement (`moveFleet`): requires selecting a fleet origin and an adjacent destination. Moving reveals unrevealed hexes and draws a card; updates visited/influence; may initiate combat if enemies present and `canEngage !== false`.
- Fast deploy (`fastDeploy`): allows moving within two orthogonal steps; cannot enter enemy-occupied hexes; otherwise similar to standard movement.
- Forward deploy (`forwardDeploy`): spawns a fleet in a controlled, uncontested system hex the player controls.【F:src/rules.js†L420-L611】【F:src/rules.js†L720-L775】

### 9) Combat
- Combat rolls one die per fleet per side, pairs dice high-to-low, and assigns hits to the loser; ties are broken by hex controller. Hits are allocated to the faction with the lowest influence in that hex. Retreat moves fleets to an adjacent hex with no enemies, preferring higher influence for that faction; if none available, retreat fails gracefully. Influence is recomputed after combat and retreat.【F:src/rules.js†L142-L229】

### 10) Tension / global state
- Runtime only uses `state.cosmicTension` and `modifyCosmicTension`; tension decks and thresholds are part of the legacy rules (not used by runtime).【F:src/state.js†L78-L120】【F:src/rules.js†L370-L409】

### 11) End conditions
- No win/lose conditions are implemented in the runtime baseline. Cards/actions can place tokens or change resources, but no endgame is enforced.【F:src/rules.js†L350-L603】

---

=== IMPLEMENTATION BACKLOG ===

### A) BLOCKERS (prevent the game from running)
1) **`src/content.js` syntax errors and mixed loader APIs**
   - **Files:** `src/content.js`.
   - **Section:** `normalizeActions`, `loadGameContent`, `loadContent`.
   - **What’s wrong:** A stray `return response.json()` and mismatched braces plus an incomplete `loadGameContent` block cause module parse failure.
   - **Verify:** Browser devtools shows module parse error; Node `import` fails.
   - **Fix approach:** Remove `loadGameContent` or move to a legacy file. Ensure `normalizeActions` returns its normalized map. Keep a single valid `loadContent()` that returns the runtime shape expected by `main.js`.

2) **`src/state.js` mixes two incompatible state models**
   - **Files:** `src/state.js`.
   - **Section:** `createInitialState` + `initialState` interleaving.
   - **What’s wrong:** File is syntactically broken and merges legacy + runtime models in one module.
   - **Verify:** Import failure in Node or browser.
   - **Fix approach:** Split legacy model into `state.legacy.js` and keep `initialState` alone in `state.js` for runtime.

3) **`src/rules.js` is syntactically invalid**
   - **Files:** `src/rules.js`.
   - **Section:** `applyEffects` and duplicate `revealHex`/`resolveChoice` sections.
   - **What’s wrong:** Two rule engines are merged; missing braces and nested switches break parsing.
   - **Verify:** Module import fails; editor shows syntax errors around mid-file.
   - **Fix approach:** Extract runtime engine into a clean file; move legacy engine into `rules.legacy.js` or remove until needed.

4) **Malformed JSON in `data/actions.json`, `data/cards_phenomena.json`, `data/factions.json`**
   - **Files:** `data/actions.json`, `data/cards_phenomena.json`, `data/factions.json`.
   - **What’s wrong:** Missing commas and appended arrays cause parse failures.
   - **Verify:** `JSON.parse` fails or loader throws `Failed to load` error.
   - **Fix approach:** Normalize to a single schema per file and validate with a JSON validation script.

### B) BROKEN FEATURES (implemented but malfunctioning)
1) **UI expects elements not present in `index.html`**
   - **Files:** `index.html`, `src/main.js`, `src/ui.js`.
   - **What’s wrong:** `main.js` expects `rollRoundDiceBtn` / `nextPlayerBtn`, but HTML uses legacy IDs (`roll-dice`, etc.).
   - **Verify:** UI buttons do nothing or are not wired.
   - **Fix approach:** Update HTML IDs or change `main.js` to match the current DOM.

2) **`ui.js` contains legacy references to `state.dice` and `state.bonusDie`**
   - **Files:** `src/ui.js`.
   - **Section:** `renderCard` resolved-card block.
   - **What’s wrong:** References `diceResults` and legacy dice state that do not exist in current runtime; causes runtime errors when resolving cards.
   - **Verify:** Resolve any card and observe console errors.
   - **Fix approach:** Remove or rewrite the legacy dice rendering fragment.

3) **Token normalization duplication**
   - **Files:** `src/content.js`, `src/rules.js`.
   - **What’s wrong:** Token normalization occurs both in loader and rules, risking inconsistent token IDs.
   - **Verify:** Token glyphs missing or mismatched after card resolution.
   - **Fix approach:** Normalize once in loader, remove duplicate normalization in rules.

### C) TEST/ENGINE DIVERGENCE
1) **Tests target legacy engine that runtime does not use**
   - **Files:** `tests/rules.test.js`, `src/state.js`, `src/rules.js`.
   - **What’s wrong:** Tests use `createInitialState` and immutable-style effects not compatible with runtime schema.
   - **Verify:** `npm test` fails due to import errors or mismatched state fields.
   - **Fix approach:** Either add legacy wrappers (`state.legacy.js`, `rules.legacy.js`), or rewrite tests to use runtime `initialState` + in-place `applyEffects`, or quarantine legacy tests.

### D) DATA QUALITY
1) **Action schema mismatch**
   - **Files:** `data/actions.json`, `src/content.js`, `src/ui.js`.
   - **What’s wrong:** Mix of old fields (`title`, `effect`, `cost`) and new fields (`name`, `text`, `effects`). UI expects `name`/`text` and rules expect `effects`.
   - **Verify:** Actions render as generic labels; rules cannot execute effects.
   - **Fix approach:** Normalize action data on load or migrate JSON to the runtime schema.

2) **Card schema mismatch**
   - **Files:** `data/cards_phenomena.json`, `src/content.js`.
   - **What’s wrong:** Some cards use `front/back/placeTokens` instead of `choices` arrays.
   - **Verify:** Card choices missing or undefined in UI.
   - **Fix approach:** Convert to `choices` schema or enhance normalization to translate old schema.

### E) TECHNICAL DEBT
1) **Duplicate rule engines in `rules.js`**
   - **Files:** `src/rules.js`.
   - **What’s wrong:** Mixed engines cause syntax errors and confusion.
   - **Verify:** Duplicate `revealHex`, `resolveChoice`, and mixed effect handling blocks parsing.
   - **Fix approach:** Split runtime/legacy rules into separate files.

2) **State model duplication in `state.js`**
   - **Files:** `src/state.js`.
   - **What’s wrong:** Two incompatible models in a single file.
   - **Verify:** Compare `createInitialState` vs `initialState` fields.
   - **Fix approach:** Keep only runtime in `state.js`; move legacy to `state.legacy.js`.

---

=== STABILIZATION PLAYBOOK ===

> This section provides step-by-step, file-level remediation instructions with verification checks.

### 0) Ground rules / safety
1. **Create a stabilization branch**
   - Command: `git checkout -b stabilization`.
2. **Add a smoke test checklist**
   - Create `docs/smoke-checklist.md` with steps: run local server, roll dice, pick action, reveal hex, resolve card, move fleet, trigger combat, retreat/end combat.
3. **Add a JSON validation script**
   - Create `scripts/validate-json.mjs` that loads each `data/*.json` and exits non-zero on parse failure.
4. **Ensure reproducibility**
   - Preserve `?seed=` support and avoid `Math.random()` in runtime rules; prefer seeded RNG from `src/rng.js` throughout runtime logic.【F:src/main.js†L1-L170】【F:src/rng.js†L1-L30】

### 1) Make the project runnable in the browser again
1. **Fix syntax errors in `content.js`, `state.js`, `rules.js`**
   - **Files:** `src/content.js`, `src/state.js`, `src/rules.js`.
   - **What to change:**
     - Remove or isolate legacy exports. Keep a single `loadContent()` in `content.js` that returns `{ hexMap, tokensById, factions, actionsByFaction, cards }`.
     - Keep only `initialState()` in runtime `state.js` and move legacy model to `state.legacy.js`.
     - Remove legacy effect switch from `rules.js` or move to `rules.legacy.js`.
   - **Verify:** Open `index.html` via a local server and confirm no module parse errors appear in console.

2. **Fix data parsing failures**
   - **Files:** `data/actions.json`, `data/cards_phenomena.json`, `data/factions.json`.
   - **What to change:** Repair JSON to valid, consistent schemas. Ensure each file is a single JSON array/object with proper commas.
   - **Verify:** Run `node scripts/validate-json.mjs` and confirm exit code 0.

3. **Ensure `loadContent` returns expected shape**
   - **Files:** `src/content.js`.
   - **What to change:** Normalize actions to include `name`, `text`, `effects`, and `requiresTarget` for all action numbers; normalize cards to `choices` schema; normalize faction IDs to lowercase.
   - **Verify:** In devtools, `window.__ECHOES_CONTENT__` includes `actionsByFaction` with 18 actions per faction and `cards.empty/system/phenomena` arrays with `choices` entries.【F:src/main.js†L45-L57】

4. **Ensure `main.js` can initialize state and render without crashing**
   - **Files:** `index.html`, `src/main.js`, `src/ui.js`.
   - **What to change:** Align DOM IDs (e.g., create `rollRoundDiceBtn` and `nextPlayerBtn`) or update handlers to match existing HTML. Remove stale UI fragments referencing legacy dice state (`diceResults`).
   - **Verify:** UI renders, Roll works, action selection works, and card modal opens without errors.

### 2) Unify the state model
1. **Identify multiple initial-state creators**
   - `createInitialState` (legacy) vs `initialState` (runtime).【F:src/state.js†L1-L120】
2. **Choose runtime model**
   - Keep `initialState` as the canonical runtime schema for the browser.
3. **Quarantine legacy model**
   - Move `createInitialState` into `src/state.legacy.js` and update tests accordingly.
4. **Update call sites**
   - Ensure browser code imports only runtime `state.js`.
5. **Document schema**
   - Add JSDoc typedefs in `state.js` describing `State`, `Player`, `Hex`, and `Deck` for clarity and consistency.
   - **Verify:** Type or schema docs align with actual runtime usage in `main.js` and `ui.js`.

### 3) Repair the effects/action resolver pipeline
1. **Make `applyEffects` deterministic and syntactically correct**
   - **Files:** `src/rules.js`.
   - **What to change:** Keep only runtime ops (`log`, `gainResource`, `loseResource`, `gainFleet`, `loseFleet`, `modifyCosmicTension`, `placeToken`, `revealHex`, `moveFleet`, `fastDeploy`, `peekDeckTop`, `modifyDie`, `repairFleet`, `placeTokenAdjacent`, `forwardDeploy`, `recruitFleetCapital`, `activateSystem`).
   - **Verify:** Execute actions that use `revealHex`, `moveFleet`, and `gainResource` and confirm state/log updates.

2. **Ensure all effect ops referenced by actions/cards are implemented**
   - **Files:** `data/actions.json`, `data/cards_system.json`, `data/cards_phenomena.json`, `src/rules.js`.
   - **What to change:** Add missing op handlers or stub with `logLine` warnings.
   - **Verify:** No “Unknown effect op” messages during basic play.

3. **Add exhaustive logging for unknown ops**
   - **Files:** `src/rules.js`.
   - **What to change:** Default switch case should log `Unknown effect op` and include op name and payload.
   - **Verify:** Dev logs clearly identify missing ops when they appear.

### 4) Repair deck/card loading and resolution
1. **Validate deck loading**
   - **Files:** `src/content.js`, `src/main.js`.
   - **What to change:** Ensure `initDeck` is called for each deck with a valid card list.
   - **Verify:** `state.decks.system.draw.length > 0` after boot.

2. **Ensure draw/discard behavior is correct**
   - **Files:** `src/rules.js`.
   - **What to change:** When recycling discard into draw, shuffle to avoid deterministic repeats.
   - **Verify:** Draw order changes after deck exhaustion.

3. **Ensure card choices are safe**
   - **Files:** `src/rules.js`, `src/ui.js`.
   - **What to change:** Guard against cards with missing/empty `choices`, show a fallback UI message, and prevent crashes.
   - **Verify:** Resolving cards always clears `state.ui.pending` and sets `state.ui.lastResolution` without errors.

### 5) Ensure exploration, influence, and control recompute correctly
1. **Single recompute function**
   - **Files:** `src/rules.js`.
   - **What to change:** Call `recomputeInfluence` after any movement, exploration, or combat changes.
   - **Verify:** Influence/Control update immediately after moves and combat hits.

2. **Add assertions/logs for NaN/undefined influence**
   - **Files:** `src/rules.js`.
   - **What to change:** Log warnings if computed influence values are non-finite.
   - **Verify:** No warnings during standard play.

3. **Verify control ties**
   - **Files:** `src/rules.js`, `src/ui.js`.
   - **What to change:** Ensure `contestedByHex` properly marks ties and UI tooltip displays “contested”.
   - **Verify:** Create a tie and confirm tooltip output.

### 6) Ensure fleet movement and combat loop are stable
1. **Movement constraints**
   - **Files:** `src/rules.js`, `src/ui.js`.
   - **What to change:** Enforce adjacency for `moveFleet`, range for `fastDeploy`, and selection validation.
   - **Verify:** Invalid target selections show logs and do not move fleets.

2. **Combat initiation paths**
   - **Files:** `src/rules.js`, `src/main.js`, `src/ui.js`.
   - **What to change:** Only open combat modal when enemy fleets exist and effect allows engagement.
   - **Verify:** Moving into empty hex does not initiate combat; moving into enemy hex does.

3. **Retreat edge cases**
   - **Files:** `src/rules.js`.
   - **What to change:** Handle cases where no retreat hex exists without errors.
   - **Verify:** Retreat in surrounded hex logs “could not retreat.”

### 7) Align tests OR quarantine failing tests
- **Option A (fastest stable):** Provide legacy wrappers in `state.legacy.js` and `rules.legacy.js`; update tests to import those modules.
- **Option B:** Rewrite tests to use runtime `initialState` and current action/card schemas.
- **Option C:** Move legacy tests into `tests/legacy/` and update `npm test` to only run runtime-aligned tests.
- **Verify:** `npm test` passes with chosen approach.

### 8) Add automation / guardrails
1. **JSON validation**
   - **Files:** `scripts/validate-json.mjs`, `package.json`.
   - **What to change:** Add `validate:json` npm script and use it in CI.
   - **Verify:** `npm run validate:json` succeeds.
2. **Lint/format (optional)**
   - Add after runtime is stable.
3. **Minimal CI**
   - Add a workflow that runs JSON validation and tests; consider a headless smoke test if feasible.

---

=== REFACTOR RECOMMENDATIONS ===

1) **Split runtime vs legacy engine**
   - Place runtime rules under `src/engine/runtime/` and legacy under `src/engine/legacy/` to prevent future merges.

2) **Replace large switch with effect registry**
   - Use a map of op handlers for `applyEffects` to simplify extension and testing.

3) **Centralize schema validation**
   - Add JSON schemas for actions/cards/factions and validate on boot or in a build step.

4) **Seeded RNG everywhere**
   - Remove `Math.random()` from any remaining legacy functions and use `makeRng` consistently.

5) **UI/engine separation**
   - Keep `rules.js` purely data-transforming; move DOM concerns to `ui.js` only.
