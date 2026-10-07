// Shared product card renderer. Used by the build (Node) and the browser.
import { P } from './icons.js';

const ROOM_ICON = { Kitchen: 'kitchen', Bedroom: 'bed', Bathroom: 'bath', 'Living room': 'tv', Entry: 'door', Outdoor: 'sun', Workspace: 'laptop', Laundry: 'shirt', 'Whole home': 'layers' };
export const ROOMS = ['Kitchen', 'Bedroom', 'Bathroom', 'Living room', 'Entry', 'Outdoor', 'Workspace', 'Laundry', 'Whole home'];
export const TIERS = ['$', '$$', '$$$', '$$$$'];
export const TIER_LABEL = { '$': 'Under $25', '$$': '$25 to $75', '$$$': '$75 to $200', '$$$$': 'Over $200' };
export const TAGS = ['Guest wow', 'Durability', 'Cleaner-friendly', 'Safety'];

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const ico = (name, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || P.info}</svg>`;
export const roomIcon = (room) => ico(ROOM_ICON[room] || 'layers');

export function tierHtml(t) {
  const n = (t || '').length;
  return `<span class="p-tier" title="${esc(TIER_LABEL[t] || '')}"><span class="sr-only">Price: ${esc(TIER_LABEL[t] || '')}</span><span aria-hidden="true">${'$'.repeat(n)}<span class="off">${'$'.repeat(Math.max(0, 4 - n))}</span></span></span>`;
}

export function productCard(p, { owned = false, compact = false } = {}) {
  const isSearch = (p.link_type || '').toLowerCase() === 'search';
  const media = p.image_url && !isSearch
    ? `<div class="p-media"><img src="${esc(p.image_url)}" alt="${esc(p.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('icon','broken')">${roomIcon(p.room)}</div>`
    : `<div class="p-media icon">${roomIcon(p.room)}${isSearch ? '<span class="shop-note">Several good options</span>' : ''}</div>`;
  const badges = [];
  if (p.priority === 'Must-have') badges.push('<span class="tag must">Must-have</span>');
  if (p.tags) badges.push(`<span class="tag">${esc(p.tags)}</span>`);
  const btnLabel = isSearch ? 'Shop options' : 'View on Amazon';
  return `<article class="card product${owned ? ' owned' : ''}" data-id="${esc(p.id)}">
  <div class="p-wrap" style="position:relative">${media}<div class="p-badges">${badges.join('')}</div></div>
  <div class="card-body">
    <span class="p-room">${esc(p.room)}${p.category ? ' · ' + esc(p.category) : ''}</span>
    <h3 class="p-name">${esc(p.name)}</h3>
    ${p.brand ? `<span class="p-brand">${esc(p.brand)}</span>` : ''}
    ${compact ? '' : `<p class="p-why">${esc(p.why)}</p>`}
    <div class="p-foot">
      <div class="p-meta">${tierHtml(p.price_tier)}${compact ? '' : `<button class="have" type="button" aria-pressed="${owned}" data-have="${esc(p.id)}" title="I have this">${ico('check', 'i-sm')}<span class="have-label">${owned ? 'Have it' : 'I have this'}</span></button>`}</div>
      <a class="btn btn-primary btn-sm btn-block" href="${esc(p.amazon_url)}" target="_blank" rel="sponsored noopener">${btnLabel}${ico('external', 'i-sm')}</a>
    </div>
  </div>
</article>`;
}

// Clean and normalize a product row from the sheet or JSON.
export function normalize(rows, tag = '') {
  return rows
    .filter((r) => r && r.id && r.name && String(r.status || 'Live').toLowerCase() === 'live')
    .map((r) => {
      let url = String(r.amazon_url || '').trim();
      if (tag && url.includes('amazon.')) {
        try { const u = new URL(url); u.searchParams.set('tag', tag); url = u.toString(); } catch (e) { /* keep */ }
      }
      return { ...r, amazon_url: url, approx_price: Number(r.approx_price) || 0, featured: String(r.featured || '').toLowerCase() === 'yes' };
    });
}
