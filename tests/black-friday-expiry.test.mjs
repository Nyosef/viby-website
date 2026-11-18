import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { access } from "node:fs/promises";
import net from "node:net";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test, { before } from "node:test";

// Runs against the existing production build in .next: run `npm run build` first,
// otherwise the test checks stale output.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextCli = path.join(projectRoot, "node_modules/next/dist/bin/next");
const clockFixture = path.join(projectRoot, "tests/frozen-clock.mjs");
const offerPath = "/מבצעי-בלאק-פריידי-לכרטיסיות-ניקוב-דיגיטליות";
const offerUrl = `https://joinviby.co.il${offerPath}`;
const activeTitle = "בלאק פריידי 2026: כרטיסיות ניקוב דיגיטליות + Viby UP | וייבי Viby";
const endedTitle = "מבצע בלאק פריידי 2026 הסתיים | וייבי Viby";

before(async () => {
  try {
    await access(path.join(projectRoot, ".next/BUILD_ID"));
  } catch {
    throw new Error("No production build found. Run `npm run build` before `npm run test:black-friday-expiry`.");
  }
});

async function getFreePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const { port } = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

async function withFrozenServer(instant, callback) {
  const port = await getFreePort();
  const server = spawn(process.execPath, ["--import", clockFixture, nextCli, "start", "--port", String(port)], {
    cwd: projectRoot,
    env: { ...process.env, VIBY_FROZEN_NOW: instant, NEXT_DIST_DIR: ".next" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });
  const base = `http://127.0.0.1:${port}`;

  try {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (server.exitCode !== null) throw new Error(`Next server exited early:\n${output}`);
      try {
        const response = await fetch(`${base}/robots.txt`);
        if (response.ok) { ready = true; break; }
      } catch { /* Wait for the local production server. */ }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (!ready) throw new Error(`Next server did not start:\n${output}`);
    try {
      await callback(base);
    } catch (error) {
      throw new Error(`${error.message}\nCause: ${error.cause?.stack ?? error.stack}\nNext server output:\n${output}`, { cause: error });
    }
  } finally {
    if (server.exitCode === null) {
      const exited = once(server, "exit");
      server.kill("SIGTERM");
      let timeoutId;
      await Promise.race([exited, new Promise((resolve) => { timeoutId = setTimeout(resolve, 5000); })]);
      clearTimeout(timeoutId);
      if (server.exitCode === null) server.kill("SIGKILL");
    }
  }
}

for (const scenario of [
  { instant: "2026-11-29T21:59:59.999Z", active: true, title: activeTitle, heading: "מבצעי בלאק פריידי 2026 לכרטיסיות ניקוב דיגיטליות", lastmod: "2026-11-18" },
  { instant: "2026-11-29T22:00:00.000Z", active: false, title: endedTitle, heading: "מבצע בלאק פריידי 2026 הסתיים", lastmod: "2026-11-30" },
]) {
  test(`production HTML, metadata, and sitemap at ${scenario.instant}`, async () => {
    await withFrozenServer(scenario.instant, async (base) => {
      const response = await fetch(`${base}${offerPath}`, { redirect: "manual" });
      assert.equal(response.status, 200, `unexpected redirect to ${response.headers.get("location")}`);
      assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
      const html = await response.text();
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
      assert.ok(main, "server-rendered main is missing");
      assert.ok(html.includes(`<title>${scenario.title}</title>`));
      assert.ok(html.includes(`<h1 id="black-friday-title">${scenario.heading}</h1>`));
      assert.ok(html.includes(`content="${scenario.title}"`), "social metadata title is missing");
      assert.ok(html.includes('rel="canonical"'), "canonical is missing");
      assert.ok(html.includes(`"name":"${scenario.title}"`), "WebPage name differs from metadata title");
      assert.equal(main.includes("269"), scenario.active, "offer price visibility differs from the offer state");
      assert.equal(main.includes("הצטרפות עד 29.11.2026"), scenario.active, "signup wording differs from the offer state");
      assert.equal(main.includes("מה כלול ב־269 ₪ לחודש?"), scenario.active, "offer FAQ differs from the offer state");
      assert.equal(/<a\b[^>]*href="\/"[^>]*>הכירו את כרטיסיות הניקוב הדיגיטליות לעסק<\/a>/.test(main), !scenario.active, "current-product link differs from the offer state");

      const sitemapResponse = await fetch(`${base}/sitemap.xml`);
      assert.equal(sitemapResponse.status, 200);
      assert.match(sitemapResponse.headers.get("cache-control") ?? "", /no-store|(?:max-age=0.*must-revalidate)/i);
      const sitemap = await sitemapResponse.text();
      const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
        .map((match) => match[1])
        .find((item) => item.includes(`<loc>${offerUrl}</loc>`));
      assert.ok(entry, "offer URL is missing from sitemap");
      assert.ok(entry.includes(`<lastmod>${scenario.lastmod}</lastmod>`), "offer sitemap lastmod is stale");
    });
  });
}
