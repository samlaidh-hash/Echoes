#!/usr/bin/env node
/**
 * Generates perchance-card-helper.html for use with Perchance text-to-image.
 * Run: node scripts/generate-perchance-helper.cjs
 * Then open perchance-card-helper.html in your browser.
 */

const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const empty = JSON.parse(fs.readFileSync(path.join(dataDir, "cards_empty.json"), "utf8"));
const system = JSON.parse(fs.readFileSync(path.join(dataDir, "cards_system.json"), "utf8"));
const phenomena = JSON.parse(fs.readFileSync(path.join(dataDir, "cards_phenomena.json"), "utf8"));

const allCards = [...empty, ...system, ...phenomena];

function createPrompt(card) {
  const style = "sci-fi space art, atmospheric lighting, cinematic, digital painting";
  const typeMood = {
    empty: "Deep space void, drifting debris or abandoned structures",
    system: "Star system with planet, station, or colony",
    phenomena: "Cosmic anomaly, ancient ruins, or alien phenomenon"
  }[card.type] || "Space scene";
  return `Depict "${card.title}" — ${typeMood}. ${style}. Plain artwork only, portrait orientation, no text or frames.`;
}

const items = allCards.map((c) => ({
  id: c.id,
  title: c.title,
  type: c.type,
  prompt: createPrompt(c),
  filename: c.title + ".png"
}));

// Also write JSON for file-picker loading
const jsonPath = path.join(__dirname, "..", "perchance-card-data.json");
fs.writeFileSync(jsonPath, JSON.stringify(items, null, 0), "utf8");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Echoes Card Image Helper — Perchance</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 1rem; background: #1a1a2e; color: #eee; }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .sub { font-size: 0.85rem; color: #888; margin-bottom: 1rem; }
    .card { background: #16213e; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    .meta { font-size: 0.8rem; color: #7f8; margin-bottom: 0.5rem; }
    .prompt { background: #0f0f1a; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem; line-height: 1.4; margin: 0.5rem 0; white-space: pre-wrap; word-break: break-word; }
    .filename { font-size: 0.85rem; color: #8af; margin: 0.5rem 0; }
    .btns { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
    button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
    .copy { background: #0ea5e9; color: #fff; }
    .copy:hover { background: #0284c7; }
    .open { background: #22c55e; color: #fff; }
    .open:hover { background: #16a34a; }
    .nav { background: #334155; color: #eee; }
    .nav:hover { background: #475569; }
    .progress { font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem; }
    .deck-filter { margin-bottom: 1rem; }
    .deck-filter label { margin-right: 1rem; cursor: pointer; }
    .done { color: #4ade80; }
    .done-btn { background: #334155; color: #94a3b8; font-size: 0.8rem; }
    .done-btn:hover { background: #475569; color: #fff; }
    .done-btn.done { background: #166534; color: #4ade80; }
  </style>
</head>
<body>
  <h1>Echoes Card Image Helper</h1>
  <p class="sub">Use with <a href="https://perchance.org/ai-text-to-image-generator" target="_blank" rel="noopener">Perchance AI Text-to-Image</a>. Copy prompt → paste in Perchance → generate → save as filename.</p>
  <p class="sub"><strong>Optional:</strong> <button id="loadBtn" style="padding:0.25rem 0.5rem;cursor:pointer">Load perchance-card-data.json</button> to reload (run <code>node scripts/generate-perchance-helper.cjs</code> to regenerate)</p>

  <div class="deck-filter">
    <label><input type="radio" name="deck" value="all" checked> All</label>
    <label><input type="radio" name="deck" value="empty"> Empty</label>
    <label><input type="radio" name="deck" value="system"> System</label>
    <label><input type="radio" name="deck" value="phenomena"> Phenomena</label>
  </div>

  <div class="card">
    <div class="progress"><span id="progress">1 / 300</span></div>
    <div class="meta"><span id="meta">EMPTY_01 • empty</span></div>
    <div class="prompt" id="prompt"></div>
    <div class="filename">Save as: <strong id="filename"></strong></div>
    <div class="btns">
      <button class="copy" id="copyBtn">Copy prompt</button>
      <a href="https://perchance.org/ai-text-to-image-generator" target="_blank" rel="noopener"><button class="open">Open Perchance</button></a>
      <button class="nav" id="prevBtn">← Prev</button>
      <button class="nav" id="nextBtn">Next →</button>
      <button class="done-btn" id="doneBtn">Mark done</button>
    </div>
  </div>

  <p class="sub">Tip: Set Perchance to <strong>512×768</strong> (portrait) for card art.</p>

  <script>
    let ITEMS = ${JSON.stringify(items)};
    const STORAGE_KEY = "echoes-card-helper-done";
    let index = 0;
    let filtered = [...ITEMS];

    function getDone() {
      try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
      catch { return new Set(); }
    }
    function setDone(ids) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    }

    function filterItems() {
      const deck = document.querySelector('input[name="deck"]:checked').value;
      if (deck === "all") filtered = [...ITEMS]; else filtered = ITEMS.filter(i => i.type === deck);
      index = Math.min(index, Math.max(0, filtered.length - 1));
      render();
    }

    function render() {
      const item = filtered[index];
      if (!item) return;
      document.getElementById("progress").textContent = (index + 1) + " / " + filtered.length;
      document.getElementById("meta").textContent = item.id + " • " + item.type;
      document.getElementById("prompt").textContent = item.prompt;
      document.getElementById("filename").textContent = item.filename;
      const doneBtn = document.getElementById("doneBtn");
      doneBtn.textContent = getDone().has(item.id) ? "✓ Done" : "Mark done";
      doneBtn.classList.toggle("done", getDone().has(item.id));
    }

    document.getElementById("copyBtn").onclick = () => {
      navigator.clipboard.writeText(filtered[index].prompt);
      document.getElementById("copyBtn").textContent = "Copied!";
      setTimeout(() => { document.getElementById("copyBtn").textContent = "Copy prompt"; }, 1500);
    };

    document.getElementById("prevBtn").onclick = () => { index = (index - 1 + filtered.length) % filtered.length; render(); };
    document.getElementById("nextBtn").onclick = () => { index = (index + 1) % filtered.length; render(); };

    document.getElementById("doneBtn").onclick = () => {
      const done = getDone();
      const id = filtered[index].id;
      if (done.has(id)) done.delete(id); else done.add(id);
      setDone(done);
      render();
    };

    document.querySelectorAll('input[name="deck"]').forEach(el => { el.onchange = filterItems; });

    document.getElementById("loadBtn").onclick = () => {
      const inp = document.createElement("input");
      inp.type = "file";
      inp.accept = ".json";
      inp.onchange = () => {
        const f = inp.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => {
          try {
            ITEMS = JSON.parse(r.result);
            filterItems();
            document.getElementById("loadBtn").textContent = "Loaded " + ITEMS.length + " cards";
          } catch (e) { alert("Invalid JSON: " + e.message); }
        };
        r.readAsText(f);
      };
      inp.click();
    };

    filterItems();
  </script>
</body>
</html>
`;

const outPath = path.join(__dirname, "..", "perchance-card-helper.html");
fs.writeFileSync(outPath, html, "utf8");
console.log("Generated: perchance-card-helper.html");
console.log("Open in browser and use with https://perchance.org/ai-text-to-image-generator");
