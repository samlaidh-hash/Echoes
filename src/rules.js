const clone = (value) => structuredClone(value);
const HAND_LIMIT = 5;
const SPECIAL_RESOURCES = [
  "Antimatter",
  "Collapsium",
  "Monopoles",
  "Ancient Relics",
  "Alien Art",
  "Exotic Matter",
];

const getFaction = (state, factionId) =>
  state.factions.find((faction) => faction.id === factionId);

const getActionData = (state, factionId, threshold) => {
  const actions = state.actions?.[factionId] ?? {};
  return actions[String(threshold)] ?? null;
};

export const actionRequiresResources = (threshold, actionData) => {
  if (threshold <= 6) return false;
  return Boolean(actionData?.cost?.credits || actionData?.cost?.energy);
};

export const canAffordAction = (state, factionId, threshold) => {
  const actionData = getActionData(state, factionId, threshold);
  if (!actionRequiresResources(threshold, actionData)) return true;
  const cost = actionData.cost ?? {};
  const counters = state.counters[factionId];
  return (
    (counters.credits ?? 0) >= (cost.credits ?? 0) &&
    (counters.energy ?? 0) >= (cost.energy ?? 0)
  );
};

const applyCost = (state, factionId, threshold) => {
  const actionData = getActionData(state, factionId, threshold);
  if (!actionRequiresResources(threshold, actionData)) return state;
  const cost = actionData.cost ?? {};
  const next = clone(state);
  next.counters[factionId].credits = Math.max(
    0,
    next.counters[factionId].credits - (cost.credits ?? 0),
  );
  next.counters[factionId].energy = Math.max(
    0,
    next.counters[factionId].energy - (cost.energy ?? 0),
  );
  return next;
};

