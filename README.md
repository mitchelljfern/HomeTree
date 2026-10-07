# HomeTree website: start here

This is the playbook for any chat that needs to change the HomeTree website and push it live. Read it first, then restore the code, make the change, deploy, check, and save the code back to the project.

## The essentials

| What | Value |
| --- | --- |
| Live site | https://hometree-hosts.netlify.app (no custom domain yet) |
| Preview site (free) | https://dev--hometree-hosts.netlify.app (the `dev` branch) |
| Source code | GitHub `mitchelljfern/hometree`. `main` = live, `dev` = work in progress. |
| Netlify project | `hometree-hosts`, site ID `8fde7cce-b759-44a9-ae48-bb8868072d32`, owner mitchell@socialupgrades.com. Deploys from GitHub. |
| Backup of the code | Project doc `site/hometree-site-source.json` (every file packed into one JSON; refreshed after each publish) |
| Products (Gear page) | Google Sheet "HomeTree Gear (website products)", ID `1X-P5tUg0Eaocs5F8apzoqM3Wjjp8zkqYhm_oImEpVFc`, tab `Products` |
| Email list | Resend segment "HomeTree subscribers", ID `4676fed2-3d23-44a1-8630-e6eadbf992cc`; contact property `signup_source` |
| Brand rules | Project docs `brand/HomeTree-Brand-Guide.md` and `brand/HomeTree-Brand-Tokens.md` |
| Stack | Plain static site built by `node scripts/build.mjs` (no framework, no npm dependencies) plus 2 Netlify Functions |

Connectors used: Netlify (deploys), Google Drive and Google Sheets (products), Resend (email). Secrets live only in Netlify environment variables. Never put an API key in a project doc or in the code.

## How deploys are billed, and why we use a dev branch

On Netlify's credit-based plans, each successful **production** deploy (anything that updates the live site) costs 15 credits. Branch deploys and Deploy Previews cost 0 credits. So:

- Every push to `main` publishes the live site and costs credits.
- Pushes to `dev` build a free preview at https://dev--hometree-hosts.netlify.app.
- Batch several changes on `dev`, check them on the preview, then merge `dev` into `main` once to publish them all together.
- Pushes that only change Markdown files (like this README) skip the build entirely (`ignore` rule in `netlify.toml`).

## How to update the site (the whole loop)

