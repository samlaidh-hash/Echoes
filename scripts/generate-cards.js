#!/usr/bin/env node
/**
 * Generates 300 cards (100 empty, 100 system, 100 phenomena).
 * Faction synergies (cards that place tokens factions benefit from):
 *   - Salvagers: debris_field, derelict (salvage, no entry cost)
 *   - Gatekeepers: beacon, gate (relay network)
 *   - Syndicate: trade_route (caravan, trade network)
 *   - Bloom: biomass (absorb, mycelium)
 *   - Directorate: outpost (garrison, influence)
 *   - Choir: revealHex choices (Oracle Scan peek synergy)
 * Run: node scripts/generate-cards.js
 */

const fs = require("fs");
const path = require("path");

// Seeded RNG for reproducibility
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN(rng, arr, n) {
  const shuffled = [...arr].sort(() => rng() - 0.5);
  return shuffled.slice(0, n);
}

const TOKEN_LABELS = {
  empty: "Leave: Nothing",
  debris_field: "Place: Debris Field",
  derelict: "Place: Derelict",
  trade_route: "Place: Trade Route",
  anomaly: "Place: Anomaly",
  mining_outpost: "Place: Mining Outpost",
  outpost: "Place: Outpost",
  research_array: "Place: Research Array",
  ruins: "Place: Ruins",
  gate: "Place: Gate",
  beacon: "Place: Beacon",
  hazard: "Place: Hazard",
  biomass: "Place: Biomass",
  pirate_den: "Place: Pirate Den",
  neutral_enclave: "Place: Neutral Enclave",
};

function tokenNote(t) {
  return TOKEN_LABELS[t] ?? `Place: ${t}`;
}

// Deduplicate titles (keep first occurrence)
function uniqueTitles(arr) {
  return arr.filter((t, i, a) => a.indexOf(t) === i);
}

// Empty-space themed titles
const EMPTY_TITLES = [
  "Cold Wake", "Rogue Trader", "Micrometeor Swarm", "Derelict Buoy Field", "Unclaimed Cache",
  "Void Drift", "Scattered Hulls", "Abandoned Freighter", "Signal Echo", "Dust Cloud",
  "Wreckage Field", "Floating Cargo", "Silent Beacon", "Drift Station", "Ghost Signal",
  "Debris Ring", "Scavenger Trail", "Lost Probe", "Orphaned Pod", "Vacuum Anomaly",
  "Scrap Heap", "Derelict Convoy", "Abandoned Mine", "Floating Ruins", "Signal Ghost",
  "Cargo Graveyard", "Drift Net", "Void Cache", "Scattered Remains", "Silent Relay",
  "Wreck Cluster", "Orbital Debris", "Lost Cargo", "Abandoned Outpost", "Dust Veil",
  "Scavenger's Haul", "Floating Debris", "Signal Burst", "Void Pocket", "Drift Cargo",
  "Hull Fragment", "Orphaned Buoy", "Scrap Field", "Lost Freighter", "Silent Drift",
  "Debris Cloud", "Abandoned Station", "Floating Wreck", "Signal Static",
  "Cargo Scatter", "Derelict Probe", "Dust Ring", "Scavenger Mark", "Ghost Freighter",
  "Wreck Trail", "Orbital Scrap", "Lost Pod", "Abandoned Convoy", "Floating Cache",
  "Debris Field", "Silent Buoy", "Void Remains", "Drift Hull", "Scattered Cargo",
  "Hull Graveyard", "Orphaned Station", "Scrap Cluster", "Lost Beacon",
  "Cargo Drift", "Derelict Hull", "Scavenger Cache", "Ghost Signal",
  "Wreck Field", "Abandoned Probe", "Void Anomaly", "Drift Remains",
  "Debris Scatter", "Silent Convoy", "Orbital Wreck", "Lost Station", "Scrap Trail",
  "Orphaned Cargo", "Ghost Drift", "Cargo Cluster", "Derelict Station", "Floating Scrap",
  "Dust Field", "Scavenger Haul",
  // Additional unique titles
  "Stray Hull", "Void Scatter", "Derelict Probe Field", "Silent Wreck", "Orphaned Relay",
  "Drift Cache", "Scrap Veil", "Abandoned Cargo", "Floating Debris Field", "Signal Drift",
  "Wreckage Cluster", "Lost Buoy", "Void Remnant", "Scavenger's Mark", "Ghost Cargo",
  "Debris Trail", "Silent Scatter", "Orbital Cache", "Drift Remnant", "Cargo Void",
  "Hull Scatter", "Abandoned Relay", "Floating Hull", "Void Echo", "Scattered Wreck",
  "Lost Convoy", "Silent Remains", "Derelict Cache", "Orphaned Wreck", "Drift Scatter",
];

