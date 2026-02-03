import { makeRng } from "./rng.js";
import { initialState } from "./state.js";
import { loadContent } from "./content.js";
import { initDeck, logLine, revealHex, resolveChoice, didStateChange, snapshotState } from "./rules.js";
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

  // map
  state.map.width = content.hexMap.width;
  state.map.height = content.hexMap.height;
  state.map.hexes = content.hexMap.hexes;

  // tokens
  state.tokens = content.tokens;

  // decks
  initDeck(state, rng, "empty", content.cards.empty);
  initDeck(state, rng, "system", content.cards.system);
  initDeck(state, rng, "phenomena", content.cards.phenomena);

  const cardIndex = buildCardIndex(content.cards);

  // handlers
  const handlers = {
    onHexClick(hexId) {
      // If a card is pending, ignore map clicks
      if (state.ui.pending) return;

      state.ui.selectedHexId = hexId;

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

      render(state, handlers);
    }
  };

  // Dice (baseline only)
  document.getElementById("rollDiceBtn").addEventListener("click", () => {
    const a = rng.rollDie(6);
    const b = rng.rollDie(6);
    document.getElementById("dieA").textContent = String(a);
    document.getElementById("dieB").textContent = String(b);
    logLine(state, `Rolled dice: ${a}, ${b}`);
    render(state, handlers);
  });

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
