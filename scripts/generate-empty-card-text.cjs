#!/usr/bin/env node
/*
 * Generate Empty deck front/rear text set (100 cards)
 * Output:
 * - docs/card-text-empty.md
 * - data/card-text-empty.json
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const emptyPath = path.join(root, "data", "cards_empty.json");
const outMd = path.join(root, "docs", "card-text-empty.md");
const outJson = path.join(root, "data", "card-text-empty.json");

const cards = JSON.parse(fs.readFileSync(emptyPath, "utf8"));

const voices = [
  "Archivist Nera",
  "Marshal Voss",
  "Quartermaster Renn",
  "Chanter Ilye",
  "Oracle Senn",
  "Captain Mirel",
];

const keywordGlossary = [
  "SALVAGE",
  "SCOUT",
  "ANCHOR",
  "OVERCHARGE",
  "FORTIFY",
  "JAMMED",
  "EXPOSED",
  "STABILIZE",
  "DRIFTMARK",
  "BEACONNET",
  "TRADECHAIN",
  "MUSTER",
  "RELAY",
  "VANTAGE",
  "SURGE",
  "RECOVERY",
  "TRIGGER-ECHO",
];

const keywordGlossaryRules = {
  SALVAGE:
    "Gain the listed Credits from this effect immediately; this does not place a token unless the effect says it does.",
  SCOUT:
    "Reveal 1 adjacent unrevealed hex immediately. If no adjacent unrevealed hex exists, this effect does nothing.",
  ANCHOR:
    "A Fleet entering this card's cell may not be activated to move again this turn.",
  OVERCHARGE:
    "Gain the listed bonus immediately. Apply the listed drawback at END of this turn unless that effect says otherwise.",
  FORTIFY:
    "Take a FORTIFIED token. You may discard this token to negate a hit you have taken.",
  JAMMED:
    "Take a JAMMED token. A JAMMED Fleet cannot move. Discard this token at END of turn.",
  EXPOSED:
    "Take an EXPOSED token. Next time you take a hit, discard this token and take an extra hit.",
  STABILIZE:
    "Reduce Cosmic Tension by 1 immediately, to a minimum of 0 unless another rule states otherwise.",
  DRIFTMARK:
    "Take a DRIFTMARK token and place it on the card/hex specified by the effect.",
  BEACONNET:
    "You have BEACONNET while you control at least two Beacon cards/tokens linked by your controlled path.",
  TRADECHAIN:
    "You have TRADECHAIN while you control a continuous route of trade-enabled cards between two controlled points.",
  MUSTER: "Gain +1 Fleet on this card.",
  RELAY:
    "Take a RELAY token. You may discard that token at any time to extend an effect's range by 1.",
  VANTAGE:
    "Take a VANTAGE token. At the start of any future combat you may discard it; your Fleets win any draws, even if the other side would normally win. If both sides play VANTAGE, they cancel out.",
  SURGE:
    "After resolving the main effect, immediately resolve one additional listed beneficial sub-effect.",
  RECOVERY:
    "After this effect fully resolves, gain 1 Energy.",
  "TRIGGER-ECHO":
    "Choose one already-resolved instant option on this card and resolve it again.",
};

function scopeForIndex(i1) {
  const inBlock = ((i1 - 1) % 20) + 1;
  if (inBlock === 20) return "Global";
  if ([4, 5, 8, 12, 16].includes(inBlock)) return "Local";
  return "Self";
}

function descriptionFor(title, i1) {
  const s = scopeForIndex(i1).toLowerCase();
  const motifs = [
    "cold debris lanes",
    "faint transponder ghosts",
    "broken cargo signatures",
    "unclaimed relay traffic",
    "old salvage corridors",
  ];
  return `${title} drifts in ${motifs[i1 % motifs.length]}; control here rewards ${s} planning.`;
}

function decisionPrompt(i1) {
  const prompts = [
    "Choose one approach and resolve the matching instant result.",
    "Commit a doctrine and resolve the linked instant result now.",
    "Select your line, resolve it once, then ignore it for the rest of the game.",
    "Lock your plan and apply the mapped instant result.",
  ];
  return prompts[i1 % prompts.length];
}

function optionLabels(title, i1) {
  const noun = title.split(" ")[0];
  const labelSets = [
    [`Tag ${noun}`, `Strip ${noun}`, `Shadow ${noun}`],
    ["Relay Sweep", "Deep Cut", "Cold Pass"],
    ["Quiet Claim", "Hard Burn", "Hold Distance"],
    ["Beacon Stitch", "Breakline", "Silent Mark"],
    ["Survey Arc", "Pressure Run", "Risk Buffer"],
  ];
  return labelSets[i1 % labelSets.length];
}

function keywordPack(i1) {
  const picks = [
    keywordGlossary[i1 % keywordGlossary.length],
    keywordGlossary[(i1 + 3) % keywordGlossary.length],
    keywordGlossary[(i1 + 7) % keywordGlossary.length],
    keywordGlossary[(i1 + 11) % keywordGlossary.length],
  ];
  return [...new Set(picks)];
}

function loreLine(i1, slot) {
  const v = voices[(i1 + slot) % voices.length];
  const threads = [
    "The Driftline remembers every hull we leave behind.",
    "The quiet lanes pay those who map before they mine.",
    "A silent marker today becomes a safe corridor tomorrow.",
    "In the void, patience compounds faster than fear.",
    "No wreck is empty if you know which echo to follow.",
    "Even ash has a trade value when carried by steady hands.",
  ];
  return `"${threads[(i1 + slot * 2) % threads.length]}" — ${v}`;
}

function instantOutcomeSet(i1, labels, scope) {
  const costly = i1 % 10 === 0; // ~10% have a cost and stronger effect
  const echoCard = i1 === 37; // explicit retrigger hook card

  const aEffect =
    scope === "Local"
      ? "Gain 2 Credits and place 1 DRIFTMARK in a hex within 2."
      : scope === "Global"
      ? "Gain 2 Credits; each player gains 1 Credits."
      : "Gain 2 Credits and 1 Energy.";

  const bNormalEffect =
    scope === "Local"
      ? "Gain 4 Credits; one friendly fleet within 2 gains FORTIFY."
      : scope === "Global"
      ? "Gain 5 Credits; gain +1 Influence."
      : "Gain 5 Credits, 2 Energy, and +1 Influence.";

  const bCostlyEffect =
    scope === "Local"
      ? "Gain 6 Credits and +1 Influence in a hex within 2."
      : scope === "Global"
      ? "Gain 7 Credits and +1 Fleet."
      : "Gain 7 Credits, 2 Energy, +1 Fleet, and +1 Influence.";

  const cEffect =
    scope === "Local"
      ? "Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2."
      : scope === "Global"
      ? "Lose 2 Credits; each opponent loses 1 Credits."
      : "Lose 2 Credits and become JAMMED until END.";

  const bCost = costly ? "Spend 1 Energy." : null;

  const optionA = {
    label: labels[0],
    profile: "soft_gain",
    timing: "Instant",
    cost: null,
    effect: aEffect,
    onceOnlyNote: "Resolve once when chosen, then ignore this option for the rest of the game.",
  };
  const optionB = {
    label: labels[1],
    profile: "hard_gain",
    timing: "Instant",
    cost: bCost,
    effect: costly ? bCostlyEffect : bNormalEffect,
    onceOnlyNote: "Resolve once when chosen, then ignore this option for the rest of the game.",
  };
  const optionC = {
    label: labels[2],
    profile: "soft_loss",
    timing: "Instant",
    cost: null, // negative effects never have a cost
    effect: cEffect,
    onceOnlyNote: "Resolve once when chosen, then ignore this option for the rest of the game.",
  };

  if (echoCard) {
    optionA.effect += " Place 1 TRIGGER-ECHO token on this card.";
  }

  return { optionA, optionB, optionC, costly };
}

function rearPowers(i1, scope, hasCostlyInstant) {
  const overdrive = i1 % 10 === 0; // ~10% powerful primary + minor negative secondary
  const retrigger = i1 === 37;
  const activationCost = overdrive ? "Pay 1 Energy." : "No cost.";

  let primaryEffect =
    scope === "Local"
      ? "Gain 2 Credits and choose a hex within 2: gain +1 Influence there."
      : scope === "Global"
      ? "Gain 3 Credits and +1 Influence."
      : "Gain 2 Credits and 1 Energy.";

  if (overdrive) {
    primaryEffect =
      scope === "Local"
        ? "Gain 4 Credits, 1 Energy, and one friendly fleet within 2 gains FORTIFY."
        : scope === "Global"
        ? "Gain 5 Credits, 2 Energy, and +1 Fleet."
        : "Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence.";
  }

  if (hasCostlyInstant) {
    primaryEffect += " If this card had a costly instant option this game, gain +1 Credits.";
  }

  if (retrigger) {
    primaryEffect +=
      " TRIGGER-ECHO: choose one instant option on this card that has already resolved and trigger its effect again.";
  }

  const secondaryEffect = overdrive
    ? "Second-most influential faction loses 1 Credits (minor backlash)."
    : "Second-most influential faction gains 1 Credits.";

  return {
    controllerRule:
      "Controller is the faction with the highest influence on this card.",
    runnerUpRule:
      "Secondary target is the faction with the second-highest influence on this card.",
    primaryAction: {
      actionName: "On Activation",
      actionType: "Action",
      activationCost,
      effect: primaryEffect,
      benefitRule: "Primary effect is always beneficial to the controller.",
    },
    secondaryOnActivation: {
      trigger:
        "Automatically resolves whenever the controller uses On Activation.",
      effect: secondaryEffect,
      biasRule:
        "Usually beneficial to second-most influential faction; ~10% cards use minor negative backlash instead.",
    },
  };
}

const cardsOut = cards.map((card, idx) => {
  const i1 = idx + 1;
  const scope = scopeForIndex(i1);
  const labels = optionLabels(card.title, i1);
  const instants = instantOutcomeSet(i1, labels, scope);
  const rear = rearPowers(i1, scope, instants.costly);

  return {
    id: card.id,
    title: card.title,
    deck: "empty",
    front: {
      line1_title: card.title,
      line2_description: descriptionFor(card.title, i1),
      line3_decision: decisionPrompt(i1),
      line4_optionA: labels[0],
      line5_optionB: labels[1],
      line6_optionC: labels[2],
    },
    instantOptionResults: {
      optionA: instants.optionA,
      optionB: instants.optionB,
      optionC: instants.optionC,
    },
    rear,
    flavor: loreLine(i1, i1 % 3),
    metadata: {
      scope,
      fixedMapping: true,
      outcomes: ["soft_gain", "hard_gain", "soft_loss"],
      costlyInstantOptionPresent: instants.costly,
      primaryIsOverdrive: i1 % 10 === 0,
      retriggerCapablePrimary: i1 === 37,
      keywords: keywordPack(i1),
      statusEffectsUsed: ["JAMMED", "EXPOSED", "FORTIFY"],
      notes:
        "Options are one-shot instants. Rear powers persist. Secondary auto-applies on primary activation.",
      titleKey: card.title,
    },
  };
});

const cardsByTitle = {};
for (const c of cardsOut) {
  cardsByTitle[c.title] = c;
}

const jsonOut = {
  schemaVersion: "1.1.0",
  deck: "empty",
  generatedAt: new Date().toISOString(),
  rulesProfile: {
    frontFormat: "6 lines: title, description, decision, option A/B/C",
    instantOptionModel:
      "3 option results are instant, resolve once, then ignored for the rest of the game.",
    rearModel:
      "Persistent rear powers: controller uses On Activation action; secondary auto-triggers on activation.",
    influenceRules: {
      controller: "Most influence on card.",
      secondaryTarget: "Second-most influence on card.",
    },
    costRules: {
      costlyOptionRate: "about 10%",
      cannotPay: "If cost cannot be paid, effect does not happen.",
      negativeEffectsCost: "Negative effects never have a cost.",
    },
    specialRule:
      "At least one card primary can retrigger a previously resolved instant option effect.",
    randomness: "none",
    playerInfoBeforeChoice: "tags only",
  },
  keywordGlossary,
  keywordGlossaryRules,
  cardsByTitle,
  cards: cardsOut,
};

let md = "";
md += "# Empty Deck Card Text (Front + Rear)\n\n";
md += "Generated from agreed design constraints.\n\n";
md += "## Core Rules Profile\n\n";
md += "- Fixed front/back mapping per card; option outcomes are deterministic for that card.\n";
md += "- Front uses 6-line format: Title, Description, Decision, Option A, Option B, Option C.\n";
md += "- Option results are instant and one-shot: resolve once, then ignored for rest of game.\n";
md += "- Rear powers persist: controller can use **On Activation** action after card flips.\n";
md += "- Secondary effect auto-triggers each time On Activation is used.\n";
md += "- Controller = most influence; secondary target = second-most influence.\n";
md += "- Around 10% of cards have costly instant options with stronger effects.\n";
md += "- If a player cannot pay a cost, that effect does not happen.\n";
md += "- Negative effects never have a cost.\n";
md += "- At least one card has TRIGGER-ECHO primary that retriggers a resolved option effect.\n\n";

md += "## Keyword Glossary (Metadata)\n\n";
for (const k of keywordGlossary) {
  md += `- ${k}: ${keywordGlossaryRules[k]}\n`;
}
md += "\n";

for (let b = 0; b < 10; b++) {
  const start = b * 10;
  const end = start + 10;
  const block = cardsOut.slice(start, end);
  md += `## Cards ${start + 1}-${end}\n\n`;
  md += "### Full Design Notes\n\n";
  md += `- Scope mix in this block: ${block.filter((c) => c.metadata.scope === "Self").length} self, ${block.filter((c) => c.metadata.scope === "Local").length} local, ${block.filter((c) => c.metadata.scope === "Global").length} global.\n`;
  md += `- Costly instant options in this block: ${block.filter((c) => c.metadata.costlyInstantOptionPresent).length}/10.\n`;
  md += `- Overdrive primary with minor secondary backlash: ${block.filter((c) => c.metadata.primaryIsOverdrive).length}/10.\n`;
  md += "- One-shot options are distinct from persistent rear powers.\n";
  md += "- Secondary effects are tied to primary activation and never resolve independently.\n\n";

  for (const c of block) {
    md += `### ${c.id} — ${c.title}\n\n`;
    md += "**Front (6 lines)**\n";
    md += `1. ${c.front.line1_title}\n`;
    md += `2. ${c.front.line2_description}\n`;
    md += `3. ${c.front.line3_decision}\n`;
    md += `4. ${c.front.line4_optionA}\n`;
    md += `5. ${c.front.line5_optionB}\n`;
    md += `6. ${c.front.line6_optionC}\n\n`;

    md += "**Instant Option Results (resolve once, then ignore)**\n";
    md += `- Option A (${c.instantOptionResults.optionA.label}): ${c.instantOptionResults.optionA.effect}`;
    if (c.instantOptionResults.optionA.cost) md += ` Cost: ${c.instantOptionResults.optionA.cost}`;
    md += "\n";
    md += `- Option B (${c.instantOptionResults.optionB.label}): ${c.instantOptionResults.optionB.effect}`;
    if (c.instantOptionResults.optionB.cost) md += ` Cost: ${c.instantOptionResults.optionB.cost}`;
    md += "\n";
    md += `- Option C (${c.instantOptionResults.optionC.label}): ${c.instantOptionResults.optionC.effect}`;
    if (c.instantOptionResults.optionC.cost) md += ` Cost: ${c.instantOptionResults.optionC.cost}`;
    md += "\n\n";

    md += "**Rear Powers (persistent after flip)**\n";
    md += `- Controller rule: ${c.rear.controllerRule}\n`;
    md += `- Secondary rule: ${c.rear.runnerUpRule}\n`;
    md += `- Primary (On Activation Action): ${c.rear.primaryAction.effect} Activation cost: ${c.rear.primaryAction.activationCost}\n`;
    md += `- Secondary (auto on activation): ${c.rear.secondaryOnActivation.effect}\n`;
    md += `- Flavor: ${c.flavor}\n\n`;
  }
}

fs.writeFileSync(outJson, JSON.stringify(jsonOut, null, 2), "utf8");
fs.writeFileSync(outMd, md, "utf8");

console.log(`Wrote ${outMd}`);
console.log(`Wrote ${outJson}`);
