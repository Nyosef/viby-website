import { findLegalVersion } from "@/lib/legal-versions";
import { publicArchiveText } from "@/lib/legal-archive-display";
import type { LegalBlock, LegalDocumentKey } from "@/lib/legal-types";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

function renderBlock(block: LegalBlock) {
  if (block.type === "heading") return `<h3>${escapeHtml(publicArchiveText(block.text))}</h3>`;
  if (block.type === "paragraph") return `<p>${escapeHtml(publicArchiveText(block.text))}</p>`;
  if (block.type === "link") {
    const href = block.href.startsWith("#") || block.href.startsWith("https://") ? block.href : "#";
    return `<p><a href="${escapeHtml(href)}">${escapeHtml(publicArchiveText(block.text))}</a></p>`;
  }
  if (block.type === "list") {
    const tag = block.ordered ? "ol" : "ul";
    return `<${tag}>${block.items.map((item) => `<li>${escapeHtml(publicArchiveText(item))}</li>`).join("")}</${tag}>`;
  }
  return "";
}

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string; version: string }> }) {
  const { kind, version } = await params;
  if (kind !== "terms" && kind !== "privacy") return new Response("Not found", { status: 404 });
  const document = findLegalVersion(kind as LegalDocumentKey, version);
  if (!document) return new Response("Not found", { status: 404 });
  const sections = document.sections.map((section) =>
    `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2>${section.blocks.map(renderBlock).join("")}</section>`
  ).join("");
  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(document.title)}</title><style>html{background:#fff;color:#291923;font-family:-apple-system,BlinkMacSystemFont,"Arial",sans-serif}body{margin:0;padding:20px 22px 48px;line-height:1.75;font-size:16px}main{max-width:720px;margin:auto}h2{font-size:21px;line-height:1.35;margin:34px 0 14px}h3{font-size:18px;margin:24px 0 8px}p{margin:0 0 14px}li{margin:0 0 8px}ul,ol{padding-right:24px}a{color:#c92a6b;overflow-wrap:anywhere}section+section{border-top:1px solid #f0e1e9}*:focus-visible{outline:2px solid #c92a6b}</style></head><body><main>${sections}</main></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=300" } });
}
