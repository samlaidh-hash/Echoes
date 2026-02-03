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
        if (hex) hex.token = eff.tokenId ?? null;
        break;
      }

      case "revealHex": {
        revealAdjacentHexes(state, context, eff.count ?? 1);
        break;
      }

      case "moveFleet": {
        if (!player) {
          logLine(state, "No active player for movement.");
          break;
        }
        if (player.fleets <= 0) {
          logLine(state, "No fleets available to move.");
          break;
        }
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!destinationId) {
          logLine(state, "Select a destination hex to move.");
          break;
        }
        const originId = player.positionHexId;
        const adjacent = getAdjacentHexes(state, originId).some(h => h.id === destinationId);
        if (!adjacent) {
          logLine(state, "Destination must be adjacent.");
          break;
        }
        player.positionHexId = destinationId;
        const destHex = getHex(state, destinationId);
        if (destHex && !destHex.revealed) {
          if (context.rng && context.cardIndex) {
            revealHex(state, context.rng, context.cardIndex, destinationId, null);
          } else {
            logLine(state, "Cannot reveal: missing RNG/context.");
          }
        }
        break;
      }

      case "peekDeckTop": {
        const deckType = context.selectedDeckType;
        const deck = deckType ? state.decks[deckType] : null;
        if (!deckType || !deck) {
          logLine(state, "Choose a deck to probe.");
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
        if (state.turn?.oncePerRoundFlags?.modifyDie?.[activeIndex]) {
          logLine(state, "Probability Drift already used this round.");
          break;
        }
        const dieId = context.modifyDie?.die;
        const delta = context.modifyDie?.delta ?? 0;
        if (!dieId || (delta !== 1 && delta !== -1)) {
          logLine(state, "Choose a die and adjustment (+1 or -1).");
          break;
        }
        const dice = state.turn?.diceByPlayer?.[activeIndex];
        if (!dice || dice[dieId] == null) {
          logLine(state, "No die available to modify.");
          break;
        }
        const next = Math.min(6, Math.max(1, dice[dieId] + delta));
        dice[dieId] = next;
        state.turn.oncePerRoundFlags.modifyDie[activeIndex] = true;
        logLine(state, `Probability Drift: die ${dieId.toUpperCase()} is now ${next}.`);
        break;
      }

      case "placeTokenAdjacent": {
        const originId = player?.positionHexId;
        const destinationId = context.selectedHexId ?? state.ui.selectedHexId;
        if (!originId || !destinationId) {
          logLine(state, "Select an adjacent hex for token placement.");
          break;
        }
        const adjacent = getAdjacentHexes(state, originId).some(h => h.id === destinationId);
        if (!adjacent) {
          logLine(state, "Destination must be adjacent.");
          break;
        }
        const hex = getHex(state, destinationId);
        if (hex) hex.token = eff.tokenId ?? null;
        break;
      }

      default:
        logLine(state, `Unknown effect op: ${eff.op}`);
        break;
    }
  }

  const after = snapshotState(state);
  return { before, after };
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

  hex.revealed = true;

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

  state.ui.pending = null;

  return { ok: true, cardId: card.id, deckType, choiceLabel: choice.label, tokenId: hex?.token ?? null, stateChanged: didStateChange(res.before, res.after) };
}

export function revealAdjacentHexes(state, context, count) {
  // Simple square-grid adjacency on IDs like A1..G7:
  // neighbors = N,S,E,W (good enough for baseline)
  const candidates = getAdjacentHexes(state, context.hexId);

  let revealed = 0;
  for (const neighbor of candidates) {
    if (revealed >= count) break;
    if (neighbor && !neighbor.revealed) {
      neighbor.revealed = true;
      // do not auto-assign type or draw card (baseline: "scan" only)
      revealed++;
    }
  }
  if (revealed > 0) logLine(state, `Scan revealed ${revealed} adjacent hex(es).`);
}
