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
      { id: "p1", factionId: "directorate", credits: 0, energy: 0, fleets: 1, positionHexId: "A1" },
      { id: "p2", factionId: "choir", credits: 0, energy: 0, fleets: 1, positionHexId: "G1" },
      { id: "p3", factionId: "bloom", credits: 0, energy: 0, fleets: 1, positionHexId: "A7" }
    ],
    factions: [],
    actionsByFaction: {},
    influence: {},
    visited: {},
    controllerByHex: {},
    contestedByHex: {},
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
