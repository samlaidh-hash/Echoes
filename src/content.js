async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return await res.json();
}

function normalizeTokenId(tokenId) {
  if (!tokenId) return null;
  const key = String(tokenId).toLowerCase();
  const mapping = {
    empty: null,
    control: "outpost",
    control_marker: "outpost",
    mining: "mining_outpost",
    research: "research_array",
    relic_site: "research_array",
    station: "outpost",
    dead_star: "hazard",
    derelict_buoy: "derelict",
    wreck: "derelict",
    pirates: "pirate_den",
    jump_gate: "gate"
  };
  return mapping.hasOwnProperty(key) ? mapping[key] : key;
}

function normalizeFactionIds(factions) {
  if (!Array.isArray(factions)) return [];
  return factions.map(f => ({
    ...f,
    id: String(f.id ?? "").toLowerCase()
  }));
}

function makeStubAction(factionId, actionId) {
  return {
    name: "Stub",
    text: "Not implemented yet.",
    effects: [{ op: "log", message: `${factionId} action #${actionId} not implemented yet.` }],
    requiresTarget: false
  };
}

function normalizeActions(raw) {
  if (!raw || typeof raw !== "object") return {};
  const normalized = {};
  for (const [factionKey, factionActionsRaw] of Object.entries(raw)) {
    const factionId = String(factionKey).toLowerCase();
    const source = (factionActionsRaw && typeof factionActionsRaw === "object") ? factionActionsRaw : {};
    const actionMap = {};
    for (let i = 1; i <= 18; i += 1) {
      const key = String(i);
      const raw = source[key] ?? makeStubAction(factionId, key);
      actionMap[key] = {
        ...raw,
        requiresTarget: !!raw.requiresTarget
      };
    }
    normalized[factionId] = actionMap;
  }
  return response.json();
};

export const loadGameContent = async () => {
  const [factions, actions, phenomenaDeck, systemDeck, tensionDecks, hexMap] = await Promise.all([
    loadJson("data/factions.json"),
    loadJson("data/actions.json"),
    loadJson("data/cards_phenomena.json"),
    loadJson("data/cards_system.json"),
    loadJson("data/tension_decks.json"),
    loadJson("data/hex_map.json"),
  return normalized;
}

export async function loadContent() {
  const [
    hexMap,
    tokens,
    factionsRaw,
    cardsEmpty,
    cardsSystem,
    cardsPhenomena
  ] = await Promise.all([
    loadJson("./data/hex_map.json"),
    loadJson("./data/tokens.json"),
    loadJson("./data/factions.json"),
    loadJson("./data/cards_empty.json"),
    loadJson("./data/cards_system.json"),
    loadJson("./data/cards_phenomena.json")
  ]);

  let actionsRaw = {};
  try {
    actionsRaw = await loadJson("./data/actions.json");
  } catch (err) {
    console.error("FAILED TO LOAD actions.json", err);
    actionsRaw = {};
  }

  // Normalize cards to a single schema: {id,title,type,choices:[{label,resolveText,effects,placeToken}]}
  const normalize = (cards, forcedType) => cards.map(c => ({
    id: c.id,
    title: c.title,
    type: forcedType ?? c.type,
    art: c.art ?? "",
    placeNote: c.placeNote ?? null,
    placeNoteByChoiceIndex: c.placeNoteByChoiceIndex ?? null,
    choices: (c.choices ?? []).map(ch => ({
      label: ch.label,
      resolveText: ch.resolveText ?? "",
      effects: ch.effects ?? [],
      placeToken: normalizeTokenId(ch.placeToken)
    }))
  }));

  return {
    factions,
    actions,
    phenomenaDeck,
    systemDeck,
    tensionDecks,
    hexMap,
    tokensById: tokens,
    factions: normalizeFactionIds(factionsRaw),
    actionsByFaction: normalizeActions(actionsRaw),
    cards: {
      empty: normalize(cardsEmpty, "empty"),
      system: normalize(cardsSystem, "system"),
      phenomena: normalize(cardsPhenomena, "phenomena")
    }
  };
}
