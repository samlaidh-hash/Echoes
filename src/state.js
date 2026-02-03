export function initialState({ seed }) {
  return {
    meta: {
      version: "v0.2",
      seed
    },
    flags: {
      smoke: false
    },
    players: [
      { id: "p1", factionId: "directorate", credits: 0, energy: 0, fleets: 1, positionHexId: "D4" },
      { id: "p2", factionId: "choir", credits: 0, energy: 0, fleets: 1, positionHexId: "D4" },
      { id: "p3", factionId: "bloom", credits: 0, energy: 0, fleets: 1, positionHexId: "D4" }
    ],
    factions: [],
    actions: {},
    turn: {
      round: 1,
      firstPlayerIndex: 0,
      activePlayerIndex: 0,
      phase: 1,
      diceByPlayer: [
        { a: null, b: null },
        { a: null, b: null },
        { a: null, b: null }
      ],
      bonusDie: null,
      spentFlags: {
        byPlayer: [
          { a: false, b: false },
          { a: false, b: false },
          { a: false, b: false }
        ],
        actionValue: null,
        remaining: 0,
        mode: null
      },
      oncePerRoundFlags: {
        modifyDie: [false, false, false]
      }
    },
    cosmicTension: 0,
    ui: {
      selectedHexId: null,
      selectedPlayerId: null,
      selectedFleet: { playerId: null },
      selectedDieMode: null,
      selectedDeckType: "empty",
      modifyDie: { die: "a", delta: 1 },
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
    tokens: {}, // tokenId -> {label,glyph}
    log: []
  };
}
