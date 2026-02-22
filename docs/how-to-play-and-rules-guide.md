# Echoes of the Gate - How to Play and Rules Guide

This guide is the player-facing rules manual for the current `v0.2` baseline runtime and card data package.

## 1) Game Overview

`Echoes of the Gate` is a strategic area-control and event-resolution game played on a hex map with three active factions:

- `directorate`
- `choir`
- `bloom`

Players expand influence, move fleets, trigger card effects, and manage tempo through action dice. The game ends after a fixed round limit (with a probabilistic extension), and the faction with the most Victory Points wins.

## 2) Objective

Win by finishing with the most **Victory Points (VP)** at game end.

VP are earned by:

- Resolving specific card instant options (marked `VP Award` — see §8.2).
- Controlling systems at end of each round (§6.3).
- Destroying an enemy fleet in combat (+1 VP per destruction).
- Forcing an enemy faction to retreat in combat (+1 VP).

**Tie-breaking order** (most to least priority):
1. Most controlled systems
2. Most total influence
3. Most fleets on board

Credits and Energy are **resources** — they do not contribute to winning directly. See §7.4 for their roles.

## 3) Core Concepts

### 3.1 Control and Contested Hexes

Each hex tracks influence by faction.

- Highest influence = controller.
- A tie for highest = contested (no controller).

Control matters for:

- scoring
- legal targets for some actions
- combat tie handling
- card rear activation ownership

### 3.2 Fleets and Damage

Each fleet is either:

- `undamaged`
- `damaged`

When a side takes a hit:

1. One undamaged fleet becomes damaged (if any).
2. Otherwise one damaged fleet is destroyed.

### 3.3 Exploration and Deck Types

Revealed unknown hexes draw from one of three decks:

- `empty` (common)
- `system` (uncommon)
- `phenomena` (rare)

Default reveal weighting is approximately:

- Empty 55%
- System 30%
- Phenomena 15%

## 4) Components and Data Sources

Primary runtime/content files:

- `src/main.js`
- `src/rules.js`
- `src/state.js`
- `src/ui.js`
- `data/card-text-all.json`

Card content and full deck breakdown appendices:

- `docs/card-text-empty.md`
- `docs/card-text-system.md`
- `docs/card-text-phenomena.md`

## 5) Setup

At game start:

1. Seeded game state initializes.
2. Three players are assigned active factions (`directorate`, `choir`, `bloom`).
3. Capital hexes are assigned using polygon start positions.
4. Each faction starts with one fleet at/near capital if no custom fleet layout is loaded.
5. Decks (`empty`, `system`, `phenomena`) are shuffled.
6. Influence is recomputed from visited status, fleets, adjacency, and bonuses.

## 6) Turn and Round Structure

### 6.1 Round Dice

On active turn, `Roll` generates:

- die `A`
- die `B`
- optional `Bonus` die (only for the first player of the round)

Available action numbers are formed from:

- `A`
- `B`
- `A+B`
- `Bonus`
- `A+Bonus`
- `B+Bonus`

Each die can be consumed only once per turn based on chosen action combination.

### 6.2 Player Sequence

- Players act in order by active player index.
- End of player turn: `Next Player`.
- After last player:
  - round increments
  - first player rotates
  - per-round flags reset
  - end-of-round VP awarded for controlled systems (§6.3)
  - combat phase resolves (all eligible combat hexes)
  - game-over check runs

### 6.3 End-of-Round Control VP

After all players have taken their turn, each faction with at least one controlled (uncontested) system hex gains **+1 VP**.

### 6.4 Round Limit and Probabilistic Extension

The game has a fixed round limit (`meta.maxRounds`, default 8).

When the final round completes:
- There is a **50% chance** the game extends by one extra round.
- If the first extension triggers, there is then a **20% chance** of a second extra round.
- After at most two extensions, the game ends definitively.

This prevents players from engineering a losing position for a last-round score surge.

## 7) Actions

Actions come from `actionsByFaction` and are mapped by action number (`1`-`12`).

