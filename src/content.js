const DATA_BASE = new URL("../data/", import.meta.url).href;

async function loadJson(relativePath) {
  const url = new URL(relativePath, DATA_BASE).href;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${relativePath}: ${res.status}`);
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
  return Object.prototype.hasOwnProperty.call(mapping, key) ? mapping[key] : key;
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

function normalizeActionEntry(raw, factionId, actionId) {
  if (!raw || typeof raw !== "object") return makeStubAction(factionId, actionId);
  if (raw.effects) {
    return {
      name: raw.name ?? raw.title ?? `Action ${actionId}`,
      text: raw.text ?? raw.effect ?? "",
      effects: raw.effects ?? [],
      requiresTarget: !!raw.requiresTarget,
      cost: raw.cost ?? undefined
    };
  }
  return {
    name: raw.name ?? raw.title ?? `Action ${actionId}`,
    text: raw.text ?? raw.effect ?? "",
    effects: [{ op: "log", message: raw.effect ?? raw.text ?? `${factionId} action #${actionId}.` }],
    requiresTarget: !!raw.requiresTarget,
    cost: raw.cost ?? undefined
  };
}

function normalizeActions(raw) {
  if (!raw || typeof raw !== "object") return {};
  const normalized = {};
  for (const [factionKey, factionActionsRaw] of Object.entries(raw)) {
    const factionId = String(factionKey).toLowerCase();
    const source = (factionActionsRaw && typeof factionActionsRaw === "object") ? factionActionsRaw : {};
    const actionMap = {};
    for (let i = 1; i <= 12; i += 1) {
      const key = String(i);
      const entry = normalizeActionEntry(source[key], factionId, key);
      actionMap[key] = {
        ...entry,
        requiresTarget: !!entry.requiresTarget
      };
    }
    normalized[factionId] = actionMap;
  }
  return normalized;
}

function normalizeCards(cards, forcedType) {
  if (!Array.isArray(cards)) return [];
  return cards.map(c => ({
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
    loadJson("hex_map.json"),
    loadJson("tokens.json"),
    loadJson("factions.json"),
    loadJson("cards_empty.json"),
    loadJson("cards_system.json"),
    loadJson("cards_phenomena.json")
  ]);

  let actionsRaw = {};
  let cardTextAll = null;
  try {
    actionsRaw = await loadJson("actions.json");
  } catch (err) {
    console.error("FAILED TO LOAD actions.json", err);
    actionsRaw = {};
  }
  try {
    cardTextAll = await loadJson("card-text-all.json");
  } catch (err) {
    // Optional authored text payload; gameplay falls back to base cards if missing.
    cardTextAll = null;
  }

  const cardTextByKey = {};
  if (Array.isArray(cardTextAll?.cards)) {
    for (const c of cardTextAll.cards) {
      if (!c?.deck || !c?.id) continue;
      cardTextByKey[`${String(c.deck).toLowerCase()}:${c.id}`] = c;
    }
  }

  return {
    hexMap,
    tokensById: tokens,
    factions: normalizeFactionIds(factionsRaw),
    actionsByFaction: normalizeActions(actionsRaw),
    cardTextByKey,
    cards: {
      empty: normalizeCards(cardsEmpty, "empty"),
      system: normalizeCards(cardsSystem, "system"),
      phenomena: normalizeCards(cardsPhenomena, "phenomena")
    }
  };
}
