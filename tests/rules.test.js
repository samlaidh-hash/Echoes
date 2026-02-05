import assert from "node:assert/strict";

import { initialState } from "../src/state.js";
import {
  revealHex,
  resolveChoice,
  activateCellCard,
  applyEffects,
  useSharedBonusDie,
  canUseSharedBonusDie,
  canMakeAgreement,
  canBreakAgreement,
  scoreSpecialResources,
  initCombat
} from "../src/rules.js";

const makeRng = () => ({
  nextFloat: () => 0.1,
  nextInt: () => 0,
  rollDie: () => 4
});

const buildState = () => {
  const state = initialState({ seed: 1 });
  state.map.width = 2;
  state.map.height = 1;
  state.map.hexes = [
    { id: "A1", col: 0, row: 0, revealed: false, token: null },
    { id: "A2", col: 1, row: 0, revealed: false, token: null }
  ];
  state.ui.cardIndex = {};
  state.decks.event.draw = [];
  state.decks.event.discard = [];
  return state;
};

const cardLeaveInCell = {
  id: "EVT-LEAVE",
  kind: "system",
  front: {
    title: "Signal",
    options: [{ key: "A", label: "Investigate" }, { key: "B", label: "Ignore" }]
  },
  back: {
    title: "Anchored Facility",
    rulesText: "A station remains.",
    byChoice: {
      A: {
        resolveOnReveal: false,
        resolution: [{ op: "gainCredits", n: 1 }],
        cardFate: { type: "leaveInCell" },
        cellCard: {
          activation: {
            threshold: 9,
            cost: { credits: 1, energy: 0 },
            controllerEffects: [{ op: "gainCredits", n: 2 }],
            secondaryEffects: [{ op: "gainCredits", n: 1 }]
          }
        }
      },
      B: {
        resolveOnReveal: false,
        resolution: [{ op: "gainEnergy", n: 1 }],
        cardFate: { type: "discard" }
      }
    }
  }
};

const cardToHand = {
  id: "EVT-HAND",
  kind: "phenomena",
  front: {
    title: "Echo",
    options: [{ key: "A", label: "Collect" }]
  },
  back: {
    title: "Recovered Cache",
    rulesText: "An asset can be claimed.",
    byChoice: {
      A: {
        resolveOnReveal: false,
        resolution: [{ op: "gainCredits", n: 1 }],
        cardFate: { type: "toHand", category: "asset", faceDown: false, tappable: true },
        handCard: {
          activation: { threshold: 8, cost: { credits: 0, energy: 0 }, effects: [{ op: "gainCredits", n: 2 }] },
          cashOut: { credits: 2, energy: 0 }
        }
      }
    }
  }
};

const cardDiscard = {
  id: "EVT-DISCARD",
  kind: "empty",
  front: {
    title: "Silence",
    options: [{ key: "A", label: "Move on" }]
  },
  back: {
    title: "Quiet Drift",
    rulesText: "Nothing found.",
    byChoice: {
      A: {
        resolveOnReveal: false,
        resolution: [{ op: "gainEnergy", n: 1 }],
        cardFate: { type: "discard" }
      }
    }
  }
};

