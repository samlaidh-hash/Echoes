export const createInitialState = (content, options = {}) => {
  const initialFactions = content.factions.map((faction) => faction.id);
  const initCounters = initialFactions.reduce((acc, id) => {
    acc[id] = { resources: { credits: 0, energy: 0 }, fleets: 0 };
    return acc;
  }, {});

  return {
    round: 1,
    currentFactionId: content.factions[0]?.id ?? null,
    selectedHexId: content.hexMap[0]?.id ?? null,
    dice: null,
    currentCard: null,
    log: [],
    cosmicTension: 0,
    isFirstPlayer: true,
    seed: options.seed ?? 1,
    rngState: options.rngState ?? options.seed ?? 1,
    factions: content.factions,
    actions: content.actions,
    decks: {
      phenomena: { draw: [...content.phenomenaDeck], discard: [] },
      system: { draw: [...content.systemDeck], discard: [] },
      empty: { draw: [...content.emptyDeck], discard: [] },
    },
    hexMap: content.hexMap.map((hex) => ({ ...hex })),
    counters: initCounters,
  };
};

export const updateState = (state, updater) => {
  return updater({ ...state });
};
