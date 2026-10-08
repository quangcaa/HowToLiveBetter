// Regenerate i18n/manifest.json: which sections exist in which language.
// Run after adding or removing a translated section file.
//
//   node i18n/build-manifest.mjs
//   node i18n/build-manifest.mjs --check   # exit 1 if manifest.json is stale (CI)
//
// The reader page uses this to avoid firing a fetch at every section in every
// language and collecting 30 console 404s, which makes a working page look broken.
// Section numbers come from the filenames, so the manifest is derived, never hand-edited.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const CHECK = process.argv.includes('--check');
const LANGS = ['en', 'vi'];

// Chinese original: section number -> real filename, read off book/ directly.
// The filenames carry their own section number, so no README parsing is needed.
const zh = {};
for (const f of readdirSync(resolve(ROOT, 'book')).sort()) {
  const m = /^(\d\d)-.+\.md$/.exec(f);
  if (m) zh[m[1]] = `book/${f}`;
}
if (!Object.keys(zh).length) throw new Error('book/ has no NN-*.md files');

const manifest = { zh: Object.keys(zh).sort(), sections: zh };
for (const lang of LANGS) {
  const dir = resolve(HERE, lang, 'book');
  manifest[lang] = existsSync(dir)
    ? readdirSync(dir).filter(f => /^\d\d\.md$/.test(f)).map(f => f.slice(0, 2)).sort()
    : [];
}

const out = resolve(HERE, 'manifest.json');
const next = JSON.stringify(manifest, null, 2) + '\n';
const prev = existsSync(out) ? readFileSync(out, 'utf8') : '';

if (CHECK) {
  if (prev !== next) {
    console.error('manifest.json is stale. Run: node i18n/build-manifest.mjs');
    process.exit(1);
  }
  console.log('manifest.json is current.');
} else {
  writeFileSync(out, next);
  const counts = LANGS.map(l => `${l} ${manifest[l].length}`).join(' · ');
  console.log(`manifest.json written: zh ${manifest.zh.length} · ${counts}`);
}
