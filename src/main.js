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
  computeAvailableActions,
  initCombat,
  rollCombatRound,
  retreatSide,
  endCombat,
  countFleets,
  getHexFleets,
  createFleet,
  addFleetToHex,
  getHexesWithinRange,
  computePolygonStartPositions
} from "./rules.js";
import { render, setSmokeBadge, showSetupScreen } from "./ui.js";
import { aiPickAction, aiPickTargetHex, aiPickCardChoice, aiShouldContinueCombat, isCurrentPlayerAI } from "./ai.js";

const SAVE_KEY = "echoes:save:v1";
const AI_STEP_DELAY = 400;

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

function makeCardTextKey(deckType, cardId) {
  return `${String(deckType).toLowerCase()}:${cardId}`;
}

function replaceStateInPlace(target, source) {
  for (const k of Object.keys(target)) delete target[k];
  for (const [k, v] of Object.entries(source)) target[k] = v;
}

function safeSaveState(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err?.message ?? String(err) };
  }
}

function safeLoadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ok: false, reason: "No save found." };
    return { ok: true, state: JSON.parse(raw) };
  } catch (err) {
    return { ok: false, reason: err?.message ?? String(err) };
  }
}

function computeFactionScore(state, factionId) {
  const fid = String(factionId).toLowerCase();
  const player = state.players.find((p) => String(p.factionId).toLowerCase() === fid);
  const credits = player?.credits ?? 0;
  const energy = player?.energy ?? 0;
  const fleets = Object.values(state.fleetsByHex ?? {}).reduce((sum, entry) => {
    const f = entry?.[fid];
    return sum + (f?.undamaged?.length ?? 0) + (f?.damaged?.length ?? 0);
  }, 0);
  const controlled = Object.values(state.controllerByHex ?? {}).filter((c) => c === fid).length;
  const influence = Object.values(state.influence ?? {}).reduce((sum, byFaction) => sum + (byFaction?.[fid] ?? 0), 0);
  return credits + energy + fleets + controlled * 2 + Math.floor(influence / 3);
}

function tryEnterGameOver(state) {
  const maxRounds = state.meta?.maxRounds ?? 12;
  if ((state.turn?.round ?? 1) <= maxRounds) return false;
  const scores = state.players.map((p) => ({
    factionId: String(p.factionId).toLowerCase(),
    score: computeFactionScore(state, p.factionId),
  }));
  scores.sort((a, b) => b.score - a.score || a.factionId.localeCompare(b.factionId));
  state.ui.gameOver = {
    winnerFactionId: scores[0]?.factionId ?? null,
    scores,
    reason: `Reached round limit (${maxRounds}).`,
  };
  state.ui.mode = "modal";
  state.ui.modalType = "gameover";
  return true;
}

