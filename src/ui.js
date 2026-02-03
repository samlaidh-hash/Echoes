import { computeAvailableActions } from "./rules.js";

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "disabled") node.disabled = !!v;
    else node[k] = v;
  }
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") {
      node.appendChild(document.createTextNode(String(child)));
    } else {
      node.appendChild(child);
    }
  }
  return node;
}

export function render(state, handlers) {
  renderSeed(state);
  renderHud(state);
  renderMap(state, handlers);
  renderCard(state, handlers);
  renderActions(state, handlers);
  renderLog(state);
}

function renderSeed(state) {
  const seed = document.getElementById("seedDisplay");
  seed.textContent = `seed=${state.meta.seed}`;
}

function tokenGlyph(state, tokenId) {
  if (!tokenId) return "";
  const t = state.tokensById?.[tokenId] ?? state.tokens?.[tokenId];
  return t?.glyph ?? "?";
}

function getAdjacentHexesForUi(state, hexId) {
  const hex = state.map.hexes.find(h => h.id === hexId);
  if (!hex) return [];
  const [col, row] = [hex.col, hex.row];
  const candidates = [
    { c: col, r: row - 1 },
    { c: col, r: row + 1 },
    { c: col - 1, r: row },
    { c: col + 1, r: row }
  ].filter(p => p.c >= 0 && p.c < state.map.width && p.r >= 0 && p.r < state.map.height);

  return candidates
    .map(p => state.map.hexes.find(h => h.col === p.c && h.row === p.r))
    .filter(Boolean);
}

function factionGlyph(factionId) {
  switch (String(factionId).toLowerCase()) {
    case "directorate":
      return "⛨";
    case "choir":
      return "◈";
    case "bloom":
      return "❖";
    default:
      return "?";
  }
}

function factionClass(factionId) {
  return `faction-${String(factionId).toLowerCase()}`;
}

function fleetGlyph(factionId) {
  switch (String(factionId).toLowerCase()) {
    case "directorate":
      return "■";
    case "choir":
      return "◆";
    case "bloom":
      return "●";
    default:
      return "■";
  }
}

function factionName(state, factionId) {
  const name = state.factions?.find(f => f.id === String(factionId).toLowerCase())?.name;
  return name ?? String(factionId);
}

function renderTrack(label, value, max, trackClass) {
  const clamped = Math.max(0, Math.min(max, value ?? 0));
  const slots = [];
  for (let i = 0; i <= max; i += 1) {
    const filled = i > 0 && i <= clamped;
    slots.push(el("div", { class: `track-slot ${filled ? "filled" : ""}` }, [i]));
  }
  return el("div", { class: `resource-track ${trackClass}` }, [
    el("div", { class: "track-label" }, [label]),
    el("div", { class: "track-slots" }, slots)
  ]);
}

function renderHud(state) {
  const hud = document.getElementById("hud");
  if (!hud) return;
  hud.innerHTML = "";

  const factionRow = el("div", { class: "hud-row" }, []);
  state.players.forEach(player => {
    const panel = el("div", { class: `hud-panel ${factionClass(player.factionId)}` }, [
      el("div", { class: "hud-title" }, [`${factionGlyph(player.factionId)} ${factionName(state, player.factionId)}`]),
      renderTrack("Credits", player.credits, 20, "track-credits"),
      renderTrack("Energy", player.energy, 20, "track-energy")
    ]);
    factionRow.appendChild(panel);
  });

  const tensionPanel = el("div", { class: "hud-panel hud-tension" }, [
    el("div", { class: "hud-title" }, ["Cosmic Tension"]),
    renderTrack("Tension", state.cosmicTension ?? 0, 20, "track-tension")
  ]);

  hud.appendChild(factionRow);
  hud.appendChild(tensionPanel);
}


