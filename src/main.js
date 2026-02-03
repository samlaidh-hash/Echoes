import { makeRng } from "./rng.js";
import { initialState } from "./state.js";
import { loadContent } from "./content.js";
import {
  initDeck,
  logLine,
  revealHex,
  resolveChoice,
  didStateChange,
  snapshotState,
  executeActionNumber,
  getActivePlayer,
  recomputeInfluence,
  computeAvailableActions
} from "./rules.js";
import { render, setSmokeBadge } from "./ui.js";

function getParams() {
  const p = new URLSearchParams(location.search);
  const seed = Number(p.get("seed") ?? "1");
  const smoke = p.get("smoke") === "1";
  return { seed: Number.isFinite(seed) ? seed : 1, smoke };
}

function setReady() {
  document.getElementById("appReady").classList.remove("hidden");
}

function buildCardIndex(cardsByDeck) {
  const idx = {};
  for (const deckType of Object.keys(cardsByDeck)) {
    for (const c of cardsByDeck[deckType]) idx[c.id] = c;
  }
  return idx;
}

async function boot() {
  const { seed, smoke } = getParams();
  const rng = makeRng(seed);

  const state = initialState({ seed });
  state.flags.smoke = smoke;

  const content = await loadContent();
  if (!content.actionsByFaction || Object.keys(content.actionsByFaction).length === 0) {
    logLine(state, "BOOT FAIL: actions.json not loaded");
  }

  state.actionsByFaction = content.actionsByFaction;

  window.__ECHOES_STATE__ = state;
  window.__ECHOES_CONTENT__ = content;
  window.__ECHOES_VERSION__ = state.meta.version;

  // map
  state.map.width = content.hexMap.width;
  state.map.height = content.hexMap.height;
  state.map.hexes = content.hexMap.hexes;

  const markCapital = (hexId, tokenId) => {
    const hex = state.map.hexes.find(h => h.id === hexId);
    if (!hex) return;
    hex.revealed = true;
    hex.type = "system";
    hex.token = tokenId;
  };

  markCapital("A1", "capital_directorate");
  markCapital("G1", "capital_choir");
  markCapital("A7", "capital_bloom");
  markCapital("G7", "capital_neutral");

  state.visited = {};
  state.players.forEach(p => {
    const key = String(p.factionId).toLowerCase();
    state.visited[key] = { [p.positionHexId]: true };
  });
  recomputeInfluence(state);

  // tokens
  state.tokensById = content.tokensById ?? {};
  state.tokens = state.tokensById;
  state.factions = content.factions ?? [];

  // decks
  initDeck(state, rng, "empty", content.cards.empty);
  initDeck(state, rng, "system", content.cards.system);
  initDeck(state, rng, "phenomena", content.cards.phenomena);

  const cardIndex = buildCardIndex(content.cards);

  const setMode = (mode, actionName = null) => {
    if (state.ui.mode === mode) return;
    const wasTargeting = state.ui.mode === "targeting";
    state.ui.mode = mode;
    if (mode === "targeting" && actionName) {
      logLine(state, `UI: targeting mode ON for ${actionName}`);
    } else if (wasTargeting && mode !== "targeting") {
      logLine(state, "UI: targeting mode OFF");
    }
  };

  const rollRoundDice = () => {
    state.turn.dice.a = rng.rollDie(6);
    state.turn.dice.b = rng.rollDie(6);
    state.turn.dice.bonus = state.turn.activePlayerIndex === state.turn.firstPlayerIndex ? rng.rollDie(6) : null;
    state.turn.used.a = false;
    state.turn.used.b = false;
    state.turn.used.bonus = false;
    state.turn.oncePerRound.probabilityDriftUsed = state.players.map(() => false);
    state.ui.pendingAction = null;
    setMode("idle");
    state.ui.modalType = null;
    logLine(state, `TURN: rolled A=${state.turn.dice.a} B=${state.turn.dice.b} Bonus=${state.turn.dice.bonus ?? "-"}`);
  };


  const advancePlayer = () => {
    const next = state.turn.activePlayerIndex + 1;
    if (next >= state.players.length) {
      state.turn.round += 1;
      state.meta.round = state.turn.round;
      state.turn.firstPlayerIndex = (state.turn.firstPlayerIndex + 1) % state.players.length;
      state.turn.activePlayerIndex = state.turn.firstPlayerIndex;
      state.turn.dice.a = null;
      state.turn.dice.b = null;
      state.turn.dice.bonus = null;
      state.turn.used.a = false;
      state.turn.used.b = false;
      state.turn.used.bonus = false;
      state.turn.oncePerRound.probabilityDriftUsed = state.players.map(() => false);
      state.turn.systemActivated = [];
      state.ui.pendingAction = null;
      setMode("idle");
      state.ui.modalType = null;
      logLine(state, `Round ${state.turn.round} begins. Roll round dice.`);
    } else {
      state.turn.activePlayerIndex = next;
      state.ui.pendingAction = null;
      setMode("idle");
      state.ui.modalType = null;
      logLine(state, `Next player: ${getActivePlayer(state)?.factionId ?? "unknown"}.`);
    }
  };

  // handlers
  const handlers = {
    onHexClick(hexId) {
      if (state.ui.mode === "modal") return;
      state.ui.selectedHexId = hexId;
      if (state.ui.mode === "targeting") {
        const pending = state.ui.pendingAction;
        const actionDef = pending?.actionDef;
        const active = getActivePlayer(state);
        const activeFaction = String(active?.factionId ?? "").toLowerCase();
        const hex = state.map.hexes.find(h => h.id === hexId);
        const isAdjacent = (() => {
          if (!active?.positionHexId) return false;
          const origin = state.map.hexes.find(h => h.id === active.positionHexId);
          if (!origin) return false;
          const [col, row] = [origin.col, origin.row];
          const candidates = [
            { c: col, r: row - 1 },
            { c: col, r: row + 1 },
            { c: col - 1, r: row },
            { c: col + 1, r: row }
          ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);
          return candidates.some(p => state.map.hexes.find(h => h.col === p.c && h.row === p.r && h.id === hexId));
        })();
        const isControlledSystem = hex && hex.type === "system" &&
          state.controllerByHex?.[hexId] === activeFaction &&
          !state.contestedByHex?.[hexId];
        const requiresTarget = !!actionDef?.requiresTarget;
        const isScan = (actionDef?.effects ?? []).some(e => e.op === "revealHex");
        const isMove = (actionDef?.effects ?? []).some(e => e.op === "moveFleet");
        const isAdjToken = (actionDef?.effects ?? []).some(e => e.op === "placeTokenAdjacent");
        const isForward = (actionDef?.effects ?? []).some(e => e.op === "forwardDeploy");
        const isActivate = (actionDef?.effects ?? []).some(e => e.op === "activateSystem");
        const valid = requiresTarget && (
          ((isMove || isAdjToken || isScan) && isAdjacent) ||
          ((isForward || isActivate) && isControlledSystem)
        );
        if (!valid) {
          logLine(state, "Invalid target. Select a highlighted hex.");
          render(state, handlers);
          return;
        }
        handlers.onPerformAction();
        return;
      }
      const hex = state.map.hexes.find(h => h.id === hexId);
      const allowFreeExplore = state.flags.smoke || state.ui.freeExplore;
      if (!allowFreeExplore) {
        render(state, handlers);
        return;
      }
      if (!hex || hex.revealed || state.ui.pending) {
        render(state, handlers);
        return;
      }
      if (hex.token && String(hex.token).startsWith("capital_")) {
        render(state, handlers);
        return;
      }

      // Reveal + draw
      revealHex(state, rng, cardIndex, hexId, null);
      render(state, handlers);
    },
    onCardChoice(choiceIndex) {
      const before = snapshotState(state);
      const result = resolveChoice(state, cardIndex, choiceIndex);
      const after = snapshotState(state);
      const changed = didStateChange(before, after);

      if (result.ok) {
        // baseline: nothing else
      } else {
        logLine(state, `Resolve failed: ${result.reason}`);
      }

      if (state.ui.lastResolution) {
        setMode("modal");
        state.ui.modalType = "card";
      }
      render(state, handlers);
    },
    onCardContinue() {
      state.ui.lastResolution = null;
      const pending = state.ui.pendingAction;
      if (pending) {
        if (pending.consume?.a) state.turn.used.a = true;
        if (pending.consume?.b) state.turn.used.b = true;
        if (pending.consume?.bonus) state.turn.used.bonus = true;
        state.ui.pendingAction = null;
        logLine(state, `DICE: used A=${state.turn.used.a} B=${state.turn.used.b} Bonus=${state.turn.used.bonus}`);
      }
      setMode("idle");
      state.ui.modalType = null;
      render(state, handlers);
    },
    onRollRoundDice() {
      if (state.ui.mode !== "idle") return;
      rollRoundDice();
      render(state, handlers);
    },
    onNextPlayer() {
      advancePlayer();
      render(state, handlers);
    },
    onPerformAction() {
      const pending = state.ui.pendingAction;
      if (!pending) {
        logLine(state, "Select an action first.");
        render(state, handlers);
        return;
      }
      const result = executeActionNumber(state, rng, cardIndex, pending.actionNumber, state.ui.selectedHexId);
      if (result.ok) {
        const modalActive = !!state.ui.pending || !!state.ui.lastResolution;
        if (modalActive) {
          setMode("modal");
          state.ui.modalType = "card";
        } else {
          if (pending.consume?.a) state.turn.used.a = true;
          if (pending.consume?.b) state.turn.used.b = true;
          if (pending.consume?.bonus) state.turn.used.bonus = true;
          state.ui.pendingAction = null;
          setMode("idle");
          state.ui.modalType = null;
          logLine(state, `DICE: used A=${state.turn.used.a} B=${state.turn.used.b} Bonus=${state.turn.used.bonus}`);
        }
      } else if (result.needsTarget) {
        logLine(state, "Select a valid target.");
      } else {
        state.ui.pendingAction = null;
        setMode("idle");
      }
      render(state, handlers);
    },
    onActionSelect(actionNumber) {
      if (state.ui.mode !== "idle") {
        logLine(state, "Finish current resolution first.");
        render(state, handlers);
        return;
      }
      if (state.ui.pendingAction) {
        state.ui.pendingAction = null;
      }
      const options = computeAvailableActions(state)[String(actionNumber)] ?? [];
      const factionId = String(getActivePlayer(state)?.factionId ?? "").toLowerCase();
      const action = state.actionsByFaction?.[factionId]?.[String(actionNumber)];
      if (options.length === 0) {
        logLine(state, "Queue an action by spending dice first.");
        render(state, handlers);
        return;
      }
      const preferred = options.find(opt => opt.label === "A" || opt.label === "B" || opt.label === "Bonus") ?? options[0];
      if (!preferred) {
        logLine(state, "No remaining dice capacity for this action.");
        render(state, handlers);
        return;
      }
      state.ui.pendingAction = { actionNumber: String(actionNumber), consume: preferred.consume, actionDef: action };
      logLine(state, `ACTION: #${actionNumber} using dice ${preferred.label}`);
      if (action?.requiresTarget) {
        setMode("targeting", action?.name ?? "action");
        render(state, handlers);
        return;
      }
      setMode("idle");
      handlers.onPerformAction();
    },
    onToggleFreeExplore(enabled) {
      state.ui.freeExplore = enabled;
      render(state, handlers);
    },
    onSelectDeck(deckType) {
      state.ui.selectedDeckType = deckType;
      render(state, handlers);
    },
    onModifyDie(dieId, delta) {
      state.ui.modifyDie = { die: dieId, delta };
      render(state, handlers);
    }
  };

  const rollBtn = document.getElementById("rollRoundDiceBtn");
  if (rollBtn) rollBtn.addEventListener("click", () => handlers.onRollRoundDice());

  const nextBtn = document.getElementById("nextPlayerBtn");
  if (nextBtn) nextBtn.addEventListener("click", () => handlers.onNextPlayer());

  // Startup log
  logLine(state, `BOOT: version=${state.meta.version}`);
  logLine(state, `BOOT: seed=${seed}`);
  logLine(state, `Prototype ready. Explore the map.`);

  render(state, handlers);
  setReady();

  if (smoke) {
    await runSmoke(state, rng, cardIndex, handlers);
  }
}

