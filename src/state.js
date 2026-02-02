export const createInitialState = (content) => {
  const initialFactions = content.factions.map((faction) => faction.id);
  const initCounters = initialFactions.reduce((acc, id) => {
    acc[id] = { resources: 0, fleets: 0 };
    return acc;
  }, {});

  return {
    round: 1,
    currentFactionId: content.factions[0]?.id ?? null,
    selectedHexId: content.hexMap[0]?.id ?? null,
    dice: null,
    currentCard: null,
    log: [],
    factions: content.factions,
    actions: content.actions,
    phenomenaDeck: content.phenomenaDeck,
    hexMap: content.hexMap.map((hex) => ({ ...hex })),
    counters: initCounters,
  };
};

export const updateState = (state, updater) => {
  return updater({ ...state });
};
