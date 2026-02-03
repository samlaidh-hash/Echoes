import { loadGameContent } from "./content.js";
import { createInitialState } from "./state.js";
import { createUI } from "./ui.js";

const bootstrap = async () => {
  try {
    const content = await loadGameContent();
    const initialState = createInitialState(content);
    const bugbotEnabled = new URLSearchParams(window.location.search).has("bugbot");
    createUI({ initialState, bugbotEnabled });
  } catch (error) {
    console.error("Failed to start prototype:", error);
    const fallback = document.createElement("div");
    fallback.style.padding = "24px";
    fallback.textContent = "Failed to load game data. Check console for details.";
    document.body.prepend(fallback);
  }
};

bootstrap();
