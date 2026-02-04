export const createInitialState = (content) => {
  const initialFactions = content.factions.map((faction) => faction.id);
  const initCounters = initialFactions.reduce((acc, id) => {
    acc[id] = {
      resources: 0,
      credits: 0,
      energy: 0,
      fleets: 0,
      vp: 0,
      tokens: { silver: 0, gold: 0 },
    };
    return acc;
  }, {});
  const initHands = initialFactions.reduce((acc, id) => {
    acc[id] = {
      hand: [],
      doom: [],
      vp: [],
      specialResources: [],
    };
    return acc;
  }, {});
  const initVP = initialFactions.reduce((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {});

  return {
    round: 1,
    currentFactionId: content.factions[0]?.id ?? null,
    firstPlayerId: content.factions[0]?.id ?? null,
    selectedHexId: content.hexMap[0]?.id ?? null,
    dice: null,
    bonusDie: {
      value: null,
      locked: false,
      usedBy: {},
    },
    currentCard: null,
    log: [],
    factions: content.factions,
    actions: content.actions,
    phenomenaDeck: content.phenomenaDeck,
    systemDeck: content.systemDeck ?? [],
    tensionDecks: content.tensionDecks ?? [],
    hexMap: content.hexMap.map((hex) => ({
      ...hex,
      influence: hex.influence ?? {},
      fleets: hex.fleets ?? {},
      explored: hex.explored ?? false,
    })),
    counters: initCounters,
    hands: initHands,
    agreements: [],
    vpTrack: initVP,
    tension: {
      value: 0,
      max: 10,
      deckId: content.tensionDecks?.[0]?.id ?? null,
      nextIndex: 0,
      history: [],
    },
    roundState: {
      influenceCaps: {},
      combatInitiated: {},
    },
  };
};
