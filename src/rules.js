const HAND_LIMIT = 5;
const SPECIAL_RESOURCE_TYPES = [
  "Antimatter",
  "Collapsium",
  "Monopoles",
  "Ancient Relics",
  "Alien Art",
  "Exotic Matter"
];

// Pure-ish rules: all mutations happen on the passed-in state object for baseline simplicity.

export function logLine(state, msg) {
  const round = state.turn?.round ?? 1;
  state.log.push(`[Round ${round}] ${msg}`);
}

export function getActivePlayer(state) {
  const idx = state.turn?.activePlayerIndex ?? 0;
  return state.players?.[idx] ?? null;
}

export function getActivePlayerIndex(state) {
  return state.turn?.activePlayerIndex ?? 0;
}

export function computeAvailableActions(state) {
  const dice = state.turn?.dice;
  const used = state.turn?.used;
  const optionsByNumber = {};
  if (!dice) return optionsByNumber;

  const addOption = (number, option) => {
    const key = String(Math.min(18, Math.max(1, number)));
    if (!optionsByNumber[key]) optionsByNumber[key] = [];
    optionsByNumber[key].push(option);
  };

  const aAvailable = dice.a != null && !used?.a;
  const bAvailable = dice.b != null && !used?.b;
  const activePlayer = getActivePlayer(state);
  const bonusAvailable = !!activePlayer && canUseSharedBonusDie(state, activePlayer.factionId);

  if (aAvailable) addOption(dice.a, { label: "A", consume: { a: true } });
  if (bAvailable) addOption(dice.b, { label: "B", consume: { b: true } });
  if (aAvailable && bAvailable) addOption(dice.a + dice.b, { label: "A+B", consume: { a: true, b: true } });

  if (bonusAvailable) {
    const bonusValue = state.sharedBonusDie?.value;
    if (bonusValue != null) {
      addOption(bonusValue, { label: "Bonus", consume: { bonus: true } });
      if (aAvailable) addOption(dice.a + bonusValue, { label: "A+Bonus", consume: { a: true, bonus: true } });
      if (bAvailable) addOption(dice.b + bonusValue, { label: "B+Bonus", consume: { b: true, bonus: true } });
      if (aAvailable && bAvailable) addOption(dice.a + dice.b + bonusValue, { label: "A+B+Bonus", consume: { a: true, b: true, bonus: true } });
    }
  }

  return optionsByNumber;
}

export function canUseSharedBonusDie(state, factionId) {
  const shared = state.sharedBonusDie;
  if (!shared || shared.value == null) return false;
  const key = String(factionId).toLowerCase();
  if (shared.lockedByFactionId && shared.lockedByFactionId !== key) return false;
  if (shared.usedByFactionIds?.[key]) return false;
  const tokens = state.bonusTokensByFaction?.[key] ?? { silver: 0, gold: 0 };
  return (tokens.silver ?? 0) > 0 || (tokens.gold ?? 0) > 0;
}

export function useSharedBonusDie(state, factionId) {
  const key = String(factionId).toLowerCase();
  if (!canUseSharedBonusDie(state, key)) return { ok: false, reason: "Bonus die unavailable." };
  const tokens = state.bonusTokensByFaction[key];
  if (tokens.silver > 0) {
    tokens.silver -= 1;
    state.sharedBonusDie.usedByFactionIds[key] = true;
    logLine(state, `${key} spent 1 Silver to access the shared bonus die.`);
    return { ok: true, locked: false };
  }
  if (tokens.gold > 0) {
    tokens.gold -= 1;
    state.sharedBonusDie.usedByFactionIds[key] = true;
    state.sharedBonusDie.lockedByFactionId = key;
    logLine(state, `${key} spent 1 Gold to lock the shared bonus die.`);
    return { ok: true, locked: true };
  }
  return { ok: false, reason: "No bonus tokens available." };
}

export function actionRequiresResources(actionNumber, action) {
  if (!action?.cost) return false;
  if (actionNumber <= 6) return false;
  const credits = action.cost?.credits ?? 0;
  const energy = action.cost?.energy ?? 0;
  return credits > 0 || energy > 0;
}

export function createFleet(state, factionId) {
  const id = `F${String(state.nextFleetId).padStart(4, "0")}`;
  state.nextFleetId += 1;
  state.fleetMeta[id] = { factionId: String(factionId).toLowerCase(), createdRound: state.turn?.round ?? 1 };
  return id;
}

export function addFleetToHex(state, hexId, factionId, stateName, fleetId) {
  if (!state.fleetsByHex[hexId]) state.fleetsByHex[hexId] = {};
  if (!state.fleetsByHex[hexId][factionId]) {
    state.fleetsByHex[hexId][factionId] = { undamaged: [], damaged: [] };
  }
  state.fleetsByHex[hexId][factionId][stateName].push(fleetId);
}

export function getHexFleets(state, hexId, factionId) {
  const entry = state.fleetsByHex?.[hexId]?.[factionId];
  return {
    undamaged: entry?.undamaged ?? [],
    damaged: entry?.damaged ?? []
  };
}

export function countFleets(state, hexId, factionId) {
  const entry = getHexFleets(state, hexId, factionId);
  return {
    undamaged: entry.undamaged.length,
    damaged: entry.damaged.length,
    total: entry.undamaged.length + entry.damaged.length
  };
}

export function moveFleetStack(state, fromHexId, toHexId, factionId, fleetIds) {
  if (!fleetIds.length) return;
  if (!state.fleetsByHex[fromHexId]?.[factionId]) return;
  if (!state.fleetsByHex[toHexId]) state.fleetsByHex[toHexId] = {};
  if (!state.fleetsByHex[toHexId][factionId]) {
    state.fleetsByHex[toHexId][factionId] = { undamaged: [], damaged: [] };
  }
  const from = state.fleetsByHex[fromHexId][factionId];
  const to = state.fleetsByHex[toHexId][factionId];
  for (const id of fleetIds) {
    const idxU = from.undamaged.indexOf(id);
    if (idxU >= 0) {
      from.undamaged.splice(idxU, 1);
      to.undamaged.push(id);
      continue;
    }
    const idxD = from.damaged.indexOf(id);
    if (idxD >= 0) {
      from.damaged.splice(idxD, 1);
      to.damaged.push(id);
    }
  }
  if (from.undamaged.length === 0 && from.damaged.length === 0) {
    delete state.fleetsByHex[fromHexId][factionId];
  }
}

