import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { copy, emptyRequest, requestPayload, sendRequest, validChoices, validContact } from '../src/contact/model.js';
const reference = '12345678-1234-1234-1234-123456789abc';
const valid = () => ({ ...emptyRequest(), institution: 'university', need: 'mentoring', size: 'medium', name: 'Deneme Kullanıcısı', organization: 'Örnek Kurum', email: 'contact@example.org', message: 'Kurumumuzdaki mentorluk programı için kapsamı görüşmek istiyoruz.', acknowledged: true });
test('guided answers map to every registered existing Netlify form field', async () => {
  const params = requestPayload(valid(), 'tr', '/rehber/universite-mentor-menti-programi/', reference);
  assert.deepEqual([...params.keys()].sort(), ['form-name', 'subject', 'language', 'name', 'organization', 'email', 'community-size', 'need', 'bot-field'].sort());
  assert.equal(params.get('form-name'), 'demo-request');
  assert(params.get('need').includes('Mentorluk ve kariyer'));
  assert(params.get('need').includes('Üniversite'));
  assert(params.get('need').includes(reference));
  assert.equal(params.get('bot-field'), '');
  const skeleton = await readFile('public/__forms.html', 'utf8');
  for (const key of params.keys()) assert(skeleton.includes(`name="${key}"`));
  assert(skeleton.includes('netlify-honeypot="bot-field"'));
});
test('invalid choices, missing acknowledgement and filled bot fields cannot be sent', () => {
  assert(validChoices(valid())); assert(validContact(valid()));
  for (const change of [{ institution: 'invented' }, { need: 'fake' }, { size: '' }, { name: ' ' }, { organization: ' ' }, { email: 'someone\r\n@example.org' }, { email: 'bad address' }, { message: 'x'.repeat(3001) }, { acknowledged: false }, { acknowledged: 'yes' }, { website: 'spam' }]) {
    assert.throws(() => requestPayload({ ...valid(), ...change }, 'tr', '/', reference));
  }
  assert.throws(() => requestPayload(valid(), 'unknown', '/', reference));
  assert.throws(() => requestPayload(valid(), 'tr', '/', '-'.repeat(36)));
});
test('contact details and free text are retained, source metadata omits query and fragment', () => {
  const data = { ...valid(), name: '  Deneme Kullanıcısı  ' };
  const params = requestPayload(data, 'tr', '/?email=private@example.org#private', reference);
  assert.equal(params.get('name'), 'Deneme Kullanıcısı');
  assert(params.get('need').includes(data.message));
  assert(!params.toString().includes('private'));
  assert(params.get('need').endsWith('Page: /'));
});
test('English enquiries preserve selections under the same form contract', () => {
  const params = requestPayload(valid(), 'en', '/', reference);
  assert.equal(params.get('language'), 'en');
  assert(params.get('need').includes('Mentoring & careers'));
  assert(params.get('need').includes('University'));
  assert.equal(params.get('community-size'), '1,000–5,000');
  assert(copy.en.intro.includes('not live chat'));
});
test('submission makes one URL-encoded request and confirms only an accepted response', async () => {
  const params = requestPayload(valid(), 'tr', '/', reference); let calls = 0;
  await sendRequest(params, { request: async (url, options) => { calls++; assert.equal(url, '/__forms.html'); assert.equal(options.method, 'POST'); assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded'); assert.equal(options.body, params.toString()); return new Response('', { status: 200 }); } });
  assert.equal(calls, 1);
  calls = 0;
  await assert.rejects(sendRequest(params, { request: async () => { calls++; throw Error('ambiguous network result'); } }));
  assert.equal(calls, 1);
  await assert.rejects(sendRequest(params, { request: async () => new Response('', { status: 429 }) }));
  await assert.rejects(sendRequest(params, { request: async () => new Response('', { status: 200, headers: { 'cf-mitigated': 'challenge' } }) }));
});
test('widget is present on the public site, avoids browser storage of contact data, and is not exposed on 404', async () => {
  const home = await readFile('dist/index.html', 'utf8'), guide = await readFile('dist/rehber/index.html', 'utf8'), missing = await readFile('dist/404.html', 'utf8');
  assert(home.includes('Mezun ağınızı konuşalım'));
  assert(guide.includes('Mezun ağınızı konuşalım'));
  assert(!missing.includes('class="kc-launcher"'));
  const source = await readFile('src/contact/ContactWidget.jsx', 'utf8');
  assert(!source.includes('localStorage'));
  assert(!source.includes('JSON.stringify(data)'));
  assert(source.includes("storage(cooldownKey, String(Date.now()))"));
  assert(source.includes('sending.current'));
});
