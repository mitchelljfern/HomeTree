// HomeTree calculators: revenue, cleaning fee, restock.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const usd = (n, d = 0) => (n < 0 ? '-' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const num = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const v = (id) => { const el = document.getElementById(id); const x = parseFloat(el?.value); return Number.isFinite(x) ? x : 0; };
const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
const DAYS = 30.4;

const tool = document.body.dataset.tool;
const KEY = 'ht-tool-' + tool;

// Persist inputs per tool
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.entries(saved).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.value = val; });
  } catch (e) {}
}
function persist() {
  const out = {};
  $$('.calc input, .calc select').forEach((el) => { if (el.id) out[el.id] = el.value; });
  try { localStorage.setItem(KEY, JSON.stringify(out)); } catch (e) {}
}
function paintRange(el) {
  const min = +el.min || 0, max = +el.max || 100;
  el.style.setProperty('--p', `${((+el.value - min) / (max - min)) * 100}%`);
  const out = document.querySelector(`output[for="${el.id}"]`);
  if (out) out.textContent = el.value + (el.dataset.unit || '');
}
function barRow(label, amt, max, cls = '') {
  const w = max > 0 ? Math.min(100, (Math.abs(amt) / max) * 100) : 0;
  return `<div class="line ${cls}"><span>${label}</span><span class="amt">${usd(amt)}</span><div class="bar"><span style="width:${w}%"></span></div></div>`;
}

let summary = () => '';