// System-themed titles (all unique)
const SYSTEM_TITLES = [
  "Red Dwarf: Cinder Belt", "Ocean World", "Relic Moon", "Frontier Colony", "Shrine World",
  "Ice Giant", "Desert Planet", "Jungle World", "Barren Rock", "Gas Giant Moon",
  "Terraformed Mars", "Mining Colony", "Research Outpost", "Agri-World", "Forge World",
  "Hive World", "Garden World", "Death World", "Prison Planet", "Pilgrim World",
  "Trading Hub", "Military Base", "Science Station", "Refinery World", "Shipyard System",
  "Binary Stars", "Dwarf System", "Pulsar Outpost", "Nebula Edge", "Asteroid Haven",
  "Frozen Wastes", "Volcanic World", "Ocean Depths", "Crystal Caves", "Magnetic Storm",
  "Solar Farm", "Orbital Station", "Ring World Fragment", "Dyson Swarm", "Lagrange Hub",
  "Colony Alpha", "Outpost Beta", "Station Gamma", "Base Delta", "Port Epsilon",
  "Mining Belt", "Research Complex", "Military Garrison", "Trade Nexus", "Refinery Complex",
  "Ice Moon", "Lava World", "Storm Planet", "Tidal Lock", "Rogue Planet",
  "Gateway System", "Frontier Outpost", "Colonial Hub", "Supply Depot", "Relay Station",
  "Cinder World", "Frost Planet", "Ash World", "Dust World", "Storm World",
  "Orbital Complex", "Surface Base", "Space Station", "Mining Operation", "Research Lab",
  "Colony Prime", "Outpost Secundus", "Station Tertius", "Base Quartus", "Port Quintus",
  "Belt Mining", "Asteroid Refinery", "Orbital Farm", "Solar Collector", "Gas Harvester",
  "Frozen Colony", "Volcanic Outpost", "Ocean Station", "Desert Base", "Jungle Outpost",
  "Gateway Hub", "Relay Nexus", "Supply Chain", "Trade Route End", "Frontier Gate",
  "Cinder Colony", "Frost Base", "Ash Station", "Dust Outpost", "Storm Refuge",
  "Binary Outpost", "Pulsar Station", "Nebula Base", "Dwarf Colony", "Giant Moon",
  "Terraformed Outpost", "Agri-Station", "Forge Base", "Hive Colony", "Garden Station",
  "Death World Outpost", "Prison Station", "Pilgrim Rest", "Military Depot", "Science Base",
  // Additional unique titles
  "Cinder Outpost", "Frost Station", "Ash Colony", "Dust Base", "Storm Haven",
  "Nebula Station", "Pulsar Base", "Binary Colony", "Dwarf Outpost", "Giant Station",
  "Volcanic Base", "Ocean Haven", "Desert Station", "Jungle Base", "Frozen Outpost",
  "Solar Station", "Orbital Haven", "Mining Base", "Research Haven", "Trade Outpost",
  "Military Station", "Colonial Base", "Frontier Haven", "Relay Base", "Supply Station",
];