const run = () => {
  // Draw/choose/flip + leave in cell
  let state = buildState();
  state.ui.cardIndex = {
    [cardLeaveInCell.id]: cardLeaveInCell,
    [cardToHand.id]: cardToHand,
    [cardDiscard.id]: cardDiscard
  };
  state.decks.event.draw = [cardLeaveInCell.id];
  revealHex(state, makeRng(), state.ui.cardIndex, "A1", { mode: "entry" });
  assert.equal(state.ui.pending.cardId, cardLeaveInCell.id, "Pending card should be set");
  const resolveLeave = resolveChoice(state, state.ui.cardIndex, "A");
  assert.ok(resolveLeave.ok, "Choice should resolve");
  const hex = state.map.hexes.find(h => h.id === "A1");
  assert.equal(hex.cardId, cardLeaveInCell.id, "Card should remain in cell");
  assert.equal(hex.cardChoiceKey, "A", "Choice key stored");

  // To-hand fate
  state = buildState();
  state.ui.cardIndex = { [cardToHand.id]: cardToHand };
  state.decks.event.draw = [cardToHand.id];
  revealHex(state, makeRng(), state.ui.cardIndex, "A1", { mode: "entry" });
  resolveChoice(state, state.ui.cardIndex, "A");
  const hand = state.handsByFaction.directorate;
  assert.equal(hand.length, 1, "Card should be in hand");
  assert.equal(hand[0].category, "asset", "Hand card category recorded");

  // Discard fate
  state = buildState();
  state.ui.cardIndex = { [cardDiscard.id]: cardDiscard };
  state.decks.event.draw = [cardDiscard.id];
  revealHex(state, makeRng(), state.ui.cardIndex, "A1", { mode: "entry" });
  resolveChoice(state, state.ui.cardIndex, "A");
  assert.equal(state.decks.event.discard.includes(cardDiscard.id), true, "Discard pile should include discarded card");

  // Activation eligibility + secondary effect
  state = buildState();
  state.ui.cardIndex = { [cardLeaveInCell.id]: cardLeaveInCell };
  state.decks.event.draw = [cardLeaveInCell.id];
  revealHex(state, makeRng(), state.ui.cardIndex, "A1", { mode: "entry" });
  resolveChoice(state, state.ui.cardIndex, "A");
  state.influence.A1 = { directorate: 3, choir: 2, bloom: 1 };
  state.controllerByHex.A1 = "directorate";
  state.contestedByHex.A1 = false;
  state.players[1].credits = 1;
  const dirCredits = state.players[0].credits;
  const choirCredits = state.players[1].credits;
  const resultController = activateCellCard(state, "A1", "directorate");
  assert.ok(resultController.ok, "Controller can activate");
  assert.equal(state.players[0].credits, dirCredits + 1, "Controller effect applied (after cost)");
  state.turn.systemActivated = [];
  const resultSecondary = activateCellCard(state, "A1", "choir");
  assert.ok(resultSecondary.ok, "Second place can activate");
  assert.equal(state.players[1].credits, choirCredits, "Secondary effect applied (after cost)");

  // Doom stickiness + removal
  state = buildState();
  applyEffects(state, [{ op: "takeToHand", category: "doom", faceDown: false, tappable: false, cardId: "doom-1" }], { strict: true });
  assert.equal(state.handsByFaction.directorate.length, 1, "Doom card added");
  applyEffects(state, [{ op: "discardCard", cardId: "doom-1" }], { strict: true });
  assert.equal(state.handsByFaction.directorate.length, 1, "Doom card persists");
  applyEffects(state, [{ op: "discardDoom", cardId: "doom-1", targetFactionId: "directorate" }], { strict: true });
  assert.equal(state.handsByFaction.directorate.length, 0, "Doom card removed by effect");

  // Hidden VP secrecy
  state = buildState();
  applyEffects(state, [{ op: "takeToHand", category: "hidden_vp", faceDown: true, tappable: false, cardId: "vp-1" }], { strict: true });
  assert.equal(state.handsByFaction.directorate[0].faceDown, true, "Hidden VP stored face-down");

  // Special resource scoring
  const score = scoreSpecialResources({
    Antimatter: 2,
    Collapsium: 1,
    Monopoles: 1,
    "Ancient Relics": 1,
    "Alien Art": 0,
    "Exotic Matter": 0
  });
  assert.equal(score, 6, "Optimal partition scoring should match");

  // Bonus die access + gold lock
  state = buildState();
  state.sharedBonusDie.value = 5;
  state.bonusTokensByFaction.directorate.gold = 1;
  const useResult = useSharedBonusDie(state, "directorate");
  assert.ok(useResult.ok, "Gold token usage should succeed");
  assert.equal(state.sharedBonusDie.lockedByFactionId, "directorate", "Gold token locks bonus die");
  assert.equal(canUseSharedBonusDie(state, "choir"), false, "Other factions cannot use locked bonus die");

  // Tension only once per hex per round
  state = buildState();
  state.tension.current = 0;
  initCombat(state, "A1", "directorate", ["choir"]);
  initCombat(state, "A1", "directorate", ["choir"]);
  assert.equal(state.tension.current, 1, "Only first combat initiation per hex increases tension");

  // Agreement thresholds
  assert.equal(canMakeAgreement(state, "directorate", 3), true, "Diplomatic can make agreements easily");
  assert.equal(canBreakAgreement(state, "directorate", 3), false, "Diplomatic breaks hard");
  assert.equal(canMakeAgreement(state, "bloom", 3), true, "Chaos makes easily");
  assert.equal(canBreakAgreement(state, "bloom", 3), true, "Chaos breaks easily");
  assert.equal(canMakeAgreement(state, "choir", 3), false, "Pirates make hard");
  assert.equal(canBreakAgreement(state, "choir", 3), true, "Pirates break easily");

  console.log("All tests passed.");
};

run();