function renderMap(state, handlers) {
  const map = document.getElementById("map");
  map.classList.toggle("targeting", state.ui.mode === "targeting");
  map.innerHTML = "";

  const activeFaction = String(state.players?.[state.turn?.activePlayerIndex ?? 0]?.factionId ?? "").toLowerCase();
  const awaitingAction = state.ui.pendingAction?.actionDef ?? null;
  const needsTarget = state.ui.mode === "targeting" && !!awaitingAction?.requiresTarget;
  const isMove = (awaitingAction?.effects ?? []).some(e => e.op === "moveFleet");
  const isScan = (awaitingAction?.effects ?? []).some(e => e.op === "revealHex");
  const isAdjacentToken = (awaitingAction?.effects ?? []).some(e => e.op === "placeTokenAdjacent");
  const isForwardDeploy = (awaitingAction?.effects ?? []).some(e => e.op === "forwardDeploy");
  const isActivate = (awaitingAction?.effects ?? []).some(e => e.op === "activateSystem");

  for (const hex of state.map.hexes) {
    const fogged = !hex.revealed;
    const labelType = fogged ? "fog" : (hex.type ?? "unknown");
    const glyph = hex.revealed ? tokenGlyph(state, hex.token) : "";
    const occupants = state.players.filter(p => p.positionHexId === hex.id);
    const occContainer = el("div", { class: "fleet-tokens" }, occupants.map(p => (
      el("div", { class: `fleet-token fleet-${String(p.factionId).toLowerCase()}` }, [
        `${fleetGlyph(p.factionId)} ${p.fleets}`
      ])
    )));

    const isTargetable = needsTarget && (() => {
      if (isMove || isAdjacentToken || isScan) {
        const origin = state.players?.[state.turn?.activePlayerIndex ?? 0]?.positionHexId;
        return getAdjacentHexesForUi(state, origin).some(h => h.id === hex.id);
      }
      if (isForwardDeploy || isActivate) {
        const controlled = state.controllerByHex?.[hex.id] === activeFaction;
        const contested = state.contestedByHex?.[hex.id];
        const activated = state.turn?.systemActivated?.includes(hex.id);
        return hex.type === "system" && controlled && !contested && (!isActivate || !activated);
      }
      return false;
    })();

    const influence = state.influence?.[hex.id] ?? {};
    const controller = state.controllerByHex?.[hex.id];
    const contested = state.contestedByHex?.[hex.id];
    const influenceLines = Object.entries(influence)
      .map(([f, v]) => `${factionGlyph(f)} ${factionName(state, f)}: ${v}`)
      .join("\n");
    const controlLine = contested ? "Controller: contested" : `Controller: ${controller ?? "none"}`;

    const btn = el("button", {
      class: `hex ${fogged ? "fogged" : ""} ${isTargetable ? "targetable" : ""}`,
      type: "button",
      disabled: false,
      title: [
        fogged ? "Unexplored" : `Type: ${hex.type}`,
        "Influence:",
        influenceLines || "None",
        controlLine
      ].join("\n"),
      "data-testid": `hex-${hex.id}`,
      "data-hexid": hex.id
    }, [
      el("div", { class: "id" }, [hex.id]),
      el("div", { class: "type" }, [labelType]),
      occContainer,
      el("div", { class: "token" }, [glyph])
    ]);

    btn.addEventListener("click", () => handlers.onHexClick(hex.id));
    map.appendChild(btn);
  }
}


function renderCard(state, handlers) {
  const panel = document.getElementById("cardPanel");
  panel.innerHTML = "";

  const pending = state.ui.pending;
  if (!pending) {
    const resolved = state.ui.lastResolution;
    if (!resolved) {
      panel.appendChild(el("div", { class: "card-placeholder" }, ["Reveal fog via an action (scan) or by moving a fleet into the hex."]));
      return;
    }

    panel.appendChild(el("div", { class: "card-header" }, [
      el("div", { class: "card-title" }, [resolved.cardTitle]),
      el("div", { class: "card-meta" }, [`Deck: ${resolved.deckType}`])
    ]));

    panel.appendChild(el("div", { class: "card-body" }, [
      `Chosen: ${resolved.choiceLabel}`
    ]));

    if (resolved.resolveText) {
      panel.appendChild(el("div", { class: "card-body" }, [resolved.resolveText]));
    }

    panel.appendChild(el("div", { class: "card-body" }, ["Place in hex"]));
    const placeGlyph = resolved.tokenId ? tokenGlyph(state, resolved.tokenId) : "";
    const placeText = resolved.placeNote ?? "Place: Nothing";
    panel.appendChild(el("div", { class: "card-body" }, [
      placeGlyph ? `${placeGlyph} ${placeText}` : placeText
    ]));

    const btn = el("button", {
      class: "btn",
      type: "button",
      "data-testid": "card-continue"
    }, ["Continue"]);
    btn.addEventListener("click", () => handlers.onCardContinue());
    panel.appendChild(btn);
    return;
  }

  const { deckType, card } = pending;

  panel.appendChild(el("div", { class: "card-header" }, [
    el("div", { class: "card-title", "data-testid": "card-title" }, [card.title]),
    el("div", { class: "card-meta" }, [`Deck: ${deckType}`])
  ]));

  panel.appendChild(el("div", { class: "card-body" }, [
    "Choose an option:"
  ]));

  const choices = el("div", { class: "card-choices" }, []);
  card.choices.forEach((ch, idx) => {
    const choiceBtn = el("button", {
      class: "choice",
      type: "button",
      "data-testid": `card-choice-${idx}`
    }, [
      el("div", {}, [ch.label]),
      el("small", {}, ["→"])
    ]);
    choiceBtn.addEventListener("click", () => handlers.onCardChoice(idx));
    choices.appendChild(choiceBtn);
  });

  panel.appendChild(choices);
}