// Phenomena-themed titles
const PHENOMENA_TITLES = [
  "Dead Civilization", "Ancient Jump Gate", "Black Hole Choir", "The Singing Star", "Megastructure Ruins",
  "Temporal Rift", "Gravity Well", "Quantum Foam", "Singularity Echo", "Reality Tear",
  "Void Maw", "Star Nursery", "Supernova Remnant", "Neutron Pulse", "Dark Matter Node",
  "Anomaly Cluster", "Warp Storm", "Hyperspace Bleed", "Dimensional Rift", "Phase Boundary",
  "Ancient Ruins", "Precursor Relic", "Lost Technology", "Forgotten Gate", "Elder Structure",
  "Cosmic Storm", "Magnetic Anomaly", "Radiation Burst", "Gravitational Lens", "Event Horizon",
  "Singing Void", "Whispering Star", "Screaming Nebula", "Silent Black Hole", "Echoing Rift",
  "Ruined Megastructure", "Abandoned Gate", "Dead Gate", "Frozen Anomaly", "Burning Ruins",
  "Temporal Anomaly", "Spatial Tear", "Reality Bubble", "Phase Shift", "Quantum Echo",
  "Void Anomaly", "Star Anomaly", "Nebula Anomaly", "Rift Anomaly", "Gate Anomaly",
  "Ancient Dead Star", "Collapsed Gate", "Fragmented Megastructure", "Scattered Relics", "Buried Ruins",
  "Cosmic Choir", "Void Singer", "Star Whisper", "Nebula Song", "Rift Harmony",
  "Dead Star Remnant", "Gate Fragment", "Megastructure Debris", "Precursor Ruins", "Elder Relic",
  "Gravity Anomaly", "Magnetic Storm", "Radiation Anomaly", "Phase Anomaly", "Quantum Storm",
  "Singing Anomaly", "Whispering Void", "Screaming Rift", "Silent Anomaly", "Echoing Gate",
  "Ruined Gate", "Abandoned Megastructure", "Dead Relic", "Frozen Gate", "Burning Anomaly",
  "Temporal Gate", "Spatial Anomaly", "Reality Rift", "Phase Gate", "Quantum Rift",
  "Void Ruins", "Star Ruins", "Nebula Ruins", "Rift Ruins", "Gate Ruins",
  "Ancient Anomaly", "Collapsed Megastructure", "Fragmented Gate", "Scattered Anomaly", "Buried Gate",
  "Cosmic Ruins", "Void Gate", "Star Gate", "Nebula Gate", "Rift Gate",
  "Dead Star Gate", "Gate Remnant", "Megastructure Anomaly", "Precursor Gate", "Elder Anomaly",
  "Gravity Gate", "Radiation Gate", "Phase Ruins", "Quantum Gate",
  "Singing Gate", "Whispering Anomaly", "Screaming Gate", "Silent Ruins", "Echoing Anomaly",
  // Additional unique titles (replacing duplicates)
  "Screaming Void", "Whispering Rift", "Silent Gate", "Echoing Void", "Singing Rift",
  "Temporal Ruins", "Spatial Gate", "Reality Anomaly", "Phase Echo", "Quantum Void",
  "Void Storm", "Star Tear", "Nebula Pulse", "Rift Storm", "Gate Echo",
  "Ancient Storm", "Collapsed Void", "Fragmented Storm", "Scattered Gate", "Buried Storm",
  "Cosmic Pulse", "Void Harmony", "Star Storm", "Nebula Void", "Rift Pulse",
  "Dead Star Void", "Gate Storm", "Megastructure Pulse", "Precursor Storm", "Elder Pulse",
  "Gravity Void", "Magnetic Pulse", "Radiation Void", "Phase Storm", "Quantum Pulse",
];

