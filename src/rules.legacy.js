const clone = (value) => structuredClone(value);
const HAND_LIMIT = 5;
const SPECIAL_RESOURCES = [
  "Antimatter",
  "Collapsium",
  "Monopoles",
  "Ancient Relics",
  "Alien Art",
  "Exotic Matter"
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

export const applyEffects = (state, effects) => {
  const next = clone(state);
  for (const effect of effects) {
    switch (effect.type) {
      case "gainCredits": {
        next.counters[effect.factionId].credits += effect.amount;
        break;
      }
      case "loseCredits": {
        next.counters[effect.factionId].credits = Math.max(
          0,
          next.counters[effect.factionId].credits - effect.amount
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
          next.counters[effect.factionId].energy - effect.amount
        );
        break;
      }
      case "gainResource": {
        next.counters[effect.factionId].resources += effect.amount;
        break;
      }
      case "loseResource": {
        next.counters[effect.factionId].resources = Math.max(
          0,
          next.counters[effect.factionId].resources - effect.amount
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
          next.counters[effect.factionId].fleets - effect.amount
        );
        break;
      }
      case "setBonusDie": {
        next.bonusDie = {
          value: effect.value,
          locked: effect.locked ?? false,
          usedBy: effect.usedBy ?? {}
        };
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
          next.counters[effect.factionId].vp - effect.amount
        );
        next.vpTrack[effect.factionId] = Math.max(
          0,
          next.vpTrack[effect.factionId] - effect.amount
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
          combatInitiated: {}
        };
        next.bonusDie.usedBy = {};
        next.bonusDie.locked = false;
        break;
      }
      case "log": {
        next.log.unshift(effect.message);
        break;
      }
      default:
        break;
    }
  }
  return next;
};

export const rollBonusDie = () => {
  const roll = () => Math.ceil(Math.random() * 6);
  const value = roll();
  const effects = [
    { type: "setBonusDie", value, locked: false, usedBy: {} },
    { type: "log", message: `Shared bonus die rolled: ${value}.` }
  ];
  return { effects };
};

export const useBonusDie = (state, factionId, tokenType) => {
  if (!state.bonusDie.value || state.bonusDie.locked) {
    return { state, effects: [{ type: "log", message: "Bonus die unavailable." }] };
  }
  if ((state.counters[factionId]?.tokens?.[tokenType] ?? 0) <= 0) {
    return {
      state,
      effects: [{ type: "log", message: `${factionId} has no ${tokenType} bonus tokens.` }]
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
      message: `${factionId} spends a ${tokenType} token to access the bonus die (${state.bonusDie.value}).`
    }
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
    { type: "log", message: `${factionId} earns a ${tokenType} bonus token.` }
  ];
  return { state, effects };
};

export const moveFleet = (state, factionId, fromHexId, toHexId) => {
  const next = clone(state);
  const fromHex = next.hexMap.find((hex) => hex.id === fromHexId);
  const toHex = next.hexMap.find((hex) => hex.id === toHexId);
  if (!fromHex || !toHex) return { state: next, effects: [] };

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
      message: `${factionId} moves a fleet from ${fromHexId} to ${toHexId}.`
    }
  ];

  return { state: next, effects };
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
        message: `Tension event triggered: ${card.title} — ${card.effect}`
      });
      index += 1;
    }
  }
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

const getAgreementThresholds = (faction) => {
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