async function boot() {
  const { seed, smoke } = getParams();
  const p = new URLSearchParams(location.search);
  const skipSetup = smoke || p.get("skip_setup") === "1";

  let playerSetup = null;
  let tutorialMode = false;

  if (!skipSetup) {
    const setupResult = await showSetupScreen();
    playerSetup = setupResult.players;
    tutorialMode = setupResult.tutorial;
  }

  const rng = makeRng(seed);
  const state = initialState({ seed, playerSetup });
  state.flags.smoke = smoke;
  state.ui.tutorialMode = tutorialMode;
  state.ui.tutorialStep = tutorialMode ? 0 : -1;

  const content = await loadContent();
  if (!content.actionsByFaction || Object.keys(content.actionsByFaction).length === 0) {
    logLine(state, "BOOT FAIL: actions.json not loaded");
  }

  state.actionsByFaction = content.actionsByFaction;
  state.cardTextByKey = content.cardTextByKey ?? {};

  window.__ECHOES_STATE__ = state;
  window.__ECHOES_CONTENT__ = content;
  window.__ECHOES_VERSION__ = state.meta.version;

  // map
  state.map.width = content.hexMap.width;
  state.map.height = content.hexMap.height;
  state.map.hexes = content.hexMap.hexes;

  const startHexIds = computePolygonStartPositions(state.map, state.players.length);
  const capitalTokens = ["capital_directorate", "capital_choir", "capital_bloom", "capital_neutral", "capital_salvagers", "capital_gatekeepers", "capital_syndicate"];
  state.capitalsByFaction = {};

  state.players.forEach((p, i) => {
    const hexId = startHexIds[i];
    const factionId = String(p.factionId).toLowerCase();
    const tokenId = capitalTokens[i] ?? `capital_${factionId}`;
    if (hexId) {
      const hex = state.map.hexes.find(h => h.id === hexId);
      if (hex) {
        hex.revealed = true;
        hex.type = "system";
        hex.token = tokenId;
      }
      state.capitalsByFaction[factionId] = hexId;
    }
  });

  if (!state.fleetsByHex || Object.keys(state.fleetsByHex).length === 0) {
    state.fleetsByHex = {};
    state.players.forEach(p => {
      const factionId = String(p.factionId).toLowerCase();
      if (p.fleetsByHex) {
        Object.entries(p.fleetsByHex).forEach(([hexId, count]) => {
          const total = typeof count === "number" ? count : (count?.undamaged ?? 0) + (count?.damaged ?? 0);
          for (let i = 0; i < total; i += 1) {
            const fleetId = createFleet(state, factionId);
            addFleetToHex(state, hexId, factionId, "undamaged", fleetId);
          }
        });
      } else if (p.fleets && p.positionHexId) {
        for (let i = 0; i < p.fleets; i += 1) {
          const fleetId = createFleet(state, factionId);
          addFleetToHex(state, p.positionHexId, factionId, "undamaged", fleetId);
        }
      } else {
        const capital = state.capitalsByFaction[factionId];
        const fleetId = createFleet(state, factionId);
        addFleetToHex(state, capital, factionId, "undamaged", fleetId);
      }
    });
  }

  state.visited = {};
  state.players.forEach(p => {
    const key = String(p.factionId).toLowerCase();
    state.visited[key] = {};
    Object.keys(state.fleetsByHex ?? {}).forEach(hexId => {
      if (state.fleetsByHex[hexId]?.[key]) state.visited[key][hexId] = true;
    });
  });
  recomputeInfluence(state);

  // tokens
  state.tokensById = content.tokensById ?? {};
  state.tokens = state.tokensById;
  state.factions = content.factions ?? [];
  state.techByFaction = state.techByFaction ?? {};
  state.players.forEach(p => {
    const key = String(p.factionId).toLowerCase();
    if (!state.techByFaction[key]) state.techByFaction[key] = [];
  });

  // decks
  initDeck(state, rng, "empty", content.cards.empty);
  initDeck(state, rng, "system", content.cards.system);
  initDeck(state, rng, "phenomena", content.cards.phenomena);

  const cardIndex = buildCardIndex(content.cards);

  const getAdjacentHexesLocal = (hexId) => {
    const hex = state.map.hexes.find(h => h.id === hexId);
    if (!hex) return [];
    const [col, row] = [hex.col, hex.row];
    const candidates = [
      { c: col, r: row - 1 },
      { c: col, r: row + 1 },
      { c: col - 1, r: row },
      { c: col + 1, r: row }
    ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);
    return candidates
      .map(p => state.map.hexes.find(h => h.col === p.c && h.row === p.r))
      .filter(Boolean);
  };

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

  const consumePendingAction = () => {
    const pending = state.ui.pendingAction;
    if (!pending) return;
    if (pending.consume?.a) state.turn.used.a = true;
    if (pending.consume?.b) state.turn.used.b = true;
    if (pending.consume?.bonus) state.turn.used.bonus = true;
    state.ui.pendingAction = null;
    logLine(state, `DICE: used A=${state.turn.used.a} B=${state.turn.used.b} Bonus=${state.turn.used.bonus}`);
  };

  let pulseTimer = null;
  const renderAll = () => {
    render(state, handlers);
    if (state.ui.pulseHexId && !pulseTimer) {
      pulseTimer = setTimeout(() => {
        state.ui.pulseHexId = null;
        pulseTimer = null;
        render(state, handlers);
      }, 900);
    }
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
      Object.values(state.techByFaction ?? {}).forEach(list => {
        list.forEach(t => { t.tapped = false; });
      });
      state.ui.pendingAction = null;
      setMode("idle");
      state.ui.modalType = null;
      if (tryEnterGameOver(state)) {
        logLine(state, `GAME OVER: winner=${state.ui.gameOver?.winnerFactionId ?? "none"}`);
        return;
      }
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
    onHexClick(hexId, evt) {
      if (state.ui.gameOver) return;
      if (state.ui.mode === "modal") return;
      state.ui.selectedHexId = hexId;
      if (state.ui.mode === "targeting") {
        const pending = state.ui.pendingAction;
        const actionDef = pending?.actionDef;
        const active = getActivePlayer(state);
        const activeFaction = String(active?.factionId ?? "").toLowerCase();
        const hex = state.map.hexes.find(h => h.id === hexId);
        const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[activeFaction]);
        const isAdjacentTo = (originId) => {
          const origin = state.map.hexes.find(h => h.id === originId);
          if (!origin) return false;
          const [col, row] = [origin.col, origin.row];
          const candidates = [
            { c: col, r: row - 1 },
            { c: col, r: row + 1 },
            { c: col - 1, r: row },
            { c: col + 1, r: row }
          ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);
          return candidates.some(p => state.map.hexes.find(h => h.col === p.c && h.row === p.r && h.id === hexId));
        };
        const fastEffect = (actionDef?.effects ?? []).find(e => e.op === "fastDeploy");
        const moveRange = fastEffect?.range ?? 2;
        const isRelay = (actionDef?.effects ?? []).some(e => e.op === "relayMove");
        const isWithinRange = (originId, range) => {
          let frontier = [state.map.hexes.find(h => h.id === originId)].filter(Boolean);
          const seen = new Set([originId]);
          for (let r = 0; r < range; r++) {
            const next = [];
            for (const h of frontier) {
              for (const n of getAdjacentHexesLocal(h.id)) {
                if (!seen.has(n.id)) { seen.add(n.id); next.push(n); }
              }
            }
            frontier = next;
          }
          return seen.has(hexId);
        };
        const isControlledSystem = hex && hex.type === "system" &&
          state.controllerByHex?.[hexId] === activeFaction &&
          !state.contestedByHex?.[hexId];
        const requiresTarget = !!actionDef?.requiresTarget;
        const isScan = (actionDef?.effects ?? []).some(e => e.op === "revealHex");
        const isFast = (actionDef?.effects ?? []).some(e => e.op === "fastDeploy");
        const isMove = (actionDef?.effects ?? []).some(e => e.op === "moveFleet" || e.op === "fastDeploy");
        const isAdjToken = (actionDef?.effects ?? []).some(e => e.op === "placeTokenAdjacent");
        const isForward = (actionDef?.effects ?? []).some(e => e.op === "forwardDeploy");
        const isActivate = (actionDef?.effects ?? []).some(e => e.op === "activateSystem");
        const isRepair = (actionDef?.effects ?? []).some(e => e.op === "repairFleet");
        const isPlaceOutpost = (actionDef?.effects ?? []).some(e => e.op === "placeOutpost");
        const isPlaceDebris = (actionDef?.effects ?? []).some(e => e.op === "placeDebris");
        const isPlaceBeacon = (actionDef?.effects ?? []).some(e => e.op === "placeBeacon");
        const isPlaceTradeRoute = (actionDef?.effects ?? []).some(e => e.op === "placeTradeRoute");
        const revealEffect = (actionDef?.effects ?? []).find(e => e.op === "revealHex");
        const revealCount = revealEffect?.count ?? 1;
        const revealRange = revealEffect?.range ?? 1;
        const isReconOrigin = isScan && revealCount > 1 && revealRange === 1;
        const isScanRange2 = isScan && revealRange > 1;
        if (requiresTarget && isMove) {
          const factionId = String(active?.factionId ?? "").toLowerCase();
          const entry = getHexFleets(state, hexId, factionId);
          const fleetsHere = entry.undamaged.length + entry.damaged.length;
          const selection = state.ui.fleetSelection;
          if (!selection.hexId || selection.hexId === hexId) {
            if (fleetsHere > 0) {
              const allIds = [...entry.undamaged, ...entry.damaged];
              const nextIds = evt?.detail >= 2 ? allIds : allIds.slice(0, Math.min(allIds.length, selection.hexId === hexId ? selection.fleetIds.length + 1 : 1));
              state.ui.fleetSelection = { hexId, factionId, fleetIds: nextIds };
              logLine(state, `Selected ${nextIds.length} fleet(s) from ${hexId}.`);
              render(state, handlers);
              return;
            }
          } else if (selection.hexId && selection.hexId !== hexId) {
            const validDest = isRelay
              ? (state.beaconsByHex?.[hexId] === activeFaction && hexId !== selection.hexId)
              : (isFast ? isWithinRange(selection.hexId, moveRange) : isAdjacentTo(selection.hexId));
            if (!validDest) {
              logLine(state, "Invalid target. Select a highlighted hex.");
              render(state, handlers);
              return;
            }
            handlers.onPerformAction();
            return;
          }
        }
        const hasDamagedHere = (() => {
          const entry = state.fleetsByHex?.[hexId]?.[activeFaction];
          return entry && (entry?.damaged?.length ?? 0) > 0;
        })();
        const hasFleetHere = (() => {
          const entry = state.fleetsByHex?.[hexId]?.[activeFaction];
          return entry && ((entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0)) > 0;
        })();
        const isWithinRange2 = isScanRange2 && fleetHexes.some(hId =>
          getHexesWithinRange(state, hId, revealRange).some(h => h.id === hexId)
        );
        const isPlaceTradeRouteValid = isPlaceTradeRoute && (() => {
          const fleetHex = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[activeFaction]);
          if (!fleetHex) return false;
          const adj = getAdjacentHexesLocal(fleetHex).some(h => h.id === hexId);
          const controlled = state.controllerByHex?.[hexId] === activeFaction && !state.contestedByHex?.[hexId];
          return adj && controlled;
        })();
        const valid = requiresTarget && (
          ((isAdjToken || (isScan && !isReconOrigin && !isScanRange2)) && fleetHexes.some(isAdjacentTo)) ||
          (isScanRange2 && isWithinRange2) ||
          ((isForward || isActivate) && isControlledSystem) ||
          (isRepair && hasDamagedHere) ||
          (isReconOrigin && hasFleetHere) ||
          (isPlaceOutpost && hasFleetHere) ||
          (isPlaceDebris && hasFleetHere) ||
          (isPlaceBeacon && hasFleetHere) ||
          isPlaceTradeRouteValid
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
    onHexContextMenu(hexId, evt) {
      if (state.ui.mode !== "targeting") return;
      const selection = state.ui.fleetSelection;
      if (!selection.hexId || selection.hexId !== hexId) return;
      const clearAll = evt?.detail >= 2;
      if (clearAll || selection.fleetIds.length <= 1) {
        state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
        logLine(state, `Selection cleared for ${hexId}.`);
      } else {
        const nextIds = selection.fleetIds.slice(0, selection.fleetIds.length - 1);
        state.ui.fleetSelection = { hexId, factionId: selection.factionId, fleetIds: nextIds };
        logLine(state, `Selected ${nextIds.length} fleet(s) from ${hexId}.`);
      }
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
        const lr = state.ui.lastResolution;
        const authored = state.cardTextByKey?.[makeCardTextKey(lr.deckType, lr.cardId)];
        if (authored) {
          state.ui.lastResolution.authored = authored;
        }
        setMode("modal");
        state.ui.modalType = "card";
      }
      renderAll();
    },
    onCardContinue() {
      state.ui.lastResolution = null;
      consumePendingAction();
      setMode("idle");
      state.ui.modalType = null;
      renderAll();
    },
    onRollRoundDice() {
      if (state.ui.gameOver) return;
      if (state.ui.mode !== "idle") return;
      rollRoundDice();
      render(state, handlers);
    },
    onNextPlayer() {
      if (state.ui.gameOver) return;
      advancePlayer();
      render(state, handlers);
      scheduleAI();
    },
    onPerformAction() {
      if (state.ui.gameOver) return;
      const pending = state.ui.pendingAction;
      if (!pending) {
        logLine(state, "Select an action first.");
        render(state, handlers);
        return;
      }
      const result = executeActionNumber(state, rng, cardIndex, pending.actionNumber, state.ui.selectedHexId);
      if (result.ok) {
        const modalActive = state.ui.mode === "modal" || !!state.ui.pending || !!state.ui.lastResolution;
        if (modalActive) {
          setMode("modal");
          state.ui.modalType = "card";
        } else {
          consumePendingAction();
          setMode("idle");
          state.ui.modalType = null;
        }
      } else if (result.needsTarget) {
        logLine(state, "Select a valid target.");
      } else {
        state.ui.pendingAction = null;
        setMode("idle");
      }
      renderAll();
    },
    onActionSelect(actionNumber) {
      if (state.ui.gameOver) return;
      if (state.ui.pending || state.ui.lastResolution) {
        setMode("modal");
        state.ui.modalType = "card";
        logLine(state, "Resolve current event first.");
        render(state, handlers);
        return;
      }
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
      const isMove = (action?.effects ?? []).some(e => e.op === "moveFleet");
      if (!isMove) state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
      if (action?.requiresTarget) {
        setMode("targeting", action?.name ?? "action");
        render(state, handlers);
        return;
      }
      setMode("idle");
      handlers.onPerformAction();
    },
    onCombatToggleFaction(factionId) {
      if (state.ui.gameOver) return;
      const combat = state.ui.combat;
      if (!combat) return;
      if (combat.engagedFactions.includes(factionId)) {
        combat.engagedFactions = combat.engagedFactions.filter(f => f !== factionId);
      } else {
        combat.engagedFactions.push(factionId);
      }
      render(state, handlers);
    },
    onCombatEngage() {
      if (state.ui.gameOver) return;
      const combat = state.ui.combat;
      if (!combat) return;
      if (combat.engagedFactions.length === 0) {
        combat.engagedFactions = [...combat.defenderCandidates];
      }
      combat.phase = "roll";
      render(state, handlers);
    },
    onCombatDisengage() {
      if (state.ui.gameOver) return;
      endCombat(state);
      consumePendingAction();
      setMode("idle");
      render(state, handlers);
    },
    onCombatRoll() {
      if (state.ui.gameOver) return;
      const combat = state.ui.combat;
      if (!combat) return;
      rollCombatRound(state, rng);
      const attackerTotal = combat.attackerFactions.reduce((s, f) => s + countFleets(state, combat.hexId, f).total, 0);
      const defenderTotal = combat.engagedFactions.reduce((s, f) => s + countFleets(state, combat.hexId, f).total, 0);
      if (attackerTotal === 0 || defenderTotal === 0) {
        endCombat(state);
        consumePendingAction();
        setMode("idle");
        render(state, handlers);
        return;
      }
      combat.phase = "choice";
      render(state, handlers);
    },
    onCombatContinue() {
      if (state.ui.gameOver) return;
      const combat = state.ui.combat;
      if (!combat) return;
      combat.phase = "roll";
      render(state, handlers);
    },
    onCombatRetreat() {
      if (state.ui.gameOver) return;
      const combat = state.ui.combat;
      if (!combat) return;
      retreatSide(state, combat.hexId, combat.attackerFactions, combat.engagedFactions);
      endCombat(state);
      consumePendingAction();
      setMode("idle");
      render(state, handlers);
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
    },
    onSaveGame() {
      const res = safeSaveState(state);
      logLine(state, res.ok ? "SAVE: success." : `SAVE: failed (${res.reason}).`);
      renderAll();
    },
    onLoadGame() {
      const res = safeLoadState();
      if (!res.ok) {
        logLine(state, `LOAD: failed (${res.reason}).`);
        renderAll();
        return;
      }
      replaceStateInPlace(state, res.state);
      state.cardTextByKey = content.cardTextByKey ?? {};
      if (!state.cardByHex) state.cardByHex = {};
      state.ui.pendingAction = null;
      state.ui.modalType = state.ui.gameOver ? "gameover" : null;
      state.ui.mode = state.ui.gameOver ? "modal" : "idle";
      recomputeInfluence(state);
      logLine(state, "LOAD: success.");
      renderAll();
    },
    onNewGame() {
      location.href = `${location.pathname}?seed=${seed}`;
    },
    onDismissGameOver() {
      if (!state.ui.gameOver) return;
      state.ui.gameOver = null;
      state.ui.modalType = null;
      state.ui.mode = "idle";
      renderAll();
    }
  };

  let aiRunning = false;
  const scheduleAI = () => {
    if (aiRunning || state.ui.gameOver) return;
    if (!isCurrentPlayerAI(state)) return;
    aiRunning = true;
    runAITurn();
  };

  function runAITurn() {
    if (!isCurrentPlayerAI(state) || state.ui.gameOver) { aiRunning = false; return; }

    const step = () => {
      if (!isCurrentPlayerAI(state) || state.ui.gameOver) { aiRunning = false; renderAll(); return; }

      if (state.ui.combat) {
        if (state.ui.combat.phase === "prompt") {
          handlers.onCombatEngage();
        } else if (state.ui.combat.phase === "roll") {
          handlers.onCombatRoll();
        } else if (state.ui.combat.phase === "choice") {
          if (aiShouldContinueCombat(state)) handlers.onCombatContinue();
          else handlers.onCombatRetreat();
        }
        setTimeout(step, AI_STEP_DELAY);
        return;
      }

      if (state.ui.pending) {
        const idx = aiPickCardChoice(state);
        handlers.onCardChoice(idx);
        setTimeout(step, AI_STEP_DELAY);
        return;
      }

      if (state.ui.lastResolution) {
        handlers.onCardContinue();
        setTimeout(step, AI_STEP_DELAY);
        return;
      }

      if (state.turn.dice.a == null) {
        rollRoundDice();
        renderAll();
        setTimeout(step, AI_STEP_DELAY);
        return;
      }

      const pick = aiPickAction(state);
      if (!pick) {
        advancePlayer();
        renderAll();
        setTimeout(() => { aiRunning = false; scheduleAI(); }, AI_STEP_DELAY);
        return;
      }

      const factionId = String(getActivePlayer(state)?.factionId ?? "").toLowerCase();
      const action = pick.actionDef;
      state.ui.pendingAction = { actionNumber: pick.actionNumber, consume: pick.consume, actionDef: action };

      if (action?.requiresTarget) {
        const target = aiPickTargetHex(state);
        if (target?.originHex) {
          const entry = state.fleetsByHex?.[target.originHex]?.[factionId];
          const allIds = [...(entry?.undamaged ?? []), ...(entry?.damaged ?? [])];
          state.ui.fleetSelection = { hexId: target.originHex, factionId, fleetIds: allIds };
        }
        if (target?.targetHex) {
          state.ui.selectedHexId = target.targetHex;
        } else {
          state.ui.pendingAction = null;
          advancePlayer();
          renderAll();
          setTimeout(() => { aiRunning = false; scheduleAI(); }, AI_STEP_DELAY);
          return;
        }
      }

      handlers.onPerformAction();
      setTimeout(step, AI_STEP_DELAY);
    };

    setTimeout(step, AI_STEP_DELAY);
  }

  const origAdvance = advancePlayer;

  // Startup log
  logLine(state, `BOOT: version=${state.meta.version}`);
  logLine(state, `BOOT: seed=${seed}`);
  const humanFaction = state.players.find(p => !p.isAI)?.factionId ?? "all";
  const aiCount = state.players.filter(p => p.isAI).length;
  logLine(state, aiCount > 0 ? `You are ${humanFaction}. ${aiCount} AI opponent(s).` : "All players are human (hot-seat).");
  if (tutorialMode) logLine(state, "TUTORIAL: Follow the highlighted hints to learn the game.");
  logLine(state, `Prototype ready. Explore the map.`);

  renderAll();
  setReady();
  scheduleAI();

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
    state.ui.lastResolution = null;
    state.ui.pending = null;
    state.ui.pendingAction = null;
    state.ui.mode = "idle";
    state.ui.modalType = null;
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