export function applyHitToSide(state, hexId, factionId) {
  const entry = getHexFleets(state, hexId, factionId);
  if (entry.undamaged.length > 0) {
    const id = entry.undamaged.pop();
    entry.damaged.push(id);
  } else if (entry.damaged.length > 0) {
    const id = entry.damaged.pop();
    delete state.fleetMeta[id];
  }
  state.fleetsByHex[hexId][factionId] = entry;
  if (entry.undamaged.length === 0 && entry.damaged.length === 0) {
    delete state.fleetsByHex[hexId][factionId];
  }
}

export function repairFleetInHex(state, hexId, factionId) {
  const entry = getHexFleets(state, hexId, factionId);
  if (entry.damaged.length > 0) {
    const id = entry.damaged.pop();
    entry.undamaged.push(id);
    state.fleetsByHex[hexId][factionId] = entry;
  }
}

export function initCombat(state, hexId, attackerFactionId, defenderCandidates) {
  if (!state.combatInitiatedThisRoundByHex) state.combatInitiatedThisRoundByHex = {};
  if (!state.combatInitiatedThisRoundByHex[hexId]) {
    state.combatInitiatedThisRoundByHex[hexId] = true;
    const chaosBonus = String(attackerFactionId).toLowerCase() === "bloom" ? 2 : 1;
    applyTensionDelta(state, chaosBonus);
    logLine(state, `Tension +${chaosBonus} (combat initiated at ${hexId}).`);
  }
  state.ui.combat = {
    hexId,
    attackerFactions: [attackerFactionId],
    defenderCandidates,
    engagedFactions: [],
    phase: "prompt",
    round: 0,
    dice: { attacker: [], defender: [] },
    pairs: [],
    hits: []
  };
  state.ui.modalType = "combat";
  state.ui.mode = "modal";
  logLine(state, `COMBAT: engage? attacker=${attackerFactionId} defenders=${defenderCandidates.join(",")}`);
}

function getSideDice(state, hexId, factions, rng) {
  const dice = [];
  for (const factionId of factions) {
    const counts = countFleets(state, hexId, factionId);
    for (let i = 0; i < counts.total; i += 1) {
      dice.push({ factionId, value: rng.rollDie(6) });
    }
  }
  return dice.sort((a, b) => b.value - a.value);
}

function getControllerSide(state, hexId, attackerFactions, defenderFactions) {
  const controller = state.controllerByHex?.[hexId];
  if (!controller) return null;
  if (attackerFactions.includes(controller)) return "attacker";
  if (defenderFactions.includes(controller)) return "defender";
  return null;
}

function allocateHit(state, hexId, sideFactions) {
  const influence = state.influence?.[hexId] ?? {};
  const candidates = sideFactions.map(f => ({
    factionId: f,
    influence: influence[f] ?? 0,
    counts: countFleets(state, hexId, f)
  })).filter(c => c.counts.total > 0);
  candidates.sort((a, b) => a.influence - b.influence || a.factionId.localeCompare(b.factionId));
  return candidates[0] ?? null;
}

export function rollCombatRound(state, rng) {
  const combat = state.ui.combat;
  if (!combat) return { ok: false };
  const hexId = combat.hexId;
  const attackerFactions = combat.attackerFactions;
  const defenderFactions = combat.engagedFactions;
  combat.round += 1;
  combat.dice.attacker = getSideDice(state, hexId, attackerFactions, rng);
  combat.dice.defender = getSideDice(state, hexId, defenderFactions, rng);
  const pairs = [];
  const hits = [];
  const count = Math.min(combat.dice.attacker.length, combat.dice.defender.length);
  const controllerSide = getControllerSide(state, hexId, attackerFactions, defenderFactions);
  for (let i = 0; i < count; i += 1) {
    const a = combat.dice.attacker[i];
    const d = combat.dice.defender[i];
    let loser = null;
    if (a.value > d.value) loser = "defender";
    else if (d.value > a.value) loser = "attacker";
    else if (controllerSide) loser = controllerSide === "attacker" ? "defender" : "attacker";
    pairs.push({ attacker: a, defender: d, loser });
    if (loser) hits.push({ side: loser });
  }
  combat.pairs = pairs;
  combat.hits = hits;

  for (const hit of hits) {
    const target = allocateHit(state, hexId, hit.side === "attacker" ? attackerFactions : defenderFactions);
    if (target) {
      applyHitToSide(state, hexId, target.factionId);
      logLine(state, `COMBAT: ${hit.side} hit on ${target.factionId}.`);
    }
  }
  recomputeInfluence(state);
  return { ok: true };
}

export function endCombat(state) {
  state.ui.combat = null;
  state.ui.modalType = null;
  state.ui.mode = "idle";
}

export function retreatSide(state, hexId, retreatFactions, enemyFactions) {
  const neighbors = getAdjacentHexes(state, hexId);
  for (const factionId of retreatFactions) {
    const entry = state.fleetsByHex?.[hexId]?.[String(factionId).toLowerCase()];
    if (!entry) continue;
    const valid = neighbors.filter(h => {
      return !enemyFactions.some(f => countFleets(state, h.id, f).total > 0);
    });
    if (valid.length === 0) {
      logLine(state, `RETREAT: ${factionId} could not retreat.`);
      continue;
    }
    valid.sort((a, b) => {
      const ia = state.influence?.[a.id]?.[factionId] ?? 0;
      const ib = state.influence?.[b.id]?.[factionId] ?? 0;
      return ib - ia || a.id.localeCompare(b.id);
    });
    const dest = valid[0];
    const moveCount = entry.undamaged.length + entry.damaged.length;
    if (moveCount > 0) {
      const destEntry = state.fleetsByHex[dest.id]?.[String(factionId).toLowerCase()] ?? { undamaged: [], damaged: [] };
      destEntry.undamaged.push(...entry.undamaged);
      destEntry.damaged.push(...entry.damaged);
      if (!state.fleetsByHex[dest.id]) state.fleetsByHex[dest.id] = {};
      state.fleetsByHex[dest.id][String(factionId).toLowerCase()] = destEntry;
      delete state.fleetsByHex[hexId][String(factionId).toLowerCase()];
      const visited = ensureVisitedMap(state, factionId);
      visited[dest.id] = true;
      logLine(state, `RETREAT: ${factionId} to ${dest.id}.`);
    }
  }
  recomputeInfluence(state);
}

function ensureVisitedMap(state, factionId) {
  if (!state.visited) state.visited = {};
  const key = String(factionId ?? "").toLowerCase();
  if (!state.visited[key]) state.visited[key] = {};
  return state.visited[key];
}

function ensureHand(state, factionId) {
  const key = String(factionId ?? "").toLowerCase();
  if (!state.handsByFaction) state.handsByFaction = {};
  if (!state.handsByFaction[key]) state.handsByFaction[key] = [];
  return state.handsByFaction[key];
}

