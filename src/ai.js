import { computeAvailableActions, countFleets, getHexesWithinRange } from "./rules.js";

function getAdjacentHexIds(state, hexId) {
  const hex = state.map.hexes.find(h => h.id === hexId);
  if (!hex) return [];
  const candidates = [
    { c: hex.col, r: hex.row - 1 },
    { c: hex.col, r: hex.row + 1 },
    { c: hex.col - 1, r: hex.row },
    { c: hex.col + 1, r: hex.row }
  ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);
  return candidates.map(p => state.map.hexes.find(h => h.col === p.c && h.row === p.r)).filter(Boolean).map(h => h.id);
}

function factionPriority(factionId) {
  switch (factionId) {
    case "directorate": return { expand: 5, resource: 4, recruit: 3, scan: 2, special: 3 };
    case "choir":       return { expand: 3, resource: 3, recruit: 2, scan: 5, special: 4 };
    case "bloom":       return { expand: 4, resource: 3, recruit: 4, scan: 2, special: 5 };
    case "salvagers":   return { expand: 3, resource: 5, recruit: 3, scan: 2, special: 4 };
    case "gatekeepers": return { expand: 4, resource: 3, recruit: 3, scan: 3, special: 5 };
    case "syndicate":   return { expand: 3, resource: 5, recruit: 2, scan: 3, special: 4 };
    default:            return { expand: 3, resource: 3, recruit: 3, scan: 3, special: 3 };
  }
}

function categorizeAction(actionDef) {
  const ops = (actionDef?.effects ?? []).map(e => e.op);
  if (ops.includes("fastDeploy") || ops.includes("moveFleet") || ops.includes("relayMove")) return "expand";
  if (ops.includes("gainResource") || ops.includes("gainCreditsFromControlled") ||
      ops.includes("gainCreditsFromBiomass") || ops.includes("gainCreditsFromDebris") ||
      ops.includes("gainFromTradeRoute") || ops.includes("salvageFromHex") ||
      ops.includes("activateSystem")) return "resource";
  if (ops.includes("recruitFleetCapital") || ops.includes("forwardDeploy") || ops.includes("gainFleet")) return "recruit";
  if (ops.includes("revealHex") || ops.includes("peekDeckTop")) return "scan";
  return "special";
}

function scoreAction(actionNumber, actionDef, factionId, state) {
  const prio = factionPriority(factionId);
  const cat = categorizeAction(actionDef);
  let score = (prio[cat] ?? 3) * 10;

  const num = Number(actionNumber);
  if (num <= 6) score += 2;

  if (cat === "resource") {
    const player = state.players.find(p => String(p.factionId).toLowerCase() === factionId);
    if ((player?.credits ?? 0) < 3 || (player?.energy ?? 0) < 3) score += 5;
  }

  if (cat === "recruit") {
    const totalFleets = Object.values(state.fleetsByHex ?? {}).reduce((s, v) => {
      const e = v[factionId];
      return s + (e?.undamaged?.length ?? 0) + (e?.damaged?.length ?? 0);
    }, 0);
    if (totalFleets < 3) score += 8;
  }

  if (cat === "scan") {
    const unrevealedAdj = Object.keys(state.fleetsByHex ?? {})
      .filter(h => state.fleetsByHex[h]?.[factionId])
      .flatMap(h => getAdjacentHexIds(state, h))
      .filter(h => !state.map.hexes.find(hx => hx.id === h)?.revealed);
    if (unrevealedAdj.length > 0) score += 5;
  }

  if (!actionDef?.requiresTarget) score += 3;

  return score;
}

export function aiPickAction(state) {
  const active = state.players[state.turn.activePlayerIndex];
  const factionId = String(active.factionId).toLowerCase();
  const actions = state.actionsByFaction?.[factionId];
  if (!actions) return null;

  const available = computeAvailableActions(state);
  let best = null;
  let bestScore = -1;

  for (const [num, opts] of Object.entries(available)) {
    if (!Array.isArray(opts) || opts.length === 0) continue;
    const actionDef = actions[num];
    if (!actionDef) continue;
    const s = scoreAction(num, actionDef, factionId, state);
    if (s > bestScore) {
      bestScore = s;
      best = { actionNumber: num, consume: opts[0].consume, actionDef, label: opts[0].label };
    }
  }
  return best;
}

