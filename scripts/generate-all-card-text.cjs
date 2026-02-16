#!/usr/bin/env node
/*
 * Generate card text for all 300 cards:
 * - Empty (100)
 * - System (100)
 * - Phenomena (100)
 *
 * Outputs:
 * - docs/card-text-empty.md
 * - docs/card-text-system.md
 * - docs/card-text-phenomena.md
 * - data/card-text-empty.json
 * - data/card-text-system.json
 * - data/card-text-phenomena.json
 * - data/card-text-all.json
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const deckConfig = [
  {
    key: "empty",
    sourcePath: path.join(root, "data", "cards_empty.json"),
    outMdPath: path.join(root, "docs", "card-text-empty.md"),
    outJsonPath: path.join(root, "data", "card-text-empty.json"),
  },
  {
    key: "system",
    sourcePath: path.join(root, "data", "cards_system.json"),
    outMdPath: path.join(root, "docs", "card-text-system.md"),
    outJsonPath: path.join(root, "data", "card-text-system.json"),
  },
  {
    key: "phenomena",
    sourcePath: path.join(root, "data", "cards_phenomena.json"),
    outMdPath: path.join(root, "docs", "card-text-phenomena.md"),
    outJsonPath: path.join(root, "data", "card-text-phenomena.json"),
  },
];

const outAllJsonPath = path.join(root, "data", "card-text-all.json");

const voicesByDeck = {
  empty: [
    "Archivist Nera",
    "Marshal Voss",
    "Quartermaster Renn",
    "Chanter Ilye",
    "Oracle Senn",
    "Captain Mirel",
  ],
  system: [
    "Governor Halden",
    "Dockmaster Cira",
    "Fleet Prelate Ovan",
    "Logistician Vey",
    "Warden Solm",
    "Engineer Tarin",
  ],
  phenomena: [
    "Whisper-Seer Kael",
    "Rift Cartographer Enna",
    "Gatewright Joss",
    "Cantor Brine",
    "Chronicle-Node 7",
    "Void Pilgrim Taal",
  ],
};

const balanceProfileByDeck = {
  empty: {
    tier: 0,
    // Distributed to avoid tight clustering while staying ~10%.
    costlySlots: [9, 18, 27, 34, 43, 52, 61, 74, 86, 97],
    overdriveSlots: [7, 16, 25, 32, 41, 55, 66, 78, 89, 100],
    retriggerCardIndex: 37,
  },
  system: {
    tier: 1,
    costlySlots: [8, 17, 26, 35, 44, 53, 62, 71, 84, 96],
    overdriveSlots: [10, 21, 30, 39, 48, 57, 68, 79, 90, 99],
    retriggerCardIndex: 42,
  },
  phenomena: {
    tier: 2,
    costlySlots: [6, 15, 24, 33, 46, 58, 69, 80, 91, 100],
    overdriveSlots: [9, 20, 31, 40, 51, 63, 72, 83, 94, 98],
    retriggerCardIndex: 55,
  },
};

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

function descriptionFor(deckKey, title, i1) {
  const s = scopeForIndex(i1).toLowerCase();
  const motifsByDeck = {
    empty: [
      "cold debris lanes",
      "faint transponder ghosts",
      "broken cargo signatures",
      "unclaimed relay traffic",
      "old salvage corridors",
    ],
    system: [
      "crowded orbital corridors",
      "contested trade approaches",
      "station relay grids",
      "colonial supply wakes",
      "fortified dock rings",
    ],
    phenomena: [
      "unstable rift gradients",
      "phase-shear wakefields",
      "pre-cursor resonance scars",
      "harmonic gate echoes",
      "anomaly pressure tides",
    ],
  };
  const motifs = motifsByDeck[deckKey] || motifsByDeck.empty;
  return `${title} sits in ${motifs[i1 % motifs.length]}; control here rewards ${s} planning.`;
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

function optionLabels(deckKey, title, i1) {
  const noun = title.split(" ")[0];
  const byDeck = {
    empty: [
      [`Tag ${noun}`, `Strip ${noun}`, `Shadow ${noun}`],
      ["Relay Sweep", "Deep Cut", "Cold Pass"],
      ["Quiet Claim", "Hard Burn", "Hold Distance"],
      ["Beacon Stitch", "Breakline", "Silent Mark"],
      ["Survey Arc", "Pressure Run", "Risk Buffer"],
    ],
    system: [
      [`Secure ${noun}`, `Exploit ${noun}`, `Buffer ${noun}`],
      ["Dock Sweep", "Core Push", "Reserve Line"],
      ["Civic Claim", "Hard Levy", "Stand Off"],
      ["Network Sync", "Power Drive", "Quiet Hold"],
      ["Patrol Arc", "Supply Burn", "Risk Screen"],
    ],
    phenomena: [
      [`Tune ${noun}`, `Bleed ${noun}`, `Ward ${noun}`],
      ["Rift Sweep", "Pulse Cut", "Cool Pass"],
      ["Echo Claim", "Hard Tap", "Wide Berth"],
      ["Phase Stitch", "Breakwave", "Silent Seal"],
      ["Probe Arc", "Pressure Spike", "Risk Veil"],
    ],
  };
  const labelSets = byDeck[deckKey] || byDeck.empty;
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

function loreLine(deckKey, i1, slot) {
  const voices = voicesByDeck[deckKey] || voicesByDeck.empty;
  const v = voices[(i1 + slot) % voices.length];
  const threadsByDeck = {
    empty: [
      "The Driftline remembers every hull we leave behind.",
      "The quiet lanes pay those who map before they mine.",
      "A silent marker today becomes a safe corridor tomorrow.",
      "In the void, patience compounds faster than fear.",
      "No wreck is empty if you know which echo to follow.",
      "Even ash has a trade value when carried by steady hands.",
    ],
    system: [
      "A stable port is just a promise defended often.",
      "Supply wins wars long before fleets ever fire.",
      "No colony survives on courage without logistics.",
      "Influence is counted in docking rights, not speeches.",
      "Routes harden into power when convoys keep moving.",
      "A system falls slowly, one neglected relay at a time.",
    ],
    phenomena: [
      "Every rift is a question asked in the language of gravity.",
      "Old gates do not sleep; they wait for a careless hand.",
      "A quiet anomaly is usually only quiet for now.",
      "The void sings loudest to captains who rush.",
      "If you can map the echo, you can bargain with it.",
      "Phase-scars remember every fleet that crossed them.",
    ],
  };
  const threads = threadsByDeck[deckKey] || threadsByDeck.empty;
  return `"${threads[(i1 + slot * 2) % threads.length]}" — ${v}`;
}

function stageForIndex(i1) {
  if (i1 <= 33) return 0; // early
  if (i1 <= 67) return 1; // mid
  return 2; // late
}

function num(n) {
  return Math.max(0, Math.floor(n));
}

function instantOutcomeSet(deckKey, i1, labels, scope, profile) {
  const stage = stageForIndex(i1);
  const costly = profile.costlySlots.includes(i1); // ~10% have a cost and stronger effect
  const tier = profile.tier;

  // Cross-deck + late-game scaling (higher for system/phenomena and late cards).
  const softCredits = num(2 + tier + (stage === 2 ? 1 : 0));
  const softEnergy = num(1 + (tier === 2 && stage >= 1 ? 1 : 0));

  const hardCredits = num(5 + tier + stage);
  const hardEnergy = num(2 + (tier >= 1 ? 1 : 0) + (tier === 2 && stage === 2 ? 1 : 0));
  const hardInfluence = num(1 + (tier === 2 && stage === 2 ? 1 : 0));

  const costlyCredits = num(hardCredits + 2);
  const costlyEnergy = num(hardEnergy + 1);
  const costlyFleet = num(1 + (tier === 2 && stage === 2 ? 1 : 0));
  const costlyInfluence = num(hardInfluence);

  const softLossCredits = num(2 + (tier === 2 && stage === 2 ? 1 : 0));

  const globalSoftCredits = num(Math.max(1, softCredits - 1));

  const aEffect =
    scope === "Local"
      ? `Gain ${softCredits} Credits and place 1 DRIFTMARK in a hex within 2.`
      : scope === "Global"
      ? `Gain ${globalSoftCredits} Credits; each player gains 1 Credits.`
      : `Gain ${softCredits} Credits and ${softEnergy} Energy.`;

  const globalHardCredits = num(Math.max(2, hardCredits - 1));

  const bNormalEffect =
    scope === "Local"
      ? `Gain ${num(hardCredits - 1)} Credits; one friendly fleet within 2 takes a FORTIFIED token.`
      : scope === "Global"
      ? `Gain ${globalHardCredits} Credits; gain +1 Influence.`
      : `Gain ${hardCredits} Credits, ${hardEnergy} Energy, and +${hardInfluence} Influence.`;

  const globalCostlyCredits = num(Math.max(3, costlyCredits - 2));
  const globalCostlyFleet = num(
    deckKey === "phenomena" && stage === 2 ? 1 : 0
  );

  const bCostlyEffect =
    scope === "Local"
      ? `Gain ${num(costlyCredits - 1)} Credits and +${costlyInfluence} Influence in a hex within 2.`
      : scope === "Global"
      ? globalCostlyFleet > 0
        ? `Gain ${globalCostlyCredits} Credits and +${globalCostlyFleet} Fleet.`
        : `Gain ${globalCostlyCredits} Credits and +1 Influence.`
      : `Gain ${costlyCredits} Credits, ${costlyEnergy} Energy, +${costlyFleet} Fleet, and +${costlyInfluence} Influence.`;

  const cEffect =
    scope === "Local"
      ? "Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2."
      : scope === "Global"
      ? `Lose ${softLossCredits} Credits; each opponent loses 1 Credits.`
      : `Lose ${softLossCredits} Credits and take a JAMMED token.`;

  let bCost = null;
  if (costly) {
    if (deckKey === "empty") bCost = "Spend 1 Energy.";
    else if (deckKey === "system") bCost = "Spend 1 Energy and 1 Credits.";
    else bCost = "Spend 2 Energy.";
  }

  const optionA = {
    label: labels[0],
    profile: "soft_gain",
    timing: "Instant",
    cost: null,
    effect: aEffect,
    onceOnlyNote:
      "Resolve once when chosen, then ignore this option for the rest of the game.",
  };
  const optionB = {
    label: labels[1],
    profile: "hard_gain",
    timing: "Instant",
    cost: bCost,
    effect: costly ? bCostlyEffect : bNormalEffect,
    onceOnlyNote:
      "Resolve once when chosen, then ignore this option for the rest of the game.",
  };
  const optionC = {
    label: labels[2],
    profile: "soft_loss",
    timing: "Instant",
    cost: null, // negative effects never have a cost
    effect: cEffect,
    onceOnlyNote:
      "Resolve once when chosen, then ignore this option for the rest of the game.",
  };

  return { optionA, optionB, optionC, costly };
}

function rearPowers(deckKey, i1, scope, hasCostlyInstant, retriggerThisCard, profile) {
  const stage = stageForIndex(i1);
  const tier = profile.tier;
  const overdrive = profile.overdriveSlots.includes(i1); // ~10% powerful primary + minor negative secondary
  const activationCost = overdrive ? "Pay 1 Energy." : "No cost.";

  const pCredits = num(2 + tier + (stage >= 1 ? 1 : 0));
  const pEnergy = num(1 + (tier >= 1 ? 1 : 0) + (tier === 2 && stage === 2 ? 1 : 0));
  const pInfluence = num(1 + (tier === 2 && stage === 2 ? 1 : 0));

  let primaryEffect =
    scope === "Local"
      ? `Gain ${pCredits} Credits and choose a hex within 2: gain +${pInfluence} Influence there.`
      : scope === "Global"
      ? `Gain ${num(pCredits + 1)} Credits and +${pInfluence} Influence.`
      : `Gain ${pCredits} Credits and ${pEnergy} Energy.`;

  if (overdrive) {
    const odCredits = num(pCredits + 2);
    const odEnergy = num(pEnergy + 1);
    const odFleet = num(1 + (tier === 2 && stage >= 1 ? 1 : 0));
    const odInfluence = num(pInfluence + (tier >= 1 ? 1 : 0));
    primaryEffect =
      scope === "Local"
        ? `Gain ${odCredits} Credits, ${odEnergy} Energy, and one friendly fleet within 2 takes a FORTIFIED token.`
        : scope === "Global"
        ? `Gain ${num(Math.max(4, odCredits - 1))} Credits, ${odEnergy} Energy, and +${num(
            Math.max(0, odFleet - 1)
          )} Fleet.`
        : `Gain ${odCredits} Credits, ${odEnergy} Energy, +${odFleet} Fleet, and +${odInfluence} Influence.`;
  }

  if (hasCostlyInstant) {
    primaryEffect +=
      " If this card had a costly instant option this game, gain +1 Credits.";
  }

  if (retriggerThisCard) {
    primaryEffect +=
      " TRIGGER-ECHO: choose one instant option on this card that has already resolved and trigger its effect again.";
  }

  let secondaryEffect = "Second-most influential faction gains 1 Credits.";
  if (overdrive) {
    if (deckKey === "empty") {
      secondaryEffect = "Second-most influential faction loses 1 Credits (minor backlash).";
    } else if (deckKey === "system") {
      secondaryEffect =
        "Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).";
    } else {
      secondaryEffect =
        "Second-most influential faction loses 2 Credits (minor backlash).";
    }
  }

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

function generateDeck(deckKey, sourceCards) {
  const profile = balanceProfileByDeck[deckKey] || balanceProfileByDeck.empty;
  const retriggerCardIndex = profile.retriggerCardIndex;

  const cardsOut = sourceCards.map((card, idx) => {
    const i1 = idx + 1;
    const scope = scopeForIndex(i1);
    const labels = optionLabels(deckKey, card.title, i1);
    const instants = instantOutcomeSet(deckKey, i1, labels, scope, profile);
    const retriggerThisCard = i1 === retriggerCardIndex;
    const rear = rearPowers(
      deckKey,
      i1,
      scope,
      instants.costly,
      retriggerThisCard,
      profile
    );

    if (retriggerThisCard) {
      instants.optionA.effect += " Place 1 TRIGGER-ECHO token on this card.";
    }

    return {
      id: card.id,
      title: card.title,
      deck: deckKey,
      front: {
        line1_title: card.title,
        line2_description: descriptionFor(deckKey, card.title, i1),
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
      flavor: loreLine(deckKey, i1, i1 % 3),
      metadata: {
        scope,
        fixedMapping: true,
        outcomes: ["soft_gain", "hard_gain", "soft_loss"],
        costlyInstantOptionPresent: instants.costly,
        primaryIsOverdrive: profile.overdriveSlots.includes(i1),
        retriggerCapablePrimary: retriggerThisCard,
        keywords: keywordPack(i1),
        statusEffectsUsed: ["JAMMED", "EXPOSED", "FORTIFY", "VANTAGE"],
        notes:
          "Options are one-shot instants. Rear powers persist. Secondary auto-applies on primary activation.",
        titleKey: card.title,
      },
    };
  });

  const cardsByTitle = {};
  for (const c of cardsOut) cardsByTitle[c.title] = c;

  const jsonOut = {
    schemaVersion: "1.1.0",
    deck: deckKey,
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
        costlyOptionRate: "about 10% (distributed across deck for balance)",
        cannotPay: "If cost cannot be paid, effect does not happen.",
        negativeEffectsCost: "Negative effects never have a cost.",
      },
      combatResolutionNotes: {
        fortified:
          "A FORTIFIED token may be discarded to negate one hit taken by that fleet.",
        exposed:
          "An EXPOSED token is discarded when that fleet next takes a hit; that fleet then takes one additional hit.",
        jammed:
          "A JAMMED token prevents fleet movement and is discarded at END of turn.",
        vantage:
          "At combat start, a side may discard a VANTAGE token to win draw outcomes; if both sides discard VANTAGE, they cancel out.",
      },
      balanceCurve:
        "Power scales by deck tier (empty < system < phenomena) and trends stronger in late deck positions.",
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
  md += `# ${deckKey[0].toUpperCase()}${deckKey.slice(
    1
  )} Deck Card Text (Front + Rear)\n\n`;
  md += "Generated from agreed design constraints.\n\n";
  md += "## Core Rules Profile\n\n";
  md +=
    "- Fixed front/back mapping per card; option outcomes are deterministic for that card.\n";
  md +=
    "- Front uses 6-line format: Title, Description, Decision, Option A, Option B, Option C.\n";
  md +=
    "- Option results are instant and one-shot: resolve once, then ignored for rest of game.\n";
  md +=
    "- Rear powers persist: controller can use **On Activation** action after card flips.\n";
  md += "- Secondary effect auto-triggers each time On Activation is used.\n";
  md +=
    "- Controller = most influence; secondary target = second-most influence.\n";
  md += "- Around 10% of cards have costly instant options with stronger effects.\n";
  md += "- If a player cannot pay a cost, that effect does not happen.\n";
  md += "- Negative effects never have a cost.\n";
  md +=
    "- At least one card has TRIGGER-ECHO primary that retriggers a resolved option effect.\n\n";

  md += "## Combat Interaction Notes\n\n";
  md +=
    "- FORTIFY: a fleet with a FORTIFIED token may discard one token to negate one hit taken.\n";
  md +=
    "- EXPOSED: when a fleet with EXPOSED takes a hit, discard EXPOSED and apply one extra hit.\n";
  md +=
    "- JAMMED: a JAMMED fleet cannot move; discard JAMMED at END of turn.\n";
  md +=
    "- VANTAGE: at combat start, a side may discard VANTAGE to win draw outcomes; if both sides use VANTAGE, they cancel out.\n\n";

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
    md += `- Scope mix in this block: ${block.filter(
      (c) => c.metadata.scope === "Self"
    ).length} self, ${block.filter((c) => c.metadata.scope === "Local").length} local, ${block.filter((c) => c.metadata.scope === "Global").length} global.\n`;
    md += `- Costly instant options in this block: ${block.filter(
      (c) => c.metadata.costlyInstantOptionPresent
    ).length}/10.\n`;
    md += `- Overdrive primary with minor secondary backlash: ${block.filter(
      (c) => c.metadata.primaryIsOverdrive
    ).length}/10.\n`;
    md += "- One-shot options are distinct from persistent rear powers.\n";
    md +=
      "- Secondary effects are tied to primary activation and never resolve independently.\n\n";

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
      if (c.instantOptionResults.optionA.cost)
        md += ` Cost: ${c.instantOptionResults.optionA.cost}`;
      md += "\n";
      md += `- Option B (${c.instantOptionResults.optionB.label}): ${c.instantOptionResults.optionB.effect}`;
      if (c.instantOptionResults.optionB.cost)
        md += ` Cost: ${c.instantOptionResults.optionB.cost}`;
      md += "\n";
      md += `- Option C (${c.instantOptionResults.optionC.label}): ${c.instantOptionResults.optionC.effect}`;
      if (c.instantOptionResults.optionC.cost)
        md += ` Cost: ${c.instantOptionResults.optionC.cost}`;
      md += "\n\n";

      md += "**Rear Powers (persistent after flip)**\n";
      md += `- Controller rule: ${c.rear.controllerRule}\n`;
      md += `- Secondary rule: ${c.rear.runnerUpRule}\n`;
      md += `- Primary (On Activation Action): ${c.rear.primaryAction.effect} Activation cost: ${c.rear.primaryAction.activationCost}\n`;
      md += `- Secondary (auto on activation): ${c.rear.secondaryOnActivation.effect}\n`;
      md += `- Flavor: ${c.flavor}\n\n`;
    }
  }

  return { cardsOut, cardsByTitle, jsonOut, md };
}

const allDeckOutputs = [];

for (const cfg of deckConfig) {
  const sourceCards = JSON.parse(fs.readFileSync(cfg.sourcePath, "utf8"));
  const generated = generateDeck(cfg.key, sourceCards);
  fs.writeFileSync(cfg.outJsonPath, JSON.stringify(generated.jsonOut, null, 2), "utf8");
  fs.writeFileSync(cfg.outMdPath, generated.md, "utf8");
  allDeckOutputs.push({
    deck: cfg.key,
    cardCount: generated.cardsOut.length,
    cards: generated.cardsOut,
  });
  console.log(`Wrote ${cfg.outMdPath}`);
  console.log(`Wrote ${cfg.outJsonPath}`);
}

const allOut = {
  schemaVersion: "1.1.0",
  generatedAt: new Date().toISOString(),
  totals: {
    decks: allDeckOutputs.length,
    cards: allDeckOutputs.reduce((acc, d) => acc + d.cardCount, 0),
  },
  keywordGlossary,
  keywordGlossaryRules,
  decks: allDeckOutputs.map((d) => ({
    deck: d.deck,
    cardCount: d.cardCount,
  })),
  cards: allDeckOutputs.flatMap((d) => d.cards),
};

fs.writeFileSync(outAllJsonPath, JSON.stringify(allOut, null, 2), "utf8");
console.log(`Wrote ${outAllJsonPath}`);
