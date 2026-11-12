import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { articles } from '../src/guide-content.js';
const origin = 'https://koprumezun.com';
const read = (path) => readFile(path, 'utf8');
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
test('20 neutral Turkish needs map to ten substantive, distinct guides', async () => {
  const questions = JSON.parse(await read('content/target-questions.json'));
  assert.equal(questions.length, 20);
  assert.equal(new Set(questions.map((q) => q.question)).size, 20);
  assert(questions.every((q) => q.language === 'tr' && !/köprü|kopru/i.test(q.question)));
  assert.equal(articles.length, 10);
  assert.equal(new Set(articles.map((a) => a.slug)).size, 10);
  for (const a of articles) {
    assert.equal(questions.filter((q) => q.article === `/rehber/${a.slug}/`).length, 2);
    assert([...a.sections.flatMap((s) => s.paragraphs), ...a.faq.map((f) => f.answer), ...a.checklist.flat()].join(' ').split(/\s+/).length >= 350, a.slug);
    assert.equal(a.checklist.length, 4);
    assert.equal(a.faq.length, 2);
  }
});
test('related guides have valid targets and every guide receives an editorial link', () => {
  const inbound = new Map(articles.map((a) => [a.slug, 0]));
  for (const a of articles) {
    assert.equal(new Set(a.related).size, 3);
    assert(!a.related.includes(a.slug));
    for (const slug of a.related) { assert(inbound.has(slug)); inbound.set(slug, inbound.get(slug) + 1); }
  }
  assert([...inbound.values()].every((n) => n > 0));
});
test('every article delivers its text, canonical and matching structured data in initial HTML', async () => {
  for (const a of articles) {
    const path = `/rehber/${a.slug}/`, html = await read(`dist${path}index.html`);
    assert(html.includes(`<h1>${a.title}</h1>`), a.slug);
    assert(html.replace(/<[^>]+>/g, '').includes(a.sections[1].paragraphs[0]), a.slug);
    assert(html.includes(`rel="canonical" href="${origin + path}"`));
    assert(html.includes(`property="og:url" content="${origin + path}"`));
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const post = data['@graph'].find((item) => item['@type'] === 'BlogPosting');
    assert.equal(post.headline, a.title); assert.equal(post.mainEntityOfPage, origin + path);
    assert.equal(post.dateModified, '2026-11-10T12:00:00+03:00');
    assert(html.includes('AI ile üretilmiş temsili illüstrasyon'));
    assert(!/application\/ld\+json[^>]*>[^<]*AggregateRating/.test(html));
  }
});
test('ten distinct optimized covers have responsive variants and real file references', async () => {
  const hashes = [];
  for (const a of articles) {
    hashes.push(hash(await readFile(`public${a.image}`)));
    assert((await stat(`public${a.image}`)).size < 250000);
    assert((await stat(`public${a.image.replace('.webp', '-640.webp')}`)).size < 120000);
    assert(a.alt.includes('temsili'));
  }
  assert.equal(new Set(hashes).size, 10);
});
test('home and guide index expose crawlable editorial entry points without JavaScript', async () => {
  const home = await read('dist/index.html'), index = await read('dist/rehber/index.html');
  assert(home.includes('href="/rehber/"')); assert(home.includes('id="contact"'));
  for (const a of articles) assert(index.includes(`href="/rehber/${a.slug}/"`));
  for (const id of ['product', 'solutions', 'modules', 'security', 'pricing', 'faq', 'privacy']) assert(home.includes(`id="${id}"`));
  assert(home.includes('brochure.pdf'));
});
test('sitemap includes existing pages and all localized guides, excludes 404 and portal addresses', async () => {
  const xml = await read('dist/sitemap.xml');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(urls.length, 26); assert.equal(new Set(urls).size, 26);
  assert(!urls.some((url) => new URL(url).hostname !== 'koprumezun.com' || /\/404|\/login|\/admin/.test(new URL(url).pathname)));
  for (const a of articles) assert(urls.includes(`${origin}/rehber/${a.slug}/`));
  const pairs = JSON.parse(await read('src/new-guides.json'));
  for (const { tr, en } of Object.values(pairs)) {
    const paths = { tr: `/rehber/${tr.slug}/`, en: `/en/rehber/${en.slug}/` };
    for (const lang of ['tr', 'en']) {
      const path = paths[lang];
      const html = await read(`dist${path}index.html`);
      assert(urls.includes(origin + path));
      assert(html.includes(`<html lang="${lang}"`));
      assert(html.includes(`rel="canonical" href="${origin + path}"`));
      for (const [alternate, alternatePath] of Object.entries(paths)) {
        assert(html.includes(`hreflang="${alternate}" href="${origin + alternatePath}"`));
      }
    }
  }
});
test('unknown pages use a genuine noindex 404 while existing form delivery stays intact', async () => {
  const config = await read('netlify.toml'), html = await read('dist/404.html');
  assert(config.includes('to = "/404.html"\n  status = 404'));
  assert(!config.includes('to = "/index.html"\n  status = 200'));
  assert(html.includes('name="robots" content="noindex"'));
  assert(html.includes('Bu köprü henüz kurulmamış.'));
  assert.equal(await read('dist/__forms.html'), await read('public/__forms.html'));
  assert(config.includes("form-action 'self'"));
});

test('contextual anchors preserve original sentences and only link to valid other guides', () => {
  const paths = new Set(articles.map((a) => `/rehber/${a.slug}/`));
  for (const a of articles) {
    assert.equal(a.inlineLinks.length, 2);
    assert.equal(new Set(a.inlineLinks.map((l) => l.href)).size, 2);
    for (const link of a.inlineLinks) {
      assert(paths.has(link.href)); assert.notEqual(link.href, `/rehber/${a.slug}/`);
      assert(a.sections[link.section].paragraphs[link.paragraph].includes(link.anchor));
      assert(link.section > 0);
    }
  }
});
