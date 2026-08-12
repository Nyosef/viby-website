import { spawn } from "node:child_process";
import { access } from "node:fs/promises";

const port = 3417;
const origin = `http://127.0.0.1:${port}`;
const canonicalOrigin = "https://joinviby.co.il";
const routes = [
  "/",
  "/smart-wheel",
  "/digital-wallet",
  "/viby-rate",
  "/viby-tap",
  "/how-it-works",
  "/support",
  "/terms",
  "/privacy",
];
const productLinks = [
  { path: "/", label: "כרטיסייה דיגיטלית לעסק" },
  { path: "/smart-wheel", label: "גלגל מזל דיגיטלי לעסקים" },
  { path: "/digital-wallet", label: "כרטיס מתנה דיגיטלי לעסק" },
  { path: "/viby-rate", label: "כרטיס NFC לביקורות גוגל" },
  { path: "/viby-tap", label: "כרטיס NFC ועמוד קישורים לעסק" },
];
const productRoutes = new Set(productLinks.map((product) => product.path));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function matches(html, expression) {
  return [...html.matchAll(expression)];
}

function expectedCanonical(pathname) {
  return `${canonicalOrigin}${pathname === "/" ? "" : pathname}`;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for the local production server.");
}

async function checkPage(pathname, titles) {
  const response = await fetch(`${origin}${pathname}`);
  const html = await response.text();
  assert(response.status === 200, `${pathname}: expected 200, got ${response.status}`);
  assert(/<html[^>]+lang="he-IL"[^>]+dir="rtl"/.test(html), `${pathname}: missing he-IL RTL document language`);

  const titleTags = matches(html, /<title>([^<]+)<\/title>/g);
  const descriptions = matches(html, /<meta name="description" content="([^"]+)"\s*\/>/g);
  const canonicals = matches(html, /<link rel="canonical" href="([^"]+)"\s*\/>/g);
  const headings = matches(html, /<h1(?:\s[^>]*)?>/g);
  const jsonLd = matches(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g);

  assert(titleTags.length === 1, `${pathname}: expected one title, got ${titleTags.length}`);
  assert(descriptions.length === 1, `${pathname}: expected one description, got ${descriptions.length}`);
  assert(canonicals.length === 1, `${pathname}: expected one canonical, got ${canonicals.length}`);
  assert(canonicals[0]?.[1] === expectedCanonical(pathname), `${pathname}: canonical is ${canonicals[0]?.[1] ?? "missing"}`);
  assert(headings.length === 1, `${pathname}: expected one H1, got ${headings.length}`);
  assert(jsonLd.length >= 1, `${pathname}: missing structured data`);

  for (const script of jsonLd) {
    try {
      JSON.parse(script[1]);
    } catch {
      assert(false, `${pathname}: invalid JSON-LD`);
    }
  }

  const title = titleTags[0]?.[1];
  assert(title?.endsWith(" | Viby"), `${pathname}: title must end with | Viby`);
  assert(Boolean(title) && !titles.has(title), `${pathname}: duplicate or missing title ${title ?? ""}`);
  if (title) titles.add(title);
  assert(!html.includes("www.joinviby.co.il"), `${pathname}: contains forbidden www hostname`);
  assert(!html.includes("viby-website.vercel.app"), `${pathname}: contains project alias`);

  if (productRoutes.has(pathname)) {
    for (const product of productLinks) {
      const href = product.path;
      const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedLabel = product.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const linkedLabel = new RegExp(
        `<a\\b[^>]*href="${escapedHref}"[^>]*>[\\s\\S]*?${escapedLabel}[\\s\\S]*?<\\/a>`,
      );
      assert(
        linkedLabel.test(html),
        `${pathname}: missing crawlable product link ${href} with label ${product.label}`,
      );
    }

    assert(
      /<a\b[^>]*href="\/how-it-works"[^>]*>/.test(html),
      `${pathname}: missing crawlable /how-it-works link`,
    );
    assert(
      !/href="[^"]*\?[^"#]*service=/.test(html),
      `${pathname}: contains legacy product service query link`,
    );
  }

  const internalLinks = matches(html, /href="(\/(?!\/)[^"#?]*)[^\"]*"/g)
    .map((match) => match[1])
    .filter((href) => !href.startsWith("/api/"));
  for (const href of new Set(internalLinks)) {
    const linked = await fetch(`${origin}${href}`, { redirect: "manual" });
    assert(linked.status < 400, `${pathname}: broken internal link ${href} (${linked.status})`);
    if (productRoutes.has(pathname) && productRoutes.has(href)) {
      assert(linked.status === 200, `${pathname}: product link ${href} must resolve directly with 200, got ${linked.status}`);
    }
  }
}

async function checkRedirect(url, expectedPath, host = "joinviby.co.il") {
  const response = await fetch(`${origin}${url}`, {
    redirect: "manual",
    headers: { "x-forwarded-host": host, "x-forwarded-proto": "https" },
  });
  assert(response.status === 308, `${url} on ${host}: expected 308, got ${response.status}`);
  const location = response.headers.get("location");
  const absoluteLocation = location ? new URL(location, canonicalOrigin).href : null;
  assert(absoluteLocation === `${canonicalOrigin}${expectedPath}`, `${url} on ${host}: redirect is ${location}`);
}

async function run() {
  await access(".next/BUILD_ID");
  const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port) },
  });
  let serverOutput = "";
  server.stdout.on("data", (chunk) => { serverOutput += chunk; });
  server.stderr.on("data", (chunk) => { serverOutput += chunk; });

  try {
    await waitForServer();
    const titles = new Set();
    for (const route of routes) await checkPage(route, titles);

    const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
    for (const route of routes) {
      assert(sitemap.includes(`<loc>${expectedCanonical(route)}</loc>`), `sitemap: missing ${route}`);
    }
    assert(!sitemap.includes("<lastmod>"), "sitemap: contains artificial lastModified values");

    const robots = await (await fetch(`${origin}/robots.txt`)).text();
    assert(robots.includes("Disallow: /api/"), "robots: /api/ is not disallowed");
    assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), "robots: wrong sitemap origin");

    await checkRedirect("/?service=punch-card&utm_source=test", "/?utm_source=test");
    await checkRedirect("/?service=smart-wheel&utm_source=test", "/smart-wheel?utm_source=test");
    await checkRedirect("/support?utm_source=test", "/support?utm_source=test", "www.joinviby.co.il");
    await checkRedirect("/viby-rate", "/viby-rate", "viby-website.vercel.app");

    const preview = await fetch(`${origin}/support`, {
      headers: { "x-forwarded-host": "viby-git-test-team.vercel.app" },
    });
    assert(preview.headers.get("x-robots-tag")?.includes("noindex"), "preview: missing X-Robots-Tag noindex");

    const api = await fetch(`${origin}/api/punch-card-lead`, { method: "GET" });
    assert(api.headers.get("x-robots-tag")?.includes("noindex"), "api: missing X-Robots-Tag noindex");

    const missing = await fetch(`${origin}/missing-seo-page`);
    const missingHtml = await missing.text();
    assert(missing.status === 404, `404: expected 404, got ${missing.status}`);
    assert(/name="robots" content="noindex, nofollow"/.test(missingHtml), "404: missing noindex, nofollow");
  } finally {
    server.kill("SIGTERM");
  }

  if (errors.length > 0) {
    console.error(`SEO audit failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`SEO audit passed: ${routes.length} canonical routes, redirects, robots, sitemap, schema, and 404 behavior verified.`);
  }

  if (errors.length > 0 && serverOutput) console.error(serverOutput);
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
