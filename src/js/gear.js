// Gear page: filter, sort, kits, "have it" checklist. Data from /api/products (Google Sheet) with a static fallback.
import { productCard, normalize, ROOMS, TIERS, TIER_LABEL, TAGS, esc, ico } from './card.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const grid = $('#product-grid');
let products = normalize(JSON.parse($('#products-data').textContent));

const params = new URLSearchParams(location.search);
const state = {
  rooms: new Set(params.getAll('room').filter((r) => ROOMS.includes(r))),
  tiers: new Set(params.getAll('tier')),
  tags: new Set(params.getAll('why')),
  must: params.get('must') === '1',
  kit: params.get('kit') || '',
  hideOwned: false,
  q: params.get('q') || '',
  sort: params.get('sort') || 'priority',
};

let owned = new Set();
try { owned = new Set(JSON.parse(localStorage.getItem('ht-have') || '[]')); } catch (e) {}
const saveOwned = () => { try { localStorage.setItem('ht-have', JSON.stringify([...owned])); } catch (e) {} };

function matches(p, skip) {
  if (skip !== 'rooms' && state.rooms.size && !state.rooms.has(p.room)) return false;
  if (skip !== 'tiers' && state.tiers.size && !state.tiers.has(p.price_tier)) return false;
  if (skip !== 'tags' && state.tags.size && !state.tags.has(p.tags)) return false;
  if (state.must && p.priority !== 'Must-have') return false;
  if (state.kit && !String(p.kits || '').split(',').map((s) => s.trim()).includes(state.kit)) return false;
  if (state.hideOwned && owned.has(p.id)) return false;
  if (state.q) {
    const hay = `${p.name} ${p.brand} ${p.room} ${p.category} ${p.why} ${p.tags}`.toLowerCase();
    if (!state.q.toLowerCase().split(/\s+/).every((w) => hay.includes(w))) return false;
  }
  return true;
}

const sorters = {
  priority: (a, b) => (a.priority === 'Must-have' ? 0 : 1) - (b.priority === 'Must-have' ? 0 : 1) || (b.featured - a.featured) || ROOMS.indexOf(a.room) - ROOMS.indexOf(b.room),
  'price-asc': (a, b) => a.approx_price - b.approx_price,
  'price-desc': (a, b) => b.approx_price - a.approx_price,
  newest: (a, b) => String(b.date_added).localeCompare(String(a.date_added)) || a.id.localeCompare(b.id),
  room: (a, b) => ROOMS.indexOf(a.room) - ROOMS.indexOf(b.room) || a.name.localeCompare(b.name),
};

function countBy(key, list) {
  const m = {};
  list.forEach((p) => { m[p[key]] = (m[p[key]] || 0) + 1; });
  return m;
}

function renderFilters() {
  const roomCounts = countBy('room', products.filter((p) => matches(p, 'rooms')));
  const tierCounts = countBy('price_tier', products.filter((p) => matches(p, 'tiers')));
  const tagCounts = countBy('tags', products.filter((p) => matches(p, 'tags')));
  const rooms = ROOMS.filter((r) => products.some((p) => p.room === r));
  const box = (group, val, label, n, on) => `<label class="check"><input type="checkbox" data-group="${group}" value="${esc(val)}" ${on ? 'checked' : ''}><span>${esc(label)}</span><span class="n">${n || 0}</span></label>`;
  const chip = (group, val, label, n, on) => `<button type="button" class="chip" data-group="${group}" data-value="${esc(val)}" aria-pressed="${on}">${esc(label)}<span class="count">${n || 0}</span></button>`;
  const groups = [
    ['rooms', 'Room', rooms.map((r) => [r, r, roomCounts[r]])],
    ['tiers', 'Price', TIERS.map((t) => [t, `${t}  ${TIER_LABEL[t]}`, tierCounts[t]])],
    ['tags', 'Why it matters', TAGS.map((t) => [t, t, tagCounts[t]])],
  ];
  const side = $('#filters-side');
  side.innerHTML = groups.map(([g, title, items]) => `<div class="filter-group"><h4>${title}</h4>${items.map(([v, l, n]) => box(g, v, l, n, state[g].has(v))).join('')}</div>`).join('') +
    `<div class="filter-group"><h4>Show</h4>${`<label class="check"><input type="checkbox" data-toggle="must" ${state.must ? 'checked' : ''}><span>Must-haves only</span></label><label class="check"><input type="checkbox" data-toggle="hideOwned" ${state.hideOwned ? 'checked' : ''}><span>Hide items I have</span></label>`}</div>` +
    `<button type="button" class="btn btn-ghost btn-sm" data-clear>Clear all filters</button>`;
  $('#filters-sheet').innerHTML = groups.map(([g, title, items]) => `<div class="filter-group"><h4>${title}</h4><div class="chip-set">${items.map(([v, l, n]) => chip(g, v, l, n, state[g].has(v))).join('')}</div></div>`).join('') +
    `<div class="filter-group"><h4>Show</h4><div class="chip-set"><button type="button" class="chip" data-toggle="must" aria-pressed="${state.must}">Must-haves only</button><button type="button" class="chip" data-toggle="hideOwned" aria-pressed="${state.hideOwned}">Hide items I have</button></div></div>`;
  // Room chips row (quick filter)
  $('#room-chips').innerHTML = `<button type="button" class="chip" data-room-all aria-pressed="${state.rooms.size === 0}">All rooms</button>` +
    rooms.map((r) => `<button type="button" class="chip" data-group="rooms" data-value="${esc(r)}" data-single aria-pressed="${state.rooms.has(r)}">${esc(r)}</button>`).join('');
  const active = state.rooms.size + state.tiers.size + state.tags.size + (state.must ? 1 : 0) + (state.hideOwned ? 1 : 0);
  const badge = $('#filter-badge'); badge.textContent = active; badge.classList.toggle('show', active > 0);
}