function ensureSpecialResources(state, factionId) {
  const key = String(factionId ?? "").toLowerCase();
  if (!state.specialResourcesByFaction) state.specialResourcesByFaction = {};
  if (!state.specialResourcesByFaction[key]) state.specialResourcesByFaction[key] = [];
  return state.specialResourcesByFaction[key];
}

function getHandLimit(state, factionId) {
  void state;
  void factionId;
  return HAND_LIMIT;
}

function countHandLimitCards(hand) {
  return hand.filter(card => card.category !== "special_resource").length;
}

function discardNonDoomCard(hand) {
  const idx = hand.findIndex(card => card.category !== "doom");
  if (idx < 0) return null;
  return hand.splice(idx, 1)[0];
}

function addHandCard(state, factionId, card) {
  const hand = ensureHand(state, factionId);
  const limit = getHandLimit(state, factionId);
  const limitCount = countHandLimitCards(hand);
  if (limitCount >= limit && card.category !== "special_resource") {
    const discarded = discardNonDoomCard(hand);
    if (!discarded) {
      logLine(state, "Hand is full and only doom cards remain.");
      return { ok: false, reason: "Hand full." };
    }
    logLine(state, `Discarded ${discarded.cardId} to make room.`);
  }
  hand.push(card);
  return { ok: true };
}

export function scoreSpecialResources(counts) {
  const table = [0, 0, 1, 3, 6, 10, 15];
  const types = SPECIAL_RESOURCE_TYPES;
  const base = types.map(t => counts?.[t] ?? 0);
  const memo = new Map();

  const keyFor = (arr) => arr.join(",");

  const best = (arr) => {
    const key = keyFor(arr);
    if (memo.has(key)) return memo.get(key);
    let max = 0;

    // Try all-same sets
    for (let i = 0; i < arr.length; i += 1) {
      for (let size = 2; size <= 6; size += 1) {
        if (arr[i] >= size) {
          const next = [...arr];
          next[i] -= size;
          max = Math.max(max, table[size] + best(next));
        }
      }
    }

    // Try all-different sets
    const available = arr.map((v, idx) => (v > 0 ? idx : null)).filter(idx => idx != null);
    const choose = (start, size, picked) => {
      if (picked.length === size) {
        const next = [...arr];
        picked.forEach(idx => { next[idx] -= 1; });
        max = Math.max(max, table[size] + best(next));
        return;
      }
      for (let i = start; i < available.length; i += 1) {
        choose(i + 1, size, [...picked, available[i]]);
      }
    };
    for (let size = 2; size <= 6; size += 1) {
      if (available.length >= size) {
        choose(0, size, []);
      }
    }

    memo.set(key, max);
    return max;
  };

  return best(base);
}

export function canMakeAgreement(state, factionId, actionNumber) {
  void state;
  const key = String(factionId).toLowerCase();
  if (key === "directorate") return actionNumber <= 6;
  if (key === "bloom") return actionNumber <= 6;
  if (key === "choir") return actionNumber >= 13;
  return actionNumber <= 6;
}

export function canBreakAgreement(state, factionId, actionNumber) {
  void state;
  const key = String(factionId).toLowerCase();
  if (key === "directorate") return actionNumber >= 13;
  if (key === "bloom") return actionNumber <= 6;
  if (key === "choir") return actionNumber <= 6;
  return actionNumber <= 6;
}

export function getFactionRankInHex(state, hexId, factionId) {
  const influence = state.influence?.[hexId] ?? {};
  const controller = state.controllerByHex?.[hexId];
  if (!controller) return null;
  const key = String(factionId).toLowerCase();
  if (controller === key) return 1;
  const sorted = Object.entries(influence)
    .filter(([f]) => f !== controller)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (sorted[0]?.[0] === key) return 2;
  return null;
}

function applyTensionDelta(state, delta) {
  state.tension.current = Math.max(0, Math.min(state.tension.max, state.tension.current + delta));
  state.cosmicTension = state.tension.current;
  if (state.tension.current >= state.tension.max) {
    state.ui.gameOver = true;
    logLine(state, "GAME OVER: Tension maximum reached.");
  }
}

function computeControllersFromInfluence(state, influence) {
  const controllerByHex = {};
  const contestedByHex = {};
  for (const hex of state.map.hexes) {
    const hexId = hex.id;
    const entries = influence[hexId] ?? {};
    let top = -Infinity;
    let controller = null;
    let tie = false;
    for (const [factionId, value] of Object.entries(entries)) {
      if (value > top) {
        top = value;
        controller = factionId;
        tie = false;
      } else if (value === top) {
        tie = true;
      }
    }
    controllerByHex[hexId] = tie ? null : controller;
    contestedByHex[hexId] = tie;
  }
  return { controllerByHex, contestedByHex };
}

export function recomputeInfluence(state) {
  const factions = state.players.map(p => String(p.factionId).toLowerCase());
  const base = {};
  for (const hex of state.map.hexes) {
    base[hex.id] = {};
    for (const factionId of factions) {
      let value = 0;
      const visited = state.visited?.[factionId]?.[hex.id];
      if (visited) value += 1;
      const entry = state.fleetsByHex?.[hex.id]?.[factionId];
      const total = (entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0);
      if (total > 0) {
        value += 2;
      }
      base[hex.id][factionId] = value;
    }
  }

  const initial = computeControllersFromInfluence(state, base);
  const final = {};
  for (const hex of state.map.hexes) {
    final[hex.id] = { ...base[hex.id] };
    const neighbors = getAdjacentHexes(state, hex.id);
    for (const factionId of factions) {
      let bonus = 0;
      for (const n of neighbors) {
        if (initial.controllerByHex[n.id] === factionId) bonus += 1;
      }
      final[hex.id][factionId] += bonus;
      if (!Number.isFinite(final[hex.id][factionId])) {
        logLine(state, `WARN: influence NaN at ${hex.id} for ${factionId}.`);
      }
    }
  }

  const finalControllers = computeControllersFromInfluence(state, final);
  state.influence = final;
  state.controllerByHex = finalControllers.controllerByHex;
  state.contestedByHex = finalControllers.contestedByHex;
}

export function weightedPick(rng, entries) {
  const total = entries.reduce((s, e) => s + e.weight, 0);
  let r = rng.nextFloat() * total;
  for (const e of entries) {
    r -= e.weight;
    if (r <= 0) return e.value;
  }
  return entries[entries.length - 1].value;
}

