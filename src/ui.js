import {
  applyEffects,
  drawCard,
  gainFleet,
  loseFleet,
  revealHex,
  resolveChoice,
  rollDice,
} from "./rules.js";

export const createUI = ({ initialState }) => {
  let state = initialState;

  const factionSelect = document.getElementById("faction-select");
  const actionList = document.getElementById("action-list");
  const diceResults = document.getElementById("dice-results");
  const rollButton = document.getElementById("roll-dice");
  const roundLabel = document.getElementById("round");
  const currentFactionLabel = document.getElementById("current-faction");
  const hexMapContainer = document.getElementById("hex-map");
  const resetMapButton = document.getElementById("reset-map");
  const drawCardButton = document.getElementById("draw-card");
  const revealBackButton = document.getElementById("reveal-back");
  const cardTitle = document.getElementById("card-title");
  const cardId = document.getElementById("card-id");
  const cardDeck = document.getElementById("card-deck");
  const cardFront = document.getElementById("card-front");
  const cardBack = document.getElementById("card-back");
  const factionCredits = document.getElementById("faction-credits");
  const factionEnergy = document.getElementById("faction-energy");
  const factionFleets = document.getElementById("faction-fleets");
  const dieA = document.querySelector('[data-testid="die-a"]');
  const dieB = document.querySelector('[data-testid="die-b"]');
  const dieBonus = document.querySelector('[data-testid="die-bonus"]');
  const diceTotal = document.querySelector('[data-testid="dice-total"]');
  const gameLog = document.getElementById("game-log");
  const devForceDraw = document.getElementById("dev-force-draw");
  const devRevealHex = document.getElementById("dev-reveal-hex");
  const devHexSelect = document.getElementById("dev-hex-select");
  const devAddFleet = document.getElementById("dev-add-fleet");
  const devRemoveFleet = document.getElementById("dev-remove-fleet");
  const devPrintState = document.getElementById("dev-print-state");
  const devFleetCount = document.getElementById("dev-fleet-count");

  const setState = (nextState) => {
    state = nextState;
    render();
  };

  const getContext = (baseState = state) => ({
    activeFactionId: baseState.currentFactionId,
    selectedHexId: baseState.selectedHexId,
    currentCardHexId: baseState.currentCard?.hexId ?? null,
  });

  const applyRule = (result) => {
    const withState = result.state ?? state;
    const next = applyEffects(withState, result.effects ?? [], getContext(withState));
    setState(next);
  };

  const renderFactionOptions = () => {
    factionSelect.innerHTML = "";
    state.factions.forEach((faction) => {
      const option = document.createElement("option");
      option.value = faction.id;
      option.textContent = faction.name;
      factionSelect.append(option);
    });
    factionSelect.value = state.currentFactionId;
  };

  const renderActions = () => {
    const factionActions = state.actions[state.currentFactionId] ?? {};
    actionList.innerHTML = "";
    Object.entries(factionActions).forEach(([die, info]) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "action-button";
      button.textContent = `${die}. ${info.title} — ${info.effect}`;
      button.addEventListener("click", () => {
        if (!info.effects) {
          setState(
            applyEffects(state, [{ type: "log", message: `${info.title} has no effects yet.` }], getContext()),
          );
          return;
        }
        setState(applyEffects(state, info.effects, getContext()));
      });
      item.append(button);
      actionList.append(item);
    });
    const faction = state.factions.find((item) => item.id === state.currentFactionId);
    currentFactionLabel.textContent = faction?.name ?? "—";
  };

  const renderHexMap = () => {
    hexMapContainer.innerHTML = "";
    state.hexMap.forEach((hex) => {
      const hexEl = document.createElement("button");
      hexEl.type = "button";
      hexEl.className = `hex hex-tile ${hex.revealed ? "revealed" : "fogged"}`;
      const index = state.hexMap.indexOf(hex);
      const q = index % 5;
      const r = Math.floor(index / 5);
      hexEl.dataset.q = q;
      hexEl.dataset.r = r;
      hexEl.setAttribute("data-testid", `hex-${q}-${r}`);
      if (hex.controlledBy) {
        hexEl.classList.add("controlled");
      }
      if (hex.id === state.selectedHexId) {
        hexEl.classList.add("selected");
      }
      hexEl.dataset.id = hex.id;
      hexEl.textContent = hex.revealed ? hex.label : "Fog";
      hexEl.addEventListener("click", () => {
        const revealed = !hex.revealed;
        setState(
          applyEffects(state, [{ type: "log", message: `Clicked hex ${q},${r}.` }], getContext()),
        );
        const nextState = { ...state, selectedHexId: hex.id };
        const result = revealHex(nextState, hex.id, state.currentFactionId, revealed);
        applyRule({ ...result, state: nextState });
      });
      hexMapContainer.append(hexEl);
    });
  };

  const renderCard = () => {
    if (state.currentCard === null) {
      cardTitle.textContent = "No card drawn";
      cardId.textContent = "—";
      cardDeck.textContent = "—";
      cardFront.innerHTML = "";
      cardBack.innerHTML = "";
      revealBackButton.disabled = true;
      return;
    }

    const { card, deckType, choice, revealed } = state.currentCard;
    cardTitle.textContent = card.title;
    cardId.textContent = card.id;
    cardDeck.textContent = `${deckType} deck`;
    cardFront.innerHTML = "";
    const frontLabel = document.createElement("strong");
    frontLabel.textContent = "Front (Choose one)";
    cardFront.append(frontLabel);
    const list = document.createElement("ul");
    card.choices.forEach((option, index) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.setAttribute("data-testid", `card-choice-${index}`);
      if (choice === option.label) {
        button.classList.add("selected");
      }
      button.textContent = option.label;
      button.disabled = revealed;
      button.addEventListener("click", () => {
        setState({
          ...state,
          currentCard: { ...state.currentCard, choice: option.label },
        });
      });
      item.append(button);
      list.append(item);
    });
    cardFront.append(list);

    if (!revealed) {
      cardBack.innerHTML = "<em>Flip to reveal outcome.</em>";
      revealBackButton.disabled = !choice;
      return;
    }

    cardBack.innerHTML = `
      <strong>Back (Outcome)</strong>
      <ul>${card.choices
        .map((option) => `<li><strong>${option.label}:</strong> ${option.resolveText}</li>`)
        .join("")}</ul>
    `;
    revealBackButton.disabled = true;
  };

  const renderLog = () => {
    gameLog.innerHTML = "";
    state.log.forEach((message) => {
      const entry = document.createElement("div");
      entry.className = "log-entry";
      entry.textContent = `[Round ${state.round}] ${message}`;
      gameLog.append(entry);
    });
  };

  const renderDice = () => {
    if (!state.dice) {
      dieA.textContent = "—";
      dieB.textContent = "—";
      dieBonus.textContent = "—";
      diceTotal.textContent = "—";
      return;
    }
    if (state.isFirstPlayer) {
      dieA.textContent = state.dice.die1;
      dieB.textContent = state.dice.die2;
      dieBonus.textContent = state.dice.bonusDie;
      diceTotal.textContent = state.dice.total;
      return;
    }
    dieA.textContent = state.dice.die1;
    dieB.textContent = state.dice.die2;
    dieBonus.textContent = "—";
    diceTotal.textContent = state.dice.total;
  };

  const renderDeveloperPanel = () => {
    devHexSelect.innerHTML = "";
    state.hexMap.forEach((hex) => {
      const option = document.createElement("option");
      option.value = hex.id;
      option.textContent = `${hex.id} — ${hex.label}`;
      devHexSelect.append(option);
    });
    devHexSelect.value = state.selectedHexId ?? state.hexMap[0]?.id ?? "";
    devFleetCount.textContent = state.counters[state.currentFactionId]?.fleets ?? 0;
  };

  const render = () => {
    roundLabel.textContent = state.round;
    renderFactionOptions();
    renderActions();
    renderDice();
    const counters = state.counters[state.currentFactionId];
    if (counters) {
      factionCredits.textContent = counters.resources.credits ?? 0;
      factionEnergy.textContent = counters.resources.energy ?? 0;
      factionFleets.textContent = counters.fleets ?? 0;
    }
    renderHexMap();
    renderCard();
    renderLog();
    renderDeveloperPanel();
  };

  const smokeStatus = (() => {
    const badge = document.createElement("div");
    badge.dataset.testid = "smoke-status";
    badge.style.position = "fixed";
    badge.style.bottom = "16px";
    badge.style.right = "16px";
    badge.style.padding = "6px 10px";
    badge.style.borderRadius = "6px";
    badge.style.fontSize = "0.75rem";
    badge.style.background = "#1a223a";
    badge.style.border = "1px solid #2c3554";
    badge.style.color = "#cdd5f5";
    badge.textContent = "SMOKE: idle";
    document.body.append(badge);
    return badge;
  })();

  const runSmokeTest = async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("smoke") !== "1") return;
    const setStatus = (text, pass = false) => {
      smokeStatus.textContent = `SMOKE: ${text}`;
      smokeStatus.style.borderColor = pass ? "#5ee38d" : "#ff5c5c";
      smokeStatus.style.color = pass ? "#5ee38d" : "#ffb3b3";
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const logSmoke = (message) => {
      setState(applyEffects(state, [{ type: "log", message }], getContext()));
    };

    const hexTargets = [
      { q: 0, r: 0, type: "empty" },
      { q: 1, r: 0, type: "system" },
      { q: 2, r: 0, type: "phenomena" },
    ];

    const ensureSmokeCard = (deckType) => {
      const deck = state.decks[deckType];
      if (!deck) return;
      const index = deck.draw.findIndex((card) =>
        card.choices?.[0]?.effects?.some((effect) =>
          ["gainResource", "loseResource", "gainFleet", "loseFleet", "modifyCosmicTension"].includes(effect.type),
        ),
      );
      if (index <= 0) return;
      const [card] = deck.draw.splice(index, 1);
      deck.draw.unshift(card);
      setState({ ...state, decks: { ...state.decks, [deckType]: deck } });
    };
    await delay(50);

    for (const target of hexTargets) {
      const hex = document.querySelector(`[data-testid="hex-${target.q}-${target.r}"]`);
      if (!hex) {
        setStatus(`FAIL no clickable hex ${target.q},${target.r}`);
        logSmoke(`SMOKE: no clickable hex ${target.q},${target.r}.`);
        return;
      }

      setState({
        ...state,
        hexMap: state.hexMap.map((hexItem, index) => {
          const q = index % 5;
          const r = Math.floor(index / 5);
          if (q === target.q && r === target.r) {
            return { ...hexItem, type: target.type };
          }
          return hexItem;
        }),
      });
      ensureSmokeCard(target.type);

      const before = {
        credits: state.counters[state.currentFactionId].resources.credits,
        energy: state.counters[state.currentFactionId].resources.energy,
        fleets: state.counters[state.currentFactionId].fleets,
        cosmicTension: state.cosmicTension,
      };

      logSmoke(`SMOKE: clicked hex ${target.q},${target.r}.`);
      hex.click();
      await delay(100);

      if (!state.currentCard) {
        setStatus("FAIL card panel did not open");
        logSmoke("SMOKE: card panel did not open.");
        return;
      }

      const card = state.currentCard.card;
      logSmoke(`SMOKE: deck=${state.currentCard.deckType} card=${card.id}.`);

      const choiceButton = document.querySelector('[data-testid="card-choice-0"]');
      if (!choiceButton) {
        setStatus("FAIL no card choice found");
        logSmoke("SMOKE: no choice found.");
        return;
      }
      choiceButton.click();
      await delay(50);

      const choiceLabel = state.currentCard?.choice ?? "choice-0";
      logSmoke(`SMOKE: choice=${choiceLabel}.`);

      revealBackButton.click();
      await delay(150);

      const after = {
        credits: state.counters[state.currentFactionId].resources.credits,
        energy: state.counters[state.currentFactionId].resources.energy,
        fleets: state.counters[state.currentFactionId].fleets,
        cosmicTension: state.cosmicTension,
      };

      const changed =
        before.credits !== after.credits ||
        before.energy !== after.energy ||
        before.fleets !== after.fleets ||
        before.cosmicTension !== after.cosmicTension;

      const tokenHex = state.hexMap.find((hexItem) => hexItem.id === state.selectedHexId);
      const token = tokenHex?.tokens?.at(-1);
      if (!changed) {
        setStatus("FAIL no state change from effects");
        logSmoke("SMOKE: no state change from effects.");
        return;
      }
      if (!token) {
        setStatus("FAIL no token placed");
        logSmoke("SMOKE: no token placed.");
        return;
      }

      logSmoke(
        `SMOKE: deck=${state.currentCard.deckType} card=${card.id} choice=${choiceLabel} token=${token.id}.`,
      );
    }

    setStatus("PASS", true);
  };

  factionSelect.addEventListener("change", (event) => {
    const nextState = { ...state, currentFactionId: event.target.value };
    const updated = applyEffects(nextState, [
      { type: "log", message: `Faction focus changed to ${event.target.selectedOptions[0].textContent}.` },
    ], getContext(nextState));
    setState(updated);
  });

  rollButton.addEventListener("click", () => applyRule(rollDice(state)));

  resetMapButton.addEventListener("click", () => {
    const effects = state.hexMap.map((hex) => ({
      type: "revealHex",
      hexId: hex.id,
      revealed: false,
      controlledBy: null,
    }));
    effects.unshift({ type: "log", message: "Fog-of-war reset across the map." });
    setState(applyEffects(state, effects, getContext()));
  });

  drawCardButton.addEventListener("click", () => applyRule(drawCard(state)));
  revealBackButton.setAttribute("data-testid", "card-resolve");
  revealBackButton.addEventListener("click", () =>
    applyRule(resolveChoice(state, state.currentCard?.choice)),
  );

  devForceDraw.addEventListener("click", () => applyRule(drawCard(state)));
  devRevealHex.addEventListener("click", () => {
    const target = devHexSelect.value;
    const hex = state.hexMap.find((item) => item.id === target);
    if (!hex) return;
    applyRule(revealHex(state, hex.id, state.currentFactionId, true));
  });
  devHexSelect.addEventListener("change", (event) => {
    setState({ ...state, selectedHexId: event.target.value });
  });
  devAddFleet.addEventListener("click", () => applyRule(gainFleet(state, state.currentFactionId, 1)));
  devRemoveFleet.addEventListener("click", () => applyRule(loseFleet(state, state.currentFactionId, 1)));
  devPrintState.addEventListener("click", () => {
    console.log("Current game state:", JSON.stringify(state, null, 2));
    setState(applyEffects(state, [{ type: "log", message: "Game state printed to console." }], getContext()));
  });

  setState(
    applyEffects(state, [{ type: "log", message: "Prototype ready. Explore the map and draw phenomena." }], getContext()),
  );
  const ready = document.createElement("div");
  ready.dataset.testid = "app-ready";
  ready.style.display = "none";
  document.body.append(ready);
  runSmokeTest();
};
