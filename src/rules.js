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
  const bonusAvailable = dice.bonus != null && !used?.bonus;

  if (aAvailable) addOption(dice.a, { label: "A", consume: { a: true } });
  if (bAvailable) addOption(dice.b, { label: "B", consume: { b: true } });
  if (aAvailable && bAvailable) addOption(dice.a + dice.b, { label: "A+B", consume: { a: true, b: true } });

  if (bonusAvailable) {
    addOption(dice.bonus, { label: "Bonus", consume: { bonus: true } });
    if (aAvailable) addOption(dice.a + dice.bonus, { label: "A+Bonus", consume: { a: true, bonus: true } });
    if (bAvailable) addOption(dice.b + dice.bonus, { label: "B+Bonus", consume: { b: true, bonus: true } });
    if (aAvailable && bAvailable) addOption(dice.a + dice.b + dice.bonus, { label: "A+B+Bonus", consume: { a: true, b: true, bonus: true } });
  }

  return optionsByNumber;
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
      if (state.players.some(p => p.positionHexId === hex.id && String(p.factionId).toLowerCase() === factionId)) {
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
    }
  }

  const finalControllers = computeControllersFromInfluence(state, final);
  state.influence = final;
  state.controllerByHex = finalControllers.controllerByHex;
  state.contestedByHex = finalControllers.contestedByHex;
}

export function weightedPick(rng, entries) {
  // entries: [{value, weight}]
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
  // Fisher-Yates shuffle
  for (let i = ids.length - 1; i > 0; i--) {
    const j = rng.nextInt(i + 1);
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  state.decks[deckType].draw = ids;
  state.decks[deckType].discard = [];
}

export function drawCard(state, deckType, cardById) {
  const deck = state.decks[deckType];
  if (deck.draw.length === 0 && deck.discard.length > 0) {
    // reshuffle discard into draw
    deck.draw = deck.discard.splice(0);
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

  for (const eff of effects) {
    switch (eff.op) {
      case "log":
        logLine(state, eff.message ?? "Something happens.");
        break;

      case "gainResource":
        if (player) player[eff.resource] = (player[eff.resource] ?? 0) + (eff.amount ?? 0);
        break;

      case "loseResource":
        if (player) player[eff.resource] = Math.max(0, (player[eff.resource] ?? 0) - (eff.amount ?? 0));
        break;

      case "gainFleet":
        if (player) player.fleets += (eff.amount ?? 0);
        break;

      case "loseFleet":
        if (player) player.fleets = Math.max(0, player.fleets - (eff.amount ?? 0));
        break;

      case "modifyCosmicTension":
        state.cosmicTension += (eff.amount ?? 0);
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

      case "moveFleet": {
        if (!player) {
          logLine(state, "No active player for movement.");
          ok = false;
          break;
        }
        if (player.fleets <= 0) {
          logLine(state, "No fleets available to move.");
          ok = false;
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!destinationId) {
          logLine(state, "Select a destination hex to move.");
          ok = false;
          break;
        }
        const originId = player.positionHexId;
        const adjacent = getAdjacentHexes(state, originId).some(h => h.id === destinationId);
        if (!adjacent) {
          logLine(state, "Destination must be adjacent.");
          ok = false;
          break;
        }
        player.positionHexId = destinationId;
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
        break;
      }

      case "peekDeckTop": {
        const deckType = context.selectedDeckType ?? "phenomena";
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
        const title = card?.title ?? topId;
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

      case "placeTokenAdjacent": {
        const originId = player?.positionHexId;
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
        player.fleets += 1;
        player.positionHexId = destinationId;
        const visited = ensureVisitedMap(state, player.factionId);
        visited[destinationId] = true;
        recomputeInfluence(state);
        logLine(state, `Forward deployed at ${destinationId}.`);
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
  return {
    credits: player?.credits ?? 0,
    energy: player?.energy ?? 0,
    fleets: player?.fleets ?? 0,
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
  const card = drawCard(state, deckType, cardIndex);
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

  const context = { hexId };
  const res = applyEffects(state, choice.effects ?? [], context);

  // Place token if specified on choice
  const hex = getHex(state, hexId);
  if (hex && choice.placeToken) hex.token = choice.placeToken;

  // discard card
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
    choiceLabel: choice.label,
    resolveText: choice.resolveText ?? "",
    tokenId: hex?.token ?? null,
    placeNote
  };
  state.ui.pending = null;

  return { ok: true, cardId: card.id, deckType, choiceLabel: choice.label, tokenId: hex?.token ?? null, stateChanged: didStateChange(res.before, res.after) };
}


export function executeQueuedAction(state, rng, cardIndex) {
  const activePlayer = getActivePlayer(state);
  if (!activePlayer) return { ok: false, reason: "No active player." };
  if (!state.turn.actionsQueue.length) return { ok: false, reason: "No queued actions." };

  const actionNumber = state.turn.actionsQueue[0];
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

  const context = {
    hexId: activePlayer.positionHexId,
    selectedHexId: state.ui.selectedHexId,
    selectedDeckType: state.ui.selectedDeckType ?? "phenomena",
    modifyDie: state.ui.modifyDie,
    rng,
    cardIndex
  };

  const result = applyEffects(state, action.effects ?? [], context);
  if (!result.ok) return { ok: false, reason: "Action failed." };

  state.turn.actionsQueue.shift();
  logLine(state, `ACTION: ${factionId} #${actionNumber} ${action.name ?? "Action"}`);
  return { ok: true, actionNumber };
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

  const context = {
    hexId: activePlayer.positionHexId,
    selectedHexId: selectedHexId ?? undefined,
    selectedDeckType: state.ui.selectedDeckType ?? "phenomena",
    modifyDie: state.ui.modifyDie,
    rng,
    cardIndex
  };

  const result = applyEffects(state, action.effects ?? [], context);
  if (!result.ok) return { ok: false, reason: "Action failed." };

  logLine(state, `ACTION: ${factionId} #${actionNumber} ${action.name ?? "Action"}`);
  return { ok: true, actionNumber };
}

export function revealAdjacentHexes(state, context, count) {
  // Simple square-grid adjacency on IDs like A1..G7:
  // neighbors = N,S,E,W (good enough for baseline)
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
      // do not auto-assign type or draw card (baseline: "scan" only)
      revealed++;
    }
  }
  if (revealed > 0) {
    logLine(state, `Scan revealed ${revealed} adjacent hex(es).`);
    recomputeInfluence(state);
  }
}
