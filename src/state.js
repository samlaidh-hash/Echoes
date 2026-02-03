export function initialState({ seed }) {
  return {
    meta: {
      version: "baseline-v0.1",
      seed,
      round: 1
    },
    flags: {
      smoke: false
    },
    player: {
      id: "p1",
      factionId: "directorate",
      credits: 0,
      energy: 0,
      fleets: 1
    },
    cosmicTension: 0,
    ui: {
      selectedHexId: null,
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