export const applyEffects = (state, effects) => {
  if (!effects || effects.length === 0) return state;
  const next = clone(state);

  effects.forEach((effect) => {
    switch (effect.type) {
      case "gainResource": {
        next.counters[effect.factionId].resources += effect.amount;
        break;
      }
      case "gainCredits": {
        next.counters[effect.factionId].credits += effect.amount;
        break;
      }
      case "loseCredits": {
        next.counters[effect.factionId].credits = Math.max(
          0,
          next.counters[effect.factionId].credits - effect.amount,
        );
        break;
      }
      case "gainEnergy": {
        next.counters[effect.factionId].energy += effect.amount;
        break;
      }
      case "loseEnergy": {
        next.counters[effect.factionId].energy = Math.max(
          0,
          next.counters[effect.factionId].energy - effect.amount,
        );
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
          deckType: effect.deckType ?? "phenomena",
          hexId: effect.hexId ?? null,
          revealed: false,
          choice: null,
        };
        break;
      }
      case "setHexExplored": {
        next.hexMap = next.hexMap.map((hex) => {
          if (hex.id !== effect.hexId) return hex;
          return { ...hex, explored: effect.explored };
        });
        break;
      }
      case "upgradeActionStub": {
        break;
      }
      case "awardBonusToken": {
        const tokens = next.counters[effect.factionId].tokens;
        tokens[effect.tokenType] += effect.amount;
        break;
      }
      case "spendBonusToken": {
        const tokens = next.counters[effect.factionId].tokens;
        tokens[effect.tokenType] = Math.max(0, tokens[effect.tokenType] - effect.amount);
        break;
      }
      case "setBonusDie": {
        next.bonusDie = {
          value: effect.value,
          locked: effect.locked ?? false,
          usedBy: effect.usedBy ?? {},
        };
        break;
      }
      case "markBonusDieUsed": {
        next.bonusDie.usedBy[effect.factionId] = true;
        break;
      }
      case "lockBonusDie": {
        next.bonusDie.locked = true;
        break;
      }
      case "addCardToHand": {
        const handState = next.hands[effect.factionId];
        const target = effect.cardType === "doom" ? "doom" : effect.cardType === "vp" ? "vp" : "hand";
        handState[target].push(effect.card);
        if (effect.cardType !== "special") {
          const total = handState.hand.length + handState.doom.length + handState.vp.length;
          if (total > HAND_LIMIT) {
            const discardIndex = effect.discardIndex ?? handState.hand.length - 1;
            if (handState.hand[discardIndex]) {
              handState.hand.splice(discardIndex, 1);
            }
          }
        }
        break;
      }
      case "discardCard": {
        const handState = next.hands[effect.factionId];
        if (effect.cardType === "hand") {
          handState.hand.splice(effect.index, 1);
        }
        break;
      }
      case "addSpecialResource": {
        next.hands[effect.factionId].specialResources.push(effect.resource);
        break;
      }
      case "gainVP": {
        next.counters[effect.factionId].vp += effect.amount;
        next.vpTrack[effect.factionId] += effect.amount;
        break;
      }
      case "loseVP": {
        next.counters[effect.factionId].vp = Math.max(
          0,
          next.counters[effect.factionId].vp - effect.amount,
        );
        next.vpTrack[effect.factionId] = Math.max(
          0,
          next.vpTrack[effect.factionId] - effect.amount,
        );
        break;
      }
      case "setTension": {
        next.tension.value = effect.value;
        break;
      }
      case "advanceTensionCard": {
        next.tension.nextIndex = effect.nextIndex;
        if (effect.card) {
          next.tension.history.push(effect.card);
        }
        break;
      }
      case "addAgreement": {
        next.agreements.push(effect.agreement);
        break;
      }
      case "removeAgreement": {
        next.agreements = next.agreements.filter((agreement) => agreement.id !== effect.id);
        break;
      }
      case "resetRoundState": {
        next.roundState = {
          influenceCaps: {},
          combatInitiated: {},
        };
        next.bonusDie.usedBy = {};
        next.bonusDie.locked = false;
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
  const total = die1 + die2;
  const dice = { die1, die2, total };

  const effects = [
    {
      type: "log",
      message: `Rolled dice: ${die1} + ${die2} = ${total}.`,
    },
  ];

  return {
    state: { ...state, dice },
    effects,
  };
};

export const rollBonusDie = (state) => {
  const roll = () => Math.ceil(Math.random() * 6);
  const value = roll();
  const effects = [
    { type: "setBonusDie", value, locked: false, usedBy: {} },
    { type: "log", message: `Shared bonus die rolled: ${value}.` },
  ];
  return { state, effects };
};

export const useBonusDie = (state, factionId, tokenType) => {
  if (!state.bonusDie.value || state.bonusDie.locked) {
    return { state, effects: [{ type: "log", message: "Bonus die unavailable." }] };
  }
  if ((state.counters[factionId]?.tokens?.[tokenType] ?? 0) <= 0) {
    return {
      state,
      effects: [{ type: "log", message: `${factionId} has no ${tokenType} bonus tokens.` }],
    };
  }
  if (state.bonusDie.usedBy[factionId]) {
    return { state, effects: [{ type: "log", message: "Bonus die already used this round." }] };
  }
  const effects = [
    { type: "spendBonusToken", factionId, tokenType, amount: 1 },
    { type: "markBonusDieUsed", factionId },
    {
      type: "log",
      message: `${factionId} spends a ${tokenType} token to access the bonus die (${state.bonusDie.value}).`,
    },
  ];
  if (tokenType === "gold") {
    effects.push({ type: "lockBonusDie" });
    effects.push({ type: "log", message: "Bonus die locked for the remainder of the round." });
  }
  return { state, effects };
};

export const awardBonusToken = (state, factionId, tokenType) => {
  const effects = [
    { type: "awardBonusToken", factionId, tokenType, amount: 1 },
    { type: "log", message: `${factionId} earns a ${tokenType} bonus token.` },
  ];
  return { state, effects };
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
  const next = clone(state);
  const fromHex = next.hexMap.find((hex) => hex.id === fromHexId);
  const toHex = next.hexMap.find((hex) => hex.id === toHexId);
  if (!fromHex || !toHex) return { state, effects: [] };

  fromHex.fleets[factionId] = Math.max(0, (fromHex.fleets[factionId] ?? 0) - 1);
  toHex.fleets[factionId] = (toHex.fleets[factionId] ?? 0) + 1;

  const cap = next.roundState.influenceCaps[toHexId] ?? {};
  if (!cap[factionId]) {
    cap[factionId] = true;
    next.roundState.influenceCaps[toHexId] = cap;
    toHex.influence[factionId] = (toHex.influence[factionId] ?? 0) + 1;
  }

  const faction = getFaction(next, factionId);
  if (faction?.imperial) {
    if (toHex.fleets[factionId] > 0) {
      toHex.influence[factionId] = Math.max(toHex.influence[factionId] ?? 0, 2);
    }
    if (fromHex.fleets[factionId] === 0) {
      fromHex.influence[factionId] = Math.max(0, (fromHex.influence[factionId] ?? 0) - 2);
    }
  }

  const effects = [
    {
      type: "log",
      message: `${factionId} moves a fleet from ${fromHexId} to ${toHexId}.`,
    },
  ];

  if (!toHex.revealed) {
    toHex.revealed = true;
    toHex.explored = false;
    const exploration = drawExplorationCard(next, toHex.type ?? "phenomena", toHexId);
    effects.push(...exploration.effects);
  }

  return { state: next, effects };
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
    { type: "drawCard", index, deckType: "phenomena", hexId: null },
    { type: "log", message: `Card drawn: ${card.title}.` },
  ];
  return { state, effects };
};

const drawExplorationCard = (state, deckType, hexId) => {
  const deck = deckType === "system" ? state.systemDeck : state.phenomenaDeck;
  const index = Math.floor(Math.random() * deck.length);
  const card = deck[index];
  const effects = [
    { type: "drawCard", index, deckType, hexId },
    { type: "log", message: `Exploration discovered: ${card.title}.` },
  ];
  return { state, effects };
};

export const exploreHex = (state, factionId, hexId) => {
  const next = clone(state);
  const hex = next.hexMap.find((entry) => entry.id === hexId);
  if (!hex || hex.revealed) return { state, effects: [] };
  hex.revealed = true;
  hex.explored = false;
  const effects = [{ type: "log", message: `${factionId} explores ${hexId}.` }];
  const drawResult = drawExplorationCard(next, hex.type ?? "phenomena", hexId);
  effects.push(...drawResult.effects);
  return { state: drawResult.state, effects };
};

export const exploreRevealedHex = (state, factionId, hexId) => {
  const hex = state.hexMap.find((entry) => entry.id === hexId);
  if (!hex || !hex.revealed || hex.explored) {
    return { state, effects: [{ type: "log", message: "No unexplored revealed hex to scan." }] };
  }
  const effects = [{ type: "log", message: `${factionId} scans ${hexId} for exploration.` }];
  const drawResult = drawExplorationCard(state, hex.type ?? "phenomena", hexId);
  effects.push(...drawResult.effects);
  return { state: drawResult.state, effects };
};

const translateSystemEffects = (state, systemEffects) => {
  const effects = [];
  systemEffects.forEach((effect) => {
    switch (effect.op) {
      case "gainResource": {
        if (effect.resource === "credits") {
          effects.push({ type: "gainCredits", factionId: state.currentFactionId, amount: effect.amount });
        } else if (effect.resource === "energy") {
          effects.push({ type: "gainEnergy", factionId: state.currentFactionId, amount: effect.amount });
        } else {
          effects.push({ type: "gainResource", factionId: state.currentFactionId, amount: effect.amount });
        }
        break;
      }
      case "loseResource": {
        if (effect.resource === "credits") {
          effects.push({ type: "loseCredits", factionId: state.currentFactionId, amount: effect.amount });
        } else if (effect.resource === "energy") {
          effects.push({ type: "loseEnergy", factionId: state.currentFactionId, amount: effect.amount });
        } else {
          effects.push({ type: "loseResource", factionId: state.currentFactionId, amount: effect.amount });
        }
        break;
      }
      case "gainFleet": {
        effects.push({ type: "gainFleet", factionId: state.currentFactionId, amount: effect.amount });
        break;
      }
      case "modifyCosmicTension": {
        const tension = adjustTension(state, effect.amount);
        effects.push(...tension.effects);
        break;
      }
      case "revealHex": {
        const count = effect.count ?? 1;
        const candidates = state.hexMap.filter((hex) => !hex.revealed);
        const targets = candidates.slice(0, count);
        targets.forEach((hex) => {
          effects.push({
            type: "revealHex",
            hexId: hex.id,
            revealed: true,
            controlledBy: state.currentFactionId,
          });
        });
        effects.push({
          type: "log",
          message:
            targets.length > 0
              ? `Revealed ${targets.length} adjacent hex(es).`
              : "No unrevealed hexes remain.",
        });
        break;
      }
      case "log": {
        effects.push({ type: "log", message: effect.message });
        break;
      }
      default: {
        effects.push({
          type: "log",
          message: `Effect "${effect.op}" requires manual resolution.`,
        });
        break;
      }
    }
  });
  return effects;
};

export const resolveChoice = (state, choice) => {
  if (state.currentCard === null) return { state, effects: [] };
  const nextState = { ...state, currentCard: { ...state.currentCard, revealed: true, choice } };
  const { deckType, hexId } = state.currentCard;
  if (deckType === "system") {
    const card = state.systemDeck[state.currentCard.index];
    const selection =
      typeof choice === "number"
        ? card.choices?.[choice]
        : card.choices?.find((item) => item.label === choice);
    const effects = [{ type: "log", message: `Card resolved: ${card.title}.` }];
    if (selection?.effects) {
      effects.push(...translateSystemEffects(state, selection.effects));
    }
    if (selection?.placeToken && hexId) {
      effects.push({ type: "placeToken", hexId, token: selection.placeToken });
    }
    if (hexId) {
      effects.push({ type: "setHexExplored", hexId, explored: true });
    }
    return { state: nextState, effects };
  }

  const card = state.phenomenaDeck[state.currentCard.index];
  const effects = [{ type: "log", message: `Card resolved: ${card.title}.` }];
  const token = card.placeTokens?.[choice];
  if (token && hexId) {
    effects.push({ type: "placeToken", hexId, token });
  }
  if (hexId) {
    effects.push({ type: "setHexExplored", hexId, explored: true });
  }
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

export const startRound = (state) => {
  const effects = [{ type: "resetRoundState" }];
  const bonus = rollBonusDie(state);
  effects.push(...bonus.effects);
  return { state, effects };
};

export const initiateCombat = (state, factionId, hexId) => {
  if (state.roundState.combatInitiated[hexId]) {
    return { state, effects: [{ type: "log", message: "Combat already initiated here this round." }] };
  }
  const next = clone(state);
  next.roundState.combatInitiated[hexId] = true;
  const faction = getFaction(state, factionId);
  const tensionGain = faction?.archetype === "chaos" ? 2 : 1;
  const tensionResult = adjustTension(next, tensionGain);
  tensionResult.effects.unshift({
    type: "log",
    message: `${factionId} initiates combat in ${hexId}. Tension +${tensionGain}.`,
  });
  return { state: tensionResult.state, effects: tensionResult.effects };
};

export const adjustTension = (state, amount) => {
  const nextValue = Math.max(0, Math.min(state.tension.max, state.tension.value + amount));
  const effects = [{ type: "setTension", value: nextValue }];
  const deck = state.tensionDecks.find((item) => item.id === state.tension.deckId);
  if (deck) {
    const thresholds = deck.thresholds ?? [];
    let index = state.tension.nextIndex;
    while (index < thresholds.length && nextValue >= thresholds[index]) {
      const card = deck.cards[index];
      effects.push({ type: "advanceTensionCard", nextIndex: index + 1, card });
      effects.push({
        type: "log",
        message: `Tension event triggered: ${card.title} — ${card.effect}`,
      });
      index += 1;
    }
  }
  return { state, effects };
};

export const makeAgreement = (state, factionA, factionB, agreementType) => {
  const agreement = {
    id: `${factionA}-${factionB}-${agreementType}-${Date.now()}`,
    factions: [factionA, factionB],
    type: agreementType,
  };
  const effects = [
    { type: "addAgreement", agreement },
    { type: "log", message: `${factionA} and ${factionB} enter a ${agreementType} agreement.` },
  ];
  return { state, effects };
};

export const breakAgreement = (state, agreementId) => {
  const effects = [
    { type: "removeAgreement", id: agreementId },
    { type: "log", message: `Agreement ${agreementId} has been broken.` },
  ];
  return { state, effects };
};

export const addSpecialResource = (state, factionId, resource) => {
  if (!SPECIAL_RESOURCES.includes(resource)) {
    return { state, effects: [{ type: "log", message: "Unknown special resource." }] };
  }
  const effects = [
    { type: "addSpecialResource", factionId, resource },
    { type: "log", message: `${factionId} gains special resource: ${resource}.` },
  ];
  return { state, effects };
};

export const scoreSpecialResources = (resources) => {
  const cache = new Map();
  const scoreTable = { 2: 1, 3: 3, 4: 6, 5: 10, 6: 15 };

  const keyFromCounts = (counts) => counts.join(",");
  const maxScore = (counts) => {
    const key = keyFromCounts(counts);
    if (cache.has(key)) return cache.get(key);
    let best = 0;
    const total = counts.reduce((sum, count) => sum + count, 0);
    if (total < 2) {
      cache.set(key, 0);
      return 0;
    }
    const unique = counts.filter((count) => count > 0).length;
    for (let size = 2; size <= 6; size += 1) {
      if (total < size) continue;
      if (unique >= size) {
        const nextCounts = [...counts];
        let remaining = size;
        for (let i = 0; i < nextCounts.length && remaining > 0; i += 1) {
          if (nextCounts[i] > 0) {
            nextCounts[i] -= 1;
            remaining -= 1;
          }
        }
        best = Math.max(best, (scoreTable[size] ?? 0) + maxScore(nextCounts));
      }
      for (let i = 0; i < counts.length; i += 1) {
        if (counts[i] >= size) {
          const nextCounts = [...counts];
          nextCounts[i] -= size;
          best = Math.max(best, (scoreTable[size] ?? 0) + maxScore(nextCounts));
        }
      }
    }
    cache.set(key, best);
    return best;
  };

  const counts = SPECIAL_RESOURCES.map((type) => resources[type] ?? 0);
  if (counts.reduce((sum, count) => sum + count, 0) === 0) return 0;
  return maxScore(counts);
};

export const getAgreementThresholds = (faction) => {
  switch (faction?.archetype) {
    case "diplomatic":
      return { make: [1, 6], break: [13, 18] };
    case "chaos":
      return { make: [1, 6], break: [1, 6] };
    case "pirates":
      return { make: [13, 18], break: [1, 6] };
    default:
      return { make: [7, 12], break: [7, 12] };
  }
};

export const canMakeAgreement = (state, factionId, threshold) => {
  const faction = getFaction(state, factionId);
  const limits = getAgreementThresholds(faction);
  return threshold >= limits.make[0] && threshold <= limits.make[1];
};

export const canBreakAgreement = (state, factionId, threshold) => {
  const faction = getFaction(state, factionId);
  const limits = getAgreementThresholds(faction);
  return threshold >= limits.break[0] && threshold <= limits.break[1];
};