export function initDeck(state, rng, deckType, cards) {
  const ids = cards.map(c => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = rng.nextInt(i + 1);
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  state.decks[deckType].draw = ids;
  state.decks[deckType].discard = [];
}

export function drawCard(state, deckType, cardById, rng = null) {
  const deck = state.decks[deckType];
  if (deck.draw.length === 0 && deck.discard.length > 0) {
    const recycled = deck.discard.splice(0);
    for (let i = recycled.length - 1; i > 0; i--) {
      const j = rng ? rng.nextInt(i + 1) : Math.floor(Math.random() * (i + 1));
      [recycled[i], recycled[j]] = [recycled[j], recycled[i]];
    }
    deck.draw = recycled;
  }
  const id = deck.draw.shift();
  if (!id) return null;
  return cardById[id] ?? null;
}

export function applyEffects(state, effects, context) {
  const before = snapshotState(state);
  const actorFactionId = context?.actorFactionId;
  const player = actorFactionId
    ? state.players.find(p => String(p.factionId).toLowerCase() === String(actorFactionId).toLowerCase())
    : getActivePlayer(state);
  let ok = true;

  const normalizeTokenId = (tokenId) => {
    if (!tokenId) return null;
    const key = String(tokenId).toLowerCase();
    const mapping = {
      empty: null,
      control: "outpost",
      control_marker: "outpost",
      mining: "mining_outpost",
      research: "research_array",
      relic_site: "research_array",
      station: "outpost",
      dead_star: "hazard",
      derelict_buoy: "derelict",
      wreck: "derelict",
      pirates: "pirate_den",
      jump_gate: "gate"
    };
    return Object.prototype.hasOwnProperty.call(mapping, key) ? mapping[key] : key;
  };

  const getCapitalHex = (factionId) => {
    const key = String(factionId ?? "").toLowerCase();
    return state.capitalsByFaction?.[key] ?? null;
  };

  for (const eff of effects) {
    switch (eff.op) {
      case "log":
        logLine(state, eff.message ?? "Something happens.");
        break;

      case "gainCredits":
        if (player) player.credits = (player.credits ?? 0) + (eff.n ?? 0);
        break;

      case "spendCredits":
        if (player) player.credits = Math.max(0, (player.credits ?? 0) - (eff.n ?? 0));
        break;

      case "gainEnergy":
        if (player) player.energy = (player.energy ?? 0) + (eff.n ?? 0);
        break;

      case "spendEnergy":
        if (player) player.energy = Math.max(0, (player.energy ?? 0) - (eff.n ?? 0));
        break;

      case "addVP":
        if (player) {
          const key = String(player.factionId).toLowerCase();
          state.vpByFaction[key] = (state.vpByFaction[key] ?? 0) + (eff.n ?? 0);
        }
        break;

      case "loseVP":
        if (player) {
          const key = String(player.factionId).toLowerCase();
          state.vpByFaction[key] = Math.max(0, (state.vpByFaction[key] ?? 0) - (eff.n ?? 0));
        }
        break;

      case "gainResource":
        if (player) player[eff.resource] = (player[eff.resource] ?? 0) + (eff.amount ?? 0);
        break;

      case "loseResource":
        if (player) player[eff.resource] = Math.max(0, (player[eff.resource] ?? 0) - (eff.amount ?? 0));
        break;

      case "gainFleet":
        if (player) {
          const amount = eff.amount ?? 0;
          const factionId = String(player.factionId).toLowerCase();
          const preferred = state.ui.selectedHexId && (state.fleetsByHex?.[state.ui.selectedHexId]?.[factionId])
            ? state.ui.selectedHexId
            : (Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[factionId]) ?? getCapitalHex(player.factionId));
          const loc = preferred ?? "unknown";
          if (loc !== "unknown") {
            for (let i = 0; i < amount; i += 1) {
              const id = createFleet(state, factionId);
              addFleetToHex(state, loc, factionId, "undamaged", id);
            }
          }
          logLine(state, `Fleet +${amount} at ${loc}.`);
          if (loc !== "unknown") state.ui.pulseHexId = loc;
        }
        break;

      case "loseFleet":
        if (player) {
          const amount = eff.amount ?? 0;
          const selected = state.ui.selectedHexId;
          const factionId = String(player.factionId).toLowerCase();
          const keys = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[factionId]);
          const target = selected && state.fleetsByHex?.[selected]?.[factionId] ? selected : (keys[0] ?? null);
          if (target) {
            for (let i = 0; i < amount; i += 1) applyHitToSide(state, target, factionId);
          }
        }
        break;

      case "modifyCosmicTension":
        applyTensionDelta(state, eff.amount ?? 0);
        break;

      case "placeToken": {
        const hex = getHex(state, context.hexId);
        if (hex) hex.token = normalizeTokenId(eff.tokenId);
        break;
      }

      case "revealHex": {
        revealAdjacentHexes(state, context, eff.count ?? 1);
        break;
      }

      case "gainInfluenceHere": {
        const hexId = context.hexId;
        if (hexId && player) {
          const key = String(player.factionId).toLowerCase();
          if (!state.influence[hexId]) state.influence[hexId] = {};
          state.influence[hexId][key] = (state.influence[hexId][key] ?? 0) + (eff.n ?? 0);
          recomputeInfluence(state);
        }
        break;
      }

      case "loseInfluenceHere": {
        const hexId = context.hexId;
        if (hexId && player) {
          const key = String(player.factionId).toLowerCase();
          if (!state.influence[hexId]) state.influence[hexId] = {};
          state.influence[hexId][key] = Math.max(0, (state.influence[hexId][key] ?? 0) - (eff.n ?? 0));
          recomputeInfluence(state);
        }
        break;
      }

      case "reduceOthersInfluenceHere": {
        const hexId = context.hexId;
        if (hexId && player) {
          const key = String(player.factionId).toLowerCase();
          const entries = state.influence[hexId] ?? {};
          for (const other of Object.keys(entries)) {
            if (other === key) continue;
            entries[other] = Math.max(0, (entries[other] ?? 0) - (eff.n ?? 0));
          }
          state.influence[hexId] = entries;
          recomputeInfluence(state);
        }
        break;
      }

      case "spreadInfluenceAdjacent": {
        const hexId = context.hexId;
        if (hexId && player) {
          const key = String(player.factionId).toLowerCase();
          const neighbors = getAdjacentHexes(state, hexId);
          for (const n of neighbors) {
            if (!state.influence[n.id]) state.influence[n.id] = {};
            state.influence[n.id][key] = (state.influence[n.id][key] ?? 0) + (eff.n ?? 0);
          }
          recomputeInfluence(state);
        }
        break;
      }

      case "moveFleet": {
        if (!player) {
          logLine(state, "No active player for movement.");
          ok = false;
          break;
        }
        const selection = context.fleetSelection ?? state.ui.fleetSelection;
        const selectedCount = selection?.fleetIds?.length ?? 0;
        if (!selection?.hexId || selectedCount <= 0) {
          logLine(state, "Select fleets to move.");
          ok = false;
          break;
        }
        const factionId = String(player.factionId).toLowerCase();
        const entry = getHexFleets(state, selection.hexId, factionId);
        const available = entry.undamaged.length + entry.damaged.length;
        if (available < selectedCount) {
          logLine(state, "Not enough fleets in that hex.");
          ok = false;
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!destinationId) {
          logLine(state, "Select a destination hex to move.");
          ok = false;
          break;
        }
        const originId = selection.hexId;
        const adjacent = getAdjacentHexes(state, originId).some(h => h.id === destinationId);
        if (!adjacent) {
          logLine(state, "Destination must be adjacent.");
          ok = false;
          break;
        }
        const movingIds = selection.fleetIds.length > 0 ? selection.fleetIds : [...entry.undamaged, ...entry.damaged];
        moveFleetStack(state, originId, destinationId, factionId, movingIds);
        const destHex = getHex(state, destinationId);
        if (destHex && destHex.token && String(destHex.token).startsWith("capital_")) {
          const visited = ensureVisitedMap(state, player.factionId);
          visited[destinationId] = true;
          recomputeInfluence(state);
          break;
        }
        if (destHex && !destHex.revealed) {
          if (context.rng && context.cardIndex) {
            revealHex(state, context.rng, context.cardIndex, destinationId, { mode: "entry" });
          } else {
            logLine(state, "Cannot reveal: missing RNG/context.");
            ok = false;
          }
        }
        if (destHex?.revealed && destHex?.cardId && destHex.cardFaceUp && destHex.cardChoiceKey && destHex.cardOnEnterEffects) {
          applyEffects(state, destHex.cardOnEnterEffects, { hexId: destinationId, rng: context.rng, cardIndex: context.cardIndex });
        }
        if (destHex?.revealed && destHex?.cardId && destHex.cardAwaitingChoice) {
          state.ui.pending = { cardId: destHex.cardId, hexId: destinationId };
          state.ui.modalType = "card";
          state.ui.mode = "modal";
        }
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destinationId] = true;
        recomputeInfluence(state);
        state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
        if (eff.canEngage !== false) {
          if (state.preventCombatByHex?.[destinationId]) {
            logLine(state, "Combat prevented in this hex.");
            break;
          }
          const enemies = state.players
            .filter(p => String(p.factionId).toLowerCase() !== factionId)
            .filter(p => countFleets(state, destinationId, p.factionId).total > 0)
            .map(p => String(p.factionId).toLowerCase());
          if (enemies.length > 0) {
            initCombat(state, destinationId, factionId, enemies);
          }
        }
        break;
      }

      case "fastDeploy": {
        if (!player) {
          logLine(state, "No active player for deployment.");
          ok = false;
          break;
        }
        const selection = context.fleetSelection ?? state.ui.fleetSelection;
        const selectedCount = selection?.fleetIds?.length ?? 0;
        if (!selection?.hexId || selectedCount <= 0) {
          logLine(state, "Select fleets to move.");
          ok = false;
          break;
        }
        const factionId = String(player.factionId).toLowerCase();
        const entry = getHexFleets(state, selection.hexId, factionId);
        const available = entry.undamaged.length + entry.damaged.length;
        if (available < selectedCount) {
          logLine(state, "Not enough fleets in that hex.");
          ok = false;
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!destinationId) {
          logLine(state, "Select a destination hex.");
          ok = false;
          break;
        }
        const reachable = (() => {
          const first = getAdjacentHexes(state, selection.hexId);
          const second = first.flatMap(h => getAdjacentHexes(state, h.id));
          const ids = new Set([selection.hexId, ...first.map(h => h.id), ...second.map(h => h.id)]);
          return ids.has(destinationId);
        })();
        if (!reachable) {
          logLine(state, "Destination must be within 2 orthogonal steps.");
          ok = false;
          break;
        }
        const enemies = state.players
          .filter(p => String(p.factionId).toLowerCase() !== factionId)
          .filter(p => countFleets(state, destinationId, p.factionId).total > 0);
        if (enemies.length > 0) {
          logLine(state, "Fast Deployment cannot enter enemy-occupied hex.");
          ok = false;
          break;
        }
        const movingIds = selection.fleetIds.length > 0 ? selection.fleetIds : [...entry.undamaged, ...entry.damaged];
        moveFleetStack(state, selection.hexId, destinationId, factionId, movingIds);
        const destHex = getHex(state, destinationId);
        if (destHex && !destHex.revealed) {
          if (context.rng && context.cardIndex) {
            revealHex(state, context.rng, context.cardIndex, destinationId, { mode: "entry" });
          } else {
            logLine(state, "Cannot reveal: missing RNG/context.");
            ok = false;
          }
        }
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destinationId] = true;
        recomputeInfluence(state);
        state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
        break;
      }

      case "peekDeckTop": {
        const deckType = "event";
        const deck = state.decks[deckType];
        if (!deck) {
          logLine(state, `Unknown deck type: ${deckType}.`);
          ok = false;
          break;
        }
        const topId = deck.draw[0];
        if (!topId) {
          logLine(state, `Data Probe: ${deckType} deck is empty.`);
          break;
        }
        const card = context.cardIndex?.[topId];
        const title = card?.front?.title ?? topId;
        logLine(state, `Data Probe: top of ${deckType} is "${title}".`);
        break;
      }

      case "modifyDie": {
        const activeIndex = getActivePlayerIndex(state);
        if (state.turn?.oncePerRound?.probabilityDriftUsed?.[activeIndex]) {
          logLine(state, "Probability Drift already used this round.");
          ok = false;
          break;
        }
        const dieId = context.modifyDie?.die ?? "a";
        const delta = context.modifyDie?.delta ?? eff.delta ?? 1;
        if (!dieId || (delta !== 1 && delta !== -1)) {
          logLine(state, "Choose a die and adjustment (+1 or -1).");
          ok = false;
          break;
        }
        let next = null;
        if (dieId === "bonus") {
          if (state.sharedBonusDie.value == null) {
            logLine(state, "No bonus die to modify.");
            ok = false;
            break;
          }
          next = Math.min(6, Math.max(1, state.sharedBonusDie.value + delta));
          state.sharedBonusDie.value = next;
        } else {
          const dice = state.turn?.dice;
          const used = state.turn?.used;
          if (!dice || dice[dieId] == null || used?.[dieId]) {
            logLine(state, "No die available to modify.");
            ok = false;
            break;
          }
          next = Math.min(6, Math.max(1, dice[dieId] + delta));
          dice[dieId] = next;
        }
        state.turn.oncePerRound.probabilityDriftUsed[activeIndex] = true;
        logLine(state, `Probability Drift: die ${dieId.toUpperCase()} is now ${next}.`);
        break;
      }

      case "repairFleet": {
        if (!player) {
          logLine(state, "No active player for repair.");
          ok = false;
          break;
        }
        const factionId = String(player.factionId).toLowerCase();
        const targetHex = context.selectedHexId ?? state.ui.selectedHexId ?? state.ui.fleetSelection?.hexId;
        if (!targetHex) {
          logLine(state, "Select a hex with damaged fleets.");
          ok = false;
          break;
        }
        repairFleetInHex(state, targetHex, factionId);
        break;
      }

      case "placeTokenAdjacent": {
        const factionId = String(player?.factionId ?? "").toLowerCase();
        const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[factionId]);
        const originId = state.ui.fleetSelection?.hexId ??
          (state.ui.selectedHexId && fleetHexes.includes(state.ui.selectedHexId) ? state.ui.selectedHexId : fleetHexes[0]);
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!originId || !destinationId) {
          logLine(state, "Select an adjacent hex for token placement.");
          ok = false;
          break;
        }
        const adjacent = getAdjacentHexes(state, originId).some(h => h.id === destinationId);
        if (!adjacent) {
          logLine(state, "Destination must be adjacent.");
          ok = false;
          break;
        }
        const hex = getHex(state, destinationId);
        if (hex) hex.token = normalizeTokenId(eff.tokenId);
        break;
      }

      case "forwardDeploy": {
        if (!player) {
          logLine(state, "No active player for forward deploy.");
          ok = false;
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!destinationId) {
          logLine(state, "Select a system hex.");
          ok = false;
          break;
        }
        const hex = getHex(state, destinationId);
        const factionId = String(player.factionId).toLowerCase();
        if (!hex || hex.cardKind !== "system" || !hex.cardId) {
          logLine(state, "Forward Deploy requires a system hex.");
          ok = false;
          break;
        }
        if (state.contestedByHex?.[destinationId]) {
          logLine(state, "System is contested.");
          ok = false;
          break;
        }
        if (state.controllerByHex?.[destinationId] !== factionId) {
          logLine(state, "You do not control that system.");
          ok = false;
          break;
        }
        const fid = createFleet(state, factionId);
        addFleetToHex(state, destinationId, factionId, "undamaged", fid);
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destinationId] = true;
        recomputeInfluence(state);
        logLine(state, `Forward deployed at ${destinationId}.`);
        break;
      }

      case "recruitFleetCapital": {
        if (!player) {
          logLine(state, "No active player for recruit.");
          ok = false;
          break;
        }
        const capital = getCapitalHex(player.factionId);
        if (!capital) {
          logLine(state, "No capital found.");
          ok = false;
          break;
        }
        const factionId = String(player.factionId).toLowerCase();
        const fid = createFleet(state, factionId);
        addFleetToHex(state, capital, factionId, "undamaged", fid);
        const visited = ensureVisitedMap(state, player.factionId);
        visited[capital] = true;
        recomputeInfluence(state);
        logLine(state, `Fleet +1 at ${capital}.`);
        state.ui.pulseHexId = capital;
        break;
      }

      case "activateSystem": {
        if (!player) {
          logLine(state, "No active player for system activation.");
          ok = false;
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        const result = activateCellCard(state, destinationId, player.factionId);
        if (!result.ok) {
          ok = false;
        }
        break;
      }

      case "activateCellCard": {
        if (!player) break;
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        const result = activateCellCard(state, destinationId, player.factionId);
        if (!result.ok) ok = false;
        break;
      }

      case "takeToHand": {
        if (!player) break;
        const key = String(player.factionId).toLowerCase();
        const cardId = eff.cardId ?? context.cardId ?? "unknown";
        const result = addHandCard(state, key, {
          cardId,
          category: eff.category ?? "asset",
          faceDown: !!eff.faceDown,
          tapped: !!eff.tappable,
          meta: eff.meta ?? {}
        });
        if (!result.ok) ok = false;
        break;
      }

      case "discardCard": {
        if (!player) break;
        const key = String(player.factionId).toLowerCase();
        const hand = ensureHand(state, key);
        const idx = hand.findIndex(c => (eff.cardId ? c.cardId === eff.cardId : true));
        if (idx < 0) break;
        const card = hand[idx];
        if (card.category === "doom" && !eff.allowDoom) {
          logLine(state, "Doom cards cannot be discarded.");
          break;
        }
        hand.splice(idx, 1);
        break;
      }

      case "cashOutCard": {
        if (!player) break;
        const key = String(player.factionId).toLowerCase();
        const hand = ensureHand(state, key);
        const idx = hand.findIndex(c => c.cardId === eff.cardId);
        if (idx < 0) break;
        const card = hand[idx];
        if (card.tapped) {
          logLine(state, "Card already tapped.");
          break;
        }
        const credits = card.meta?.cashOut?.credits ?? 0;
        const energy = card.meta?.cashOut?.energy ?? 0;
        player.credits += credits;
        player.energy += energy;
        hand.splice(idx, 1);
        break;
      }

      case "addSpecialResource": {
        if (!player) break;
        const key = String(player.factionId).toLowerCase();
        const stash = ensureSpecialResources(state, key);
        if (SPECIAL_RESOURCE_TYPES.includes(eff.type)) {
          stash.push({ type: eff.type, id: eff.id ?? `${eff.type}-${stash.length + 1}` });
        }
        break;
      }

      case "discardDoom": {
        const target = eff.targetFactionId ?? player?.factionId;
        if (!target) break;
        const key = String(target).toLowerCase();
        const hand = ensureHand(state, key);
        const idx = hand.findIndex(c => c.category === "doom" && (!eff.cardId || c.cardId === eff.cardId));
        if (idx >= 0) hand.splice(idx, 1);
        break;
      }

      case "offerAgreement": {
        if (!player) break;
        state.ui.pendingAgreement = {
          fromFactionId: String(player.factionId).toLowerCase(),
          toFactionId: String(eff.toFactionId ?? "").toLowerCase(),
          agreementTypeId: eff.agreementTypeId ?? null
        };
        state.ui.modalType = "agreement";
        state.ui.mode = "modal";
        break;
      }

      case "breakAgreement": {
        const idx = state.agreements.findIndex(a => a.id === eff.agreementId);
        if (idx >= 0) {
          const agreement = state.agreements[idx];
          agreement.active = false;
          logLine(state, `Agreement ${agreement.id} broken.`);
        }
        break;
      }

      case "grantBonusToken": {
        const key = String(player?.factionId ?? "").toLowerCase();
        if (!key) break;
        if (!state.bonusTokensByFaction[key]) state.bonusTokensByFaction[key] = { silver: 0, gold: 0 };
        state.bonusTokensByFaction[key][eff.kind] = (state.bonusTokensByFaction[key][eff.kind] ?? 0) + (eff.amount ?? 1);
        break;
      }

      case "modifyTension": {
        applyTensionDelta(state, eff.n ?? 0);
        break;
      }

      case "reduceTension": {
        const costCredits = eff.cost?.credits ?? 0;
        const costEnergy = eff.cost?.energy ?? 0;
        if (player) {
          if ((player.credits ?? 0) < costCredits || (player.energy ?? 0) < costEnergy) {
            logLine(state, "Not enough resources to reduce tension.");
            ok = false;
            break;
          }
          player.credits -= costCredits;
          player.energy -= costEnergy;
        }
        applyTensionDelta(state, -(eff.n ?? 0));
        break;
      }

      case "initiateCombat": {
        const hexId = eff.hexId ?? context.hexId;
        if (!hexId || !player) break;
        const enemies = eff.targets ?? state.players
          .filter(p => String(p.factionId).toLowerCase() !== String(player.factionId).toLowerCase())
          .filter(p => countFleets(state, hexId, p.factionId).total > 0)
          .map(p => String(p.factionId).toLowerCase());
        if (enemies.length > 0) initCombat(state, hexId, String(player.factionId).toLowerCase(), enemies);
        break;
      }

      case "preventCombat": {
        const hexId = eff.hexId ?? context.hexId;
        if (!hexId) break;
        if (!state.preventCombatByHex) state.preventCombatByHex = {};
        state.preventCombatByHex[hexId] = eff.until ?? "endOfTurn";
        break;
      }
      default:
        if (context?.strict) {
          throw new Error(`Unknown effect op: ${eff.op}`);
        }
        logLine(state, `Unknown effect op: ${eff.op}`);
        break;
    }
  }

  const after = snapshotState(state);
  return { before, after, ok };
}

