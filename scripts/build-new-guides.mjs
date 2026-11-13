import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const pairs = JSON.parse(await readFile(new URL('../src/new-guides.json', import.meta.url)));
const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const renderParagraph = value => escape(value).replace(
  /\[([^\]]+)\]\((https:\/\/[a-z0-9.-]+\/[a-z0-9/_-]*)\)/gi,
  '<a href="$2" rel="nofollow">$1</a>',
);
const route = (article, lang) => `${lang === 'en' ? '/en' : ''}/rehber/${article.slug}/`;
const universityGuide = '/rehber/universiteler-icin-mezun-iliskileri-platformu/';
const related = {
  records: 'career',
  career: 'matching',
  matching: 'career',
  events: 'groups',
  groups: 'events',
  launch: 'crm',
  crm: 'records',
  first90: 'launch',
};

export async function writeNewGuides(template, origin) {
  const routes = [];
  for (const [topic, pair] of Object.entries(pairs)) {
    for (const lang of ['tr', 'en']) {
      const en = lang === 'en';
      const article = pair[lang];
      const path = route(article, lang);
      const alternate = route(pair[en ? 'tr' : 'en'], en ? 'tr' : 'en');
      const url = origin + path;
      const title = escape(article.title);
      const summary = escape(article.summary);
      const data = {
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
        description: article.summary, url, mainEntityOfPage: url, inLanguage: lang,
        datePublished: '2026-11-12', author: { '@type': 'Organization', name: 'KöprüMezun' },
      };
      const sections = article.sections.map(([heading, paragraph]) =>
        `<section><h2>${escape(heading)}</h2><p>${renderParagraph(paragraph)}</p></section>`).join('');
      const nav = `<nav aria-label="${en ? 'Guide navigation' : 'Rehber navigasyonu'}"><a href="/rehber/">Köprü Rehber</a> · <a href="${alternate}" hreflang="${en ? 'tr' : 'en'}">${en ? 'Türkçe' : 'English'}</a></nav>`;
      const relatedArticle = pairs[related[topic]][lang];
      const cross = route(relatedArticle, lang);
      const body = `<main id="guide-main"><header class="guide-article-hero"><div class="container">${nav}<h1>${title}</h1><p class="guide-article-deck">${summary}</p></div></header><article class="container guide-article-body">${sections}<section><h2>${en ? 'Related guides' : 'İlgili rehberler'}</h2><ul><li><a href="${universityGuide}" hreflang="tr">${en ? 'University alumni relations platform guide (Turkish)' : 'Üniversiteler için mezun ilişkileri platformu'}</a></li><li><a href="${cross}">${escape(relatedArticle.title)}</a></li></ul><p><a href="/#contact">${en ? 'Discuss your pilot with KöprüMezun' : 'Pilotunuzu KöprüMezun ile görüşün'}</a></p></section></article></main>`;
      let page = template.replace(/<html lang="[^"]+"/, `<html lang="${lang}"`)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title} | KöprüMezun</title>`)
        .replace(/<script type="module"[^>]*><\/script>/g, '')
        .replace(/<div id="root"><\/div>/, body)
        .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`);
      for (const [name, value] of Object.entries({ description: summary, 'og:title': title, 'og:description': summary, 'og:url': url, 'og:locale': en ? 'en_US' : 'tr_TR', 'og:type': 'article', 'twitter:title': title, 'twitter:description': summary })) {
        page = page.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*`), (_, prefix) => prefix + value);
      }
      page = page.replace('</head>', `<link rel="alternate" hreflang="tr" href="${origin + route(pair.tr, 'tr')}"><link rel="alternate" hreflang="en" href="${origin + route(pair.en, 'en')}"><script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script></head>`);
      const dir = join('dist', path);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'index.html'), page);
      routes.push(path);
    }
  }
  return routes;
}
