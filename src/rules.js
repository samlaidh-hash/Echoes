// Pure-ish rules: all mutations happen on the passed-in state object for baseline simplicity.

export function logLine(state, msg) {
  state.log.push(`[Round ${state.meta.round}] ${msg}`);
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

  for (const eff of effects) {
    switch (eff.op) {
      case "log":
        logLine(state, eff.message ?? "Something happens.");
        break;

      case "gainResource":
        state.player[eff.resource] = (state.player[eff.resource] ?? 0) + (eff.amount ?? 0);
        break;

      case "loseResource":
        state.player[eff.resource] = Math.max(0, (state.player[eff.resource] ?? 0) - (eff.amount ?? 0));
        break;

      case "gainFleet":
        state.player.fleets += (eff.amount ?? 0);
        break;

      case "loseFleet":
        state.player.fleets = Math.max(0, state.player.fleets - (eff.amount ?? 0));
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

      default:
        logLine(state, `Unknown effect op: ${eff.op}`);
        break;
    }
  }

  const after = snapshotState(state);
  return { before, after };
}

export function snapshotState(state) {
  return {
    credits: state.player.credits,
    energy: state.player.energy,
    fleets: state.player.fleets,
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

export function revealHex(state, rng, cardIndex, hexId, forcedType = null) {
  const hex = getHex(state, hexId);
  if (!hex) return null;

  hex.revealed = true;

  if (hex.type === "unknown") {
    hex.type = forcedType ?? weightedPick(rng, [
      { value: "empty", weight: 55 },
      { value: "system", weight: 30 },
      { value: "phenomena", weight: 15 }
    ]);
  }

  const card = drawCard(state, hex.type, cardIndex);
  if (!card) {
    logLine(state, `No card available for deck: ${hex.type}`);
    return null;
  }

  state.ui.pending = { deckType: hex.type, card, hexId };
  logLine(state, `Card drawn (${hex.type}): ${card.title}`);
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
  const hex = getHex(state, context.hexId);
  if (!hex) return;

  const [col, row] = [hex.col, hex.row];
  const candidates = [
    { c: col, r: row - 1 },
    { c: col, r: row + 1 },
    { c: col - 1, r: row },
    { c: col + 1, r: row }
  ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);

  let revealed = 0;
  for (const p of candidates) {
    if (revealed >= count) break;
    const neighbor = state.map.hexes.find(h => h.col === p.c && h.row === p.r);
    if (neighbor && !neighbor.revealed) {
      neighbor.revealed = true;
      // do not auto-assign type or draw card (baseline: "scan" only)
      revealed++;
    }
  }
  if (revealed > 0) logLine(state, `Scan revealed ${revealed} adjacent hex(es).`);
}
