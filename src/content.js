const loadJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
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
  ]);

  return {
    factions,
    actions,
    phenomenaDeck,
    systemDeck,
    tensionDecks,
    hexMap,
  };
};
