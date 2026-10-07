// HomeTree global behavior: header, pull-down menu, signup forms, toast, reveal, TOC.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// Header border on scroll
const header = $('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 4);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Pull-down menu
const root = document.documentElement;
const panel = $('#site-menu');
const menuBtn = $('.menu-btn');
let lastFocus = null;
function openMenu() {
  lastFocus = document.activeElement;
  document.body.classList.add('menu-open');
  panel.removeAttribute('inert');
  menuBtn.setAttribute('aria-expanded', 'true');
  setTimeout(() => $('.menu-close', panel)?.focus(), 50);
}
function closeMenu() {
  document.body.classList.remove('menu-open');
  panel.setAttribute('inert', '');
  menuBtn.setAttribute('aria-expanded', 'false');
  lastFocus?.focus?.();
}
menuBtn?.addEventListener('click', openMenu);
$$('[data-close-menu]').forEach((el) => el.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.body.classList.contains('menu-open')) closeMenu();
    if (document.body.classList.contains('sheet-open')) document.dispatchEvent(new CustomEvent('ht:close-sheet'));
  }
});
panel?.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

// Toast
const toastEl = $('#toast');
let toastT;
export function toast(msg) {
  if (!toastEl) return;
  toastEl.querySelector('span').textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('show'), 2400);
}
window.htToast = toast;

// Signup forms (free guide, inline, tool results)
async function submitSignup(form) {
  const btn = form.querySelector('button[type=submit]');
  const msg = form.querySelector('.form-msg');
  const data = Object.fromEntries(new FormData(form).entries());
  if (data.company) return; // honeypot
  const email = (data.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    msg.className = 'form-msg err'; msg.textContent = 'Please enter a valid email address.'; return;
  }
  const payload = { email, firstName: data.firstName || '', hosting: data.hosting || '', source: data.source || 'website', page: location.pathname };
  if (form.dataset.results && window.htResults) payload.results = window.htResults();
  const label = btn.innerHTML;
  btn.disabled = true; btn.textContent = 'Sending...';
  try {
    const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.ok) throw new Error(out.error || 'Something went wrong');
    msg.className = 'form-msg ok';
    msg.textContent = form.dataset.success || "You're on the list. Watch your inbox.";
    form.querySelectorAll('input:not([type=hidden]), select').forEach((i) => (i.disabled = true));
    btn.style.display = 'none';
    try { localStorage.setItem('ht-subscribed', '1'); } catch (e) {}
  } catch (err) {
    msg.className = 'form-msg err';
    msg.textContent = "That didn't go through. Please try again in a minute.";
    btn.disabled = false; btn.innerHTML = label;
  }
}
$$('form.js-signup').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); submitSignup(f); }));

// Reveal on scroll
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
} else { $$('.reveal').forEach((el) => el.classList.add('in')); }

// Article table of contents highlight
const tocLinks = $$('.toc a[href^="#"]');
if (tocLinks.length && 'IntersectionObserver' in window) {
  const map = new Map();
  tocLinks.forEach((a) => { const t = document.getElementById(a.getAttribute('href').slice(1)); if (t) map.set(t, a); });
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const id = en.target.id;
        tocLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  map.forEach((_, t) => io2.observe(t));
}

// Guides library filter
const gGrid = $('#guide-grid');
if (gGrid) {
  const cards = $$('[data-topic]', gGrid);
  const chips = $$('[data-filter-topic]');
  const q = $('#guide-search');
  const empty = $('#guide-empty');
  let topic = new URLSearchParams(location.search).get('topic') || 'All';
  const apply = () => {
    const term = (q.value || '').toLowerCase().trim();
    let shown = 0;
    cards.forEach((c) => {
      const ok = (topic === 'All' || c.dataset.topic === topic) && (!term || c.dataset.text.includes(term));
      c.hidden = !ok; if (ok) shown++;
      c.classList.toggle('feat', ok && topic === 'All' && !term && c.dataset.first === '1');
    });
    chips.forEach((ch) => ch.setAttribute('aria-pressed', String(ch.dataset.filterTopic === topic)));
    empty.classList.toggle('show', shown === 0);
  };
  chips.forEach((ch) => ch.addEventListener('click', () => {
    topic = ch.dataset.filterTopic; apply();
    const u = new URL(location); topic === 'All' ? u.searchParams.delete('topic') : u.searchParams.set('topic', topic); history.replaceState(null, '', u);
  }));
  q.addEventListener('input', apply);
  apply();
}
