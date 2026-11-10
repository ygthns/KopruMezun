import { build } from 'vite';
import { readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { articles } from '../src/guide-content.js';
const origin = 'https://koprumezun.com';
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const json = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
await build();
const template = await readFile('dist/index.html', 'utf8');
const temp = '.prerender';
try {
  await build({ build: { ssr: 'scripts/entry-render.jsx', outDir: temp, emptyOutDir: true } });
  const { render } = await import(pathToFileURL(join(process.cwd(), temp, 'entry-render.js')));
  const organization = { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'KöprüMezun', url: `${origin}/`, logo: `${origin}/logos/kopruyazisizbeyazlogo.svg` };
  const pages = ['/', '/rehber/', ...articles.map((a) => `/rehber/${a.slug}/`), '/404.html'];
  for (const path of pages) {
    const article = articles.find((a) => path === `/rehber/${a.slug}/`);
    const is404 = path === '/404.html';
    const title = article ? `${article.title} | Köprü Rehber` : path === '/rehber/' ? 'Köprü Rehber | Mezun ilişkileri ve topluluk yönetimi' : is404 ? 'Sayfa bulunamadı | KöprüMezun' : 'KöprüMezun | Üniversiteler için mezun ilişkileri platformu';
    const description = article?.description || (path === '/rehber/' ? 'Üniversiteler için mezun ilişkileri, mentorluk, kariyer ve topluluk yönetimi hakkında uygulama rehberleri ve kontrol listeleri.' : 'Mezun ilişkileri, kariyer, mentorluk, etkinlik, bağış, gönüllülük ve raporlamayı kurumunuza özel tek portalda yönetin.');
    const image = article ? origin + article.image : `${origin}/og.png`;
    let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`).replace(/<div id="root"><\/div>/, `<div id="root">${render(path)}</div>`);
    const meta = { description, 'og:title': title, 'og:description': description, 'og:url': origin + path, 'og:image': image, 'og:type': article ? 'article' : 'website', 'og:image:width': article ? '1200' : '1200', 'og:image:height': article ? '800' : '630', 'og:image:alt': article?.alt || 'KöprüMezun — Üniversiteler için mezun ilişkileri platformu', 'twitter:title': title, 'twitter:description': description, 'twitter:image': image, 'twitter:image:alt': article?.alt || title };
    for (const [key, value] of Object.entries(meta)) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*\\/?>)`), (_, a, b) => a + escape(value) + b);
    html = html.replace(/<link rel="canonical" href="[^"]+"\s*\/?>/, `<link rel="canonical" href="${origin + path}" />`);
    const graph = [organization];
    if (path === '/') graph.push({ '@type': 'WebSite', '@id': `${origin}/#website`, name: 'KöprüMezun', url: origin, publisher: { '@id': organization['@id'] }, inLanguage: 'tr-TR' });
    if (path === '/rehber/') graph.push({ '@type': 'CollectionPage', name: 'Köprü Rehber', url: origin + path, inLanguage: 'tr-TR', mainEntity: { '@type': 'ItemList', itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.title, url: `${origin}/rehber/${a.slug}/` })) } });
    if (article) graph.push({ '@type': 'BlogPosting', '@id': origin + path + '#article', headline: article.title, description: article.description, mainEntityOfPage: origin + path, url: origin + path, inLanguage: 'tr-TR', datePublished: article.published + 'T12:00:00+03:00', dateModified: article.updated + 'T12:00:00+03:00', image: { '@type': 'ImageObject', url: image, width: 1200, height: 800, caption: 'AI ile üretilmiş temsili illüstrasyon.' }, author: { '@type': 'Organization', name: 'KöprüMezun Editoryal', url: origin + '/rehber/' }, publisher: { '@id': organization['@id'] }, articleSection: article.category }, { '@type': 'BreadcrumbList', itemListElement: [{ name: 'Ana sayfa', item: origin + '/' }, { name: 'Köprü Rehber', item: origin + '/rehber/' }, { name: article.title, item: origin + path }].map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) });
    html = html.replace('</head>', `${is404 ? '<meta name="robots" content="noindex" />' : ''}<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script></head>`);
    const filename = path === '/' ? 'dist/index.html' : is404 ? 'dist/404.html' : join('dist', path, 'index.html');
    await mkdir(join(filename, '..'), { recursive: true });
    await writeFile(filename, html);
  }
  for (const article of articles) for (const suffix of ['', '-640']) await stat(`dist/rehber-images/${article.slug}${suffix}.webp`);
  const urls = pages.filter((p) => p !== '/404.html');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${origin + path}</loc>${path.startsWith('/rehber/') ? '<lastmod>2026-11-10</lastmod>' : ''}</url>`).join('')}</urlset>\n`;
  await writeFile('dist/sitemap.xml', xml);
  await writeFile('dist/routes.json', JSON.stringify({ pages: urls, generated: '2026-11-10' }, null, 2));
  console.log(`Statik yayın: ${urls.length} sayfa, ${articles.length} makale, 20 hedef soru.`);
} finally { await rm(temp, { recursive: true, force: true }); }