// Choice templates: [choice1, choice2] where each is { label, effects, placeToken }
// Effects use placeholders: CREDITS, ENERGY, FLEET, TENSION, REVEAL
const EMPTY_CHOICE_TEMPLATES = [
  { a: { label: "Salvage", effects: ["credits", 2], token: "debris_field" }, b: { label: "Move on", effects: ["log"], token: "empty" } },
  { a: { label: "Trade", effects: ["credits", 1, "energy", 1], token: "trade_route" }, b: { label: "Ignore", effects: ["log"], token: "empty" } },
  { a: { label: "Push through", effects: ["loseEnergy", 1], token: "anomaly" }, b: { label: "Detour", effects: ["tension", 1], token: "anomaly" } },
  { a: { label: "Harvest", effects: ["energy", 2], token: "debris_field" }, b: { label: "Map it", effects: ["reveal", 1], token: "anomaly" } },
  { a: { label: "Crack it", effects: ["credits", 3, "tension", 1], token: "debris_field" }, b: { label: "Tag it", effects: ["log"], token: "empty" } },
  { a: { label: "Strip hull", effects: ["credits", 2], token: "derelict" }, b: { label: "Mark hazard", effects: ["log"], token: "hazard" } },
  { a: { label: "Establish contact", effects: ["energy", 1], token: "neutral_enclave" }, b: { label: "Avoid", effects: ["log"], token: "empty" } },
  { a: { label: "Plunder", effects: ["credits", 2, "tension", 1], token: "pirate_den" }, b: { label: "Report", effects: ["credits", 1], token: "empty" } },
  { a: { label: "Salvage tech", effects: ["energy", 2], token: "debris_field" }, b: { label: "Leave it", effects: ["log"], token: "empty" } },
  { a: { label: "Set up route", effects: ["credits", 1, "energy", 1], token: "trade_route" }, b: { label: "Pass", effects: ["log"], token: "empty" } },
  { a: { label: "Harvest debris", effects: ["credits", 2], token: "debris_field" }, b: { label: "Chart", effects: ["reveal", 1], token: "anomaly" } },
  { a: { label: "Reactivate", effects: ["tension", 1], token: "gate" }, b: { label: "Dismantle", effects: ["credits", 4], token: "ruins" } },
  { a: { label: "Place beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Skip", effects: ["log"], token: "empty" } },
  { a: { label: "Seed biomass", effects: ["credits", 1], token: "biomass" }, b: { label: "Contain", effects: ["log"], token: "empty" } },
  { a: { label: "Establish outpost", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Survey only", effects: ["reveal", 1], token: "empty" } },
  // Faction synergy: Salvagers (debris), Syndicate (trade_route), Gatekeepers (beacon), Bloom (biomass), Directorate (outpost)
  { a: { label: "Strip for scrap", effects: ["credits", 2], token: "debris_field" }, b: { label: "Leave", effects: ["log"], token: "empty" } },
  { a: { label: "Establish trade lane", effects: ["credits", 2], token: "trade_route" }, b: { label: "Bypass", effects: ["log"], token: "empty" } },
  { a: { label: "Deploy relay beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Mark only", effects: ["log"], token: "anomaly" } },
  { a: { label: "Spread spores", effects: ["credits", 1], token: "biomass" }, b: { label: "Sterilize", effects: ["log"], token: "empty" } },
  { a: { label: "Garrison", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Scout", effects: ["reveal", 1], token: "empty" } },
  { a: { label: "Salvage wreck", effects: ["energy", 2], token: "derelict" }, b: { label: "Avoid", effects: ["log"], token: "empty" } },
  { a: { label: "Caravan stop", effects: ["credits", 1, "energy", 1], token: "trade_route" }, b: { label: "Pass", effects: ["log"], token: "empty" } },
  { a: { label: "Beacon network", effects: ["energy", 1], token: "beacon" }, b: { label: "Chart", effects: ["reveal", 1], token: "empty" } },
];

const SYSTEM_CHOICE_TEMPLATES = [
  { a: { label: "Mine", effects: ["credits", 3], token: "mining_outpost" }, b: { label: "Chart", effects: ["reveal", 1], token: "outpost" } },
  { a: { label: "Station", effects: ["energy", 1], token: "outpost" }, b: { label: "Extract", effects: ["energy", 2, "tension", 1], token: "outpost" } },
  { a: { label: "Excavate", effects: ["credits", 2], token: "research_array" }, b: { label: "Quarantine", effects: ["tension", -1], token: "research_array" } },
  { a: { label: "Protection", effects: ["fleet", 1], token: "outpost" }, b: { label: "Conscript", effects: ["fleet", 2, "tension", 1], token: "outpost" } },
  { a: { label: "Blessing", effects: ["tension", -1], token: "outpost" }, b: { label: "Loot", effects: ["credits", 3, "tension", 2], token: "ruins" } },
  { a: { label: "Mine belt", effects: ["credits", 2], token: "mining_outpost" }, b: { label: "Research", effects: ["energy", 1], token: "research_array" } },
  { a: { label: "Garrison", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Trade post", effects: ["credits", 2], token: "trade_route" } },
  { a: { label: "Establish route", effects: ["credits", 1], token: "trade_route" }, b: { label: "Extract", effects: ["energy", 2], token: "mining_outpost" } },
  { a: { label: "Colonize", effects: ["fleet", 1], token: "outpost" }, b: { label: "Exploit", effects: ["credits", 3, "tension", 1], token: "outpost" } },
  { a: { label: "Study", effects: ["energy", 1, "reveal", 1], token: "research_array" }, b: { label: "Harvest", effects: ["credits", 3, "tension", 1], token: "ruins" } },
  { a: { label: "Activate gate", effects: ["tension", 1], token: "gate" }, b: { label: "Salvage", effects: ["credits", 4], token: "ruins" } },
  { a: { label: "Place beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Mine", effects: ["credits", 2], token: "mining_outpost" } },
  { a: { label: "Spread biomass", effects: ["credits", 1], token: "biomass" }, b: { label: "Purge", effects: ["log"], token: "empty" } },
  { a: { label: "Outpost", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Forward base", effects: ["fleet", 1], token: "outpost" } },
  { a: { label: "Trade hub", effects: ["credits", 2], token: "trade_route" }, b: { label: "Refinery", effects: ["energy", 2], token: "mining_outpost" } },
  // Faction synergy
  { a: { label: "Debris processing", effects: ["credits", 2], token: "debris_field" }, b: { label: "Clear", effects: ["log"], token: "empty" } },
  { a: { label: "Relay station", effects: ["energy", 1], token: "beacon" }, b: { label: "Mine", effects: ["credits", 2], token: "mining_outpost" } },
  { a: { label: "Biomass outpost", effects: ["credits", 1], token: "biomass" }, b: { label: "Purge", effects: ["tension", -1], token: "empty" } },
  { a: { label: "Directorate garrison", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Forward base", effects: ["fleet", 1], token: "outpost" } },
  { a: { label: "Trade nexus", effects: ["credits", 2], token: "trade_route" }, b: { label: "Research", effects: ["energy", 1], token: "research_array" } },
];

const PHENOMENA_CHOICE_TEMPLATES = [
  { a: { label: "Study", effects: ["energy", 1, "reveal", 1], token: "ruins" }, b: { label: "Harvest", effects: ["credits", 3, "tension", 1], token: "ruins" } },
  { a: { label: "Reactivate", effects: ["tension", 1], token: "gate" }, b: { label: "Dismantle", effects: ["credits", 4], token: "ruins" } },
  { a: { label: "Study horizon", effects: ["energy", 2, "tension", 1], token: "anomaly" }, b: { label: "Harvest matter", effects: ["credits", 5, "loseFleet", 1], token: "anomaly" } },
  { a: { label: "Harvest energy", effects: ["energy", 3, "loseFleet", 1], token: "hazard" }, b: { label: "Silence", effects: ["tension", 2], token: "hazard" } },
  { a: { label: "Plunder", effects: ["credits", 2, "energy", 1], token: "ruins" }, b: { label: "Quarantine", effects: ["tension", -1], token: "ruins" } },
  { a: { label: "Map rift", effects: ["reveal", 1], token: "anomaly" }, b: { label: "Harvest", effects: ["credits", 3], token: "anomaly" } },
  { a: { label: "Stabilize", effects: ["tension", -1], token: "gate" }, b: { label: "Drain", effects: ["energy", 2], token: "gate" } },
  { a: { label: "Place beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Study", effects: ["credits", 2], token: "ruins" } },
  { a: { label: "Seed", effects: ["credits", 1], token: "biomass" }, b: { label: "Purge", effects: ["tension", -1], token: "empty" } },
  { a: { label: "Establish route", effects: ["credits", 2], token: "trade_route" }, b: { label: "Avoid", effects: ["log"], token: "empty" } },
  { a: { label: "Salvage", effects: ["credits", 3], token: "debris_field" }, b: { label: "Mark", effects: ["log"], token: "derelict" } },
  { a: { label: "Excavate", effects: ["credits", 2], token: "ruins" }, b: { label: "Seal", effects: ["tension", -1], token: "ruins" } },
  { a: { label: "Harvest", effects: ["energy", 2], token: "anomaly" }, b: { label: "Study", effects: ["reveal", 1], token: "anomaly" } },
  { a: { label: "Reactivate gate", effects: ["tension", 1], token: "gate" }, b: { label: "Scrap", effects: ["credits", 4], token: "ruins" } },
  { a: { label: "Beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Leave", effects: ["log"], token: "empty" } },
  // Faction synergy
  { a: { label: "Salvage ruins", effects: ["credits", 3], token: "debris_field" }, b: { label: "Study", effects: ["energy", 1], token: "ruins" } },
  { a: { label: "Activate gate", effects: ["tension", 1], token: "gate" }, b: { label: "Scrap", effects: ["credits", 4], token: "ruins" } },
  { a: { label: "Place beacon", effects: ["energy", 1], token: "beacon" }, b: { label: "Harvest", effects: ["credits", 2], token: "anomaly" } },
  { a: { label: "Trade route", effects: ["credits", 2], token: "trade_route" }, b: { label: "Avoid", effects: ["log"], token: "empty" } },
  { a: { label: "Biomass node", effects: ["credits", 1], token: "biomass" }, b: { label: "Contain", effects: ["tension", -1], token: "empty" } },
  { a: { label: "Outpost", effects: ["credits", 1, "influence"], token: "outpost" }, b: { label: "Reveal", effects: ["reveal", 1], token: "empty" } },
];

function buildEffects(effectSpecs) {
  const effects = [];
  for (let i = 0; i < effectSpecs.length; i += 2) {
    const op = effectSpecs[i];
    const val = effectSpecs[i + 1];
    if (op === "credits") effects.push({ op: "gainResource", resource: "credits", amount: val });
    else if (op === "energy") effects.push({ op: "gainResource", resource: "energy", amount: val });
    else if (op === "fleet") effects.push({ op: "gainFleet", amount: val });
    else if (op === "loseFleet") effects.push({ op: "loseFleet", amount: val });
    else if (op === "loseEnergy") effects.push({ op: "loseResource", resource: "energy", amount: val });
    else if (op === "tension") effects.push({ op: "modifyCosmicTension", amount: val });
    else if (op === "reveal") effects.push({ op: "revealHex", count: val });
    else if (op === "log") effects.push({ op: "log", message: "Logged." });
    else if (op === "influence") effects.push({ op: "addInfluence", amount: 1 });
  }
  return effects;
}

function buildChoice(spec) {
  const effects = buildEffects(spec.effects);
  const token = spec.token === "station" ? "outpost" : spec.token === "relic_site" ? "research_array" : spec.token === "dead_star" ? "hazard" : spec.token;
  return {
    label: spec.label,
    resolveText: describeEffects(spec.effects),
    effects,
    placeToken: token === "empty" ? "empty" : token,
  };
}

function describeEffects(specs) {
  const parts = [];
  for (let i = 0; i < specs.length; i += 2) {
    const op = specs[i];
    const val = specs[i + 1];
    if (op === "credits") parts.push(`Gain ${val} credits.`);
    else if (op === "energy") parts.push(`Gain ${val} energy.`);
    else if (op === "fleet") parts.push(`Gain ${val} fleet.`);
    else if (op === "loseFleet") parts.push(`Lose ${val} fleet.`);
    else if (op === "loseEnergy") parts.push(`Lose ${val} energy.`);
    else if (op === "tension") parts.push(val > 0 ? `Cosmic tension +${val}.` : `Cosmic tension ${val}.`);
    else if (op === "reveal") parts.push(`Reveal ${val} adjacent hex.`);
    else if (op === "log") parts.push("Nothing else happens.");
    else if (op === "influence") parts.push("Gain +1 influence.");
  }
  return parts.join(" ") || "Nothing happens.";
}

function generateCard(type, id, title, template) {
  const choiceA = buildChoice(template.a);
  const choiceB = buildChoice(template.b);
  const placeNoteByChoiceIndex = [
    choiceA.placeToken ? tokenNote(choiceA.placeToken) : "Leave: Nothing",
    choiceB.placeToken ? tokenNote(choiceB.placeToken) : "Leave: Nothing",
  ];
  return {
    id,
    title,
    type,
    choices: [choiceA, choiceB],
    placeNoteByChoiceIndex,
  };
}

function generateDeck(type, prefix, existingCards, titles, templates, count, seed, reservedTitles = []) {
  const rng = seededRandom(seed);
  const usedTitles = new Set([
    ...existingCards.map((c) => c.title),
    ...reservedTitles,
  ]);
  const availableTitles = titles.filter((t) => !usedTitles.has(t));
  const startIdx = existingCards.length + 1;
  const cards = [...existingCards];

  for (let i = startIdx; i <= count; i++) {
    const id = `${prefix}_${String(i).padStart(2, "0")}`;
    let title;
    if (availableTitles.length > 0) {
      const idx = Math.floor(rng() * availableTitles.length);
      title = availableTitles[idx];
      availableTitles.splice(idx, 1); // Remove so it can't be picked again
    } else {
      title = `${type} ${i}`;
    }
    const template = pick(rng, templates);
    cards.push(generateCard(type, id, title, template));
  }

  return cards;
}

// Regenerate all cards from scratch (ensures unique titles across all 300 cards)
const dataDir = path.join(__dirname, "..", "data");

const emptyCards = generateDeck("empty", "EMPTY", [], uniqueTitles(EMPTY_TITLES), EMPTY_CHOICE_TEMPLATES, 100, 42);
const systemCards = generateDeck("system", "SYS", [], uniqueTitles(SYSTEM_TITLES), SYSTEM_CHOICE_TEMPLATES, 100, 43, emptyCards.map((c) => c.title));
const phenomenaCards = generateDeck("phenomena", "PHE", [], uniqueTitles(PHENOMENA_TITLES), PHENOMENA_CHOICE_TEMPLATES, 100, 44, [...emptyCards, ...systemCards].map((c) => c.title));

fs.writeFileSync(path.join(dataDir, "cards_empty.json"), JSON.stringify(emptyCards, null, 2));
fs.writeFileSync(path.join(dataDir, "cards_system.json"), JSON.stringify(systemCards, null, 2));
fs.writeFileSync(path.join(dataDir, "cards_phenomena.json"), JSON.stringify(phenomenaCards, null, 2));

console.log(`Generated: ${emptyCards.length} empty, ${systemCards.length} system, ${phenomenaCards.length} phenomena`);
