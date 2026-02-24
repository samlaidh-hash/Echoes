import { computeAvailableActions, countFleets, getHexesWithinRange, getHexesInStraightLineFrom } from "./rules.js";

const FACTION_DESCRIPTIONS = {
  directorate: "Military faction — strong fleets, outposts grant +2 influence, wins ties in combat.",
  choir: "Information faction — peeks at decks, modifies dice, gains intel before acting.",
  bloom: "Growth faction — spreads biomass tokens, replicates fleets, feeds off organic network.",
  salvagers: "Scavenger faction — places debris, salvages credits from wreckage, moves freely through debris.",
  gatekeepers: "Network faction — places beacons, jumps instantly between them, controls the gate network.",
  syndicate: "Trade faction — builds trade routes on hex edges, earns credits from commerce."
};

export function showSetupScreen() {
  return new Promise(resolve => {
    const overlay = document.createElement("div");
    overlay.className = "setup-overlay";

    const factions = ["directorate", "choir", "bloom", "salvagers", "gatekeepers", "syndicate"];
    const factionNames = {
      directorate: "The Directorate", choir: "The Choir of Glass", bloom: "The Bloom",
      salvagers: "The Salvagers", gatekeepers: "The Gatekeepers", syndicate: "The Syndicate"
    };
    const factionGlyphs = { directorate: "⛨", choir: "◈", bloom: "❖", salvagers: "⚙", gatekeepers: "✶", syndicate: "⇄" };

    let selectedFaction = "directorate";
    let selectedAI1 = "choir";
    let selectedAI2 = "bloom";

    function buildUI() {
      overlay.innerHTML = "";
      const box = document.createElement("div");
      box.className = "setup-box";

      box.innerHTML = `
        <div class="setup-title">ECHOES OF THE GATE</div>
        <div class="setup-subtitle">Choose your faction (1 Human vs 2 AI)</div>
        <div class="setup-section">
          <label class="setup-label">Your Faction</label>
          <div class="setup-faction-grid" id="humanFactionGrid"></div>
          <div class="setup-desc" id="humanDesc"></div>
        </div>
        <div class="setup-section">
          <label class="setup-label">AI Opponent 1</label>
          <select class="setup-select" id="ai1Select"></select>
        </div>
        <div class="setup-section">
          <label class="setup-label">AI Opponent 2</label>
          <select class="setup-select" id="ai2Select"></select>
        </div>
        <div class="setup-buttons">
          <button class="btn setup-btn" id="startBtn" title="Start a new game with the selected factions">Start Game</button>
          <button class="btn setup-btn setup-tutorial" id="tutorialBtn" title="Start with step-by-step tutorial hints">Tutorial</button>
        </div>
      `;
      overlay.appendChild(box);

      const grid = box.querySelector("#humanFactionGrid");
      factions.forEach(f => {
        const btn = document.createElement("button");
        btn.className = `setup-faction-btn ${f === selectedFaction ? "selected" : ""}`;
        btn.title = `${factionNames[f]}: ${FACTION_DESCRIPTIONS[f]}`;
        btn.textContent = `${factionGlyphs[f]} ${factionNames[f]}`;
        btn.addEventListener("click", () => { selectedFaction = f; buildUI(); });
        grid.appendChild(btn);
      });

      box.querySelector("#humanDesc").textContent = FACTION_DESCRIPTIONS[selectedFaction];

      const buildSelect = (selectEl, current, exclude) => {
        selectEl.innerHTML = "";
        factions.filter(f => f !== exclude).forEach(f => {
          const opt = document.createElement("option");
          opt.value = f;
          opt.textContent = `${factionGlyphs[f]} ${factionNames[f]}`;
          opt.title = FACTION_DESCRIPTIONS[f];
          if (f === current) opt.selected = true;
          selectEl.appendChild(opt);
        });
      };

      const ai1Sel = box.querySelector("#ai1Select");
      const ai2Sel = box.querySelector("#ai2Select");
      if (selectedAI1 === selectedFaction) selectedAI1 = factions.find(f => f !== selectedFaction && f !== selectedAI2);
      if (selectedAI2 === selectedFaction) selectedAI2 = factions.find(f => f !== selectedFaction && f !== selectedAI1);
      if (selectedAI1 === selectedAI2) selectedAI2 = factions.find(f => f !== selectedFaction && f !== selectedAI1);
      buildSelect(ai1Sel, selectedAI1, selectedFaction);
      buildSelect(ai2Sel, selectedAI2, selectedFaction);
      ai1Sel.addEventListener("change", () => { selectedAI1 = ai1Sel.value; if (selectedAI2 === selectedAI1) { selectedAI2 = factions.find(f => f !== selectedFaction && f !== selectedAI1); } buildUI(); });
      ai2Sel.addEventListener("change", () => { selectedAI2 = ai2Sel.value; if (selectedAI1 === selectedAI2) { selectedAI1 = factions.find(f => f !== selectedFaction && f !== selectedAI2); } buildUI(); });

      const finish = (tutorial) => {
        overlay.remove();
        resolve({
          tutorial,
          players: [
            { id: "p1", factionId: selectedFaction, credits: 0, energy: 0, bonusTokens: 0, isAI: false },
            { id: "p2", factionId: selectedAI1, credits: 0, energy: 0, bonusTokens: 0, isAI: true },
            { id: "p3", factionId: selectedAI2, credits: 0, energy: 0, bonusTokens: 0, isAI: true }
          ]
        });
      };

      box.querySelector("#startBtn").addEventListener("click", () => finish(false));
      box.querySelector("#tutorialBtn").addEventListener("click", () => finish(true));
    }

    buildUI();
    document.getElementById("app").appendChild(overlay);
  });
}

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
  renderCombat(state, handlers);
  renderTutorial(state);
}

