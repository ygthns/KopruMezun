import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mock = process.env.CONTACT_PREVIEW_RESULT;
let submissions = 0;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.pdf': 'application/pdf', '.txt': 'text/plain' };
createServer(async (req, res) => {
  try {
    if (mock && req.method === 'GET' && req.url === '/__preview/request-count') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ submissions, mock: true })); return;
    }
    if (mock && req.method === 'POST' && req.url === '/__forms.html') {
      const expectedOrigin = 'http://127.0.0.1:' + (process.env.PORT || 4431);
      if (req.headers.origin !== expectedOrigin) { res.writeHead(403); res.end(); return; }
      let body = ''; for await (const chunk of req) { body += chunk; if (body.length > 64000) { res.writeHead(413); res.end(); return; } }
      const params = new URLSearchParams(body);
      if (params.get('form-name') !== 'demo-request' || params.get('bot-field')) { res.writeHead(400); res.end(); return; }
      submissions++;
      res.writeHead(mock === 'accepted' ? 200 : 503, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store', 'X-Preview-Only': 'true' });
      res.end('Local simulation only. No request was delivered.'); return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + path), status = 200;
    if (!file.startsWith(root + sep) && file !== root) throw Error('Invalid path');
    try { if ((await stat(file)).isDirectory()) file += '/index.html'; await stat(file); }
    catch { file = root + '/404.html'; status = 404; }
    const bytes = await readFile(file);
    res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', ...(status === 404 ? { 'X-Robots-Tag': 'noindex' } : {}) });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(Number(process.env.PORT || 4431), '127.0.0.1', () => console.log('Köprü Rehber preview: http://127.0.0.1:' + (process.env.PORT || 4431)));