1. **Get the code.** Attach the repo (`add_repo` with owner `mitchelljfern`, repo `hometree`, access `push`), clone it, then `git checkout dev` (create it from `main` if it's missing). If GitHub isn't available in the chat, restore the project backup instead (see "Restore from the project backup").
2. **Make the change.** Use the file map below to find the right file.
3. **Build and preview locally.** `node scripts/build.mjs`. Output goes to `dist/`. Serve it (`python3 -m http.server 8080 --directory dist`) and screenshot phone (390px) and desktop (1440px) widths with Playwright (see "Screenshots"). Fix problems here, not with extra deploys.
4. **Push to `dev`.** Commit and `git push origin dev`. Netlify builds the free preview in a minute or two. Send Mitchell the preview link.
5. **Publish only when Mitchell says so.** Merge `dev` into `main` and push `main`. That is one production deploy for the whole batch. Then check the live pages (`curl` for 200s, screenshots).
6. **Refresh the project backup after publishing.** Run `node scripts/pack.mjs`, then call the Projects tool `project_write` with `path: "site/hometree-site-source.json"` and `local_path` pointing at `.pack/hometree-site-source.json` in the clone (the file goes straight up without entering the chat). If this README changed, also write it to `site/README.md`.

Do not deploy with the Netlify CLI or the connector's `deploy-site` tool while the repo is linked. GitHub is the only path to Netlify, so the live site always matches `main`.

## Restore from the project backup

Only needed when GitHub isn't available in the chat.

1. Call the Projects tool `project_read` with `path: "site/hometree-site-source.json"`. It is large, so the tool saves it to a local file and returns that file's path.
2. Unpack it from the working directory, replacing `BUNDLE_PATH` with the returned path:

```bash
python3 -I -c "
import json, base64, os
b = json.load(open('BUNDLE_PATH'))
for f in b['files']:
    p = os.path.join('hometree', f['path']); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(base64.b64decode(f['content']) if f['encoding'] == 'base64' else f['content'].encode())
print(len(b['files']), 'files restored to hometree/, packed', b['packed_at'])"
cd hometree && node scripts/build.mjs
```

If the build prints `Built 22 pages` (or more, after new pages are added), the restore worked.

## File map: where to make each kind of change

| Change | File |
| --- | --- |
| Add or edit a guide | `content/guides.mjs`: the `GUIDES` array. Each guide has `slug`, `topic`, `minutes`, `photo` (a key in `PHOTOS`), `title`, `excerpt`, `lead`, optional `tool`, `sections` as `[id, heading, html]`, `takeaways`, `related` (3 slugs). `tip('text')` makes a Host tip callout; `__TOOL__` in a section places the linked tool card. New topics go in `TOPICS`. |
| Add a photo | `content/guides.mjs`: `PHOTOS` (Unsplash photo ID, photographer, username, alt text). Credits on the About page are generated from this list. |
| Guest messages, checklists, printable cards | `content/templates.mjs`. Placeholders `{property}`, `{host}`, `{checkin}`, `{checkout}`, `{wifi}`, `{wifipass}` fill from the form; `[brackets]` stay for the host to edit. Printable card markup is in the Templates section of `scripts/build.mjs`. |
| Pages, page copy, nav, MENU, footer, SEO | `scripts/build.mjs`. `NAV` = bottom bar and header links. `TOOLS` = calculator list. `menuPanel()` = pull-down menu. `layout()` = head, header, footer, bottom nav. Each page is a `page('/path/', {...})` block. Add a new page the same way and add it to the menu. |
| Look and feel | `src/css/site.css`. Brand tokens are at the top. Mobile-first; breakpoints at 640, 768, 900, 1024px. |
| Calculator math | `src/js/tools.js` (`calcs.revenue`, `calcs.cleaning`, `calcs.restock`). Their input forms are in the Tools section of `scripts/build.mjs`. |
| Gear page filters, sort, kits, checklist | `src/js/gear.js`. Product card markup (used by the build and the browser) is `src/js/card.js`. Kits are the buttons in the Gear section of `build.mjs` and match the sheet's `kits` column. |
| Icons | `scripts/lib/icons.mjs` (Lucide outline paths). The build generates `src/js/icons.js` from it, so never edit that file. |
| Menu, signup forms, toasts, guide filters | `src/js/app.js` |
| Templates page behavior | `src/js/templates.js` |
| Email signup and results emails | `netlify/functions/subscribe.mts` (route `/api/subscribe`) |
| Live products from the sheet | `netlify/functions/products.mts` (route `/api/products`, cached 5 minutes) |
| Built-in product snapshot | `data/products.json`. Used if the sheet can't be read. Refresh it from the sheet now and then. |
| Logos and icons | `assets/` (`mark-green.svg`, `mark-white.svg`, PNG app icons). Originals are in the HomeTree Design System artifact: https://claude.ai/artifact/DTTFHPmDcuWEZmm71o9Asy |
| Netlify settings | `netlify.toml` |
| Pack the code for the project | `scripts/pack.mjs` |
| Old one-time product import | `scripts/products.py` (the sheet is now the source of truth) |

## Products sheet

Mitchell edits products in the Google Sheet; the Gear page reads it through `/api/products`. The sheet must be shared as "Anyone with the link: Viewer" or the site falls back to `data/products.json`. Product changes in the sheet need no deploy.

Columns: `id` (unique, never reuse), `status` (Live, Draft, Hidden), `name`, `brand`, `room` (Kitchen, Bedroom, Bathroom, Living room, Entry, Outdoor, Workspace, Laundry, Whole home), `category`, `price_tier` ($ under 25, $$ 25 to 75, $$$ 75 to 200, $$$$ over 200), `approx_price` (sorting only, never shown), `priority` (Must-have, Nice to have), `tags` (Guest wow, Durability, Cleaner-friendly, Safety), `why`, `link_type` (Product or Search), `amazon_url`, `asin`, `image_url`, `featured` (Yes shows on the home page), `kits` (Starter kit, Kitchen kit), `date_added`, `notes`.

To add products from Amazon links: amazon.com blocks direct fetching, so look up each ASIN by searching it in quotes; mirror sites (for example tiendamia.com.ec/p/amz/ASIN) show the title and image ID. Image URL pattern: `https://m.media-amazon.com/images/I/<imageId>._AC_SL500_.jpg`. Always store clean links: `https://www.amazon.com/dp/<ASIN>`. Append rows with the Google Sheets connector.

## Netlify environment variables

Names only; values are set in Netlify and should stay there.

| Name | What it does |
| --- | --- |
| `RESEND_API_KEY` | Secret, production only. Lets `/api/subscribe` add contacts and send emails. Signup forms on the `dev` preview show an error because of this; test signups on the live site. |
| `RESEND_SEGMENT_ID` | The HomeTree subscribers segment. |
| `MAIL_FROM` | Sender for results emails. Currently `HomeTree <hello@dashboard.socialupgrades.com>` (a domain verified in Resend). Change once a HomeTree domain is verified. |
| `REPLY_TO` | mitchell@socialupgrades.com |
| `AMAZON_TAG` | Not set yet. Once Amazon Associates is approved, set it to the tracking tag and redeploy; every Amazon link gets `?tag=` added. |
| `PRODUCTS_SHEET_ID` | Optional. Overrides the sheet ID built into `products.mts`. |

Set or change them with the Netlify connector: `netlify-project-services-updater`, operation `manage-env-vars`.

## Rules for every change

- Follow the HomeTree Brand Guide: Outfit for headings, Montserrat for body, HomeTree Green #539800, tokens from the Brand Tokens doc.
- Voice: practical, generous, growing. Lead with the action, be specific, sentence case. **Never use em dashes.** Avoid: leverage, unlock, elevate, seamless, game-changer, passive income.
- Mobile first, with a desktop layout that uses the width (grids, side panels) instead of a stretched phone view. Card-style UI.
- Bottom nav (phones) is exactly: Guides, Gear, Tools, Free guide, Templates. Home is reached from the logo or the MENU. Keep the MENU pull-down filled as content grows.
- Show price tiers, not exact prices, for Amazon products. Keep the affiliate disclosure on the Gear page.
- Footer legal lines: "© 2026 Social Upgrades, LLC. All rights reserved." and "HomeTree is a brand of Social Upgrades, LLC."
- Generous by default: no gated content. Signups are offered, never required.

## Screenshots

Install Playwright in the scratchpad, not in `hometree`, and point it at the preinstalled Chromium:

```bash
cd <scratchpad> && npm init -y >/dev/null && npm i playwright >/dev/null
# in the script: chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
```

Check at 390x844 (isMobile, deviceScaleFactor 2) and 1440x900. Elements with class `reveal` fade in on scroll, so add the class `in` to them before full-page screenshots.

## Open items (as of October 2026)

- Link the Netlify project to the GitHub repo (Mitchell, in the Netlify dashboard) and turn on branch deploys for `dev`. Until then, deploys still go through the Netlify connector.
- Share the products Google Sheet as "Anyone with the link: Viewer" so live edits show on the site.
- Free PDF guide not built yet. When it is, add a Resend automation that emails it to new contacts in the HomeTree subscribers segment.
- No custom domain yet. When bought: add it in Netlify, update `SITE_URL` in `scripts/build.mjs` and the fallback URL in `subscribe.mts`, and verify the domain in Resend for `MAIL_FROM`.
- Amazon Associates pending: set `AMAZON_TAG`, then review product image use against the Associates rules (images currently load from Amazon's image CDN).
- 20 Gear rows are category picks (`link_type` Search) that link to Amazon search results until specific products are chosen.
- Next tools planned: setup budget planner, photo shot list builder, message builder.