const TUTORIAL_STEPS = [
  { phase: "roll", text: "Welcome! Click the **Roll** button to roll your action dice for this turn." },
  { phase: "pick", text: "Your dice are rolled. **Highlighted actions** can be performed. Click one to queue it." },
  { phase: "target", text: "This action needs a target. Click a **yellow-highlighted hex** on the map." },
  { phase: "perform", text: "Action queued! Click **Perform Action** or click a target hex to execute it." },
  { phase: "card", text: "A card was drawn! Read the options and **click one** to resolve it." },
  { phase: "continue", text: "Card resolved. Click **Continue** to proceed, then use remaining dice or end turn." },
  { phase: "endturn", text: "Dice spent! Click **Next Player** to end your turn. AI opponents will play automatically." },
  { phase: "done", text: "You've got the basics! Explore, expand, and compete for control. Hover over anything for tips." }
];

function getActionTip(entry) {
  if (!entry?.effects?.length) return "";
  const ops = entry.effects.map(e => e.op);
  if (ops.includes("moveFleet")) {
    return "Tip: Click a cell with your fleets (each click selects one more), right-click to deselect, then click an adjacent cell to move.";
  }
  if (ops.includes("fastDeploy")) {
    const range = entry.effects.find(e => e.op === "fastDeploy")?.range ?? 2;
    return `Tip: Select fleets, then click a hex within ${range} steps. Cannot enter enemy hexes.`;
  }
  if (ops.includes("flockMove")) {
    return "Tip: Select fleets; move range = number selected. Each click adds one fleet to selection.";
  }
  if (ops.includes("warpJump")) {
    return "Tip: Select fleets, then click any hex in the same row or column.";
  }
  if (ops.includes("mobiliseMove")) {
    return "Tip: Click destination first, then click adjacent hexes to gather fleets (one per click). Right-click to deselect.";
  }
  if (ops.includes("disperseMove")) {
    return "Tip: Select source cell and fleets, then click adjacent cells to move one fleet per click. Repeat until done.";
  }
  if (ops.includes("relayMove")) {
    return "Tip: Select fleets at a beacon, then click another beacon to jump instantly.";
  }
  if (ops.includes("revealHex")) {
    const range = entry.effects.find(e => e.op === "revealHex")?.range ?? 1;
    return `Tip: Select a hex within ${range} step(s) of your fleet to scan.`;
  }
  if (ops.includes("repairFleet")) {
    return "Tip: Select a hex with damaged fleet(s) to repair all.";
  }
  if (ops.includes("placeOutpost") || ops.includes("placeBeacon")) {
    return "Tip: Select a hex with your fleet.";
  }
  if (ops.includes("recruitFleetCapital") || ops.includes("forwardDeploy")) {
    return "Tip: Select a controlled system hex.";
  }
  return "";
}

function getTutorialHint(state) {
  if (!state.ui.tutorialMode || state.ui.tutorialStep < 0) return null;
  if (state.ui.tutorialStep >= TUTORIAL_STEPS.length) return TUTORIAL_STEPS[TUTORIAL_STEPS.length - 1].text;

  const dice = state.turn?.dice;
  const used = state.turn?.used;
  const noDice = dice?.a == null;
  const hasPending = !!state.ui.pendingAction;
  const hasCard = !!state.ui.pending;
  const hasResolution = !!state.ui.lastResolution;
  const isTargeting = state.ui.mode === "targeting";
  const allUsed = (dice?.a != null && used?.a) && (dice?.b != null && used?.b) && (!dice?.bonus || used?.bonus);

  if (hasCard) return TUTORIAL_STEPS[4].text;
  if (hasResolution) return TUTORIAL_STEPS[5].text;
  if (noDice) return TUTORIAL_STEPS[0].text;
  if (isTargeting) return TUTORIAL_STEPS[2].text;
  if (hasPending) return TUTORIAL_STEPS[3].text;
  if (allUsed) return TUTORIAL_STEPS[6].text;
  return TUTORIAL_STEPS[1].text;
}

function renderTutorial(state) {
  let bar = document.getElementById("tutorialBar");
  const hint = getTutorialHint(state);
  if (!hint) {
    if (bar) bar.classList.add("hidden");
    const slot = document.getElementById("tutorialSlot");
    if (slot) slot.classList.add("hidden");
    return;
  }
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "tutorialBar";
    bar.className = "tutorial-bar";
    const dismiss = document.createElement("button");
    dismiss.className = "tutorial-dismiss";
    dismiss.textContent = "✕";
    dismiss.title = "Dismiss tutorial hints";
    dismiss.addEventListener("click", () => {
      state.ui.tutorialMode = false;
      bar.classList.add("hidden");
    });
    bar.appendChild(dismiss);
    const text = document.createElement("div");
    text.className = "tutorial-text";
    bar.appendChild(text);
    const slot = document.getElementById("tutorialSlot");
    if (slot) slot.appendChild(bar);
    else document.getElementById("app").appendChild(bar);
  }
  bar.classList.remove("hidden");
  const slot = document.getElementById("tutorialSlot");
  if (slot) slot.classList.remove("hidden");
  const textEl = bar.querySelector(".tutorial-text");
  textEl.innerHTML = hint.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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

function authoredCardKey(deckType, cardId) {
  return `${String(deckType).toLowerCase()}:${cardId}`;
}

