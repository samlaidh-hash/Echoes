import { test, expect } from "@playwright/test";

async function resolveCardIfPresent(page) {
  const firstChoice = page.locator("[data-testid='card-choice-0']");
  if (await firstChoice.count()) {
    await firstChoice.first().click();
  }
  const continueBtn = page.locator("[data-testid='card-continue']");
  if (await continueBtn.count()) {
    await continueBtn.first().click();
  }
}

async function clickAnyTargetableHex(page) {
  const targetable = page.locator(".hex.targetable").first();
  if (await targetable.count()) {
    await targetable.click();
    return true;
  }
  return false;
}

test.describe("Echoes end-to-end playtest", () => {
  async function waitForBoot(page) {
    await page.waitForFunction(() => {
      const ready = document.querySelector("[data-testid='app-ready']");
      const state = window.__ECHOES_STATE__;
      return !!ready && ready.classList && !ready.classList.contains("hidden") && !!state;
    });
  }

  test("real-user flow with mouse and keyboard interactions", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(String(err?.message ?? err)));

    await page.goto("/index.html?seed=42&smoke=1");
    await waitForBoot(page);
    await expect(page.locator("[data-testid='app-ready']")).toBeAttached();
    await expect(page.locator("[data-testid='hex-map']")).toBeVisible();

    // Keyboard interaction: focus + Enter to roll.
    const rollBtn = page.locator("[data-testid='roll-btn']");
    await rollBtn.focus();
    await page.keyboard.press("Enter");

    // Mouse interaction: queue first available action and resolve if needed.
    const availableAction = page.locator(".action-btn.available").first();
    await expect(availableAction).toBeVisible();
    await availableAction.click();

    const performedTargeted = await clickAnyTargetableHex(page);
    if (!performedTargeted) {
      await page.locator("[data-testid='perform-action-btn']").click();
    }
    await resolveCardIfPresent(page);

    // Explore by clicking fogged cells (smoke mode supports free exploration).
    for (let i = 0; i < 8; i += 1) {
      const fogHex = page.locator(".hex.fogged").first();
      if (!(await fogHex.count())) break;
      await fogHex.click();
      await resolveCardIfPresent(page);
    }

    // Right-click simulation on a map cell (context interaction path).
    const anyHex = page.locator("[data-testid^='hex-']").nth(4);
    if (await anyHex.count()) {
      await anyHex.click({ button: "right" });
    }

    // Keyboard interaction: tab navigation + Enter on next player.
    const nextPlayerBtn = page.locator("[data-testid='next-player']");
    await nextPlayerBtn.focus();
    await page.keyboard.press("Enter");

    // Ensure app is still responsive.
    await page.locator("[data-testid='perform-action-btn']").click();
    const log = page.locator("[data-testid='game-log']");
    await expect(log).toBeVisible();
    await expect(log).not.toHaveText("");

    expect(pageErrors, `Unhandled page errors:\n${pageErrors.join("\n")}`).toEqual([]);
  });

  test("combat controls and action panel visibility sanity", async ({ page }) => {
    await page.goto("/index.html?seed=43&smoke=1");
    await waitForBoot(page);
    await expect(page.locator("[data-testid='app-ready']")).toBeAttached();
    await expect(page.locator("[data-testid='action-panel']")).toBeVisible();

    // Roll + attempt a few actions to surface combat modal if/when possible.
    await page.locator("[data-testid='roll-btn']").click();
    for (let i = 0; i < 5; i += 1) {
      const action = page.locator(".action-btn.available").nth(i);
      if (!(await action.count())) break;
      await action.click();
      const clicked = await clickAnyTargetableHex(page);
      if (!clicked) await page.locator("[data-testid='perform-action-btn']").click();
      await resolveCardIfPresent(page);
    }

    // Combat modal may appear depending on map state; assert no crash either way.
    const modal = page.locator("[data-testid='combat-modal']");
    await expect(modal).toBeAttached();
    await expect(page.locator("[data-testid='hud']")).toBeVisible();
  });

  test("save/load and round-limit gameover flow", async ({ page }) => {
    await page.goto("/index.html?seed=44&smoke=1");
    await page.waitForFunction(() => {
      const ready = document.querySelector("[data-testid='app-ready']");
      return !!ready && !ready.classList.contains("hidden") && !!window.__ECHOES_STATE__;
    });

    const saveBtn = page.locator("[data-testid='save-game-btn']");
    const loadBtn = page.locator("[data-testid='load-game-btn']");
    await expect(saveBtn).toBeVisible();
    await expect(loadBtn).toBeVisible();

    // Save, mutate runtime state, then load back and verify restoration.
    await saveBtn.click();
    const before = await page.evaluate(() => {
      const s = window.__ECHOES_STATE__;
      return s.players[0].credits;
    });
    await page.evaluate(() => {
      window.__ECHOES_STATE__.players[0].credits = 999;
    });
    await loadBtn.click();
    const after = await page.evaluate(() => window.__ECHOES_STATE__.players[0].credits);
    expect(after).toBe(before);

    // Force next-player transition into game over.
    await page.evaluate(() => {
      const s = window.__ECHOES_STATE__;
      s.meta.maxRounds = 1;
      s.turn.round = 1;
      s.turn.activePlayerIndex = s.players.length - 1;
    });
    await page.locator("[data-testid='next-player']").click();

    const gameOverBtn = page.locator("[data-testid='gameover-new-btn']");
    await expect(gameOverBtn).toBeVisible();
  });
});
