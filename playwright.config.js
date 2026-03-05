import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.e2e.spec.js"],
  timeout: 120_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4174",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    browserName: "chromium",
    channel: "msedge",
  },
  webServer: {
    command: "npx http-server . -p 4174 -c-1 --silent",
    url: "http://127.0.0.1:4174/index.html",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
