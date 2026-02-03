const loadJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
};

const normalizeEffects = (effects = []) =>
  effects.map((effect) => {
    if (effect.type) return effect;
    if (effect.op) {
      const { op, ...rest } = effect;
      return { type: op, ...rest };
    }
    return effect;
  });

const normalizeCard = (card) => {
  if (Array.isArray(card.choices)) {
    return {
      ...card,
      choices: card.choices.map((choice) => ({
        ...choice,
        effects: normalizeEffects(choice.effects ?? []),
      })),
    };
  }
  const choices = (card.front ?? []).map((label) => ({
    label,
    resolveText: card.back?.[label] ?? "",
    effects: normalizeEffects([]),
    placeToken: null,
  }));
  return { ...card, choices };
};

const normalizeDeck = (deck) => deck.map(normalizeCard);

export const loadGameContent = async () => {
  const [factions, actions, phenomenaDeck, systemDeck, emptyDeck, hexMap] = await Promise.all([
    loadJson("data/factions.json"),
    loadJson("data/actions.json"),
    loadJson("data/cards_phenomena.json"),
    loadJson("data/cards_system.json"),
    loadJson("data/cards_empty.json"),
    loadJson("data/hex_map.json"),
  ]);

  return {
    factions,
    actions,
    phenomenaDeck: normalizeDeck(phenomenaDeck),
    systemDeck: normalizeDeck(systemDeck),
    emptyDeck: normalizeDeck(emptyDeck),
    hexMap,
  };
};