export function snapshotState(state) {
  const player = getActivePlayer(state);
  const totalFleets = Object.values(state.fleetsByHex ?? {}).reduce((s, v) => {
    const entry = v[String(player?.factionId ?? "").toLowerCase()];
    return s + (entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0);
  }, 0);
  return {
    credits: player?.credits ?? 0,
    energy: player?.energy ?? 0,
    fleets: totalFleets,
    cosmicTension: state.cosmicTension
  };
}

export function didStateChange(a, b) {
  return a.credits !== b.credits ||
    a.energy !== b.energy ||
    a.fleets !== b.fleets ||
    a.cosmicTension !== b.cosmicTension;
}

export function getHex(state, hexId) {
  return state.map.hexes.find(h => h.id === hexId) ?? null;
}

export function getAdjacentHexes(state, hexId) {
  const hex = getHex(state, hexId);
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
}

export function revealHex(state, rng, cardIndex, hexId, { mode = "entry" } = {}) {
  const hex = getHex(state, hexId);
  if (!hex) return null;

  if (hex.token && String(hex.token).startsWith("capital_")) {
    return null;
  }

  hex.revealed = true;
  const active = getActivePlayer(state);
  if (active) {
    const visited = ensureVisitedMap(state, active.factionId);
    visited[hexId] = true;
  }

  const card = drawCard(state, "event", cardIndex, rng);
  if (!card) {
    logLine(state, "No event cards available.");
    return null;
  }

  hex.cardId = card.id;
  hex.cardKind = card.kind;
  hex.cardFaceUp = true;
  hex.cardChoiceKey = null;
  hex.cardAwaitingChoice = true;
  hex.cardOnEnterEffects = null;

  if (mode === "entry") {
    state.ui.pending = { cardId: card.id, hexId };
    state.ui.modalType = "card";
    state.ui.mode = "modal";
  } else {
    const defaultKey = card.front?.defaultChoiceKey ?? card.front?.options?.[0]?.key ?? null;
    const defaultPayload = defaultKey ? card.back?.byChoice?.[defaultKey] : null;
    if (defaultPayload?.resolveOnReveal) {
      hex.cardChoiceKey = defaultKey;
      hex.cardAwaitingChoice = false;
      hex.cardOnEnterEffects = defaultPayload?.cellCard?.onEnterEffects ?? [];
      applyEffects(state, defaultPayload.resolution ?? [], { hexId, rng, cardIndex });
      applyCardFate(state, hexId, card, defaultKey);
    }
  }
  logLine(state, `Event revealed: ${card.front?.title ?? card.id}`);
  recomputeInfluence(state);
  return state.ui.pending;
}

