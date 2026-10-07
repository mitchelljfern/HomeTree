import type { Config } from "@netlify/functions";

// Reads the HomeTree Gear Google Sheet (Products tab) and returns live products as JSON.
// The sheet must be shared as "Anyone with the link can view". Cached at the CDN for 5 minutes.
const DEFAULT_SHEET = "1X-P5tUg0Eaocs5F8apzoqM3Wjjp8zkqYhm_oImEpVFc";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQ = false;
      else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim() !== ""));
}

export default async () => {
  const sheet = Netlify.env.get("PRODUCTS_SHEET_ID") || DEFAULT_SHEET;
  const tag = Netlify.env.get("AMAZON_TAG") || "";
  const url = `https://docs.google.com/spreadsheets/d/${sheet}/gviz/tq?tqx=out:csv&sheet=Products`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.includes("csv")) throw new Error(`Sheet not readable (${res.status} ${type})`);
    const rows = parseCSV(await res.text());
    const head = rows[0].map((h) => h.trim().toLowerCase());
    const products = rows.slice(1).map((r) => {
      const o: Record<string, string> = {};
      head.forEach((h, i) => { if (h) o[h] = (r[i] ?? "").trim(); });
      if (tag && o.amazon_url && o.amazon_url.includes("amazon.")) {
        try { const u = new URL(o.amazon_url); u.searchParams.set("tag", tag); o.amazon_url = u.toString(); } catch { /* keep */ }
      }
      return o;
    }).filter((p) => p.id && p.name && (p.status || "Live").toLowerCase() === "live");
    return Response.json({ source: "sheet", count: products.length, products }, {
      headers: {
        "Cache-Control": "public, max-age=60",
        "Netlify-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return Response.json({ error: String((err as Error).message || err) }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
};

export const config: Config = { path: "/api/products" };