function getAuthoredCard(state, deckType, cardId) {
  return state.cardTextByKey?.[authoredCardKey(deckType, cardId)] ?? null;
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
    case "directorate": return "⛨";
    case "choir": return "◈";
    case "bloom": return "❖";
    case "salvagers": return "⚙";
    case "gatekeepers": return "✶";
    case "syndicate": return "⇄";
    default: return "?";
  }
}

function factionClass(factionId) {
  return `faction-${String(factionId).toLowerCase()}`;
}

function fleetGlyph(factionId) {
  switch (String(factionId).toLowerCase()) {
    case "directorate": return "▣";  // fortress
    case "choir": return "◆";        // crystal
    case "bloom": return "●";        // spore
    case "salvagers": return "⚙";    // gear
    case "gatekeepers": return "✶";  // beacon
    case "syndicate": return "◇";    // trade
    default: return "■";
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

function renderHudCompact(label, value, max) {
  const v = Math.max(0, Math.min(max, value ?? 0));
  return el("div", { class: "hud-compact" }, [`${label}: ${v}/${max}`]);
}

function renderHud(state) {
  const hud = document.getElementById("hud");
  if (!hud) return;
  hud.innerHTML = "";

  const factionRow = el("div", { class: "hud-row" }, []);
  state.players.forEach(player => {
    const totalFleets = Object.values(state.fleetsByHex ?? {}).reduce((s, v) => {
      const entry = v[String(player.factionId).toLowerCase()];
      return s + (entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0);
    }, 0);
    const isAI = !!player.isAI;
    const isActive = state.turn?.activePlayerIndex === state.players.indexOf(player);
    const fid = String(player.factionId).toLowerCase();
    const desc = FACTION_DESCRIPTIONS[fid] ?? "";
    const panel = el("div", {
      class: `hud-panel ${factionClass(player.factionId)} ${isActive ? "hud-active" : ""}`,
      title: `${factionName(state, player.factionId)}${isAI ? " (AI)" : " (You)"}\n${desc}\nCredits: ${player.credits ?? 0} | Energy: ${player.energy ?? 0} | Fleets: ${totalFleets}`
    }, [
      el("div", { class: "hud-title" }, [`${factionGlyph(player.factionId)} ${factionName(state, player.factionId)}${isAI ? " 🤖" : ""}`]),
      el("div", { class: "hud-panel-stats" }, [
        el("div", { class: "hud-stats-col" }, [
          renderHudCompact("Credits", player.credits, 20),
          renderHudCompact("Energy", player.energy, 20),
          el("div", { class: "hud-compact", title: "Bonus tokens: spend to use Bonus die" }, [`★ ${player.bonusTokens ?? 0}`])
        ]),
        el("div", { class: "hud-stats-side" }, [
          el("div", { class: "track-label" }, [`Fleets: ${totalFleets}`])
        ])
      ])
    ]);
    factionRow.appendChild(panel);
  });

  const tensionPanel = el("div", {
    class: "hud-panel hud-tension",
    title: "Cosmic Tension rises from combat. At thresholds (5/10/15/20) events trigger. Higher tension = closer to game end."
  }, [
    el("div", { class: "hud-title" }, ["Cosmic Tension"]),
    renderHudCompact("T", state.cosmicTension ?? 0, 20)
  ]);

  hud.appendChild(factionRow);
  hud.appendChild(tensionPanel);
}


function renderMap(state, handlers) {
  const map = document.getElementById("map");
  map.classList.toggle("targeting", state.ui.mode === "targeting");
  map.style.setProperty("--map-cols", String(state.map.width ?? 7));
  map.style.setProperty("--map-rows", String(state.map.height ?? 7));
  map.innerHTML = "";

  const activeFaction = String(state.players?.[state.turn?.activePlayerIndex ?? 0]?.factionId ?? "").toLowerCase();
  const awaitingAction = state.ui.pendingAction?.actionDef ?? null;
  const needsTarget = state.ui.mode === "targeting" && !!awaitingAction?.requiresTarget;
  const fastEffect = (awaitingAction?.effects ?? []).find(e => e.op === "fastDeploy");
  const flockEffect = (awaitingAction?.effects ?? []).find(e => e.op === "flockMove");
  const warpEffect = (awaitingAction?.effects ?? []).find(e => e.op === "warpJump");
  const isFast = !!fastEffect;
  const isFlock = !!flockEffect;
  const isWarp = !!warpEffect;
  const moveRange = fastEffect?.range ?? 2;
  const flockRange = (state.ui.fleetSelection?.fleetIds?.length ?? 0) || 1;
  const isRelay = (awaitingAction?.effects ?? []).some(e => e.op === "relayMove");
  const isMove = (awaitingAction?.effects ?? []).some(e =>
    e.op === "moveFleet" || e.op === "fastDeploy" || e.op === "relayMove" || e.op === "flockMove" || e.op === "warpJump" ||
    e.op === "mobiliseMove" || e.op === "disperseMove"
  );
  const isMobilise = (awaitingAction?.effects ?? []).some(e => e.op === "mobiliseMove");
  const isDisperse = (awaitingAction?.effects ?? []).some(e => e.op === "disperseMove");
  const isScan = (awaitingAction?.effects ?? []).some(e => e.op === "revealHex");
  const revealEffect = (awaitingAction?.effects ?? []).find(e => e.op === "revealHex");
  const revealCount = revealEffect?.count ?? 1;
  const revealRange = revealEffect?.range ?? 1;
  const isScanRange2 = isScan && revealRange > 1;
  const isAdjacentToken = (awaitingAction?.effects ?? []).some(e => e.op === "placeTokenAdjacent");
  const isForwardDeploy = (awaitingAction?.effects ?? []).some(e => e.op === "forwardDeploy");
  const isActivate = (awaitingAction?.effects ?? []).some(e => e.op === "activateSystem");
  const isRepair = (awaitingAction?.effects ?? []).some(e => e.op === "repairFleet");
  const isPlaceOutpost = (awaitingAction?.effects ?? []).some(e => e.op === "placeOutpost");
  const isPlaceDebris = (awaitingAction?.effects ?? []).some(e => e.op === "placeDebris");
  const isPlaceBeacon = (awaitingAction?.effects ?? []).some(e => e.op === "placeBeacon");
  const isPlaceTradeRoute = (awaitingAction?.effects ?? []).some(e => e.op === "placeTradeRoute");
  const isRecruitFleet = (awaitingAction?.effects ?? []).some(e => e.op === "recruitFleetCapital");
  const isReconOrigin = isScan && revealCount > 1 && revealRange === 1;

  for (const hex of state.map.hexes) {
    const fogged = !hex.revealed;
    const labelType = fogged ? "fog" : (hex.type ?? "unknown");
    const glyph = hex.revealed ? tokenGlyph(state, hex.token) : "";
    const fleetIcons = [];
    for (const [factionId, entry] of Object.entries(state.fleetsByHex?.[hex.id] ?? {})) {
      const undamaged = entry?.undamaged ?? [];
      const damaged = entry?.damaged ?? [];
      const glyph = fleetGlyph(factionId);
      const fid = String(factionId).toLowerCase();
      undamaged.forEach(() => {
        fleetIcons.push(el("span", { class: `fleet-icon fleet-${fid}` }, [glyph]));
      });
      damaged.forEach(() => {
        fleetIcons.push(el("span", { class: `fleet-icon fleet-${fid} damaged` }, [glyph]));
      });
    }
    const occContainer = el("div", { class: "fleet-tokens" }, fleetIcons);

    const isTargetable = needsTarget && (() => {
      if (isMove) {
        const sel = state.ui.fleetSelection;
        if (isMobilise) {
          if (!sel.destinationHexId) return true;
          const destId = sel.destinationHexId;
          const adjToDest = getAdjacentHexesForUi(state, destId).some(h => h.id === hex.id);
          const entry = state.fleetsByHex?.[hex.id]?.[activeFaction];
          const hasFleet = entry && ((entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0)) > 0;
          if (hex.id === destId && (sel.mobilisePicks?.length ?? 0) > 0) return true;
          return adjToDest && hasFleet;
        }
        if (!sel.hexId) {
          const entry = state.fleetsByHex?.[hex.id]?.[activeFaction];
          const count = (entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0);
          return count > 0;
        }
        if (isRelay) {
          return state.beaconsByHex?.[hex.id] === activeFaction && hex.id !== sel.hexId;
        }
        if (isWarp) {
          const lineHexes = getHexesInStraightLineFrom(state, sel.hexId);
          return lineHexes.some(h => h.id === hex.id);
        }
        const range = isDisperse ? 1 : (isFlock ? flockRange : moveRange);
        let frontier = [state.map.hexes.find(h => h.id === sel.hexId)].filter(Boolean);
        const reachable = new Set([sel.hexId]);
        for (let r = 0; r < range; r++) {
          const next = [];
          for (const h of frontier) {
            for (const n of getAdjacentHexesForUi(state, h.id)) {
              if (!reachable.has(n.id)) { reachable.add(n.id); next.push(n); }
            }
          }
          frontier = next;
        }
        return reachable.has(hex.id);
      }
      if (isScanRange2) {
        const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[activeFaction]);
        return fleetHexes.some(hId => getHexesWithinRange(state, hId, revealRange).some(h => h.id === hex.id));
      }
      if (isAdjacentToken || (isScan && !isReconOrigin)) {
        const fleetHexes = Object.keys(state.fleetsByHex ?? {}).filter(h => state.fleetsByHex[h]?.[activeFaction]);
        return fleetHexes.some(hId => getAdjacentHexesForUi(state, hId).some(h => h.id === hex.id));
      }
      if (isReconOrigin) {
        const entry = state.fleetsByHex?.[hex.id]?.[activeFaction];
        return entry && ((entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0)) > 0;
      }
      if (isRepair) {
        const entry = state.fleetsByHex?.[hex.id]?.[activeFaction];
        return entry && (entry?.damaged?.length ?? 0) > 0;
      }
      if (isPlaceOutpost || isPlaceDebris || isPlaceBeacon) {
        const entry = state.fleetsByHex?.[hex.id]?.[activeFaction];
        return entry && ((entry?.undamaged?.length ?? 0) + (entry?.damaged?.length ?? 0)) > 0;
      }
      if (isPlaceTradeRoute) {
        const fleetHex = Object.keys(state.fleetsByHex ?? {}).find(h => state.fleetsByHex[h]?.[activeFaction]);
        if (!fleetHex) return false;
        const adj = getAdjacentHexesForUi(state, fleetHex).some(h => h.id === hex.id);
        const controlled = state.controllerByHex?.[hex.id] === activeFaction && !state.contestedByHex?.[hex.id];
        return adj && controlled;
      }
      if (isForwardDeploy || isActivate || isRecruitFleet) {
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

    const isSelectedOrigin = state.ui.fleetSelection?.hexId === hex.id;
    const selectedCount = isSelectedOrigin ? state.ui.fleetSelection?.fleetIds?.length ?? 0 : 0;
    const tokenLine = hex.token ? `Token: ${hex.token}` : "";
    const fleetLines = Object.entries(state.fleetsByHex?.[hex.id] ?? {})
      .map(([f, e]) => {
        const total = (e?.undamaged?.length ?? 0) + (e?.damaged?.length ?? 0);
        const dmg = e?.damaged?.length ?? 0;
        return total > 0 ? `${factionName(state, f)}: ${total} fleet${total > 1 ? "s" : ""}${dmg > 0 ? ` (${dmg} damaged)` : ""}` : null;
      }).filter(Boolean).join("\n");
    const beaconLine = state.beaconsByHex?.[hex.id] ? `Beacon: ${factionName(state, state.beaconsByHex[hex.id])}` : "";
    const outpostLine = state.outpostByHex?.[hex.id] ? `Outpost: ${factionName(state, state.outpostByHex[hex.id])}` : "";

    const cardInfo = state.cardByHex?.[hex.id];
    const hexChildren = [
      el("div", { class: "id" }, [hex.id]),
      el("div", { class: "type" }, [labelType]),
      occContainer,
      selectedCount > 0 ? el("div", { class: "fleet-selected" }, [`x${selectedCount}`]) : null,
      el("div", { class: "token" }, [glyph])
    ];
    if (cardInfo && hex.revealed) {
      const cardIcon = el("div", { class: "hex-card-icon", title: "Hover to read card" }, ["📄"]);
      hexChildren.push(cardIcon);
    }

    const capitalFaction = Object.entries(state.capitalsByFaction ?? {}).find(([, h]) => h === hex.id)?.[0];
    const controlFaction = controller ? String(controller).toLowerCase() : null;
    const capitalClass = capitalFaction ? `capital-${capitalFaction}` : "";
    const controlClass = controlFaction ? `controlled-${controlFaction}` : "";
    const btn = el("button", {
      class: `hex ${fogged ? "fogged" : ""} ${isTargetable ? "targetable" : ""} ${isSelectedOrigin ? "selected-origin" : ""} ${state.ui.pulseHexId === hex.id ? "pulse" : ""} ${capitalClass} ${controlClass}`.trim(),
      type: "button",
      disabled: false,
      title: [
        `Hex ${hex.id}`,
        fogged ? "Status: Unexplored (fog of war)" : `Type: ${hex.type}`,
        tokenLine, outpostLine, beaconLine,
        fleetLines ? `Fleets:\n${fleetLines}` : "",
        "Influence:",
        influenceLines || "  None",
        controlLine,
        isTargetable ? "★ Valid target for current action" : ""
      ].filter(Boolean).join("\n"),
      "data-testid": `hex-${hex.id}`,
      "data-hexid": hex.id
    }, hexChildren);

    btn.addEventListener("click", (e) => handlers.onHexClick(hex.id, e));
    btn.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      handlers.onHexContextMenu(hex.id, e);
    });
    if (cardInfo && hex.revealed) {
      let hideTimer = null;
      btn.addEventListener("mouseenter", () => {
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        showHexCardPopover(state, hex.id, cardInfo, btn);
      });
      btn.addEventListener("mouseleave", () => {
        hideTimer = setTimeout(() => hideHexCardPopover(), 200);
      });
    }
    map.appendChild(btn);
  }
}

let hexCardPopoverEl = null;
let hexCardPopoverHideTimer = null;

function showHexCardPopover(state, hexId, cardInfo, triggerEl) {
  if (hexCardPopoverHideTimer) {
    clearTimeout(hexCardPopoverHideTimer);
    hexCardPopoverHideTimer = null;
  }
  if (!hexCardPopoverEl) {
    hexCardPopoverEl = document.createElement("div");
    hexCardPopoverEl.className = "hex-card-popover";
    hexCardPopoverEl.addEventListener("mouseenter", () => {
      if (hexCardPopoverHideTimer) { clearTimeout(hexCardPopoverHideTimer); hexCardPopoverHideTimer = null; }
    });
    hexCardPopoverEl.addEventListener("mouseleave", () => {
      hexCardPopoverHideTimer = setTimeout(() => hideHexCardPopover(), 200);
    });
    document.body.appendChild(hexCardPopoverEl);
  }
  const authored = getAuthoredCard(state, cardInfo.deckType, cardInfo.cardId);
  const lines = [cardInfo.cardTitle];
  if (authored?.front) {
    if (authored.front.line2_description) lines.push(authored.front.line2_description);
    if (authored.front.line3_decision) lines.push(authored.front.line3_decision);
    const opts = [authored.front.line4_optionA, authored.front.line5_optionB, authored.front.line6_optionC].filter(Boolean);
    if (opts.length) lines.push("Options: " + opts.join(" | "));
  }
  hexCardPopoverEl.innerHTML = lines.map(l => `<div class="hex-card-popover-line">${escapeHtml(l)}</div>`).join("");
  const rect = triggerEl.getBoundingClientRect();
  hexCardPopoverEl.style.left = `${rect.left}px`;
  hexCardPopoverEl.style.top = `${Math.max(8, rect.top - 4)}px`;
  hexCardPopoverEl.style.transform = `translateY(-100%)`;
  hexCardPopoverEl.classList.add("visible");
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function hideHexCardPopover() {
  if (hexCardPopoverEl) hexCardPopoverEl.classList.remove("visible");
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

    const authored = getAuthoredCard(state, resolved.deckType, resolved.cardId);
    if (authored) {
      const idx = Number.isFinite(resolved.choiceIndex) ? resolved.choiceIndex : 0;
      const optionKey = ["optionA", "optionB", "optionC"][Math.max(0, Math.min(2, idx))];
      const resolvedOption = authored.instantOptionResults?.[optionKey];
      if (resolvedOption) {
        panel.appendChild(el("div", { class: "card-body" }, [
          `Instant (${resolvedOption.profile}): ${resolvedOption.effect}`
        ]));
        if (resolvedOption.cost) {
          panel.appendChild(el("div", { class: "card-body" }, [`Cost paid: ${resolvedOption.cost}`]));
        }
      }
      panel.appendChild(el("div", { class: "card-body" }, [
        `On Activation: ${authored.rear?.primaryAction?.effect ?? "—"}`
      ]));
      panel.appendChild(el("div", { class: "card-body" }, [
        `Secondary (auto): ${authored.rear?.secondaryOnActivation?.effect ?? "—"}`
      ]));
    }

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
  const authored = getAuthoredCard(state, deckType, card.id);

  panel.appendChild(el("div", { class: "card-header" }, [
    el("div", { class: "card-title", "data-testid": "card-title" }, [card.title]),
    el("div", { class: "card-meta" }, [`Deck: ${deckType}`])
  ]));

  if (authored?.front) {
    const frontLines = [
      authored.front.line2_description,
      authored.front.line3_decision
    ].filter(Boolean);
    for (const line of frontLines) {
      panel.appendChild(el("div", { class: "card-body" }, [line]));
    }
  } else {
    panel.appendChild(el("div", { class: "card-body" }, [
      "Choose an option:"
    ]));
  }

  const choices = el("div", { class: "card-choices" }, []);
  const authoredOptionLines = authored?.front
    ? [authored.front.line4_optionA, authored.front.line5_optionB, authored.front.line6_optionC]
    : [];
  card.choices.forEach((ch, idx) => {
    const authoredLabel = authoredOptionLines[idx];
    const primary = authoredLabel || ch.label;
    const secondary = authoredLabel && authoredLabel !== ch.label ? ch.label : null;
    const choiceBtn = el("button", {
      class: "choice",
      type: "button",
      "data-testid": `card-choice-${idx}`
    }, [
      el("div", {}, [primary]),
      secondary ? el("small", {}, [`Base: ${secondary}`]) : el("small", {}, ["→"])
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
  const consumedIfPending = state.ui.pendingAction
    ? { ...state.turn?.used, ...state.ui.pendingAction?.consume }
    : null;
  let availableOptions = computeAvailableActions(state, consumedIfPending);
  if (state.ui.pendingAction) {
    const filtered = {};
    for (const [k, v] of Object.entries(availableOptions ?? {})) {
      const n = parseInt(k, 10);
      if (n >= 1 && n <= 6) filtered[k] = v;
    }
    availableOptions = filtered;
  }
  state.ui.availableActionOptions = availableOptions;

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
      title: `Die A (value ${dice?.a}). Spend to perform action #${dice?.a}, or combine with other dice for higher actions.`,
      "data-testid": "die-a"
    }, [`A ${dice?.a ?? "-"}`]) : null,
    (!used?.b && dice?.b != null) ? el("div", {
      class: `dice-pill ${pendingConsume.b ? "pending" : ""}`,
      title: `Die B (value ${dice?.b}). Spend to perform action #${dice?.b}, or combine with other dice for higher actions.`,
      "data-testid": "die-b"
    }, [`B ${dice?.b ?? "-"}`]) : null,
    (!used?.bonus && dice?.bonus != null) ? el("div", {
      class: `dice-pill ${pendingConsume.bonus ? "pending" : ""}`,
      title: `Bonus Die (value ${dice?.bonus}). Only first player gets this. Combine with A or B for powerful high-numbered actions.`,
      "data-testid": "die-bonus"
    }, [`Bonus ${dice?.bonus ?? "-"}`]) : null
  ]);

  const noDiceYet = dice?.a == null && dice?.b == null;
  const rollBtn = el("button", {
    class: "btn", type: "button",
    disabled: state.ui.mode !== "idle" || !noDiceYet,
    title: "Roll your action dice for this turn. You get Die A and Die B; first player also gets a Bonus die.",
    "data-testid": "roll-btn"
  }, ["Roll"]);
  rollBtn.addEventListener("click", () => handlers.onRollRoundDice());

  const allDiceUsed = (dice?.a != null && used?.a) && (dice?.b != null && used?.b) &&
    (!dice?.bonus || used?.bonus);
  const hasAvailableActions = Object.entries(state.ui.availableActionOptions ?? {}).some(
    ([, opts]) => Array.isArray(opts) && opts.length > 0
  );
  const canEndTurn = noDiceYet || allDiceUsed || !hasAvailableActions;
  const nextPlayerReady = state.ui.mode === "idle" && canEndTurn;
  const nextPlayerBtn = el("button", {
    class: `btn ${nextPlayerReady ? "next-player-ready" : ""}`.trim(),
    type: "button",
    disabled: state.ui.mode !== "idle" || !canEndTurn,
    title: "End your turn and pass to the next player. Available when all dice are used or no actions remain.",
    "data-testid": "next-player"
  }, ["Next Player"]);
  nextPlayerBtn.addEventListener("click", () => handlers.onNextPlayer?.());

  const performBtn = el("button", {
    class: "btn",
    type: "button",
    title: "Execute the currently queued action. Select an action first, then click here (or click a target hex for targeted actions).",
    "data-testid": "perform-action-btn",
    disabled: state.ui.mode === "modal"
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
    const isRecruitFleet = (actionDef?.effects ?? []).some(e => e.op === "recruitFleetCapital");
    const isMove = (actionDef?.effects ?? []).some(e =>
      e.op === "moveFleet" || e.op === "fastDeploy" || e.op === "flockMove" || e.op === "warpJump" || e.op === "relayMove" ||
      e.op === "mobiliseMove" || e.op === "disperseMove"
    );
    const isScan = (actionDef?.effects ?? []).some(e => e.op === "revealHex");
    const revealEffect = (actionDef?.effects ?? []).find(e => e.op === "revealHex");
    const revealCount = revealEffect?.count ?? 1;
    const revealRange = revealEffect?.range ?? 1;
    const isRepair = (actionDef?.effects ?? []).some(e => e.op === "repairFleet");
    if (isForward) hint = "Select a controlled system to deploy to.";
    else if (isRecruitFleet) hint = "Select a controlled system to place the fleet.";
    else if (isMove) {
      const hasFlock = (actionDef?.effects ?? []).some(e => e.op === "flockMove");
      const hasWarp = (actionDef?.effects ?? []).some(e => e.op === "warpJump");
      const hasRelay = (actionDef?.effects ?? []).some(e => e.op === "relayMove");
      const hasMobilise = (actionDef?.effects ?? []).some(e => e.op === "mobiliseMove");
      const hasDisperse = (actionDef?.effects ?? []).some(e => e.op === "disperseMove");
      if (hasRelay) hint = "Select fleets, then a beacon destination.";
      else if (hasWarp) hint = "Select fleets, then a hex in straight line.";
      else if (hasFlock) hint = "Select fleets (range = count), then destination.";
      else if (hasMobilise) hint = "Click destination, then adjacent hexes to gather fleets.";
      else if (hasDisperse) hint = "Select source and fleets, then adjacent hexes (repeat until done).";
      else hint = "Select fleets, then adjacent hex to move.";
    }
    else if (isScan) {
      if (revealRange > 1) hint = `Select a hex within ${revealRange} steps of a fleet to scan.`;
      else if (revealCount > 1) hint = "Select a fleet hex (origin) to reveal 2 adjacent.";
      else hint = "Select an adjacent hex to scan.";
    }
    else if (isRepair) hint = "Select a hex with damaged fleet(s).";
    else if ((actionDef?.effects ?? []).some(e => e.op === "placeOutpost" || e.op === "placeDebris" || e.op === "placeBeacon")) hint = "Select a hex with your fleet.";
    else hint = "Select a valid target.";
  }
  if (state.ui.mode === "modal") hint = "Resolve current event first.";

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
      const reqTarget = entry?.requiresTarget ? "Requires target hex." : "Auto-resolves (no target needed).";
      const diceHint = available ? `Available via: ${options.map(o => o.label).join(", ")}` : "Not available with current dice.";
      const tip = getActionTip(entry);
      const titleParts = [`#${key} ${entry?.name ?? "Action"}`, entry?.text ?? "", reqTarget, diceHint];
      if (tip) titleParts.push(tip);
      const btn = el("button", {
        class: classes,
        type: "button",
        disabled: state.ui.mode === "modal",
        title: titleParts.join("\n"),
        "data-testid": `action-${key}`
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

  const freeExploreInput = el("input", { type: "checkbox", checked: !!state.ui.freeExplore });
  freeExploreInput.addEventListener("change", e => handlers.onToggleFreeExplore(e.target.checked));
  const freeExploreLabel = el("label", { class: "action-label" }, [freeExploreInput, " Free Explore"]);

  const deckSelect = el("select", { class: "action-select" }, [
    el("option", { value: "empty" }, ["empty"]),
    el("option", { value: "system" }, ["system"]),
    el("option", { value: "phenomena" }, ["phenomena"])
  ]);
  deckSelect.value = state.ui.selectedDeckType ?? "phenomena";
  deckSelect.addEventListener("change", e => handlers.onSelectDeck(e.target.value));

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

  const saveBtn = el("button", { class: "btn", type: "button", title: "Save the current game to browser storage.", "data-testid": "save-game-btn" }, ["Save"]);
  const loadBtn = el("button", { class: "btn", type: "button", title: "Load a previously saved game from browser storage.", "data-testid": "load-game-btn" }, ["Load"]);
  const newBtn = el("button", { class: "btn", type: "button", title: "Start a brand new game (reloads the page).", "data-testid": "new-game-btn" }, ["New"]);
  saveBtn.addEventListener("click", () => handlers.onSaveGame?.());
  loadBtn.addEventListener("click", () => handlers.onLoadGame?.());
  newBtn.addEventListener("click", () => handlers.onNewGame?.());

  const topRow = el("div", { class: "action-panel-top" }, [
    rollBtn,
    nextPlayerBtn,
    dicePills,
    performBtn,
    el("span", { class: "action-hint-inline" }, [hint]),
    el("span", { class: "action-sep" }, ["|"]),
    el("span", { class: "action-label" }, ["Peek: "]),
    deckSelect,
    el("span", { class: "action-label" }, ["Modify: "]),
    modifySelect,
    deltaSelect,
    freeExploreLabel,
    el("span", { class: "action-sep" }, ["|"]),
    saveBtn,
    loadBtn,
    newBtn
  ]);
  panel.appendChild(topRow);

  const actionsArea = el("div", { class: "action-groups" }, [
    makeGroup("1–6", ["1", "2", "3", "4", "5", "6"]),
    makeGroup("7–12", ["7", "8", "9", "10", "11", "12"])
  ]);
  panel.appendChild(actionsArea);
}

export function setSmokeBadge(text, kind = "warn") {
  const badge = document.getElementById("smokeStatus");
  badge.textContent = text;
  badge.classList.remove("good", "bad", "warn");
  badge.classList.add(kind);
}

function renderCombat(state, handlers) {
  const modal = document.getElementById("combatModal");
  if (!modal) return;
  if (state.ui?.gameOver && state.ui?.modalType === "gameover") {
    modal.classList.remove("hidden");
    modal.innerHTML = "";
    modal.appendChild(el("div", { class: "combat-title" }, ["GAME OVER"]));
    modal.appendChild(el("div", { class: "combat-section" }, [state.ui.gameOver.reason ?? "Game complete."]));
    const winner = state.ui.gameOver.winnerFactionId ?? "none";
    modal.appendChild(el("div", { class: "combat-section" }, [`Winner: ${factionName(state, winner)}`]));
    const scoreList = el("div", { class: "combat-section" }, [
      el("div", { class: "combat-title" }, ["Victory Points"])
    ]);
    for (const row of state.ui.gameOver.scores ?? []) {
      scoreList.appendChild(el("div", {}, [
        `${factionGlyph(row.factionId)} ${factionName(state, row.factionId)}: ${row.score} Victory Points`
      ]));
    }
    modal.appendChild(scoreList);
    const actions = el("div", { class: "combat-actions" }, []);
    const dismissBtn = el("button", { class: "btn", type: "button", "data-testid": "dismiss-gameover-btn" }, ["Close"]);
    dismissBtn.addEventListener("click", () => handlers.onDismissGameOver?.());
    const newBtn = el("button", { class: "btn", type: "button", "data-testid": "gameover-new-btn" }, ["New Game"]);
    newBtn.addEventListener("click", () => handlers.onNewGame?.());
    actions.appendChild(dismissBtn);
    actions.appendChild(newBtn);
    modal.appendChild(actions);
    return;
  }
  const combat = state.ui.combat;
  if (!combat) {
    modal.classList.add("hidden");
    modal.innerHTML = "";
    return;
  }
  modal.classList.remove("hidden");
  modal.innerHTML = "";

  modal.appendChild(el("div", { class: "combat-title" }, ["COMBAT"]));
  modal.appendChild(el("div", { class: "combat-section" }, [`Hex: ${combat.hexId}`]));

  if (combat.phase === "prompt") {
    modal.appendChild(el("div", { class: "combat-section" }, ["Engage which faction(s)?"]));
    combat.defenderCandidates.forEach(f => {
      const row = el("button", { class: "btn", type: "button" }, [factionName(state, f)]);
      row.addEventListener("click", () => handlers.onCombatToggleFaction(f));
      modal.appendChild(row);
    });
    const engageBtn = el("button", { class: "btn", type: "button", title: "Start combat with the selected defender faction(s)." }, ["Engage Selected"]);
    engageBtn.addEventListener("click", () => handlers.onCombatEngage());
    modal.appendChild(engageBtn);
    const skipBtn = el("button", { class: "btn", type: "button", title: "Skip combat and end the move peacefully." }, ["Do Not Engage"]);
    skipBtn.addEventListener("click", () => handlers.onCombatDisengage());
    modal.appendChild(skipBtn);
    return;
  }

  const sideRow = el("div", { class: "combat-sides" }, []);
  const attackerSide = el("div", { class: "combat-side" }, [
    el("div", { class: "combat-title" }, ["Attacker"]),
    el("div", {}, [combat.attackerFactions.map(f => {
      const counts = countFleets(state, combat.hexId, f);
      return `${factionGlyph(f)} ${counts.total} (${counts.damaged}✕)`;
    }).join(" ")])
  ]);
  const defenderSide = el("div", { class: "combat-side" }, [
    el("div", { class: "combat-title" }, ["Defender"]),
    el("div", {}, [combat.engagedFactions.map(f => {
      const counts = countFleets(state, combat.hexId, f);
      return `${factionGlyph(f)} ${counts.total} (${counts.damaged}✕)`;
    }).join(" ")])
  ]);
  sideRow.appendChild(attackerSide);
  sideRow.appendChild(defenderSide);
  modal.appendChild(sideRow);

  const diceRow = el("div", { class: "combat-sides" }, [
    el("div", { class: "combat-dice" }, combat.dice.attacker.map(d => (
      el("div", { class: "combat-die" }, [`${factionGlyph(d.factionId)} ${d.value}`])
    ))),
    el("div", { class: "combat-dice" }, combat.dice.defender.map(d => (
      el("div", { class: "combat-die" }, [`${factionGlyph(d.factionId)} ${d.value}`])
    )))
  ]);
  modal.appendChild(diceRow);

  if (combat.pairs?.length) {
    const pairs = el("div", { class: "combat-section" }, [
      el("div", { class: "combat-title" }, ["Pairs"])
    ]);
    combat.pairs.forEach(p => {
      const loser = p.loser ? `→ hit on ${p.loser}` : "→ no hit";
      pairs.appendChild(el("div", {}, [
        `${factionGlyph(p.attacker.factionId)} ${p.attacker.value} vs ${factionGlyph(p.defender.factionId)} ${p.defender.value} ${loser}`
      ]));
    });
    modal.appendChild(pairs);
  }

  if (combat.phase === "roll") {
    const rollBtn = el("button", { class: "btn", type: "button", title: "Roll dice for both sides. Each fleet rolls 1d6; dice are paired high-to-high. Lower die in each pair takes a hit." }, ["Roll Combat Round"]);
    rollBtn.addEventListener("click", () => handlers.onCombatRoll());
    modal.appendChild(rollBtn);
    return;
  }

  const actions = el("div", { class: "combat-actions" }, []);
  const contBtn = el("button", { class: "btn", type: "button", title: "Continue fighting. Roll another round of combat dice." }, ["Continue"]);
  contBtn.addEventListener("click", () => handlers.onCombatContinue());
  const retBtn = el("button", { class: "btn", type: "button", title: "Retreat your attacking fleets to an adjacent hex. Ends combat." }, ["Retreat"]);
  retBtn.addEventListener("click", () => handlers.onCombatRetreat());
  actions.appendChild(contBtn);
  actions.appendChild(retBtn);
  modal.appendChild(actions);
}