const calcs = {
  revenue() {
    const rate = v('rate'), occ = v('occ') / 100, stay = Math.max(1, v('stay')), fee = v('cleanfee'), plat = v('platform') / 100;
    const cleaner = v('cleaner'), supplies = v('supplies'), fixed = v('mortgage') + v('utilities') + v('other');
    const nights = DAYS * occ, stays = nights / stay;
    const rent = nights * rate, fees = stays * fee, gross = rent + fees;
    const platform = gross * plat, turn = stays * (cleaner + supplies);
    const net = gross - platform - turn - fixed;
    const perNight = rate * (1 - plat) + (fee * (1 - plat) - cleaner - supplies) / stay;
    const be = perNight > 0 ? fixed / perNight : Infinity;
    const big = $('#r-net'); big.textContent = usd(net); big.classList.toggle('neg', net < 0);
    set('r-annual', `${usd(net * 12)} a year at this pace`);
    set('r-nights', num(nights, 1));
    set('r-be', Number.isFinite(be) ? num(be, 1) : 'n/a');
    set('r-gross', usd(gross));
    set('r-adr', usd(nights ? gross / nights : 0));
    const max = Math.max(gross, platform + turn + fixed);
    set('r-breakdown', barRow('Nightly rent', rent, max) + barRow('Cleaning fees collected', fees, max) + barRow('Platform fees', -platform, max, 'cost') + barRow('Cleaning and supplies', -turn, max, 'cost') + barRow('Fixed costs', -fixed, max, 'cost') + `<div class="total"><span>Monthly profit</span><span>${usd(net)}</span></div>`);
    const beOcc = Number.isFinite(be) ? (be / DAYS) * 100 : 999;
    let note = '';
    if (!Number.isFinite(be) || beOcc > 100) note = `<div class="note">At these numbers, every booked night loses money. Raise your nightly rate or cleaning fee, or lower turnover costs.</div>`;
    else if (beOcc > 75) note = `<div class="note">You need about ${num(beOcc)}% occupancy just to break even. Most markets average well under that, so this is tight.</div>`;
    else if (occ * 100 < beOcc) note = `<div class="note">You're below break-even. You need about ${num(be, 1)} booked nights a month (${num(beOcc)}% occupancy).</div>`;
    else note = `<div class="note good">You break even at about ${num(be, 1)} nights a month (${num(beOcc)}% occupancy). Everything after that is profit.</div>`;
    set('r-note', note);
    summary = () => `Revenue and profit estimate\nNightly rate: ${usd(rate)}, occupancy: ${num(occ * 100)}%, average stay: ${stay} nights\nMonthly gross: ${usd(gross)}\nMonthly profit: ${usd(net)} (${usd(net * 12)} a year)\nBooked nights: ${num(nights, 1)}\nBreak-even nights: ${Number.isFinite(be) ? num(be, 1) : 'n/a'}`;
  },
  cleaning() {
    const cost = v('cleaner') + v('laundry') + v('supplies') + v('extra');
    const pass = v('pass') / 100, rate = v('rate'), stay = Math.max(1, v('stay'));
    const fee = Math.round((cost * pass) / 5) * 5;
    const stayTotal = rate * stay + fee;
    const share = stayTotal ? (fee / stayTotal) * 100 : 0;
    $('#c-fee').textContent = usd(fee);
    set('c-sub', `Covers ${num(pass * 100)}% of your ${usd(cost)} turnover cost`);
    set('c-eff', usd(rate + fee / stay));
    set('c-share', `${num(share)}%`);
    const rows = [1, 2, 3, 5, 7].map((n) => { const t = rate * n + fee; return `<tr><td>${n} night${n > 1 ? 's' : ''}</td><td class="num">${usd(t)}</td><td class="num">${usd(t / n)}</td><td class="num">${num((fee / t) * 100)}%</td></tr>`; }).join('');
    set('c-table', rows);
    const short = (fee / (rate * 2 + fee)) * 100;
    let note;
    if (short > 30) note = `<div class="note">On a 2-night stay your fee is ${num(short)}% of the total. That can push guests to other listings. Try a lower fee with a higher nightly rate, or a 2 to 3 night minimum.</div>`;
    else if (pass < 0.7) note = `<div class="note">You're absorbing ${usd(cost - fee)} per turnover. Make sure your nightly rate covers it.</div>`;
    else note = `<div class="note good">This fee looks reasonable for stays of 2 nights or more.</div>`;
    set('c-note', note);
    summary = () => `Cleaning fee estimate\nTurnover cost: ${usd(cost)}\nSuggested cleaning fee: ${usd(fee)}\nEffective nightly rate on a ${stay}-night stay: ${usd(rate + fee / stay)}\nFee share of a ${stay}-night stay: ${num(share)}%`;
  },
  restock() {
    const beds = Math.max(1, v('bedrooms')), baths = Math.max(1, v('baths')), guests = Math.max(1, v('guests')), nights = Math.max(0, v('nights')), stay = Math.max(1, v('stay'));
    const stays = nights / stay, gn = nights * guests;
    const items = [
      ['Toilet paper', gn * 0.45 + stays * baths, 'rolls', 'Bulk 48-roll pack'],
      ['Paper towels', stays * 0.75 + nights * 0.1, 'rolls', '12-roll pack'],
      ['Kitchen trash bags', nights * 0.6 + stays, 'bags', '90-count box'],
      ['Small trash liners', stays * (baths + beds), 'liners', '200-count box'],
      ['Dishwasher pods', nights * 0.8, 'pods', '80 to 100 count'],
      ['Dish soap', Math.max(0.5, nights / 25), 'bottles', 'Large refill'],
      ['Sponges', stays * 1, 'sponges', '24-pack'],
      ['Hand soap', gn * 0.25, 'oz', 'Gallon refill'],
      ['Shampoo, conditioner, body wash', gn * 1.2, 'oz total', 'Gallon refills'],
      ['Coffee', gn * 1.3, 'cups', 'Pods or 1 lb bag per 40 cups'],
      ['Laundry detergent', stays * (beds + 1), 'loads', 'High-efficiency, 100+ loads'],
      ['Toothpaste and toothbrush kits', stays * guests * 0.25, 'kits', 'See Gear for bulk packs'],
      ['Mini toiletry sets', stays * guests * 0.2, 'sets', 'Hotel bundle'],
    ];
    set('s-stays', num(stays, 1));
    set('s-gn', num(gn));
    set('s-table', items.map(([n, q, u, b]) => `<tr><td>${n}<div class="caption">${b}</div></td><td class="num"><strong>${num(Math.ceil(q))}</strong> ${u}</td></tr>`).join(''));
    summary = () => `Monthly restock list (${num(nights)} booked nights, ${guests} guests, ${num(stays, 1)} stays)\n` + items.map(([n, q, u]) => `- ${n}: ${num(Math.ceil(q))} ${u}`).join('\n');
  },
};

const run = calcs[tool];
if (run) {
  restore();
  $$('.calc input[type=range]').forEach(paintRange);
  const update = (e) => { if (e?.target?.type === 'range') paintRange(e.target); run(); persist(); };
  $$('.calc input, .calc select').forEach((el) => el.addEventListener('input', update));
  run();
  window.htResults = () => ({ tool, text: summary() });
  $('#copy-results')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(summary()); window.htToast?.('Copied to clipboard'); } catch (e) { window.htToast?.('Copy not available here'); }
  });
  $('#print-results')?.addEventListener('click', () => window.print());
  $('#reset-tool')?.addEventListener('click', () => { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); });
}