function renderLog(state) {
  const log = document.getElementById("log");
  log.textContent = state.log.join("\n");
  log.scrollTop = log.scrollHeight;
}

function renderActions(state, handlers) {
  const panel = document.getElementById("actionPanel");
  if (!panel) return;

  panel.innerHTML = "";
  panel.classList.toggle("locked", state.ui.mode === "modal");

  const activeIndex = state.turn?.activePlayerIndex ?? 0;
  const player = state.players?.[activeIndex];
  const factionId = player?.factionId ?? "unknown";
  const actions = state.actionsByFaction?.[String(factionId).toLowerCase()];
  const dice = state.turn?.dice;
  const used = state.turn?.used;
  state.ui.availableActionOptions = computeAvailableActions(state);

  panel.appendChild(el("div", { class: "panel-title" }, ["ACTIONS"]));

  if (!actions) {
    const msg = `No actions found for factionId="${factionId}". Check actions.json keys.`;
    panel.appendChild(el("div", { class: "panel-warning" }, [msg]));
    if (!state.ui.actionWarningLogged) {
      state.log.push(`[Round ${state.turn?.round ?? 1}] ${msg}`);
      state.ui.actionWarningLogged = true;
    }
    return;
  }
  state.ui.actionWarningLogged = false;

  const pendingConsume = state.ui.pendingAction?.consume ?? {};
  const dicePills = el("div", { class: "dice-pills" }, [
    (!used?.a && dice?.a != null) ? el("div", {
      class: `dice-pill ${pendingConsume.a ? "pending" : ""}`,
      "data-testid": "die-a"
    }, [`A ${dice?.a ?? "-"}`]) : null,
    (!used?.b && dice?.b != null) ? el("div", {
      class: `dice-pill ${pendingConsume.b ? "pending" : ""}`,
      "data-testid": "die-b"
    }, [`B ${dice?.b ?? "-"}`]) : null,
    (!used?.bonus && dice?.bonus != null) ? el("div", {
      class: `dice-pill ${pendingConsume.bonus ? "pending" : ""}`,
      "data-testid": "die-bonus"
    }, [`Bonus ${dice?.bonus ?? "-"}`]) : null
  ]);

  const rollBtn = el("button", { class: "btn", type: "button", disabled: state.ui.mode !== "idle" }, ["Roll"]);
  rollBtn.addEventListener("click", () => handlers.onRollRoundDice());

  const performBtn = el("button", {
    class: "btn",
    type: "button",
    disabled: state.ui.mode === "modal",
    "data-testid": "perform-action"
  }, ["Perform Action"]);
  performBtn.addEventListener("click", () => handlers.onPerformAction());

  let hint = "Roll dice to see available actions.";
  const anyDie = (dice?.a != null && !used?.a) ||
    (dice?.b != null && !used?.b) ||
    (dice?.bonus != null && !used?.bonus);
  if (anyDie) hint = "Available actions highlighted.";
  if (state.ui.mode === "targeting") {
    const actionDef = state.ui.pendingAction?.actionDef;
    const isForward = (actionDef?.effects ?? []).some(e => e.op === "forwardDeploy");
    const isMove = (actionDef?.effects ?? []).some(e => e.op === "moveFleet");
    const isScan = (actionDef?.effects ?? []).some(e => e.op === "revealHex");
    if (isForward) hint = "Select a controlled system to deploy to.";
    else if (isMove) hint = "Select an adjacent hex to move into.";
    else if (isScan) hint = "Select an adjacent hex to scan.";
    else hint = "Select a valid target.";
  }
  if (state.ui.mode === "modal") hint = "Resolve current event first.";

  const diceArea = el("div", { class: "action-dice" }, [
    rollBtn,
    dicePills,
    el("div", { class: "action-hint" }, [hint]),
    performBtn
  ]);

  const makeGroup = (label, keys) => {
    const group = el("div", { class: "action-group" }, [
      el("div", { class: "action-group-label" }, [label])
    ]);
    const grid = el("div", { class: "action-grid" }, []);
    for (const key of keys) {
      const entry = actions[key];
      const options = state.ui.availableActionOptions?.[String(key)] ?? [];
      const available = options.length > 0;
      const classes = [
        "action-btn",
        available ? "available" : "",
        (state.ui.pendingAction?.actionNumber === String(key)) ? "queued" : ""
      ].filter(Boolean).join(" ");
      const btn = el("button", {
        class: classes,
        type: "button",
        disabled: state.ui.mode === "modal",
        title: entry?.text ?? ""
      }, [
        el("span", { class: "action-num" }, [`#${key}`]),
        el("span", { class: "action-name" }, [entry?.name ?? "Action"])
      ]);
      btn.addEventListener("click", () => handlers.onActionSelect(key));
      grid.appendChild(btn);
    }
    group.appendChild(grid);
    return group;
  };

  const actionsArea = el("div", { class: "action-groups" }, [
    makeGroup("1–6", ["1", "2", "3", "4", "5", "6"]),
    makeGroup("7–12", ["7", "8", "9", "10", "11", "12"]),
    makeGroup("13–18", ["13", "14", "15", "16", "17", "18"])
  ]);

  const bar = el("div", { class: "action-bar" }, [
    diceArea,
    actionsArea
  ]);
  panel.appendChild(bar);

  const controls = el("div", { class: "action-controls" }, [
    el("label", { class: "action-label" }, ["Free Explore (dev) "]),
    el("input", {
      type: "checkbox",
      checked: !!state.ui.freeExplore
    })
  ]);
  controls.querySelector("input").addEventListener("change", e => handlers.onToggleFreeExplore(e.target.checked));
  panel.appendChild(controls);

  const deckSelect = el("select", { class: "action-select" }, [
    el("option", { value: "empty" }, ["empty"]),
    el("option", { value: "system" }, ["system"]),
    el("option", { value: "phenomena" }, ["phenomena"])
  ]);
  deckSelect.value = state.ui.selectedDeckType ?? "phenomena";
  deckSelect.addEventListener("change", e => handlers.onSelectDeck(e.target.value));
  panel.appendChild(el("div", { class: "action-controls" }, [
    el("span", { class: "action-label" }, ["Peek deck: "]),
    deckSelect
  ]));

  const modifySelect = el("select", { class: "action-select" }, [
    el("option", { value: "a" }, ["Die A"]),
    el("option", { value: "b" }, ["Die B"]),
    el("option", { value: "bonus" }, ["Bonus"])
  ]);
  modifySelect.value = state.ui.modifyDie?.die ?? "a";
  modifySelect.addEventListener("change", e => handlers.onModifyDie(e.target.value, state.ui.modifyDie?.delta ?? 1));

  const deltaSelect = el("select", { class: "action-select" }, [
    el("option", { value: "1" }, ["+1"]),
    el("option", { value: "-1" }, ["-1"])
  ]);
  deltaSelect.value = String(state.ui.modifyDie?.delta ?? 1);
  deltaSelect.addEventListener("change", e => handlers.onModifyDie(state.ui.modifyDie?.die ?? "a", Number(e.target.value)));

  panel.appendChild(el("div", { class: "action-controls" }, [
    el("span", { class: "action-label" }, ["Modify die: "]),
    modifySelect,
    deltaSelect
  ]));
}

export function setSmokeBadge(text, kind = "warn") {
  const badge = document.getElementById("smokeStatus");
  badge.textContent = text;
  badge.classList.remove("good", "bad", "warn");
  badge.classList.add(kind);
}
