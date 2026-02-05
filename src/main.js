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
  applyEffects,
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
  useSharedBonusDie,
  activateCellCard
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

function buildCardIndex(cards) {
  const idx = {};
  for (const c of cards) idx[c.id] = c;
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
    hex.token = tokenId;
  };

  markCapital("A1", "capital_directorate");
  markCapital("G1", "capital_choir");
  markCapital("A7", "capital_bloom");
  markCapital("G7", "capital_neutral");

  state.capitalsByFaction = {
    directorate: "A1",
    choir: "G1",
    bloom: "A7"
  };

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
  initDeck(state, rng, "event", content.eventDeck ?? []);

  const cardIndex = buildCardIndex(content.eventDeck ?? []);
  state.ui.cardIndex = cardIndex;
  state.agreementsCatalog = content.agreements ?? [];
  if (content.tensionDeckSets?.default?.max) {
    state.tension.max = content.tensionDeckSets.default.max;
  }

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

  const applyAgreementBenefits = () => {
    state.agreements.forEach(agreement => {
      if (!agreement.active) return;
      const effects = agreement.benefits ?? [];
      agreement.parties.forEach(factionId => {
        const player = state.players.find(p => String(p.factionId).toLowerCase() === String(factionId).toLowerCase());
        if (!player) return;
        const context = { hexId: state.ui.selectedHexId, strict: false };
        applyEffects(state, effects, context);
      });
    });
  };

  const rollRoundDice = () => {
    state.turn.dice.a = rng.rollDie(6);
    state.turn.dice.b = rng.rollDie(6);
    if (state.sharedBonusDie.value == null && state.turn.activePlayerIndex === state.turn.firstPlayerIndex) {
      state.sharedBonusDie.value = rng.rollDie(6);
      state.sharedBonusDie.lockedByFactionId = null;
      state.sharedBonusDie.usedByFactionIds = {};
    }
    state.turn.used.a = false;
    state.turn.used.b = false;
    state.turn.oncePerRound.probabilityDriftUsed = state.players.map(() => false);
    state.ui.pendingAction = null;
    setMode("idle");
    state.ui.modalType = null;
    logLine(state, `TURN: rolled A=${state.turn.dice.a} B=${state.turn.dice.b} Bonus=${state.sharedBonusDie.value ?? "-"}`);
  };

  const consumePendingAction = () => {
    const pending = state.ui.pendingAction;
    if (!pending) return;
    if (pending.consume?.a) state.turn.used.a = true;
    if (pending.consume?.b) state.turn.used.b = true;
    if (pending.consume?.bonus) {
      const active = getActivePlayer(state);
      if (active) {
        const bonusResult = useSharedBonusDie(state, active.factionId);
        if (!bonusResult.ok) {
          logLine(state, "Bonus die unavailable.");
        }
      }
    }
    state.ui.pendingAction = null;
    logLine(state, `DICE: used A=${state.turn.used.a} B=${state.turn.used.b} Bonus=${state.sharedBonusDie.value ?? "-"}`);
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
      state.turn.used.a = false;
      state.turn.used.b = false;
      state.turn.oncePerRound.probabilityDriftUsed = state.players.map(() => false);
      state.turn.systemActivated = [];
      state.sharedBonusDie.value = null;
      state.sharedBonusDie.lockedByFactionId = null;
      state.sharedBonusDie.usedByFactionIds = {};
      state.combatInitiatedThisRoundByHex = {};
      applyAgreementBenefits();
      Object.values(state.techByFaction ?? {}).forEach(list => {
        list.forEach(t => { t.tapped = false; });
      });
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
    onHexClick(hexId, evt) {
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
        const isWithinTwo = (originId) => {
          const first = getAdjacentHexesLocal(originId);
          if (first.some(h => h.id === hexId)) return true;
          const second = first.flatMap(h => getAdjacentHexesLocal(h.id));
          return second.some(h => h.id === hexId);
        };
        const isControlledSystem = hex && hex.cardKind === "system" &&
          state.controllerByHex?.[hexId] === activeFaction &&
          !state.contestedByHex?.[hexId];
        const requiresTarget = !!actionDef?.requiresTarget;
        const isScan = (actionDef?.effects ?? []).some(e => e.op === "revealHex");
        const isFast = (actionDef?.effects ?? []).some(e => e.op === "fastDeploy");
        const isMove = (actionDef?.effects ?? []).some(e => e.op === "moveFleet" || e.op === "fastDeploy");
        const isAdjToken = (actionDef?.effects ?? []).some(e => e.op === "placeTokenAdjacent");
        const isForward = (actionDef?.effects ?? []).some(e => e.op === "forwardDeploy");
        const isActivate = (actionDef?.effects ?? []).some(e => e.op === "activateSystem" || e.op === "activateCellCard");
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
            const validDest = isFast ? isWithinTwo(selection.hexId) : isAdjacentTo(selection.hexId);
            if (!validDest) {
              logLine(state, "Invalid target. Select a highlighted hex.");
              render(state, handlers);
              return;
            }
            handlers.onPerformAction();
            return;
          }
        }
        const valid = requiresTarget && (
          ((isAdjToken || isScan) && fleetHexes.some(isAdjacentTo)) ||
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
      revealHex(state, rng, cardIndex, hexId, { mode: "entry" });
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
    onCardChoice(choiceKey) {
      const before = snapshotState(state);
      const result = resolveChoice(state, cardIndex, choiceKey);
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
      const combat = state.ui.combat;
      if (!combat) return;
      if (combat.engagedFactions.length === 0) {
        combat.engagedFactions = [...combat.defenderCandidates];
      }
      combat.phase = "roll";
      render(state, handlers);
    },
    onCombatDisengage() {
      endCombat(state);
      consumePendingAction();
      setMode("idle");
      render(state, handlers);
    },
    onCombatRoll() {
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
      const combat = state.ui.combat;
      if (!combat) return;
      combat.phase = "roll";
      render(state, handlers);
    },
    onCombatRetreat() {
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
    onActivateCellCard() {
      const active = getActivePlayer(state);
      if (!active) return;
      const targetHex = state.ui.selectedHexId;
      const res = activateCellCard(state, targetHex, active.factionId);
      if (!res.ok) logLine(state, res.reason ?? "Activation failed.");
      render(state, handlers);
    },
    onAgreementResponse(accepted) {
      const pending = state.ui.pendingAgreement;
      if (!pending) return;
      if (accepted) {
        const agreementType = state.agreementsCatalog?.find(a => a.id === pending.agreementTypeId);
        const agreement = {
          id: `AGR-${Date.now()}`,
          typeId: pending.agreementTypeId,
          parties: [pending.fromFactionId, pending.toFactionId],
          benefits: agreementType?.benefits ?? [],
          restrictions: agreementType?.restrictions ?? [],
          startRound: state.turn.round,
          active: true
        };
        state.agreements.push(agreement);
        logLine(state, `Agreement formed: ${agreement.typeId}`);
      } else {
        logLine(state, "Agreement rejected.");
      }
      state.ui.pendingAgreement = null;
      state.ui.modalType = null;
      state.ui.mode = "idle";
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

  renderAll();
  setReady();

  if (smoke) {
    await runSmoke(state, rng, cardIndex, handlers);
  }
}

async function runSmoke(state, rng, cardIndex, handlers) {
  setSmokeBadge(`SMOKE: RUNNING (seed=${state.meta.seed})`, "warn");
  logLine(state, `SMOKE: starting (seed=${state.meta.seed})`);

  const forced = ["A1", "A2", "A3"];

  try {
    for (const hexId of forced) {
      state.ui.pending = null;

      // Ensure hex exists
      const hex = state.map.hexes.find(h => h.id === hexId);
      if (!hex) throw new Error(`Missing hex ${hexId}`);

      // Force it to be unrevealed
      hex.revealed = false;
      hex.token = null;

      // Reveal with entry mode
      revealHex(state, rng, cardIndex, hexId, { mode: "entry" });
      render(state, handlers);

      const pending = state.ui.pending;
      if (!pending) throw new Error(`Card panel did not open for ${hexId}`);

      // Snapshot before resolve
      const before = snapshotState(state);

      const card = cardIndex[pending.cardId];
      const choice0 = card?.front?.options?.[0];
      if (!choice0) throw new Error(`Choice 0 missing for card=${pending.cardId}`);

      // Resolve choice 0
      const res = resolveChoice(state, cardIndex, choice0.key);
      render(state, handlers);

      if (!res.ok) throw new Error(`Resolve failed: ${res.reason}`);

      // Validate state change
      const after = snapshotState(state);
      const changed = didStateChange(before, after);
      if (!changed) throw new Error(`No state change detected for card=${res.cardId}`);

      // Log required line
      logLine(state, `SMOKE: deck=${res.deckType} card=${res.cardId} choice=${res.choiceLabel}`);
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