export function resolveChoice(state, cardIndex, choiceKey) {
  const pending = state.ui.pending;
  if (!pending) return { ok: false, reason: "No pending card." };

  const { cardId, hexId } = pending;
  const card = cardIndex?.[cardId];
  if (!card) return { ok: false, reason: "Missing card." };
  const choice = card.front?.options?.find(opt => opt.key === choiceKey);
  if (!choice) return { ok: false, reason: "Invalid choice." };
  const hex = getHex(state, hexId);
  if (!hex) return { ok: false, reason: "Missing hex." };
  const payload = card.back?.byChoice?.[choiceKey];
  if (!payload) return { ok: false, reason: "Missing choice payload." };

  hex.cardId = card.id;
  hex.cardChoiceKey = choiceKey;
  hex.cardFaceUp = true;
  hex.cardAwaitingChoice = false;
  hex.cardOnEnterEffects = payload?.cellCard?.onEnterEffects ?? [];

  const context = { hexId, rng: null, cardIndex, cardId: card.id };
  const res = applyEffects(state, payload.resolution ?? [], context);
  applyCardFate(state, hexId, card, choiceKey);

  logLine(state, `Chose: ${choice.label} → ${card.back?.title ?? "Resolution"}`);

  state.ui.lastResolution = {
    deckType: "event",
    cardId: card.id,
    cardTitle: card.back?.title ?? card.front?.title ?? card.id,
    choiceLabel: choice.label,
    resolveText: card.back?.rulesText ?? "",
    tokenId: hex?.token ?? null,
    placeNote: payload.cardFate?.type ?? "discard"
  };
  state.ui.pending = null;
  state.ui.modalType = null;
  state.ui.mode = "idle";

  return { ok: true, cardId: card.id, deckType: "event", choiceLabel: choice.label, tokenId: hex?.token ?? null, stateChanged: didStateChange(res.before, res.after) };
}