async function runSmoke(state, rng, cardIndex, handlers) {
  setSmokeBadge(`SMOKE: RUNNING (seed=${state.meta.seed})`, "warn");
  logLine(state, `SMOKE: starting (seed=${state.meta.seed})`);

  // Force three known hexes and forced deck types
  const forced = [
    { hexId: "A1", deck: "empty" },
    { hexId: "A2", deck: "system" },
    { hexId: "A3", deck: "phenomena" }
  ];

  const measurableOps = new Set(["gainResource", "loseResource", "gainFleet", "loseFleet", "modifyCosmicTension"]);

  try {
    for (const step of forced) {
      state.ui.pending = null;

      // Ensure hex exists
      const hex = state.map.hexes.find(h => h.id === step.hexId);
      if (!hex) throw new Error(`Missing hex ${step.hexId}`);

      // Force it to be unrevealed + unknown, then reveal with forced type
      hex.revealed = false;
      hex.type = "unknown";
      hex.token = null;

      // Reveal with forced type
      revealHex(state, rng, cardIndex, step.hexId, step.deck);
      render(state, handlers);

      const pending = state.ui.pending;
      if (!pending) throw new Error(`Card panel did not open for ${step.deck} at ${step.hexId}`);
      if (pending.deckType !== step.deck) {
        const got = pending.deckType ?? "none";
        const cardId = pending.card?.id ?? "unknown";
        throw new Error(`Deck mismatch: expected ${step.deck} got ${got} (card=${cardId})`);
      }
      let card = pending.card;

      // Find a card whose choice 0 has measurable effects. If current doesn't, cycle draws until found (bounded).
      let tries = 0;
      while (tries < 12) {
        const c0 = card.choices?.[0];
        const hasMeasurable = (c0?.effects ?? []).some(e => measurableOps.has(e.op));
        if (hasMeasurable) break;

        // Discard and draw next card from the same forced deck
        state.decks[step.deck].discard.push(card.id);
        state.ui.pending = null;
        revealHex(state, rng, cardIndex, step.hexId, step.deck);
        render(state, handlers);

        tries++;
        if (!state.ui.pending) throw new Error(`Could not draw a card for ${step.deck} after cycling.`);
        if (state.ui.pending.deckType !== step.deck) {
          const got = state.ui.pending.deckType ?? "none";
          const cardId = state.ui.pending.card?.id ?? "unknown";
          throw new Error(`Deck mismatch: expected ${step.deck} got ${got} (card=${cardId})`);
        }
        card = state.ui.pending.card;
      }

      // Snapshot before resolve
      const before = snapshotState(state);

      // Choice 0 must exist
      const choice0 = state.ui.pending?.card?.choices?.[0];
      if (!choice0) throw new Error(`Choice 0 missing for deck=${step.deck} card=${state.ui.pending?.card?.id}`);

      // Resolve choice 0
      const res = resolveChoice(state, cardIndex, 0);
      render(state, handlers);

      if (!res.ok) throw new Error(`Resolve failed: ${res.reason}`);
      if (res.deckType !== step.deck) {
        throw new Error(`Deck mismatch: expected ${step.deck} got ${res.deckType} (card=${res.cardId})`);
      }

      // Validate state change
      const after = snapshotState(state);
      const changed = didStateChange(before, after);
      if (!changed) throw new Error(`No state change detected for deck=${step.deck} card=${res.cardId}`);

      // Validate token placed
      const hexAfter = state.map.hexes.find(h => h.id === step.hexId);
      if (!hexAfter || !hexAfter.token) throw new Error(`Token not placed for ${step.hexId} deck=${step.deck}`);

      // Log required line
      logLine(state, `SMOKE: deck=${res.deckType} card=${res.cardId} choice=${res.choiceLabel} token=${hexAfter.token}`);
      render(state, handlers);
    }

    logLine(state, "SMOKE: PASS");
    setSmokeBadge("SMOKE: PASS", "good");
    render(state, handlers);
  } catch (err) {
    const msg = (err && err.message) ? err.message : String(err);
    logLine(state, `SMOKE: FAIL - ${msg}`);
    setSmokeBadge(`SMOKE: FAIL - ${msg}`, "bad");
    render(state, handlers);
  }
}

boot().catch(err => {
  console.error(err);
  const badge = document.getElementById("smokeStatus");
  badge.textContent = `BOOT FAIL: ${err.message ?? err}`;
  badge.classList.add("bad");
});
