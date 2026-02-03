# Echoes of the Gate – Prototype

A lightweight HTML/CSS/JS prototype that implements the v0.1 core spec data model:

- 3 factions with 18 Tier 0 actions each.
- Hex map with fog-of-war.
- Dice system (2d6 + first player bonus).
- Phenomena, system, and empty decks (first 10 cards each).
- Card reveal flow (front choice → flip → permanent outcome).
- Game log.

## Run locally

Run a local static server (for example, `python -m http.server 8000`) and open `http://localhost:8000/index.html`.

## Data model

All game data lives in JSON files under `data/` and follows the canonical schema outlined in the spec.

## Structure

- `data/`: canonical faction, action, deck, and hex map data (phenomena/system/empty).
- `src/`: small engine modules (`content`, `state`, `rules`, `ui`, `main`).
- `index.html` / `styles.css`: UI shell and styling.

## Developer panel

Use the Developer Panel to force draw cards, reveal a selected hex, add/remove fleets, or print the current game state to the console.
