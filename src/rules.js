const clone = (value) => structuredClone(value);

export const applyEffects = (state, effects) => {
  if (!effects || effects.length === 0) return state;
  const next = clone(state);

  effects.forEach((effect) => {
    switch (effect.type) {
      case "gainResource": {
        next.counters[effect.factionId].resources += effect.amount;
        break;
      }
      case "loseResource": {
        next.counters[effect.factionId].resources = Math.max(
          0,
          next.counters[effect.factionId].resources - effect.amount,
        );
        break;
      }
      case "gainFleet": {
        next.counters[effect.factionId].fleets += effect.amount;
        break;
      }
      case "loseFleet": {
        next.counters[effect.factionId].fleets = Math.max(
          0,
          next.counters[effect.factionId].fleets - effect.amount,
        );
        break;
      }
      case "revealHex": {
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== effect.hexId) return hex;
          return {
            ...hex,
            revealed: effect.revealed,
            controlledBy: effect.controlledBy ?? (effect.revealed ? hex.controlledBy : null),
          };
        });
        break;
      }
      case "placeToken": {
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== effect.hexId) return hex;
          const tokens = hex.tokens ? [...hex.tokens] : [];
          tokens.push(effect.token);
          return { ...hex, tokens };
        });
        break;
      }
      case "drawCard": {
        next.currentCard = {
          index: effect.index,
          revealed: false,
          choice: null,
        };
        break;
      }
      case "upgradeActionStub": {
        break;
      }
      case "log": {
        next.log.unshift(effect.message);
        break;
      }
      default: {
        break;
      }
    }
  });

  return next;
};

export const rollDice = (state, bonus = 1) => {
  const roll = () => Math.ceil(Math.random() * 6);
  const die1 = roll();
  const die2 = roll();
  const total = die1 + die2 + bonus;
  const dice = { die1, die2, bonus, total };

  const effects = [
    {
      type: "log",
      message: `Rolled dice: ${die1} + ${die2} (+${bonus} first player) = ${total}.`,
    },
  ];

  return {
    state: { ...state, dice },
    effects,
  };
};

export const spendDiceSplit = (state, die1Action, die2Action) => {
  const effects = [
    {
      type: "log",
      message: `Split dice spent on ${die1Action} and ${die2Action}.`,
    },
  ];
  return { state, effects };
};

export const spendDiceCombine = (state, action) => {
  const effects = [
    {
      type: "log",
      message: `Combined dice spent on ${action}.`,
    },
  ];
  return { state, effects };
};

export const moveFleet = (state, factionId, fromHexId, toHexId) => {
  const effects = [
    {
      type: "log",
      message: `${factionId} moves a fleet from ${fromHexId} to ${toHexId}.`,
    },
  ];
  return { state, effects };
};

export const revealHex = (state, hexId, factionId, revealed) => {
  const effects = [
    {
      type: "revealHex",
      hexId,
      revealed,
      controlledBy: revealed ? factionId : null,
    },
    {
      type: "log",
      message: revealed
        ? `${hexId} revealed and claimed by ${factionId}.`
        : `${hexId} returned to fog.`,
    },
  ];

  return { state, effects };
};

export const drawCard = (state) => {
  const index = Math.floor(Math.random() * state.phenomenaDeck.length);
  const card = state.phenomenaDeck[index];
  const effects = [
    { type: "drawCard", index },
    { type: "log", message: `Card drawn: ${card.title}.` },
  ];
  return { state, effects };
};

export const resolveChoice = (state, choice) => {
  if (state.currentCard === null) return { state, effects: [] };
  const nextState = { ...state, currentCard: { ...state.currentCard, revealed: true, choice } };
  const card = state.phenomenaDeck[state.currentCard.index];
  const effects = [
    { type: "log", message: `Card resolved: ${card.title}.` },
  ];
  return { state: nextState, effects };
};

export const gainFleet = (state, factionId, amount) => {
  const effects = [
    { type: "gainFleet", factionId, amount },
    { type: "log", message: `${factionId} gains ${amount} fleet(s).` },
  ];
  return { state, effects };
};

export const loseFleet = (state, factionId, amount) => {
  const effects = [
    { type: "loseFleet", factionId, amount },
    { type: "log", message: `${factionId} loses ${amount} fleet(s).` },
  ];
  return { state, effects };
};
