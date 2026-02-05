import fs from "node:fs/promises";
import path from "node:path";

const outPath = new URL("../data/event_deck.json", import.meta.url);

const SPECIAL_RESOURCE_TYPES = [
  "Antimatter",
  "Collapsium",
  "Monopoles",
  "Ancient Relics",
  "Alien Art",
  "Exotic Matter"
];

function makeRng(seed = 42) {
  let state = seed >>> 0;
  return {
    next() {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 2 ** 32;
    },
    int(max) {
      return Math.floor(this.next() * max);
    }
  };
}

function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = rng.int(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const rng = makeRng(20240215);

const kinds = [
  ...Array.from({ length: 150 }, () => "system"),
  ...Array.from({ length: 120 }, () => "phenomena"),
  ...Array.from({ length: 30 }, () => "empty")
];
shuffle(kinds, rng);

const fatePool = [];
for (let i = 0; i < 50; i += 1) fatePool.push({ type: "toHand", category: "asset" });
for (let i = 0; i < 35; i += 1) fatePool.push({ type: "toHand", category: "doom" });
for (let i = 0; i < 30; i += 1) fatePool.push({ type: "toHand", category: "hidden_vp" });
for (let i = 0; i < 30; i += 1) fatePool.push({ type: "toSpecialResourceStash", resourceType: SPECIAL_RESOURCE_TYPES[i % SPECIAL_RESOURCE_TYPES.length] });
for (let i = 0; i < 5; i += 1) fatePool.push({ type: "discard" });
shuffle(fatePool, rng);

let nonSystemIndex = 0;
let bonusTokenCount = 0;
let agreementCount = 0;
let tensionReductionCount = 0;

function makeActivation(index) {
  const threshold = 7 + (index % 6);
  return {
    threshold,
    cost: { credits: threshold >= 7 ? 1 : 0, energy: threshold >= 9 ? 1 : 0 },
    controllerEffects: [{ op: "gainCredits", n: 2 }, { op: "gainEnergy", n: 1 }],
    secondaryEffects: [{ op: "gainCredits", n: 1 }]
  };
}

function pickRarity(index) {
  if (index % 47 === 0) return "mythic";
  if (index % 23 === 0) return "rare";
  if (index % 7 === 0) return "uncommon";
  return "common";
}

const cards = [];
for (let i = 0; i < 300; i += 1) {
  const kind = kinds[i];
  const id = `EVT-${String(i + 1).padStart(4, "0")}`;
  const rarity = pickRarity(i + 1);
  const frontOptions = [
    { key: "A", label: "Investigate cautiously" },
    { key: "B", label: "Broadcast a response" }
  ];
  if (i % 5 === 0) frontOptions.push({ key: "C", label: "Ignore and move on" });

  const backByChoice = {};
  if (kind === "system") {
    backByChoice.A = {
      resolveOnReveal: false,
      resolution: [{ op: "gainCredits", n: 1 }],
      cardFate: { type: "leaveInCell" },
      cellCard: {
        activation: makeActivation(i),
        onEnterEffects: [{ op: "gainInfluenceHere", n: 1 }]
      }
    };
    backByChoice.B = {
      resolveOnReveal: false,
      resolution: [{ op: "gainEnergy", n: 1 }],
      cardFate: { type: "discard" }
    };
    if (frontOptions.length === 3) {
      backByChoice.C = {
        resolveOnReveal: false,
        resolution: [{ op: "gainCredits", n: 1 }],
        cardFate: { type: "discard" }
      };
    }
  } else {
    const fate = fatePool[nonSystemIndex] ?? { type: "discard" };
    nonSystemIndex += 1;
    backByChoice.A = {
      resolveOnReveal: false,
      resolution: [{ op: "gainCredits", n: 1 }],
      cardFate: fate,
      handCard: fate.type === "toHand" ? {
        activation: { threshold: 8, cost: { credits: 0, energy: 0 }, effects: [{ op: "gainCredits", n: 2 }] },
        cashOut: { credits: 2, energy: 0 }
      } : null
    };
    backByChoice.B = {
      resolveOnReveal: false,
      resolution: [{ op: "gainEnergy", n: 1 }],
      cardFate: { type: "discard" }
    };
    if (frontOptions.length === 3) {
      backByChoice.C = {
        resolveOnReveal: false,
        resolution: [{ op: "gainCredits", n: 1 }],
        cardFate: { type: "discard" }
      };
    }
  }

  if (bonusTokenCount < 40 && (i % 6 === 0)) {
    backByChoice.A.resolution.push({ op: "grantBonusToken", kind: "silver", amount: 1 });
    bonusTokenCount += 1;
  }
  if (agreementCount < 40 && (i % 7 === 0)) {
    backByChoice.B.resolution.push({ op: "offerAgreement", toFactionId: "choir", agreementTypeId: "trade-pact" });
    agreementCount += 1;
  }
  if (tensionReductionCount < 5 && rarity === "mythic") {
    backByChoice.B.resolution.push({
      op: "reduceTension",
      n: 2,
      cost: { credits: 4, energy: 3 }
    });
    tensionReductionCount += 1;
  }

  cards.push({
    id,
    rarity,
    kind,
    front: {
      title: `${kind === "system" ? "System" : kind === "phenomena" ? "Phenomena" : "Empty"} Signal ${i + 1}`,
      flavor: "Static drifts across the comms.",
      options: frontOptions
    },
    back: {
      title: `${kind === "system" ? "Anchored Facility" : kind === "phenomena" ? "Anomalous Wake" : "Quiet Drift"}`,
      rulesText: "Resolve the chosen option, then follow the fate.",
      byChoice: backByChoice,
      tags: [kind, rarity]
    }
  });
}

await fs.writeFile(outPath, JSON.stringify(cards, null, 2));
console.log(`Generated ${cards.length} event cards at ${path.resolve(outPath.pathname)}`);
