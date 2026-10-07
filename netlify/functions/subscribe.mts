import type { Config } from "@netlify/functions";

// Adds a subscriber to the Resend "HomeTree subscribers" segment.
// If the request includes calculator results and MAIL_FROM is set, emails the results too.
const RESEND = "https://api.resend.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

async function resend(path: string, key: string, body: unknown) {
  const res = await fetch(RESEND + path, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

function resultsEmail(text: string, site: string) {
  const lines = text.split("\n").map((l) => escapeHtml(l));
  const title = lines.shift() || "Your results";
  return `<!doctype html><html><body style="margin:0;background:#FAFBF7;font-family:Montserrat,Arial,sans-serif;color:#1F2A1A">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFBF7;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden">
<tr><td style="padding:28px 32px 8px"><span style="font-family:Outfit,Helvetica,Arial,sans-serif;font-weight:600;font-size:22px;color:#1F2A1A">Home<span style="color:#539800">Tree</span></span></td></tr>
<tr><td style="padding:8px 32px 0"><h1 style="font-family:Outfit,Helvetica,Arial,sans-serif;font-size:24px;line-height:30px;margin:0;color:#1F2A1A">${title}</h1></td></tr>
<tr><td style="padding:16px 32px"><div style="background:#EAF4DC;border-radius:16px;padding:18px 20px;font-size:16px;line-height:26px">${lines.join("<br>")}</div></td></tr>
<tr><td style="padding:0 32px 8px;font-size:15px;line-height:24px">Change any number and run it again anytime. The guides on the site explain what to do next.</td></tr>
<tr><td style="padding:12px 32px 28px"><a href="${site}/guides/" style="display:inline-block;background:#539800;color:#FFFFFF;font-family:Outfit,Helvetica,Arial,sans-serif;font-weight:600;font-size:18px;text-decoration:none;padding:14px 24px;border-radius:10px">Read the guides</a></td></tr>
<tr><td style="padding:16px 32px 28px;border-top:1px solid #DDE4D3;font-size:12px;line-height:18px;color:#5A6650">Happy hosting, The HomeTree team<br>HomeTree is a brand of Social Upgrades, LLC.<br>You're getting this because you asked for your results on ${site.replace(/^https?:\/\//, "")}.</td></tr>
</table></td></tr></table></body></html>`;
}

export default async (req: Request) => {
  if (req.method !== "POST") return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  let data: Record<string, any> = {};
  try { data = await req.json(); } catch { return Response.json({ ok: false, error: "Bad request" }, { status: 400 }); }

  const email = String(data.email || "").trim().toLowerCase().slice(0, 200);
  if (!EMAIL_RE.test(email)) return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  if (data.company) return Response.json({ ok: true }); // honeypot

  const key = Netlify.env.get("RESEND_API_KEY");
  const segment = Netlify.env.get("RESEND_SEGMENT_ID");
  if (!key || !segment) return Response.json({ ok: false, error: "Signup is not configured" }, { status: 500 });

  const firstName = String(data.firstName || "").trim().slice(0, 60);
  const source = String(data.source || "website").slice(0, 60);
  const base: Record<string, unknown> = { email, unsubscribed: false, segments: [{ id: segment }] };
  if (firstName) base.first_name = firstName;

  // Try with the signup_source property, then without if the API rejects it.
  let r = await resend("/contacts", key, { ...base, properties: { signup_source: source } });
  if (!r.ok && r.status !== 409 && /propert/i.test(r.text)) r = await resend("/contacts", key, base);
  const exists = r.status === 409 || /already exists/i.test(r.text);
  if (!r.ok && !exists) {
    console.error("Resend contact error", r.status, r.text);
    return Response.json({ ok: false, error: "Could not subscribe" }, { status: 502 });
  }
  if (exists) {
    // Existing contact: make sure they're in the HomeTree segment.
    await fetch(`${RESEND}/contacts/${encodeURIComponent(email)}/segments/${segment}`, { method: "POST", headers: { Authorization: `Bearer ${key}` } }).catch(() => {});
  }

  const from = Netlify.env.get("MAIL_FROM");
  const results = data.results && typeof data.results.text === "string" ? String(data.results.text).slice(0, 4000) : "";
  let emailed = false;
  if (results && from) {
    const site = (Netlify.env.get("URL") || "https://hometree-hosts.netlify.app").replace(/\/$/, "");
    const subject = results.split("\n")[0].slice(0, 60) || "Your HomeTree results";
    const reply = Netlify.env.get("REPLY_TO");
    const s = await resend("/emails", key, { from, to: [email], subject, html: resultsEmail(results, site), text: results + "\n\nHappy hosting, The HomeTree team", ...(reply ? { reply_to: reply } : {}) });
    emailed = s.ok;
    if (!s.ok) console.error("Resend email error", s.status, s.text);
  }
  return Response.json({ ok: true, emailed });
};

export const config: Config = { path: "/api/subscribe" };