Action execution flow:

1. Select an action number from available options.
2. Optionally **boost** the action before executing it (see §7.2).
3. If target is required, select a valid hex (movement, scan, deploy, repair, etc.).
4. Resolve effects.
5. Consume corresponding dice.
6. Resolve resulting modal states (card/combat), if any.

If an action requires target and target is invalid, action does not resolve.

### 7.2 Action Boosting

Each faction can spend resources to **boost** a chosen action before it resolves. Boosting is optional and does not change which action is taken — it enhances the effect.

**Directorate** (favours Credits):
- Spend Credits (linear cost scale) for a Command Subsidy boost.
- Effect: +1 Influence on the resolved hex.

**Bloom** (favours Energy):
- Spend Energy (cheap-to-expensive scale) for a Mycelial Surge boost.
- Effect: +1 Fleet + biomass token on the resolved hex.

**Choir** (favours Energy):
- Spend Energy (expensive-to-cheap scale) for a Phase Drift boost.
- Effect: +1 Influence offset on resolved hex.
- Additionally, once per turn, the Choir may spend 1 Energy to shift one of their action dice by ±1 (Choir Die Shift button in UI). This costs 1 Energy and can only be used once per turn.

Boost cost is shown in the action panel. If the player cannot pay the cost, the boost does not apply.

### 7.3 Credits and Energy — Resource Roles

**Credits** (`C`) are the economic/logistics resource:
- Spent to boost Directorate actions.
- Required for costly card instant options (Directorate favoured).
- Used in trade negotiations and certain card effects.
- Gained from system activation, trade routes, and card effects.

**Energy** (`E`) is the tech/tactical burst resource:
- Spent to boost Bloom and Choir actions.
- Required for costly card instant options (Bloom/Choir favoured).
- Required for Choir Die Shift.
- Spent for movement into hazard hexes.
- Gained from research arrays, overdrive activations, and card effects.

Neither Credits nor Energy contribute directly to the VP score. Their value is in enabling actions and card effects that generate VP or strategic position.

## 8) Card Resolution

When a card is revealed, it is pending until a front option is selected.

### 8.1 Front Structure (6 lines)

- line 1: title
- line 2: description
- line 3: decision prompt
- line 4: option A
- line 5: option B
- line 6: option C

### 8.2 Instant Option Resolution

Each option is:

- instant
- resolved once
- then ignored for the rest of the game

Model profile is fixed per card:

- one `soft_gain` (or `vp_award` — see below)
- one `hard_gain`
- one `soft_loss`

**VP Award instants**: approximately every 10th card has option A replaced with a `vp_award` option of the form: *"Player with the most [metric] gains 1 VP. (Ties: no VP awarded.)"* Metrics rotate through faction-neutral values: controlled systems, total influence, fleets deployed, active trade routes, and beacons placed.

**Costly options**: approximately 10% of cards have a cost on option B. If the cost cannot be paid, that effect does not happen. Negative effects (option C) never have a cost.

### 8.3 Rear Powers (Persistent)

Every card rear defines:

- `On Activation` primary action (controller benefit)
- automatic secondary effect (for second-most influence, usually positive)

Secondary effect resolves automatically whenever primary is activated.

## 9) Variant Card Rule (Shared Front/Art, Different Rear)

This project supports variants where multiple cards may share:

- the same front image
- the same rear image
- the same front text

but have different rear effects.

When this occurs, use the following identity/priority rules:

1. **Card identity is `deck:id`** (for example `system:SYS_41`), not artwork.
2. **Front-matching cards are legal distinct variants** if rear text differs.
3. **Rear text is authoritative for persistent powers**, even when fronts are identical.
4. If ambiguity occurs in physical play, use card ID marking in corner/appendix key.
5. In digital runtime, authored text lookup is keyed by `deck:id`, so each variant resolves correctly.

## 10) Combat (Clarified Procedure)

Combat is resolved in a dedicated **end-of-round combat phase**, not immediately during normal action resolution.

