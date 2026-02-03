function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "disabled") node.disabled = !!v;
    else node[k] = v;
  }
  for (const child of children) {
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  }
  return node;
}

export function render(state, handlers) {
  renderSeed(state);
  renderMap(state, handlers);
  renderCard(state, handlers);
  renderLog(state);
}

function renderSeed(state) {
  const seed = document.getElementById("seedDisplay");
  seed.textContent = `seed=${state.meta.seed}`;
}

function tokenGlyph(state, tokenId) {
  if (!tokenId) return "";
  const t = state.tokens[tokenId];
  return t?.glyph ?? "?";
}

function renderMap(state, handlers) {
  const map = document.getElementById("map");
  map.innerHTML = "";

  for (const hex of state.map.hexes) {
    const fogged = !hex.revealed;
    const labelType = fogged ? "fog" : (hex.type ?? "unknown");
    const glyph = hex.revealed ? tokenGlyph(state, hex.token) : "";

    const btn = el("button", {
      class: `hex ${fogged ? "fogged" : ""}`,
      type: "button",
      disabled: false,
      title: fogged ? "Unexplored" : `Type: ${hex.type}`,
      "data-testid": `hex-${hex.id}`,
      "data-hexid": hex.id
    }, [
      el("div", { class: "id" }, [hex.id]),
      el("div", { class: "type" }, [labelType]),
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
    panel.appendChild(el("div", { class: "card-placeholder" }, ["Explore a hex to draw a card."]));
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

export function setSmokeBadge(text, kind = "warn") {
  const badge = document.getElementById("smokeStatus");
  badge.textContent = text;
  badge.classList.remove("good", "bad", "warn");
  badge.classList.add(kind);
}
