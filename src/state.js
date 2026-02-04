/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} factionId
 * @property {number} credits
 * @property {number} energy
 */

/**
 * @typedef {Object} DeckState
 * @property {string[]} draw
 * @property {string[]} discard
 */

/**
 * @typedef {Object} State
 * @property {{version: string, seed: number, round: number}} meta
 * @property {{smoke: boolean}} flags
 * @property {Player[]} players
 * @property {Object} actionsByFaction
 * @property {Object} capitalsByFaction
 * @property {Object} techByFaction
 * @property {Object} influence
 * @property {Object} visited
 * @property {Object} controllerByHex
 * @property {Object} contestedByHex
 * @property {Object} fleetsByHex
 * @property {Object} fleetMeta
 * @property {number} nextFleetId
 * @property {Object} turn
 * @property {number} cosmicTension
 * @property {Object} ui
 * @property {{width: number, height: number, hexes: Array}} map
 * @property {{empty: DeckState, system: DeckState, phenomena: DeckState}} decks
 * @property {Object} tokensById
 * @property {Object} tokens
 * @property {string[]} log
 */

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
      mode: "idle",
      pendingAction: null,
      modalType: null,
      pulseHexId: null,
      fleetSelection: { hexId: null, factionId: null, fleetIds: [] },
      combat: null,
      lastResolution: null,
      pending: null
    },
    map: {
      width: 7,
      height: 7,
      hexes: []
    },
    decks: {
      empty: { draw: [], discard: [] },
      system: { draw: [], discard: [] },
      phenomena: { draw: [], discard: [] }
    },
    tokensById: {},
    tokens: {},
    log: []
  };
}
