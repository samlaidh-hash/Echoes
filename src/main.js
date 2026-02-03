import { loadGameContent } from "./content.js";
import { createInitialState } from "./state.js";
import { createUI } from "./ui.js";
import * as rng from "./rng.js";

const bootstrap = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const seedParam = params.get("seed");
    const seed = seedParam ? Number(seedParam) : 1;
    rng.setSeed(seed);
    const content = await loadGameContent();
    const initialState = createInitialState(content, { seed, rngState: rng.getState() });
    initialState.log = [`Seed: ${seed}.`];
    console.log(`Seed: ${seed}`);
    createUI({ initialState });
  } catch (error) {
    console.error("Failed to start prototype:", error);
    const fallback = document.createElement("div");
    fallback.style.padding = "24px";
    fallback.textContent = "Failed to load game data. Check console for details.";
    document.body.prepend(fallback);
  }
};

bootstrap();
