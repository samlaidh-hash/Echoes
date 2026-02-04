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
export function initialState({ seed }) {
  return {
    meta: {
      version: "v0.2",
      seed,
      round: 1
    },
    flags: {
      smoke: false
    },
    players: [
      { id: "p1", factionId: "directorate", credits: 0, energy: 0 },
      { id: "p2", factionId: "choir", credits: 0, energy: 0 },
      { id: "p3", factionId: "bloom", credits: 0, energy: 0 }
    ],
    factions: [],
    actionsByFaction: {},
    capitalsByFaction: {},
    techByFaction: {},
    influence: {},
    visited: {},
    controllerByHex: {},
    contestedByHex: {},
    fleetsByHex: {},
    fleetMeta: {},
    nextFleetId: 1,
    turn: {
      round: 1,
      firstPlayerIndex: 0,
      activePlayerIndex: 0,
      dice: { a: null, b: null, bonus: null },
      used: { a: false, b: false, bonus: false },
      actionsQueue: [],
      systemActivated: [],
      oncePerRound: {
        probabilityDriftUsed: [false, false, false]
      }
    },
    cosmicTension: 0,
    ui: {
      selectedHexId: null,
      selectedPlayerId: null,
      selectedFleet: { playerId: null },
      selectedDieMode: null,
      selectedDeckType: "phenomena",
      modifyDie: { die: "a", delta: 1 },
      freeExplore: false,
      actionWarningLogged: false,
      availableActionOptions: {},
      mode: "idle", // idle | targeting | modal
      pendingAction: null, // { actionNumber, consumes:{a,b,bonus} }
      modalType: null, // card | combat | null
      pulseHexId: null,
      fleetSelection: { hexId: null, factionId: null, fleetIds: [] },
      combat: null,
      lastResolution: null,
      pending: null // { deckType, card, hexId }
    },
    map: {
      width: 7,
      height: 7,
      hexes: [] // filled from hex_map.json
    },
    decks: {
      empty: { draw: [], discard: [] },
      system: { draw: [], discard: [] },
      phenomena: { draw: [], discard: [] }
    },
    tokensById: {}, // tokenId -> {label,glyph}
    tokens: {}, // legacy alias
    log: []
  };
}
