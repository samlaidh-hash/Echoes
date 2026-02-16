# Perchance Card Image Helper

A browser-based helper for generating Echoes card images using [Perchance AI Text-to-Image](https://perchance.org/ai-text-to-image-generator).

## Setup

1. Open a terminal in the `echoes` folder.
2. Run:
   ```bash
   node scripts/generate-perchance-helper.cjs
   ```
3. Open `perchance-card-helper.html` in your browser (double-click or drag into the browser).

## Usage

1. Open [Perchance AI Text-to-Image](https://perchance.org/ai-text-to-image-generator) in another tab.
2. In the helper, set **Perchance to 512×768** (portrait) for card art.
3. Click **Copy prompt** to copy the current prompt.
4. Paste into Perchance (in the prompt field).
5. Generate the image.
6. Right-click the image → Save as → use the filename shown (e.g. `Cargo Drift.png`).
7. Click **Next** and repeat.

## Features

- **Deck filter:** Show only Empty, System, or Phenomena cards.
- **Mark done:** Tracks which cards you've finished (stored in browser localStorage).
- **Prev/Next:** Navigate through prompts.
- **Open Perchance:** Quick link to the generator.

## Output

Save images to `assets/cards/` (create the folder if needed). Update `docs/card-image-generation-log.md` when you add new images.
