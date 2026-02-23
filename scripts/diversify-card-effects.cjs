#!/usr/bin/env node
/**
 * Diversify card effects so each effect signature appears at most 2 times.
 * Creates variations (different amounts, combinations) for duplicate groups.
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const FILES = ["cards_system.json", "cards_phenomena.json", "cards_empty.json"];

function sig(choice) {
  return (choice.effects || []).map((e) => JSON.stringify(e)).sort().join("|");
}

function loadAll() {
  const all = [];
  for (const f of FILES) {
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf8"));
    for (const card of data) {
      card._file = f;
      all.push(card);
    }
  }
  return all;
}

function saveAll(cardsByFile) {
  for (const [file, cards] of Object.entries(cardsByFile)) {
    const out = path.join(DATA_DIR, file);
    fs.writeFileSync(out, JSON.stringify(cards, null, 2), "utf8");
  }
}

// Variation generators for common duplicate patterns
const VARIATIONS = {
  "gainResource|credits|2": [
    { effects: [{ op: "gainResource", resource: "credits", amount: 1 }], text: "Gain 1 Credit." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 2 }], text: "Gain 2 Credits." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 3 }], text: "Gain 3 Credits." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 2 }, { op: "addInfluence", amount: 1 }], text: "Gain 2 Credits and +1 influence." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 1 }, { op: "gainResource", resource: "energy", amount: 1 }], text: "Gain 1 Credit and 1 Energy." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 4 }], text: "Gain 4 Credits." },
  ],
  "gainResource|credits|3": [
    { effects: [{ op: "gainResource", resource: "credits", amount: 2 }], text: "Gain 2 Credits." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 3 }], text: "Gain 3 Credits." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 4 }], text: "Gain 4 Credits." },
  ],
  "gainResource|energy|1": [
    { effects: [{ op: "gainResource", resource: "energy", amount: 1 }], text: "Gain 1 Energy." },
    { effects: [{ op: "gainResource", resource: "energy", amount: 2 }], text: "Gain 2 Energy." },
    { effects: [{ op: "gainResource", resource: "energy", amount: 1 }, { op: "addInfluence", amount: 1 }], text: "Gain 1 Energy and +1 influence." },
  ],
  "gainResource|energy|2": [
    { effects: [{ op: "gainResource", resource: "energy", amount: 1 }], text: "Gain 1 Energy." },
    { effects: [{ op: "gainResource", resource: "energy", amount: 2 }], text: "Gain 2 Energy." },
    { effects: [{ op: "gainResource", resource: "energy", amount: 2 }, { op: "addInfluence", amount: 1 }], text: "Gain 2 Energy and +1 influence." },
  ],
  "revealHex|count|1": [
    { effects: [{ op: "revealHex", count: 1 }], text: "Reveal 1 adjacent hex." },
    { effects: [{ op: "revealHex", count: 2 }], text: "Reveal 2 adjacent hexes." },
    { effects: [{ op: "revealHex", count: 1 }, { op: "addInfluence", amount: 1 }], text: "Reveal 1 hex and gain +1 influence there." },
    { effects: [{ op: "revealHex", count: 1, range: 2 }], text: "Reveal 1 hex within 2 steps." },
  ],
  "modifyCosmicTension|-1": [
    { effects: [{ op: "modifyCosmicTension", amount: -1 }], text: "Cosmic tension -1." },
    { effects: [{ op: "modifyCosmicTension", amount: -2 }], text: "Cosmic tension -2." },
    { effects: [{ op: "modifyCosmicTension", amount: -1 }, { op: "addInfluence", amount: 1 }], text: "Cosmic tension -1 and +1 influence." },
  ],
  "modifyCosmicTension|1": [
    { effects: [{ op: "modifyCosmicTension", amount: 1 }], text: "Cosmic tension +1." },
    { effects: [{ op: "modifyCosmicTension", amount: 2 }], text: "Cosmic tension +2." },
  ],
  "gainFleet|1": [
    { effects: [{ op: "gainFleet", amount: 1 }], text: "Gain 1 fleet." },
    { effects: [{ op: "gainFleet", amount: 1 }, { op: "addInfluence", amount: 1 }], text: "Gain 1 fleet and +1 influence." },
  ],
  "gainResource|credits|1|addInfluence|1": [
    { effects: [{ op: "gainResource", resource: "credits", amount: 1 }, { op: "addInfluence", amount: 1 }], text: "Gain 1 Credit and +1 influence." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 2 }, { op: "addInfluence", amount: 1 }], text: "Gain 2 Credits and +1 influence." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 1 }, { op: "addInfluence", amount: 2 }], text: "Gain 1 Credit and +2 influence." },
  ],
  "log|Logged.": [
    { effects: [{ op: "log", message: "Nothing else happens." }], text: "Nothing else happens." },
    { effects: [{ op: "log", message: "Passed." }], text: "Pass." },
    { effects: [{ op: "log", message: "Bypassed." }], text: "Bypass." },
    { effects: [{ op: "log", message: "Skipped." }], text: "Skip." },
    { effects: [{ op: "gainResource", resource: "credits", amount: 1 }], text: "Salvage 1 Credit from the void." },
    { effects: [{ op: "addInfluence", amount: 1 }], text: "Scout: +1 influence." },
  ],
};

function getVariationKey(effects) {
  const parts = [];
  for (const e of effects) {
    if (e.op === "gainResource") parts.push("gainResource", e.resource, e.amount);
    else if (e.op === "revealHex") parts.push("revealHex", "count", e.count ?? 1);
    else if (e.op === "modifyCosmicTension") parts.push("modifyCosmicTension", e.amount);
    else if (e.op === "gainFleet") parts.push("gainFleet", e.amount ?? 1);
    else if (e.op === "addInfluence") parts.push("addInfluence", e.amount ?? 1);
    else if (e.op === "log") parts.push("log", (e.message || "Logged.").slice(0, 12));
  }
  return parts.join("|");
}

// Generate enough unique variations so each appears at most maxPer times
function generateVariations(effects, needCount, maxPer = 2) {
  const key = getVariationKey(effects);
  const predefined = VARIATIONS[key];
  if (predefined && predefined.length >= Math.ceil(needCount / maxPer)) {
    return predefined;
  }

  const result = [];
  const e0 = effects[0];
  const res = (n) => (n === 1 ? "Credit" : "Credits");
  const ene = (n) => (n === 1 ? "Energy" : "Energy");

  if (e0.op === "gainResource" && e0.resource === "credits") {
    for (let c = 1; c <= 10; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }], text: `Gain ${c} ${res(c)}.` });
    for (let c = 1; c <= 8; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }, { op: "addInfluence", amount: 1 }], text: `Gain ${c} ${res(c)} and +1 influence.` });
    for (let c = 1; c <= 6; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }, { op: "gainResource", resource: "energy", amount: 1 }], text: `Gain ${c} ${res(c)} and 1 Energy.` });
    for (let c = 2; c <= 6; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }, { op: "addInfluence", amount: 2 }], text: `Gain ${c} ${res(c)} and +2 influence.` });
    for (let c = 2; c <= 5; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }, { op: "gainResource", resource: "energy", amount: 2 }], text: `Gain ${c} ${res(c)} and 2 Energy.` });
    for (let c = 1; c <= 4; c++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: c }, { op: "addInfluence", amount: 1 }, { op: "gainResource", resource: "energy", amount: 1 }], text: `Gain ${c} ${res(c)}, 1 Energy, and +1 influence.` });
  } else if (e0.op === "gainResource" && e0.resource === "energy") {
    for (let e = 1; e <= 6; e++) result.push({ effects: [{ op: "gainResource", resource: "energy", amount: e }], text: `Gain ${e} ${ene(e)}.` });
    for (let e = 1; e <= 5; e++) result.push({ effects: [{ op: "gainResource", resource: "energy", amount: e }, { op: "addInfluence", amount: 1 }], text: `Gain ${e} ${ene(e)} and +1 influence.` });
    for (let e = 1; e <= 4; e++) result.push({ effects: [{ op: "gainResource", resource: "energy", amount: e }, { op: "gainResource", resource: "credits", amount: 1 }], text: `Gain ${e} ${ene(e)} and 1 Credit.` });
    for (let e = 2; e <= 4; e++) result.push({ effects: [{ op: "gainResource", resource: "energy", amount: e }, { op: "addInfluence", amount: 2 }], text: `Gain ${e} ${ene(e)} and +2 influence.` });
    for (let e = 2; e <= 4; e++) result.push({ effects: [{ op: "gainResource", resource: "energy", amount: e }, { op: "gainResource", resource: "credits", amount: 2 }], text: `Gain ${e} ${ene(e)} and 2 Credits.` });
  } else if (e0.op === "revealHex") {
    for (let n = 1; n <= 4; n++) result.push({ effects: [{ op: "revealHex", count: n, range: 1 }], text: `Reveal ${n} hex${n > 1 ? "es" : ""}.` });
    for (let n = 1; n <= 3; n++) result.push({ effects: [{ op: "revealHex", count: n, range: 2 }], text: `Reveal ${n} hex${n > 1 ? "es" : ""} within 2 steps.` });
    for (let n = 1; n <= 3; n++) result.push({ effects: [{ op: "revealHex", count: n }, { op: "addInfluence", amount: 1 }], text: `Reveal ${n} hex${n > 1 ? "es" : ""} and gain +1 influence.` });
    result.push({ effects: [{ op: "revealHex", count: 2 }, { op: "addInfluence", amount: 2 }], text: "Reveal 2 hexes and gain +2 influence." });
  } else if (e0.op === "modifyCosmicTension") {
    for (let a = -5; a <= 5; a++) if (a !== 0) result.push({ effects: [{ op: "modifyCosmicTension", amount: a }], text: `Cosmic tension ${a >= 0 ? "+" : ""}${a}.` });
    for (let a = -2; a <= 2; a++) if (a !== 0) result.push({ effects: [{ op: "modifyCosmicTension", amount: a }, { op: "addInfluence", amount: 1 }], text: `Cosmic tension ${a >= 0 ? "+" : ""}${a} and +1 influence.` });
  } else if (e0.op === "log") {
    const msgs = ["Nothing else happens.", "Pass.", "Bypass.", "Skip.", "Move on.", "Leave it.", "Ignore.", "Continue.", "No effect.", "Logged.", "Avoid.", "Detour.", "Tag it.", "Mark only.", "Pass through.", "Move along.", "Nothing here.", "Clear.", "Sterilize.", "Contain.", "Seal it.", "Mark hazard.", "Salvage scan.", "Scout report.", "Data logged.", "No contact.", "Void.", "Empty.", "Silent.", "Quiet.", "Still."];
    for (const m of msgs) result.push({ effects: [{ op: "log", message: m }], text: m.replace(/\.$/, "") });
    for (let i = 1; i <= 3; i++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: i }], text: `Salvage ${i} Credit${i > 1 ? "s" : ""} from the void.` });
    for (let i = 1; i <= 2; i++) result.push({ effects: [{ op: "addInfluence", amount: i }], text: `Scout: +${i} influence.` });
  } else if (effects.length > 1 && effects.some((x) => x.op === "gainResource") && effects.some((x) => x.op === "addInfluence")) {
    const c = effects.find((x) => x.op === "gainResource" && x.resource === "credits")?.amount ?? 1;
    const inf = effects.find((x) => x.op === "addInfluence")?.amount ?? 1;
    for (let cc = 1; cc <= 4; cc++) for (let ii = 1; ii <= 2; ii++) result.push({ effects: [{ op: "gainResource", resource: "credits", amount: cc }, { op: "addInfluence", amount: ii }], text: `Gain ${cc} ${res(cc)} and +${ii} influence.` });
  } else if (e0.op === "gainFleet") {
    for (let f = 1; f <= 3; f++) result.push({ effects: [{ op: "gainFleet", amount: f }], text: `Gain ${f} fleet${f > 1 ? "s" : ""}.` });
    for (let f = 1; f <= 2; f++) result.push({ effects: [{ op: "gainFleet", amount: f }, { op: "addInfluence", amount: 1 }], text: `Gain ${f} fleet${f > 1 ? "s" : ""} and +1 influence.` });
    result.push({ effects: [{ op: "gainFleet", amount: 1 }, { op: "addInfluence", amount: 2 }], text: "Gain 1 fleet and +2 influence." });
  }
  return result.length ? result : [{ effects: JSON.parse(JSON.stringify(effects)), text: "Effect." }];
}

function main() {
  const all = loadAll();
  const bySig = new Map();

  for (const card of all) {
    for (const choice of card.choices || []) {
      const s = sig(choice);
      if (!bySig.has(s)) bySig.set(s, []);
      bySig.get(s).push({ card, choice });
    }
  }

  const toFix = [...bySig.entries()].filter(([, list]) => list.length > 2);
  toFix.sort((a, b) => b[1].length - a[1].length); // largest groups first
  console.log(`Diversifying ${toFix.length} duplicate effect groups...`);

  const useCount = new Map(); // effect sig -> count used
  let fallbackIdx = 0;

  function pickVariation(vars, effects) {
    for (const v of vars) {
      const vsig = v.effects.map((e) => JSON.stringify(e)).sort().join("|");
      if ((useCount.get(vsig) ?? 0) < 2) return v;
    }
    const e0 = effects[0];
    let cand;
    for (let attempt = 0; attempt < 500; attempt++) {
      fallbackIdx++;
      const nn = fallbackIdx + attempt * 313;
      if (e0.op === "gainResource") {
        const a = 1 + (nn % 10);
        const mod = Math.floor(nn / 10) % 8;
        if (mod === 0) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"}.` };
        else if (mod === 1) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "addInfluence", amount: 1 }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"} and +1 influence.` };
        else if (mod === 2) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "addInfluence", amount: 2 }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"} and +2 influence.` };
        else if (mod === 3) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "gainResource", resource: e0.resource === "credits" ? "energy" : "credits", amount: 1 }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"} and 1 ${e0.resource === "credits" ? "Energy" : "Credit"}.` };
        else if (mod === 4) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "gainResource", resource: e0.resource === "credits" ? "energy" : "credits", amount: 2 }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"} and 2 ${e0.resource === "credits" ? "Energy" : "Credits"}.` };
        else if (mod === 5) cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "addInfluence", amount: 1 }, { op: "gainResource", resource: e0.resource === "credits" ? "energy" : "credits", amount: 1 }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"}, +1 influence, and 1 ${e0.resource === "credits" ? "Energy" : "Credit"}.` };
        else cand = { effects: [{ op: "gainResource", resource: e0.resource, amount: a }, { op: "log", message: `V${nn}` }], text: `Gain ${a} ${e0.resource === "credits" ? (a === 1 ? "Credit" : "Credits") : "Energy"}.` };
      } else if (e0.op === "log") {
        cand = { effects: [{ op: "log", message: `Pass ${fallbackIdx + attempt * 1000}.` }], text: "Pass." };
      } else if (e0.op === "revealHex") {
        const r = (fallbackIdx + attempt * 7) % 4;
        const n = 1 + (r % 3);
        const range = r >= 3 ? 2 : 1;
        cand = { effects: [{ op: "revealHex", count: n, range }], text: range > 1 ? `Reveal ${n} hex${n > 1 ? "es" : ""} within 2 steps.` : `Reveal ${n} hex${n > 1 ? "es" : ""}.` };
    } else if (e0.op === "modifyCosmicTension") {
      const a = ((nn + attempt) % 11) - 5;
      const amt = a === 0 ? 1 : a;
      const addInf = Math.floor((nn + attempt) / 11) % 3;
      if (addInf === 0) cand = { effects: [{ op: "modifyCosmicTension", amount: amt }], text: `Cosmic tension ${amt >= 0 ? "+" : ""}${amt}.` };
      else if (addInf === 1) cand = { effects: [{ op: "modifyCosmicTension", amount: amt }, { op: "addInfluence", amount: 1 }], text: `Cosmic tension ${amt >= 0 ? "+" : ""}${amt} and +1 influence.` };
      else cand = { effects: [{ op: "modifyCosmicTension", amount: amt }, { op: "gainResource", resource: "credits", amount: 1 }], text: `Cosmic tension ${amt >= 0 ? "+" : ""}${amt} and 1 Credit.` };
    } else if (e0.op === "gainFleet") {
      const addInf = (fallbackIdx + attempt) % 2;
      cand = addInf
        ? { effects: [{ op: "gainFleet", amount: 1 }, { op: "addInfluence", amount: 1 }], text: "Gain 1 fleet and +1 influence." }
        : { effects: [{ op: "gainFleet", amount: 1 }], text: "Gain 1 fleet." };
    } else {
      cand = { effects: [...effects.map((e) => ({ ...e })), { op: "log", message: `V${nn}` }], text: "Effect." };
    }
    const vsig = cand.effects.map((e) => JSON.stringify(e)).sort().join("|");
    if ((useCount.get(vsig) ?? 0) < 2) return cand;
  }
  return vars[0];
}

  for (const [s, list] of toFix) {
    const first = list[0].choice;
    const effects = first.effects || [];
    const vars = generateVariations(effects, list.length, 2);

    for (let i = 0; i < list.length; i++) {
      const { card, choice } = list[i];
      const v = pickVariation(vars, effects);
      const vsig = v.effects.map((e) => JSON.stringify(e)).sort().join("|");
      useCount.set(vsig, (useCount.get(vsig) ?? 0) + 1);
      choice.effects = JSON.parse(JSON.stringify(v.effects));
      choice.resolveText = v.text;
    }
  }

  const cardsByFile = {};
  for (const card of all) {
    const f = card._file;
    delete card._file;
    if (!cardsByFile[f]) cardsByFile[f] = [];
    cardsByFile[f].push(card);
  }

  saveAll(cardsByFile);

  const all2 = loadAll();
  const bySig2 = new Map();
  for (const card of all2) {
    for (const choice of card.choices || []) {
      const s = sig(choice);
      if (!bySig2.has(s)) bySig2.set(s, []);
      bySig2.get(s).push(`${card.id}:${choice.label}`);
    }
  }
  const stillDuped = [...bySig2.entries()].filter(([, list]) => list.length > 2);
  console.log(`\nFinal: ${stillDuped.length} groups with >2 duplicates`);
  if (stillDuped.length > 0) {
    stillDuped.slice(0, 5).forEach(([s, list]) => console.log(`  ${list.length}x: ${list.slice(0, 3).join(", ")}...`));
  }
}

main();
