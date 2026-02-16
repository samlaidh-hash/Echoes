const HAND_LIMIT = 5;

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
    const key = String(Math.min(12, Math.max(1, number)));
    if (!optionsByNumber[key]) optionsByNumber[key] = [];
    optionsByNumber[key].push(option);
  };

  const aAvailable = dice.a != null && !used?.a;
  const bAvailable = dice.b != null && !used?.b;
  const bonusAvailable = dice.bonus != null && !used?.bonus;

  // Roll 2d6: combinations are A, B, A+B, A & Bonus, B & Bonus, A+Bonus, B+Bonus.
  if (aAvailable) addOption(dice.a, { label: "A", consume: { a: true } });
  if (bAvailable) addOption(dice.b, { label: "B", consume: { b: true } });
  if (aAvailable && bAvailable) addOption(dice.a + dice.b, { label: "A+B", consume: { a: true, b: true } });

  if (bonusAvailable) {
    addOption(dice.bonus, { label: "Bonus", consume: { bonus: true } });
    if (aAvailable) addOption(dice.a + dice.bonus, { label: "A+Bonus", consume: { a: true, bonus: true } });
    if (bAvailable) addOption(dice.b + dice.bonus, { label: "B+Bonus", consume: { b: true, bonus: true } });
  }

  return optionsByNumber;
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

  // Add influence bonuses (Directorate outposts, addInfluence effects)
  for (const hex of state.map.hexes) {
    const bonusMap = state.influenceBonusByHex?.[hex.id];
    if (bonusMap) {
      for (const [fid, amt] of Object.entries(bonusMap)) {
        base[hex.id][fid] = (base[hex.id][fid] ?? 0) + amt;
      }
    }
    const outpostFaction = state.outpostByHex?.[hex.id];
    if (outpostFaction) {
      base[hex.id][outpostFaction] = (base[hex.id][outpostFaction] ?? 0) + 2;
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
  const player = getActivePlayer(state);
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

      case "gainResource":
        if (player) player[eff.resource] = (player[eff.resource] ?? 0) + (eff.amount ?? 0);
        break;

      case "gainCreditsFromControlled": {
        if (!player) break;
        const factionId = String(player.factionId ?? "").toLowerCase();
        let amount = state.map.hexes.filter(h =>
          h.type === "system" && state.controllerByHex?.[h.id] === factionId && !state.contestedByHex?.[h.id]
        ).length;
        if (eff.includeOutposts) {
          const outposts = Object.entries(state.outpostByHex ?? {}).filter(([, fid]) => fid === factionId).length;
          amount += outposts;
        }
        if (eff.includeBiomass) {
          const biomass = state.map.hexes.filter(h =>
            h.token === "biomass" && state.controllerByHex?.[h.id] === factionId && !state.contestedByHex?.[h.id]
          ).length;
          amount += biomass;
        }
        if (eff.includeTradeRoutes) {
          const edges = (state.tradeRouteEdges ?? []).filter(e => e.factionId === factionId).length;
          amount += edges;
        }
        amount = Math.max(1, amount);
        player.credits = (player.credits ?? 0) + amount;
        logLine(state, `Gained ${amount} credits.`);
        break;
      }

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
        state.cosmicTension = Math.max(0, (state.cosmicTension ?? 0) + (eff.amount ?? 0));
        break;

      case "addInfluence": {
        if (!player) break;
        const targetId = context.selectedHexId ?? state.ui?.selectedHexId;
        if (!targetId) break;
        const factionId = String(player.factionId).toLowerCase();
        if (!state.influenceBonusByHex) state.influenceBonusByHex = {};
        if (!state.influenceBonusByHex[targetId]) state.influenceBonusByHex[targetId] = {};
        const amt = eff.amount ?? 1;
        state.influenceBonusByHex[targetId][factionId] = (state.influenceBonusByHex[targetId][factionId] ?? 0) + amt;
        logLine(state, `+${amt} influence at ${targetId}.`);
        recomputeInfluence(state);
        break;
      }

      case "placeOutpost": {
        if (!player) {
          logLine(state, "No active player for outpost.");
          ok = false;
          break;
        }
        const targetId = context.selectedHexId ?? state.ui?.selectedHexId;
        if (!targetId) {
          logLine(state, "Select a hex with your fleet.");
          ok = false;
          break;
        }
        const factionId = String(player.factionId).toLowerCase();
        const entry = state.fleetsByHex?.[targetId]?.[factionId];
        const fleetCount = (entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0);
        if (fleetCount <= 0) {
          logLine(state, "You need a fleet in that hex to establish an outpost.");
          ok = false;
          break;
        }
        if (!state.outpostByHex) state.outpostByHex = {};
        state.outpostByHex[targetId] = factionId;
        const hex = getHex(state, targetId);
        if (hex) hex.token = "outpost";
        logLine(state, `Outpost established at ${targetId}.`);
        recomputeInfluence(state);
        state.ui.pulseHexId = targetId;
        break;
      }

      case "placeToken": {
        let hexId = context.hexId;
        if (!hexId && player) {
          const fid = String(player.factionId ?? "").toLowerCase();
          hexId = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[fid]);
        }
        const hex = getHex(state, hexId);
        if (hex) hex.token = normalizeTokenId(eff.tokenId);
        break;
      }

      case "placeDebris": {
        if (!player) break;
        const fid = String(player.factionId ?? "").toLowerCase();
        const hexId = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[fid]);
        const hex = getHex(state, hexId);
        if (hex && hexId) {
          hex.token = "debris_field";
          logLine(state, `Debris placed at ${hexId}.`);
        }
        break;
      }

      case "salvageFromHex":
      case "gainCreditsFromDebris": {
        if (!player) break;
        const fid = String(player.factionId ?? "").toLowerCase();
        const fleetHexes = new Set(Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[fid]));
        let count = 0;
        for (const hex of state.map.hexes) {
          if (hex.token !== "debris_field" && hex.token !== "derelict") continue;
          const controlled = state.controllerByHex?.[hex.id] === fid && !state.contestedByHex?.[hex.id];
          const adjacent = getAdjacentHexes(state, hex.id).some(h => fleetHexes.has(h.id));
          if (controlled || adjacent) count += 1;
        }
        count = Math.max(1, count);
        player.credits = (player.credits ?? 0) + count;
        logLine(state, `Salvage: +${count} credits from debris.`);
        break;
      }

      case "placeBeacon": {
        if (!player) break;
        const fid = String(player.factionId ?? "").toLowerCase();
        const hexId = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[fid]);
        const hex = getHex(state, hexId);
        if (hex && hexId) {
          if (!state.beaconsByHex) state.beaconsByHex = {};
          state.beaconsByHex[hexId] = fid;
          if (!hex.token || !String(hex.token).startsWith("capital_")) hex.token = "beacon";
          logLine(state, `Beacon placed at ${hexId}.`);
        }
        break;
      }

      case "relayMove": {
        if (!player) break;
        const selection = context.fleetSelection ?? state.ui.fleetSelection;
        const destId = context.selectedHexId ?? state.ui.selectedHexId;
        const fid = String(player.factionId ?? "").toLowerCase();
        if (!selection?.hexId || !destId) {
          logLine(state, "Select fleets and a beacon destination.");
          ok = false;
          break;
        }
        const destBeacon = state.beaconsByHex?.[destId];
        const srcBeacon = state.beaconsByHex?.[selection.hexId];
        if (destBeacon !== fid || !srcBeacon) {
          logLine(state, "Relay: destination must be your beacon. Beacon-to-beacon only.");
          ok = false;
          break;
        }
        const entry = getHexFleets(state, selection.hexId, fid);
        const movingIds = selection.fleetIds?.length ? selection.fleetIds : [...entry.undamaged, ...entry.damaged];
        moveFleetStack(state, selection.hexId, destId, fid, movingIds);
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destId] = true;
        recomputeInfluence(state);
        state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
        logLine(state, `Relay jump to ${destId}.`);
        break;
      }

      case "placeTradeRoute": {
        if (!player) break;
        const fid = String(player.factionId ?? "").toLowerCase();
        const fleetHex = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[fid]);
        const hexB = context.selectedHexId ?? state.ui?.selectedHexId;
        const hexA = fleetHex ?? hexB;
        if (!hexA || !hexB) {
          logLine(state, "Select an adjacent hex you control for trade route edge.");
          ok = false;
          break;
        }
        const adj = getAdjacentHexes(state, hexA).some(h => h.id === hexB);
        if (!adj) {
          logLine(state, "Hex must be adjacent to your fleet.");
          ok = false;
          break;
        }
        if (state.controllerByHex?.[hexA] !== fid || state.controllerByHex?.[hexB] !== fid) {
          logLine(state, "You must control both hexes.");
          ok = false;
          break;
        }
        if (!state.tradeRouteEdges) state.tradeRouteEdges = [];
        if (state.tradeRouteEdges.some(e => (e.hexA === hexA && e.hexB === hexB) || (e.hexA === hexB && e.hexB === hexA))) {
          logLine(state, "Trade route already on this edge.");
          break;
        }
        state.tradeRouteEdges.push({ hexA, hexB, factionId: fid });
        logLine(state, `Trade route established ${hexA}-${hexB}.`);
        break;
      }

      case "gainFromTradeRoute": {
        if (!player) break;
        const fid = String(player.factionId ?? "").toLowerCase();
        const edges = (state.tradeRouteEdges ?? []).filter(e => e.factionId === fid).length;
        const amount = Math.max(1, edges);
        player.credits = (player.credits ?? 0) + amount;
        logLine(state, `Caravan: +${amount} credits from trade routes.`);
        break;
      }

      case "revealHex": {
        const targetId = context.selectedHexId ?? state.ui?.selectedHexId;
        const count = eff.count ?? 1;
        const scanRange = eff.range ?? 1;
        if (targetId) {
          const hex = getHex(state, targetId);
          const factionId = String(player?.factionId ?? "").toLowerCase();
          const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[factionId]);
          const isFleetHex = fleetHexes.includes(targetId);
          const isAdjacentToFleet = fleetHexes.some(hId =>
            getAdjacentHexes(state, hId).some(h => h.id === targetId)
          );
          const isWithinRangeOfFleet = scanRange > 1 && fleetHexes.some(hId =>
            getHexesWithinRange(state, hId, scanRange).some(h => h.id === targetId)
          );
          if (hex && (isFleetHex || isAdjacentToFleet || isWithinRangeOfFleet)) {
            if (isFleetHex && count > 1 && !isWithinRangeOfFleet) {
              context.hexId = targetId;
              revealAdjacentHexes(state, context, count);
            } else {
              hex.revealed = true;
              if (hex.type === "unknown" && context.rng) {
                hex.type = weightedPick(context.rng, [
                  { value: "empty", weight: 55 },
                  { value: "system", weight: 30 },
                  { value: "phenomena", weight: 15 }
                ]);
              }
              context.revealedHexId = targetId;
              if (player) {
                const visited = ensureVisitedMap(state, player.factionId);
                visited[targetId] = true;
              }
              logLine(state, `Scan revealed ${targetId}.`);
              recomputeInfluence(state);
              if (eff.peekDeck && hex.type && hex.type !== "unknown") {
                const deck = state.decks[hex.type];
                const topId = deck?.draw?.[0];
                if (topId && context.cardIndex) {
                  const card = context.cardIndex[topId];
                  logLine(state, `Oracle Scan: top of ${hex.type} deck is "${card?.title ?? topId}".`);
                }
              }
            }
          }
        } else {
          revealAdjacentHexes(state, context, count);
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
            revealHex(state, context.rng, context.cardIndex, destinationId, null);
          } else {
            logLine(state, "Cannot reveal: missing RNG/context.");
            ok = false;
          }
        }
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destinationId] = true;
        recomputeInfluence(state);
        state.ui.fleetSelection = { hexId: null, factionId: null, fleetIds: [] };
        if (eff.canEngage !== false) {
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
        const range = eff.range ?? 2;
        const reachable = (() => {
          let frontier = [getHex(state, selection.hexId)].filter(Boolean);
          const ids = new Set([selection.hexId]);
          for (let r = 0; r < range; r++) {
            const next = [];
            for (const h of frontier) {
              for (const n of getAdjacentHexes(state, h.id)) {
                if (!ids.has(n.id)) { ids.add(n.id); next.push(n); }
              }
            }
            frontier = next;
          }
          return ids.has(destinationId);
        })();
        if (!reachable) {
          logLine(state, `Destination must be within ${range} step(s).`);
          ok = false;
          break;
        }
        const destHexPre = getHex(state, destinationId);
        const isDebris = destHexPre && (destHexPre.token === "debris_field" || destHexPre.token === "derelict");
        const isSalvager = factionId === "salvagers" || eff.salvagerMove;
        if (isDebris && !isSalvager) {
          const shipCount = selection.fleetIds?.length ?? (entry.undamaged.length + entry.damaged.length);
          const cost = shipCount;
          const energy = player.energy ?? 0;
          if (energy < cost) {
            logLine(state, `Entering debris costs ${cost} energy (1 per ship). You have ${energy}.`);
            ok = false;
            break;
          }
          player.energy = energy - cost;
          logLine(state, `Paid ${cost} energy to enter debris.`);
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
        const destHex = destHexPre ?? getHex(state, destinationId);
        if (destHex && !destHex.revealed) {
          if (context.rng && context.cardIndex) {
            revealHex(state, context.rng, context.cardIndex, destinationId, null);
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
        const deckType = context.selectedDeckType ?? eff.deckType ?? "phenomena";
        const deck = state.decks[deckType];
        if (!deck) {
          logLine(state, `Unknown deck type: ${deckType}.`);
          ok = false;
          break;
        }
        const topId = deck.draw[0];
        if (!topId) {
          logLine(state, `Peek: ${deckType} deck is empty.`);
          break;
        }
        const card = context.cardIndex?.[topId];
        const title = card?.title ?? topId;
        logLine(state, `Peek: top of ${deckType} is "${title}".`);
        if (eff.gainCreditIfSystem && deckType === "system" && player && topId) {
          player.credits = (player.credits ?? 0) + 1;
          logLine(state, "Echo Tap: +1 credit (system card).");
        }
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
        const dice = state.turn?.dice;
        const used = state.turn?.used;
        if (!dice || dice[dieId] == null || used?.[dieId]) {
          logLine(state, "No die available to modify.");
          ok = false;
          break;
        }
        const next = Math.min(6, Math.max(1, dice[dieId] + delta));
        dice[dieId] = next;
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
        const repairAmount = Math.max(1, eff.amount ?? 1);
        for (let i = 0; i < repairAmount; i++) {
          const entry = getHexFleets(state, targetHex, factionId);
          if ((entry?.damaged?.length ?? 0) === 0) break;
          repairFleetInHex(state, targetHex, factionId);
        }
        break;
      }

      case "gainCreditsFromBiomass": {
        if (!player) break;
        const factionId = String(player.factionId ?? "").toLowerCase();
        const fleetHexes = new Set(Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[factionId]));
        let count = 0;
        for (const hex of state.map.hexes) {
          if (hex.token !== "biomass") continue;
          const controlled = state.controllerByHex?.[hex.id] === factionId && !state.contestedByHex?.[hex.id];
          const adjacent = getAdjacentHexes(state, hex.id).some(h => fleetHexes.has(h.id));
          if (controlled || adjacent) count += 1;
        }
        count = Math.max(1, count);
        player.credits = (player.credits ?? 0) + count;
        logLine(state, `Absorb: +${count} credits from biomass.`);
        break;
      }

      case "placeBiomassIfEmptyOrSystem": {
        const targetId = context.revealedHexId ?? context.selectedHexId ?? state.ui?.selectedHexId;
        const hex = getHex(state, targetId);
        if (!hex || !hex.revealed) break;
        if (hex.type === "empty" || hex.type === "system") {
          hex.token = "biomass";
          logLine(state, `Spore Probe: biomass placed at ${targetId}.`);
        }
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
        if (!hex || hex.type !== "system") {
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
        if (!destinationId) {
          logLine(state, "Select a system hex.");
          ok = false;
          break;
        }
        if (state.turn?.systemActivated?.includes(destinationId)) {
          logLine(state, "System already activated this round.");
          ok = false;
          break;
        }
        const hex = getHex(state, destinationId);
        if (!hex || hex.type !== "system") {
          logLine(state, "Activate System requires a system hex.");
          ok = false;
          break;
        }
        if (state.contestedByHex?.[destinationId]) {
          logLine(state, "System is contested.");
          ok = false;
          break;
        }
        const influence = state.influence?.[destinationId] ?? {};
        const controller = state.controllerByHex?.[destinationId];
        if (!controller) {
          logLine(state, "No controller for this system.");
          ok = false;
          break;
        }
        const entries = Object.entries(influence)
          .filter(([f]) => f !== controller)
          .sort((a, b) => b[1] - a[1]);
        const secondary = entries[0]?.[0] ?? null;
        const controllerPlayer = state.players.find(p => String(p.factionId).toLowerCase() === controller);
        if (controllerPlayer) controllerPlayer.credits += 3;
        if (secondary) {
          const secondaryPlayer = state.players.find(p => String(p.factionId).toLowerCase() === secondary);
          if (secondaryPlayer) secondaryPlayer.credits += 1;
        }
        state.turn.systemActivated.push(destinationId);
        logLine(state, `System activated at ${destinationId}.`);
        break;
      }

      default:
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

/** Compute start hex IDs as vertices of a regular polygon centered on the map. */
export function computePolygonStartPositions(map, playerCount) {
  const w = map.width ?? 7;
  const h = map.height ?? 7;
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;
  const n = Math.min(6, Math.max(2, playerCount));
  const radius = Math.min(cx, cy);
  const result = [];
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI / 2) + (2 * Math.PI * i) / n;
    const col = Math.round(cx + radius * Math.cos(angle));
    const row = Math.round(cy - radius * Math.sin(angle));
    const c = Math.max(0, Math.min(w - 1, col));
    const r = Math.max(0, Math.min(h - 1, row));
    const hex = map.hexes.find(hx => hx.col === c && hx.row === r);
    if (hex) result.push(hex.id);
  }
  return result;
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

export function getHexesWithinRange(state, hexId, range) {
  if (range <= 0) return [];
  const hex = getHex(state, hexId);
  if (!hex) return [];
  const seen = new Set([hexId]);
  let frontier = [hex];
  const result = [];
  for (let r = 1; r <= range; r++) {
    const next = [];
    for (const h of frontier) {
      for (const n of getAdjacentHexes(state, h.id)) {
        if (!seen.has(n.id)) {
          seen.add(n.id);
          next.push(n);
          result.push(n);
        }
      }
    }
    frontier = next;
  }
  return result;
}

export function revealHex(state, rng, cardIndex, hexId, forcedType = null) {
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

  if (forcedType) {
    hex.type = forcedType;
  } else if (hex.type === "unknown") {
    hex.type = weightedPick(rng, [
      { value: "empty", weight: 55 },
      { value: "system", weight: 30 },
      { value: "phenomena", weight: 15 }
    ]);
  }

  const deckType = forcedType ?? hex.type;
  const card = drawCard(state, deckType, cardIndex, rng);
  if (!card) {
    logLine(state, `No card available for deck: ${deckType}`);
    return null;
  }

  state.ui.pending = { deckType, card, hexId };
  logLine(state, `Card drawn (${deckType}): ${card.title}`);
  recomputeInfluence(state);
  return state.ui.pending;
}

export function resolveChoice(state, cardIndex, choiceIndex) {
  const pending = state.ui.pending;
  if (!pending) return { ok: false, reason: "No pending card." };

  const { card, hexId, deckType } = pending;
  const choice = card.choices[choiceIndex];
  if (!choice) return { ok: false, reason: "Invalid choice." };

  const context = { hexId, rng: null, cardIndex };
  const res = applyEffects(state, choice.effects ?? [], context);

  const hex = getHex(state, hexId);
  if (hex && choice.placeToken) hex.token = choice.placeToken;

  state.decks[deckType].discard.push(card.id);

  logLine(state, `Chose: ${choice.label} → ${choice.resolveText}`);

  let placeNote = null;
  if (Array.isArray(card.placeNoteByChoiceIndex)) {
    placeNote = card.placeNoteByChoiceIndex[choiceIndex] ?? null;
  }
  if (!placeNote && card.placeNote) placeNote = card.placeNote;
  if (!placeNote) {
    if (hex?.token) {
      const label = state.tokensById?.[hex.token]?.label ?? state.tokens?.[hex.token]?.label ?? hex.token;
      placeNote = `Place: ${label}`;
    } else {
      placeNote = "Leave: Nothing";
    }
  }

  state.ui.lastResolution = {
    deckType,
    cardId: card.id,
    cardTitle: card.title,
    choiceIndex,
    choiceLabel: choice.label,
    resolveText: choice.resolveText ?? "",
    tokenId: hex?.token ?? null,
    placeNote
  };
  state.ui.pending = null;

  return { ok: true, cardId: card.id, deckType, choiceLabel: choice.label, tokenId: hex?.token ?? null, stateChanged: didStateChange(res.before, res.after) };
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

  if (action.requiresTarget && !selectedHexId) {
    logLine(state, "Select a target hex.");
    return { ok: false, reason: "Needs target.", needsTarget: true };
  }

  const fleetHex = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[factionId]);
  const fallbackHex = state.ui.fleetSelection?.hexId ??
    state.ui.selectedHexId ??
    fleetHex ??
    null;
  const context = {
    hexId: fallbackHex,
    selectedHexId: selectedHexId ?? undefined,
    selectedDeckType: state.ui.selectedDeckType ?? "phenomena",
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
      neighbor.revealed = true;
      if (active) {
        const visited = ensureVisitedMap(state, active.factionId);
        visited[neighbor.id] = true;
      }
      revealed++;
    }
  }
  if (revealed > 0) {
    logLine(state, `Scan revealed ${revealed} adjacent hex(es).`);
    recomputeInfluence(state);
  }
}