function applyCardFate(state, hexId, card, choiceKey) {
  const payload = card.back?.byChoice?.[choiceKey];
  if (!payload) return;
  const fate = payload.cardFate ?? { type: "discard" };
  const hex = getHex(state, hexId);
  if (!hex) return;

  if (fate.type === "leaveInCell") {
    hex.cardId = card.id;
    hex.cardKind = card.kind;
    hex.cardFaceUp = true;
    hex.cardChoiceKey = choiceKey;
    hex.cardAwaitingChoice = false;
    hex.cardOnEnterEffects = payload.cellCard?.onEnterEffects ?? [];
  } else if (fate.type === "toHand") {
    const active = getActivePlayer(state);
    if (active) {
      addHandCard(state, active.factionId, {
        cardId: card.id,
        category: fate.category ?? "asset",
        faceDown: !!fate.faceDown,
        tapped: !!fate.tappable,
        meta: {
          activation: payload.handCard?.activation ?? null,
          cashOut: payload.handCard?.cashOut ?? null
        }
      });
    }
    hex.cardId = null;
    hex.cardChoiceKey = null;
    hex.cardAwaitingChoice = false;
    hex.cardOnEnterEffects = null;
  } else if (fate.type === "toSpecialResourceStash") {
    const active = getActivePlayer(state);
    if (active && fate.resourceType) {
      const stash = ensureSpecialResources(state, active.factionId);
      stash.push({ type: fate.resourceType, id: `${fate.resourceType}-${stash.length + 1}` });
    }
    hex.cardId = null;
    hex.cardChoiceKey = null;
    hex.cardAwaitingChoice = false;
    hex.cardOnEnterEffects = null;
  } else {
    hex.cardId = null;
    hex.cardChoiceKey = null;
    hex.cardAwaitingChoice = false;
    hex.cardOnEnterEffects = null;
  }
  if (fate.type === "discard") {
    state.decks.event.discard.push(card.id);
  }
}

