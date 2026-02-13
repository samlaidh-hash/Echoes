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
    influenceBonusByHex: {}, // { [hexId]: { [factionId]: number } } — persistent influence bonuses
    outpostByHex: {}, // { [hexId]: factionId } — Directorate outposts
    beaconsByHex: {}, // { [hexId]: factionId } — Gatekeepers beacons
    tradeRouteEdges: [], // { hexA, hexB, factionId } — Syndicate trade routes on edges
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
      width: 9,
      height: 9,
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
