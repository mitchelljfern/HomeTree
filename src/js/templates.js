// Templates page: fill-in details, copy messages, print cards.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const KEY = 'ht-template-fields';
const fields = $$('[data-field-input]');
const defaults = {};
fields.forEach((f) => { defaults[f.dataset.fieldInput] = f.placeholder; });

try {
  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  fields.forEach((f) => { if (saved[f.dataset.fieldInput]) f.value = saved[f.dataset.fieldInput]; });
} catch (e) {}

function fill() {
  const vals = {};
  fields.forEach((f) => { vals[f.dataset.fieldInput] = f.value.trim(); });
  $$('[data-f]').forEach((el) => {
    const k = el.dataset.f; const val = vals[k];
    el.textContent = val || el.dataset.ph;
    el.classList.toggle('filled', !!val);
  });
  try { localStorage.setItem(KEY, JSON.stringify(vals)); } catch (e) {}
}
fields.forEach((f) => f.addEventListener('input', fill));
fill();

$('#clear-fields')?.addEventListener('click', () => { fields.forEach((f) => (f.value = '')); fill(); });

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-copy]');
  if (btn) {
    const el = document.getElementById(btn.dataset.copy);
    let text;
    if (el.classList.contains('checklist')) {
      text = $$('h4, .check span', el).map((n) => (n.tagName === 'H4' ? `\n${n.textContent.toUpperCase()}` : `[ ] ${n.textContent}`)).join('\n').trim();
    } else text = el.innerText;
    try { await navigator.clipboard.writeText(text); window.htToast?.('Copied. Paste it into your messages.'); }
    catch (err) { window.htToast?.('Copy not available here'); }
    return;
  }
  const pr = e.target.closest('[data-print]');
  if (pr) {
    const target = document.getElementById(pr.dataset.print);
    const holder = document.createElement('div');
    holder.id = 'print-root';
    holder.appendChild(target.cloneNode(true));
    document.body.appendChild(holder);
    document.body.classList.add('print-one');
    window.print();
    setTimeout(() => { document.body.classList.remove('print-one'); holder.remove(); }, 500);
  }
});

// Section chips scroll
$$('[data-jump]').forEach((c) => c.addEventListener('click', () => {
  document.getElementById(c.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' });
  $$('[data-jump]').forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
}));