export function activateCellCard(state, hexId, byFactionId) {
  if (!hexId) return { ok: false, reason: "Missing hex." };
  const hex = getHex(state, hexId);
  if (!hex?.cardId || !hex.cardChoiceKey) return { ok: false, reason: "No cell card." };
  const card = state.ui.cardIndex?.[hex.cardId];
  if (!card) return { ok: false, reason: "Missing card data." };
  const payload = card.back?.byChoice?.[hex.cardChoiceKey];
  const activation = payload?.cellCard?.activation;
  if (!activation) return { ok: false, reason: "No activation." };
  const rank = getFactionRankInHex(state, hexId, byFactionId);
  if (!rank) return { ok: false, reason: "Not eligible." };
  if (state.turn?.systemActivated?.includes(hexId)) {
    return { ok: false, reason: "Already activated." };
  }

  const threshold = activation.threshold ?? 0;
  const cost = activation.cost ?? { credits: 0, energy: 0 };
  const player = state.players.find(p => String(p.factionId).toLowerCase() === String(byFactionId).toLowerCase());
  if (player && threshold >= 7) {
    if ((player.credits ?? 0) < (cost.credits ?? 0) || (player.energy ?? 0) < (cost.energy ?? 0)) {
      return { ok: false, reason: "Not enough resources." };
    }
    player.credits -= cost.credits ?? 0;
    player.energy -= cost.energy ?? 0;
  }

  const effects = rank === 1 ? (activation.controllerEffects ?? []) : (activation.secondaryEffects ?? []);
  applyEffects(state, effects, { hexId, cardId: card.id, actorFactionId: byFactionId });
  state.turn.systemActivated.push(hexId);
  logLine(state, `Cell activated at ${hexId} by ${byFactionId}.`);
  return { ok: true };
}
export function executeActionNumber(state, rng, cardIndex, actionNumber, selectedHexId = null) {
  const activePlayer = getActivePlayer(state);
  if (!activePlayer) return { ok: false, reason: "No active player." };

  const factionId = String(activePlayer.factionId ?? "").toLowerCase();
  const actions = state.actionsByFaction?.[factionId];
  if (!actions) {
    logLine(state, `No actions found for factionId="${factionId}". Check actions.json keys.`);
    return { ok: false, reason: "Missing actions." };
  }

  const action = actions[String(actionNumber)];
  if (!action) {
    logLine(state, `Action #${actionNumber} not found for ${factionId}.`);
    return { ok: false, reason: "Missing action." };
  }

  if (actionRequiresResources(Number(actionNumber), action)) {
    const credits = action.cost?.credits ?? 0;
    const energy = action.cost?.energy ?? 0;
    if ((activePlayer.credits ?? 0) < credits || (activePlayer.energy ?? 0) < energy) {
      logLine(state, "Not enough resources for this action.");
      return { ok: false, reason: "Missing resources." };
    }
    activePlayer.credits -= credits;
    activePlayer.energy -= energy;
  }

  if (action.requiresTarget && !selectedHexId) {
    logLine(state, "Select a target hex.");
    return { ok: false, reason: "Needs target.", needsTarget: true };
  }

  const fallbackHex = state.ui.fleetSelection?.hexId ??
    state.ui.selectedHexId ??
    Object.keys(activePlayer.fleetsByHex ?? {})[0] ??
    null;
  const context = {
    hexId: fallbackHex,
    selectedHexId: selectedHexId ?? undefined,
    selectedDeckType: state.ui.selectedDeckType ?? "event",
    modifyDie: state.ui.modifyDie,
    fleetSelection: state.ui.fleetSelection,
    rng,
    cardIndex
  };

  const result = applyEffects(state, action.effects ?? [], context);
  if (!result.ok) return { ok: false, reason: "Action failed." };

  logLine(state, `ACTION: ${factionId} #${actionNumber} ${action.name ?? "Action"}`);
  return { ok: true, actionNumber };
}

export function revealAdjacentHexes(state, context, count) {
  const candidates = getAdjacentHexes(state, context.hexId);

  let revealed = 0;
  const active = getActivePlayer(state);
  for (const neighbor of candidates) {
    if (revealed >= count) break;
    if (neighbor && !neighbor.revealed) {
      revealHex(state, context.rng, context.cardIndex, neighbor.id, { mode: "scan" });
      if (active) {
        const visited = ensureVisitedMap(state, active.factionId);
        visited[neighbor.id] = true;
      }
      revealed += 1;
    }
  }
  if (revealed > 0) {
    logLine(state, `Scan revealed ${revealed} adjacent hex(es).`);
    recomputeInfluence(state);
  }
}
