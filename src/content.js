async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return await res.json();
}

export async function loadContent() {
  const [
    hexMap,
    tokens,
    factions,
    actions,
    cardsEmpty,
    cardsSystem,
    cardsPhenomena
  ] = await Promise.all([
    loadJson("./data/hex_map.json"),
    loadJson("./data/tokens.json"),
    loadJson("./data/factions.json"),
    loadJson("./data/actions.json"),
    loadJson("./data/cards_empty.json"),
    loadJson("./data/cards_system.json"),
    loadJson("./data/cards_phenomena.json")
  ]);

  // Normalize cards to a single schema: {id,title,type,choices:[{label,resolveText,effects,placeToken}]}
  const normalize = (cards, forcedType) => cards.map(c => ({
    id: c.id,
    title: c.title,
    type: forcedType ?? c.type,
    art: c.art ?? "",
    choices: (c.choices ?? []).map(ch => ({
      label: ch.label,
      resolveText: ch.resolveText ?? "",
      effects: ch.effects ?? [],
      placeToken: ch.placeToken ?? null
    }))
  }));

  return {
    hexMap,
    tokens,
    factions,
    actions,
    cards: {
      empty: normalize(cardsEmpty, "empty"),
      system: normalize(cardsSystem, "system"),
      phenomena: normalize(cardsPhenomena, "phenomena")
    }
  };
}