function renderKits() {
  $$('[data-kit]').forEach((k) => k.setAttribute('aria-pressed', String(state.kit === k.dataset.kit)));
}

function renderProgress() {
  const must = products.filter((p) => p.priority === 'Must-have');
  const have = must.filter((p) => owned.has(p.id)).length;
  $('#progress-text').textContent = `${have} of ${must.length} must-haves`;
  $('#progress-bar').style.width = must.length ? `${(have / must.length) * 100}%` : '0';
}

function renderGrid() {
  const list = products.filter((p) => matches(p)).sort(sorters[state.sort] || sorters.priority);
  grid.innerHTML = list.map((p) => productCard(p, { owned: owned.has(p.id) })).join('');
  $('#result-count').textContent = `${list.length} ${list.length === 1 ? 'item' : 'items'}`;
  $('#gear-empty').classList.toggle('show', list.length === 0);
  $('#sheet-apply').textContent = `Show ${list.length} ${list.length === 1 ? 'item' : 'items'}`;
}

function syncUrl() {
  const u = new URL(location.href);
  ['room', 'tier', 'why', 'must', 'kit', 'q', 'sort'].forEach((k) => u.searchParams.delete(k));
  state.rooms.forEach((r) => u.searchParams.append('room', r));
  state.tiers.forEach((t) => u.searchParams.append('tier', t));
  state.tags.forEach((t) => u.searchParams.append('why', t));
  if (state.must) u.searchParams.set('must', '1');
  if (state.kit) u.searchParams.set('kit', state.kit);
  if (state.q) u.searchParams.set('q', state.q);
  if (state.sort !== 'priority') u.searchParams.set('sort', state.sort);
  history.replaceState(null, '', u);
}

function render() { renderFilters(); renderKits(); renderGrid(); renderProgress(); syncUrl(); }

// Events
document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.matches('input[data-group]')) { const set = state[t.dataset.group]; t.checked ? set.add(t.value) : set.delete(t.value); render(); }
  if (t.matches('input[data-toggle]')) { state[t.dataset.toggle] = t.checked; render(); }
  if (t.id === 'sort') { state.sort = t.value; render(); }
});
document.addEventListener('click', (e) => {
  const chip = e.target.closest('button.chip[data-group]');
  if (chip) {
    const set = state[chip.dataset.group]; const v = chip.dataset.value;
    if (chip.hasAttribute('data-single')) { const on = set.has(v) && set.size === 1; set.clear(); if (!on) set.add(v); }
    else set.has(v) ? set.delete(v) : set.add(v);
    render(); return;
  }
  const tog = e.target.closest('button.chip[data-toggle]');
  if (tog) { state[tog.dataset.toggle] = !state[tog.dataset.toggle]; render(); return; }
  if (e.target.closest('[data-room-all]')) { state.rooms.clear(); render(); return; }
  if (e.target.closest('[data-clear]')) { state.rooms.clear(); state.tiers.clear(); state.tags.clear(); state.must = false; state.hideOwned = false; state.kit = ''; state.q = ''; $('#gear-search').value = ''; render(); return; }
  const kit = e.target.closest('[data-kit]');
  if (kit) { state.kit = state.kit === kit.dataset.kit ? '' : kit.dataset.kit; render(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  const have = e.target.closest('[data-have]');
  if (have) {
    const id = have.dataset.have;
    owned.has(id) ? owned.delete(id) : owned.add(id);
    saveOwned();
    const on = owned.has(id);
    have.setAttribute('aria-pressed', String(on));
    const lbl = have.querySelector('.have-label'); if (lbl) lbl.textContent = on ? 'Have it' : 'I have this';
    have.closest('.product').classList.toggle('owned', on);
    renderProgress();
    window.htToast?.(on ? 'Marked as owned' : 'Removed from your list');
    if (state.hideOwned && on) setTimeout(render, 350);
  }
});
let qT;
$('#gear-search').value = state.q;
$('#gear-search').addEventListener('input', (e) => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 120); });
$('#sort').value = state.sort;

// Bottom sheet
const openSheet = () => { document.body.classList.add('sheet-open'); $('#filter-sheet').removeAttribute('inert'); };
const closeSheet = () => { document.body.classList.remove('sheet-open'); $('#filter-sheet').setAttribute('inert', ''); };
$('#open-filters').addEventListener('click', openSheet);
$$('[data-close-sheet]').forEach((b) => b.addEventListener('click', closeSheet));
document.addEventListener('ht:close-sheet', closeSheet);

render();

// Live data from the Google Sheet
fetch('/api/products', { headers: { Accept: 'application/json' } })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then((d) => {
    if (Array.isArray(d.products) && d.products.length) {
      const fresh = normalize(d.products);
      if (JSON.stringify(fresh) !== JSON.stringify(products)) { products = fresh; render(); }
    }
  })
  .catch(() => {});
