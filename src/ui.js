import {
  applyEffects,
  drawCard,
  gainFleet,
  loseFleet,
  revealHex,
  resolveChoice,
  rollDice,
} from "./rules.js";

export const createUI = ({ initialState, bugbotEnabled = false }) => {
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
  const cardFront = document.getElementById("card-front");
  const cardBack = document.getElementById("card-back");
  const gameLog = document.getElementById("game-log");
  const devPanel = document.querySelector(".developer-panel");
  const devControlsEnabled = Boolean(bugbotEnabled && devPanel);

  if (devPanel) {
    devPanel.hidden = !devControlsEnabled;
  }

  const devForceDraw = devControlsEnabled ? document.getElementById("dev-force-draw") : null;
  const devRevealHex = devControlsEnabled ? document.getElementById("dev-reveal-hex") : null;
  const devHexSelect = devControlsEnabled ? document.getElementById("dev-hex-select") : null;
  const devAddFleet = devControlsEnabled ? document.getElementById("dev-add-fleet") : null;
  const devRemoveFleet = devControlsEnabled ? document.getElementById("dev-remove-fleet") : null;
  const devPrintState = devControlsEnabled ? document.getElementById("dev-print-state") : null;
  const devFleetCount = devControlsEnabled ? document.getElementById("dev-fleet-count") : null;

  const setState = (nextState) => {
    state = nextState;
    render();
  };

  const applyRule = (result) => {
    const withState = result.state ?? state;
    const next = applyEffects(withState, result.effects ?? []);
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
      item.textContent = `${die}. ${info.title} — ${info.effect}`;
      actionList.append(item);
    });
    const faction = state.factions.find((item) => item.id === state.currentFactionId);
    currentFactionLabel.textContent = faction?.name ?? "—";
  };

  const renderHexMap = () => {
    hexMapContainer.innerHTML = "";
    state.hexMap.forEach((hex) => {
      const hexEl = document.createElement("div");
      hexEl.className = `hex ${hex.revealed ? "revealed" : "fogged"}`;
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
      cardFront.innerHTML = "";
      cardBack.innerHTML = "";
      revealBackButton.disabled = true;
      return;
    }

    const card = state.phenomenaDeck[state.currentCard.index];
    cardTitle.textContent = card.title;
    cardId.textContent = card.id;
    cardFront.innerHTML = `
      <strong>Front (Choose one)</strong>
      <ul>${card.front.map((option) => `<li>${option}</li>`).join("")}</ul>
    `;

    if (!state.currentCard.revealed) {
      cardBack.innerHTML = "<em>Flip to reveal outcome.</em>";
      revealBackButton.disabled = false;
      return;
    }

    cardBack.innerHTML = `
      <strong>Back (Outcome)</strong>
      <ul>${Object.entries(card.back)
        .map(([choice, outcome]) => `<li><strong>${choice}:</strong> ${outcome}</li>`)
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
      diceResults.textContent = "—";
      return;
    }
    diceResults.textContent = `${state.dice.die1} + ${state.dice.die2} + ${state.dice.bonus} = ${state.dice.total}`;
  };

  const renderDeveloperPanel = () => {
    if (!devControlsEnabled || !devHexSelect || !devFleetCount) return;
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
    renderHexMap();
    renderCard();
    renderLog();
    renderDeveloperPanel();
  };

  factionSelect.addEventListener("change", (event) => {
    const nextState = { ...state, currentFactionId: event.target.value };
    const updated = applyEffects(nextState, [
      { type: "log", message: `Faction focus changed to ${event.target.selectedOptions[0].textContent}.` },
    ]);
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
    setState(applyEffects(state, effects));
  });

  drawCardButton.addEventListener("click", () => applyRule(drawCard(state)));
  revealBackButton.addEventListener("click", () => applyRule(resolveChoice(state, "manual")));

  if (devControlsEnabled) {
    devForceDraw?.addEventListener("click", () => applyRule(drawCard(state)));
    devRevealHex?.addEventListener("click", () => {
      const target = devHexSelect?.value;
      const hex = state.hexMap.find((item) => item.id === target);
      if (!hex) return;
      applyRule(revealHex(state, hex.id, state.currentFactionId, true));
    });
    devHexSelect?.addEventListener("change", (event) => {
      setState({ ...state, selectedHexId: event.target.value });
    });
    devAddFleet?.addEventListener("click", () => applyRule(gainFleet(state, state.currentFactionId, 1)));
    devRemoveFleet?.addEventListener("click", () => applyRule(loseFleet(state, state.currentFactionId, 1)));
    devPrintState?.addEventListener("click", () => {
      console.log("Current game state:", JSON.stringify(state, null, 2));
      setState(applyEffects(state, [{ type: "log", message: "Game state printed to console." }]));
    });
  }

  setState(applyEffects(state, [{ type: "log", message: "Prototype ready. Explore the map and draw phenomena." }]));
};