export function aiPickTargetHex(state) {
  const active = state.players[state.turn.activePlayerIndex];
  const factionId = String(active.factionId).toLowerCase();
  const actionDef = state.ui.pendingAction?.actionDef;
  if (!actionDef) return null;

  const ops = (actionDef.effects ?? []).map(e => e.op);
  const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[factionId]);

  if (ops.includes("fastDeploy") || ops.includes("moveFleet")) {
    if (fleetHexes.length === 0) return null;
    const originHex = fleetHexes[0];
    const range = actionDef.effects.find(e => e.op === "fastDeploy")?.range ?? 1;
    const reachable = getHexesWithinRange(state, originHex, range).map(h => h.id);
    const unvisited = reachable.filter(h => !state.visited?.[factionId]?.[h]);
    const unrevealed = reachable.filter(h => !state.map.hexes.find(hx => hx.id === h)?.revealed);
    return { originHex, targetHex: unrevealed[0] ?? unvisited[0] ?? reachable[1] ?? reachable[0] };
  }

  if (ops.includes("relayMove")) {
    const beaconHexes = Object.keys(state.beaconsByHex ?? {}).filter(h => state.beaconsByHex[h] === factionId);
    if (fleetHexes.length === 0 || beaconHexes.length < 2) return null;
    const origin = fleetHexes.find(h => beaconHexes.includes(h));
    const target = beaconHexes.find(h => h !== origin);
    return origin && target ? { originHex: origin, targetHex: target } : null;
  }

  if (ops.includes("revealHex")) {
    const range = actionDef.effects.find(e => e.op === "revealHex")?.range ?? 1;
    const count = actionDef.effects.find(e => e.op === "revealHex")?.count ?? 1;
    if (range > 1) {
      for (const fh of fleetHexes) {
        const inRange = getHexesWithinRange(state, fh, range).map(h => h.id);
        const unrevealed = inRange.filter(h => !state.map.hexes.find(hx => hx.id === h)?.revealed);
        if (unrevealed.length > 0) return { targetHex: unrevealed[0] };
      }
    }
    if (count > 1) {
      return fleetHexes.length > 0 ? { targetHex: fleetHexes[0] } : null;
    }
    for (const fh of fleetHexes) {
      const adj = getAdjacentHexIds(state, fh);
      const unrevealed = adj.filter(h => !state.map.hexes.find(hx => hx.id === h)?.revealed);
      if (unrevealed.length > 0) return { targetHex: unrevealed[0] };
      if (adj.length > 0) return { targetHex: adj[0] };
    }
    return null;
  }

  if (ops.includes("forwardDeploy") || ops.includes("activateSystem")) {
    const controlled = state.map.hexes.filter(h =>
      h.type === "system" &&
      state.controllerByHex?.[h.id] === factionId &&
      !state.contestedByHex?.[h.id] &&
      (!ops.includes("activateSystem") || !state.turn?.systemActivated?.includes(h.id))
    );
    return controlled.length > 0 ? { targetHex: controlled[0].id } : null;
  }

  if (ops.includes("repairFleet")) {
    const damaged = fleetHexes.filter(h => (state.fleetsByHex[h]?.[factionId]?.damaged?.length ?? 0) > 0);
    return damaged.length > 0 ? { targetHex: damaged[0] } : null;
  }

  if (ops.includes("placeOutpost") || ops.includes("placeDebris") || ops.includes("placeBeacon")) {
    return fleetHexes.length > 0 ? { targetHex: fleetHexes[0] } : null;
  }

  if (ops.includes("placeTokenAdjacent")) {
    for (const fh of fleetHexes) {
      const adj = getAdjacentHexIds(state, fh);
      if (adj.length > 0) return { targetHex: adj[0] };
    }
    return null;
  }

  if (ops.includes("placeTradeRoute")) {
    for (const fh of fleetHexes) {
      const adj = getAdjacentHexIds(state, fh);
      const controlled = adj.filter(h =>
        state.controllerByHex?.[h] === factionId && !state.contestedByHex?.[h]
      );
      if (controlled.length > 0) return { targetHex: controlled[0] };
    }
    return null;
  }

  return fleetHexes.length > 0 ? { targetHex: fleetHexes[0] } : null;
}

export function aiPickCardChoice(state) {
  const pending = state.ui.pending;
  if (!pending?.card?.choices) return 0;
  const choices = pending.card.choices;
  let bestIdx = 0;
  let bestValue = -Infinity;
  choices.forEach((ch, idx) => {
    let value = 0;
    for (const eff of ch.effects ?? []) {
      if (eff.op === "gainResource") value += (eff.amount ?? 1) * 3;
      if (eff.op === "gainFleet") value += (eff.amount ?? 1) * 5;
      if (eff.op === "loseResource") value -= (eff.amount ?? 1) * 3;
      if (eff.op === "loseFleet") value -= (eff.amount ?? 1) * 5;
      if (eff.op === "modifyCosmicTension" && (eff.amount ?? 0) > 0) value -= 2;
      if (eff.op === "placeToken") value += 2;
    }
    if (value > bestValue) { bestValue = value; bestIdx = idx; }
  });
  return bestIdx;
}

export function aiShouldContinueCombat(state) {
  const combat = state.ui.combat;
  if (!combat) return false;
  const attackerTotal = combat.attackerFactions.reduce((s, f) => s + countFleets(state, combat.hexId, f).total, 0);
  const defenderTotal = combat.engagedFactions.reduce((s, f) => s + countFleets(state, combat.hexId, f).total, 0);
  return attackerTotal > defenderTotal;
}

export function isAIPlayer(state, playerIndex) {
  return !!state.players[playerIndex]?.isAI;
}

export function isCurrentPlayerAI(state) {
  return isAIPlayer(state, state.turn.activePlayerIndex);
}