### 10.1 Identify Combat Hexes

At end of round, mark every hex containing fleets from 2+ factions as a combat hex.

- Each combat hex should flash red in UI.
- Each player is offered a chance to initiate combat in each marked hex.

### 10.2 Initiation Window

For each marked hex:

- If **no player initiates**, no combat is resolved in that hex this round.
- If **any player initiates**, resolve combat in that hex.

### 10.3 Random Combat Order

All initiated combat hexes are resolved in random order each combat phase.

### 10.4 Dice by Faction Color

Each faction rolls its own color-coded dice pool:

- roll one die per fleet in that hex for that faction
- keep dice color visible so faction ownership is always clear

### 10.5 Pairing and Hits

After rolling:

1. Pair dice from opposing sides in ranked order.
2. In each pair, the faction with the **lower die** takes one hit.
3. Identify which faction takes the hit by die color.
4. Apply damage in fleet order:
   - undamaged -> damaged first
   - damaged -> destroyed next

### 10.6 Retreat Window

After one round of combat resolves in that hex:

- any faction in that combat may choose to retreat
- retreat destination must be an adjacent hex with **no fleets from any other faction**

If no legal retreat destination exists for a faction, that faction cannot retreat.

If no side can legally disengage and opposing sides remain, combat must continue in subsequent combat rounds until one side is destroyed.

### 10.7 Trade and Diplomacy During Combat

Trade is allowed mid-combat.

Any side may offer terms such as:

- cease attacking
- coordinated retreat
- payment/resource exchange for non-aggression

These agreements are player-negotiated and may alter immediate combat decisions.

### 10.8 Combat VP Awards

VP is awarded during combat resolution:

- **+1 VP** to the attacker when an enemy fleet is **destroyed** (damaged fleet eliminated).
- **+1 VP** to the faction that caused a forced **retreat** (opponent retreated with no free choice due to being outmatched).

These are awarded at the moment of the triggering event, not at end of round.

## 11) Keywords and Status Rules

Canonical glossary terms are in `data/card-text-all.json`:

- `SALVAGE`
- `SCOUT`
- `ANCHOR`
- `OVERCHARGE`
- `FORTIFY`
- `JAMMED`
- `EXPOSED`
- `STABILIZE`
- `DRIFTMARK`
- `BEACONNET`
- `TRADECHAIN`
- `MUSTER`
- `RELAY`
- `VANTAGE`
- `SURGE`
- `RECOVERY`
- `TRIGGER-ECHO`

Refer to the appendix for full rule text definitions and card-level usage.

## 12) Endgame

Game over triggers when round exceeds `meta.maxRounds` (default `8`).

**Probabilistic extension** (to prevent end-game kamikaze plays):
- After the last scheduled round, there is a **50% chance** of one extra round.
- If that extra round plays out, there is then a **20% chance** of a second extra round.
- After at most two extensions the game ends definitively.

At game over:

- Winner is the faction with the most **VP**.
- Ties broken by: most controlled systems → most total influence → most fleets.
- Game over modal displays winner and all faction VP totals with tie-breaker stats.
- Normal gameplay input is blocked until new game or close.

## 13) Save/Load/New Game

Session tools:

- `Save` stores full state to local storage key `echoes:save:v1`
- `Load` restores saved state and recomputes influence/UI mode
- `New` restarts with seed query parameter

## 14) Recommended Teaching Order

For first-time players, teach in this order:

1. Objective — VP wins, not Credits/Energy
2. Round dice and action numbers
3. Fleet movement and influence control
4. Card front option resolution (instant, one-shot)
5. Rear On Activation + automatic secondary
6. Action boosting and Choir die shift
7. Combat procedure and VP awards
8. Endgame round extension and tiebreakers

## 15) Related Documents

- Full card appendix overview: `docs/card-appendix.md`
- Full per-card breakdown (all 300):
  - `docs/card-text-empty.md`
  - `docs/card-text-system.md`
  - `docs/card-text-phenomena.md`
