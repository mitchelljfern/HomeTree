// Packs the HomeTree site source into one JSON file for the Claude project.
// Run: node scripts/pack.mjs   ->  writes .pack/hometree-site-source.json
// Restore instructions are in README.md (section "Restore the code").
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['dist', 'node_modules', '.netlify', '.pack', '.git']);
const SKIP_FILES = new Set(['src/js/icons.js', 'scripts/products.csv']); // generated
const BINARY = /\.(png|jpe?g|gif|webp|ico|woff2?)$/i;

const files = [];
(function walk(dir) {
  for (const name of fs.readdirSync(dir).sort()) {
    const abs = path.join(dir, name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (fs.statSync(abs).isDirectory()) { if (!SKIP_DIRS.has(name)) walk(abs); continue; }
    if (SKIP_FILES.has(rel)) continue;
    const bin = BINARY.test(name);
    files.push({ path: rel, encoding: bin ? 'base64' : 'utf8', content: fs.readFileSync(abs, bin ? 'base64' : 'utf8') });
  }
})(ROOT);

const out = path.join(ROOT, '.pack', 'hometree-site-source.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ name: 'hometree-site', packed_at: new Date().toISOString(), file_count: files.length, files }, null, 1));
console.log(`Packed ${files.length} files to ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
