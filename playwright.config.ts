import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://localhost:3100",
    viewport: { width: 1440, height: 1000 },
    launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_DIST_DIR: ".next-test",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-YLFYE45LK7",
    },
  },
});
