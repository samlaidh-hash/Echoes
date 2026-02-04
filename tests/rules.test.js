import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createInitialState } from "../src/state.legacy.js";
import {
  actionRequiresResources,
  adjustTension,
  applyEffects,
  awardBonusToken,
  canBreakAgreement,
  canMakeAgreement,
  moveFleet,
  rollBonusDie,
  scoreSpecialResources,
  useBonusDie
} from "../src/rules.legacy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const loadJson = async (relativePath) => {
  const fullPath = path.join(root, relativePath);
  const data = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(data);
};

const loadContent = async () => {
  const [factions, actions, phenomenaDeck, systemDeck, tensionDecks, hexMapRaw] = await Promise.all([
    loadJson("data/factions.json"),
    loadJson("data/actions.json"),
    loadJson("data/cards_phenomena.json"),
    loadJson("data/cards_system.json"),
    loadJson("data/tension_decks.json"),
    loadJson("data/hex_map.json")
  ]);
  const hexMap = hexMapRaw.hexes ?? hexMapRaw;
  return { factions, actions, phenomenaDeck, systemDeck, tensionDecks, hexMap };
};

const run = async () => {
  const content = await loadContent();
  const initial = createInitialState(content);

  // Influence cap per system per round
  let state = initial;
  state = moveFleet(state, "choir", "A1", "A2").state;
  state = moveFleet(state, "choir", "A1", "A2").state;
  const targetHex = state.hexMap.find((hex) => hex.id === "A2");
  assert.equal(targetHex.influence.choir, 1, "Influence should cap at +1 per round");

  // Bonus token earning and locking
  let tokenState = applyEffects(initial, [{ type: "setBonusDie", value: 4, locked: false, usedBy: {} }]);
  tokenState = applyEffects(tokenState, awardBonusToken(tokenState, "directorate", "gold").effects);
  const useResult = useBonusDie(tokenState, "directorate", "gold");
  tokenState = applyEffects(useResult.state, useResult.effects);
  assert.equal(tokenState.bonusDie.locked, true, "Gold token should lock the bonus die");

  // Resource-free actions 1-6
  const directorateActions = content.actions.directorate;
  for (let threshold = 1; threshold <= 6; threshold += 1) {
    assert.equal(
      actionRequiresResources(threshold, directorateActions[String(threshold)]),
      false,
      `Action ${threshold} should not require resources`
    );
  }

  // Tension escalation and reduction
  let tensionState = applyEffects(initial, rollBonusDie(initial).effects);
  tensionState = applyEffects(tensionState, adjustTension(tensionState, 2).effects);
  assert.equal(tensionState.tension.value, 2, "Tension should increase by 2");
  tensionState = applyEffects(tensionState, adjustTension(tensionState, -1).effects);
  assert.equal(tensionState.tension.value, 1, "Tension should reduce by 1");

  // Doom card persistence
  let doomState = initial;
  doomState = applyEffects(doomState, [
    {
      type: "addCardToHand",
      factionId: "directorate",
      card: { id: "doom-1", title: "Doom" },
      cardType: "doom"
    }
  ]);
  doomState = applyEffects(doomState, [
    { type: "discardCard", factionId: "directorate", cardType: "hand", index: 0 }
  ]);
  assert.equal(doomState.hands.directorate.doom.length, 1, "Doom cards cannot be discarded");

  // Agreement make/break asymmetry
  assert.equal(canMakeAgreement(initial, "directorate", 3), true, "Diplomatic faction makes agreements easily");
  assert.equal(canBreakAgreement(initial, "directorate", 3), false, "Diplomatic faction breaks agreements hard");
  assert.equal(canMakeAgreement(initial, "bloom", 3), true, "Chaos faction makes agreements easily");
  assert.equal(canBreakAgreement(initial, "bloom", 3), true, "Chaos faction breaks agreements easily");
  assert.equal(canMakeAgreement(initial, "choir", 3), false, "Pirates faction makes agreements hard");
  assert.equal(canBreakAgreement(initial, "choir", 3), true, "Pirates faction breaks agreements easily");

  // Special resource VP optimization
  const score = scoreSpecialResources({
    Antimatter: 2,
    Collapsium: 1,
    Monopoles: 1,
    "Ancient Relics": 1,
    "Alien Art": 0,
    "Exotic Matter": 0
  });
  assert.equal(score, 6, "Optimal partitioning should score 6 VP for 4 unique + extra");
  const scoreAllDifferent = scoreSpecialResources({
    Antimatter: 1,
    Collapsium: 1,
    Monopoles: 1,
    "Ancient Relics": 1,
    "Alien Art": 1,
    "Exotic Matter": 1
  });
  assert.equal(scoreAllDifferent, 15, "All different set of 6 should score 15 VP");

  console.log("All tests passed.");
};

run();
