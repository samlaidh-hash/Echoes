#!/usr/bin/env node
/**
 * Generates image prompts for all 300 cards.
 * Output: data/card-image-prompts.md
 * Run: node scripts/generate-image-prompts.js
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
  return `Depict "${card.title}" — ${typeMood}. ${style}. Full card artwork, portrait orientation, composition with clear space at bottom for text overlay (MTG-style card).`;
}

const lines = [
  "# Echoes Card Image Prompts",
  "",
  "**Card layout:** Both sides have text. Only the reverse side (revealed when flipped) has an image. Generate artwork for the reverse side; text will be overlaid in a white box (MTG-style). Save each image with the **exact card title** as the filename (e.g. `Cold Wake.png`).",
  "",
  "---",
  ""
];

for (const card of allCards) {
  const prompt = createPrompt(card);
  lines.push(`## ${card.title}`);
  lines.push(`**ID:** ${card.id} | **Type:** ${card.type}`);
  lines.push(`**Prompt:** ${prompt}`);
  lines.push(`**Filename:** "${card.title}"`);
  lines.push("");
}

fs.writeFileSync(path.join(dataDir, "card-image-prompts.md"), lines.join("\n"));

// Also output a simple copy-paste format: one prompt per card, ready for batch use
const header = "INSTRUCTIONS: Cards have text on both sides; only the reverse (flipped/revealed) side has an image. Generate artwork for the reverse side; text will be overlaid in a white box (MTG-style). Copy each PROMPT into your image AI. Save each image using the FILENAME (e.g. Cold Wake.png).\n\n";
const simpleLines = allCards.map((c) => {
  const p = createPrompt(c);
  return `PROMPT: ${p}\nFILENAME: ${c.title}\n`;
});
fs.writeFileSync(path.join(dataDir, "card-image-prompts-simple.txt"), header + simpleLines.join("---\n"));

console.log(`Generated prompts for ${allCards.length} cards:`);
console.log(`  → data/card-image-prompts.md (full)`);
console.log(`  → data/card-image-prompts-simple.txt (copy-paste format)`);
