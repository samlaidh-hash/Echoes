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
    for (let i = 1; i <= 18; i += 1) {
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

function normalizeEventDeck(cards) {
  if (!Array.isArray(cards)) return [];
  return cards.map(card => ({
    ...card,
    id: String(card.id),
    kind: card.kind ?? "unknown",
    front: {
      title: card.front?.title ?? "Unknown",
      flavor: card.front?.flavor ?? "",
      options: (card.front?.options ?? []).map(opt => ({
        key: String(opt.key),
        label: opt.label ?? ""
      })),
      defaultChoiceKey: card.front?.defaultChoiceKey ?? card.front?.options?.[0]?.key ?? null
    },
    back: {
      title: card.back?.title ?? card.front?.title ?? "Unknown",
      rulesText: card.back?.rulesText ?? "",
      byChoice: Object.fromEntries(Object.entries(card.back?.byChoice ?? {}).map(([key, value]) => ([
        String(key),
        {
          resolveOnReveal: !!value.resolveOnReveal,
          resolution: value.resolution ?? [],
          cardFate: value.cardFate ?? { type: "discard" },
          cellCard: value.cellCard ?? null,
          handCard: value.handCard ?? null,
          onEnterEffects: value.onEnterEffects ?? []
        }
      ]))),
      tags: card.back?.tags ?? []
    }
  }));
}

export async function loadContent() {
  const [
    hexMap,
    tokens,
    factionsRaw,
    eventDeck,
    agreements,
    tensionDecks
  ] = await Promise.all([
    loadJson("./data/hex_map.json"),
    loadJson("./data/tokens.json"),
    loadJson("./data/factions.json"),
    loadJson("./data/event_deck.json"),
    loadJson("./data/agreements.json"),
    loadJson("./data/tension_decks.json")
  ]);

  let actionsRaw = {};
  try {
    actionsRaw = await loadJson("./data/actions.json");
  } catch (err) {
    console.error("FAILED TO LOAD actions.json", err);
    actionsRaw = {};
  }

  return {
    hexMap,
    tokensById: tokens,
    factions: normalizeFactionIds(factionsRaw),
    actionsByFaction: normalizeActions(actionsRaw),
    eventDeck: normalizeEventDeck(eventDeck),
    agreements,
    tensionDeckSets: tensionDecks
  };
}
