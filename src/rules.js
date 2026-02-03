import * as rng from "./rng.js";

const clone = (value) => structuredClone(value);

const deckTypes = ["phenomena", "system", "empty"];

const shuffle = (items) => {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = rng.nextInt(index + 1);
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
};

const getRevealTargets = (hexMap, effect, context) => {
  const targets = new Set();
  const count = effect.count ?? 1;
  const mode = effect.mode ?? "selectedHex";
  const pool = hexMap.filter((hex) => !hex.revealed);
  const pickRandom = () => {
    if (pool.length === 0) return null;
    const index = rng.nextInt(pool.length);
    const [chosen] = pool.splice(index, 1);
    return chosen?.id ?? null;
  };

  if (mode === "selectedHex" || mode === "adjacentToFleet") {
    if (context.selectedHexId) targets.add(context.selectedHexId);
  } else if (mode === "any") {
    for (let i = 0; i < count; i += 1) {
      const id = pickRandom();
      if (id) targets.add(id);
    }
  }

  return targets;
};

export const applyEffects = (state, effects, context = {}) => {
  if (!effects || effects.length === 0) return state;
  const next = clone(state);
  rng.setState(state.rngState);

  effects.forEach((effect) => {
    switch (effect.type) {
      case "gainResource": {
        const factionId = effect.factionId ?? context.activeFactionId;
        if (!factionId) break;
        const resource = effect.resource ?? "credits";
        next.counters[factionId].resources[resource] =
          (next.counters[factionId].resources[resource] ?? 0) + effect.amount;
        break;
      }
      case "loseResource": {
        const factionId = effect.factionId ?? context.activeFactionId;
        if (!factionId) break;
        const resource = effect.resource ?? "credits";
        const current = next.counters[factionId].resources[resource] ?? 0;
        next.counters[factionId].resources[resource] = Math.max(0, current - effect.amount);
        break;
      }
      case "gainFleet": {
        const factionId = effect.factionId ?? context.activeFactionId;
        if (!factionId) break;
        next.counters[factionId].fleets += effect.amount;
        break;
      }
      case "loseFleet": {
        const factionId = effect.factionId ?? context.activeFactionId;
        if (!factionId) break;
        next.counters[factionId].fleets = Math.max(
          0,
          next.counters[factionId].fleets - effect.amount,
        );
        break;
      }
      case "revealHex": {
        if (effect.revealed === false && effect.hexId) {
          next.hexMap = next.hexMap.map((hex) => {
            if (hex.id !== effect.hexId) return hex;
            return { ...hex, revealed: false, controlledBy: null };
          });
          break;
        }
        const targets = getRevealTargets(next.hexMap, effect, context);
        next.hexMap = next.hexMap.map((hex) => {
          if (!targets.has(hex.id)) return hex;
          return {
            ...hex,
            revealed: true,
            controlledBy: hex.controlledBy ?? context.activeFactionId,
          };
        });
        break;
      }
      case "setHexType": {
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== effect.hexId) return hex;
          return { ...hex, type: effect.hexType };
        });
        break;
      }
      case "placeToken": {
        const targetHexId = effect.hexId ?? context.currentCardHexId ?? context.selectedHexId;
        if (!targetHexId) break;
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== targetHexId) return hex;
          const tokens = hex.tokens ? [...hex.tokens] : [];
          tokens.push({
            id: effect.tokenId ?? effect.token ?? "token",
            source: effect.source ?? "effect",
          });
          return { ...hex, tokens };
        });
        break;
      }
      case "drawCard": {
        const deck = next.decks[effect.deckType];
        if (deck.draw.length === 0 && deck.discard.length > 0) {
          deck.draw = shuffle(deck.discard);
          deck.discard = [];
        }
        const card = deck.draw.shift();
        if (!card) break;
        next.currentCard = {
          deckType: effect.deckType,
          card,
          choice: null,
          revealed: false,
          hexId: effect.hexId,
          discarded: false,
        };
        break;
      }
      case "moveFleet": {
        if (!context.selectedHexId) {
          next.log.unshift("Select a destination hex first.");
          break;
        }
        next.log.unshift(`Fleet moved to ${context.selectedHexId}.`);
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== context.selectedHexId) return hex;
          return { ...hex, revealed: true, controlledBy: context.activeFactionId ?? hex.controlledBy };
        });
        break;
      }
      case "modifyDie": {
        if (!next.dice) {
          next.log.unshift("No dice to modify.");
          break;
        }
        const total = next.dice.total + effect.amount;
        next.dice = { ...next.dice, total };
        next.log.unshift(`Die modified by ${effect.amount}.`);
        break;
      }
      case "resolveCard": {
        if (!next.currentCard) break;
        next.currentCard = {
          ...next.currentCard,
          choice: effect.choice,
          revealed: true,
        };
        const { deckType, card } = next.currentCard;
        next.decks[deckType].discard.push(card);
        next.currentCard = { ...next.currentCard, discarded: true };
        break;
      }
      case "modifyCosmicTension": {
        next.cosmicTension += effect.amount;
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

  next.rngState = rng.getState();
  return next;
};

export const rollDice = (state, bonus = 0) => {
  rng.setState(state.rngState);
  const roll = () => rng.nextInt(6) + 1;
  const die1 = roll();
  const die2 = roll();
  const bonusDie = state.isFirstPlayer ? roll() : 0;
  const total = die1 + die2 + bonusDie + bonus;
  const dice = { die1, die2, bonusDie, bonus, total };

  const effects = [
    {
      type: "log",
      message: state.isFirstPlayer
        ? `Rolled dice: ${die1} + ${die2} + ${bonusDie} = ${total}.`
        : `Rolled dice: ${die1} + ${die2} = ${total}.`,
    },
  ];

  return {
    state: { ...state, dice, rngState: rng.getState() },
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
  const hex = state.hexMap.find((item) => item.id === hexId);
  const existingType = hex?.type && hex.type !== "unknown" ? hex.type : null;
  const shouldDraw = revealed && hex && !hex.revealed;
  rng.setState(state.rngState);
  const deckType = shouldDraw
    ? existingType ?? deckTypes[rng.nextInt(deckTypes.length)]
    : null;
  const effects = [
    {
      type: "revealHex",
      hexId,
      revealed,
      controlledBy: revealed ? factionId : null,
    },
    ...(shouldDraw && !existingType
      ? [{ type: "setHexType", hexId, hexType: deckType }]
      : []),
    ...(shouldDraw
      ? [{ type: "drawCard", deckType, hexId }]
      : []),
    {
      type: "log",
      message: revealed
        ? `${hexId} revealed and claimed by ${factionId}.`
        : `${hexId} returned to fog.`,
    },
  ];

  return { state: { ...state, rngState: rng.getState() }, effects };
};

export const drawCard = (state, deckType = "phenomena") => {
  const effects = [
    { type: "drawCard", deckType, hexId: state.selectedHexId },
    { type: "log", message: `Card drawn from ${deckType} deck.` },
  ];
  return { state, effects };
};

export const resolveChoice = (state, choice) => {
  if (state.currentCard === null || !choice) return { state, effects: [] };
  const card = state.currentCard.card;
  const selected = card.choices?.find((option) => option.label === choice);
  const effects = [
    { type: "resolveCard", choice },
    ...(selected?.effects ?? []),
    {
      type: "placeToken",
      tokenId: selected?.placeToken ?? card.id,
      source: "card",
    },
    {
      type: "log",
      message: `${state.currentCard.deckType} deck: ${card.title} → ${choice}.`,
    },
  ];
  return { state, effects };
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
