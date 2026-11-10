import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, GraduationCap, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { copy, emptyRequest, institutionIds, needIds, requestPayload, sendRequest, sizeIds, validContact } from './model';
import './contact.css';
const cooldownKey = 'kopru-contact-sent-at';
const teaserKey = 'kopru-contact-teaser-hidden';
const storage = (key, value) => { try { if (value === undefined) return sessionStorage.getItem(key); sessionStorage.setItem(key, value); } catch { /* Optional session preferences are never required to submit. */ } return null; };

export default function ContactWidget({ language = 'tr', path = '/' }) {
  const t = copy[language] || copy.tr;
  const [open, setOpen] = useState(false), [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState(0), [data, setData] = useState(emptyRequest);
  const [status, setStatus] = useState('idle'), [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const panel = useRef(null), launcher = useRef(null), opener = useRef(null), heading = useRef(null), sending = useRef(false), wasOpen = useRef(false), started = useRef(0);
  const dismiss = () => { setTeaser(false); storage(teaserKey, '1'); };
  const close = () => { if (!sending.current) setOpen(false); };
  const begin = (element) => { opener.current = element || document.activeElement; if (!started.current) started.current = Date.now(); setOpen(true); setTeaser(false); storage(teaserKey, '1'); };
  useEffect(() => {
    const handleOpen = (event) => { opener.current = event.detail?.opener || document.activeElement; if (!started.current) started.current = Date.now(); setOpen(true); setTeaser(false); storage(teaserKey, '1'); };
    window.addEventListener('kopru:contact-open', handleOpen);
    const timer = window.setTimeout(() => { if (!storage(teaserKey)) setTeaser(true); }, 8000);
    return () => { window.removeEventListener('kopru:contact-open', handleOpen); window.clearTimeout(timer); };
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => { if (open) heading.current?.focus(); else if (wasOpen.current) (opener.current?.isConnected ? opener.current : launcher.current)?.focus(); wasOpen.current = open; }, [open, step, status]);
  const update = (field, value) => { setData((previous) => ({ ...previous, [field]: value })); setError(''); };
  const choose = (field, value) => { update(field, value); setStep(step + 1); };
  const review = (event) => { event.preventDefault(); if (!validContact(data) || data.website) { setError(t.invalid); return; } if (!reference) setReference(crypto.randomUUID()); setStep(4); setError(''); };
  const submit = async () => {
    if (sending.current || status === 'uncertain' || status === 'success') return;
    const last = Number(storage(cooldownKey));
    if (last && Date.now() - last < 60000) { setError(t.cooldown); return; }
    if (Date.now() - started.current < 3000) { setError(t.wait); return; }
    let params; try { params = requestPayload(data, language, path, reference); } catch { setError(t.invalid); return; }
    sending.current = true; setStatus('sending'); setError('');
    try {
      await sendRequest(params, { signal: AbortSignal.timeout(20000) });
      storage(cooldownKey, String(Date.now())); setStatus('success');
    } catch { setStatus('uncertain'); setError(t.error); }
    finally { sending.current = false; }
  };
  const reset = () => { setData(emptyRequest()); setStep(0); setStatus('idle'); setReference(''); setError(''); started.current = Date.now(); };
  const summary = [[t.labels.institution, t.institutions[institutionIds.indexOf(data.institution)]], [t.labels.need, t.needs[needIds.indexOf(data.need)]], [t.labels.size, t.sizes[sizeIds.indexOf(data.size)]], [t.labels.name, data.name], [t.labels.organization, data.organization], [t.labels.email, data.email], ...(data.message ? [[t.labels.message, data.message]] : [])];
  const busy = status === 'sending';
  const options = step === 0 ? institutionIds : step === 1 ? needIds : sizeIds;
  const labels = step === 0 ? t.institutions : step === 1 ? t.needs : t.sizes;
  return <div className="kopru-contact" lang={language}>
    {teaser && !open && <aside className="kc-teaser" aria-label={t.subtitle}><button className="kc-icon kc-teaser-close" onClick={dismiss} aria-label={t.close}><X size={16} /></button><div className="kc-teaser-brand"><span className="kc-avatar"><GraduationCap size={21} /></span><div><strong>KöprüMezun</strong><small>{t.subtitle}</small></div></div><h2>{t.teaser}</h2><p>{t.teaserBody}</p><button className="kc-text-button" onClick={(event) => begin(event.currentTarget)}>{t.start}<ArrowRight size={16} /></button></aside>}
    <button hidden={open} ref={launcher} className="kc-launcher" onClick={(event) => begin(event.currentTarget)} aria-expanded={open} aria-controls="kopru-contact-panel"><MessageSquare size={21} aria-hidden="true" /><span>{t.launcher}</span><span className="kc-unread" aria-hidden="true">1</span></button>
    {open && <div className="kc-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section ref={panel} id="kopru-contact-panel" className="kc-panel" role="dialog" aria-modal="true" aria-label={t.subtitle} onKeyDown={(event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const elements = [...panel.current.querySelectorAll('button:not(:disabled), input:not([type="hidden"]), textarea, a[href]')].filter((element) => element.getClientRects().length && element.tabIndex !== -1);
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}><header className="kc-header"><span className="kc-avatar"><GraduationCap size={22} /></span><div><small>{t.subtitle}</small><strong>KöprüMezun</strong></div><button className="kc-icon" onClick={close} disabled={busy} aria-label={t.close}><X size={21} /></button></header>
      {status !== 'success' && <div className="kc-progress"><div aria-hidden="true">{[0, 1, 2, 3].map((value) => <span className={value <= step ? 'active' : ''} key={value} />)}</div><small>{step === 4 ? t.review : `${t.step} ${step + 1} / 4`}</small></div>}
      <div className="kc-body">
        {step === 0 && <div className="kc-intro"><strong>{t.hello}</strong><p>{t.intro}</p></div>}
        {step > 0 && step < 4 && <div className="kc-answer"><Check size={14} aria-hidden="true" />{step === 1 ? t.institutions[institutionIds.indexOf(data.institution)] : step === 2 ? t.needs[needIds.indexOf(data.need)] : t.sizes[sizeIds.indexOf(data.size)]}</div>}
        <h2 ref={heading} tabIndex={-1}>{status === 'success' ? t.success : step === 4 ? t.review : t.questions[step]}</h2>
        {status === 'success' ? <div className="kc-success"><span><Check size={28} /></span><p>{t.successBody}</p><p className="kc-reference">{t.labels.reference}<br /><code>{reference}</code></p><button className="kc-primary" onClick={close}>{t.finish}<Check size={17} /></button><button className="kc-text-button" onClick={reset}>{t.restart}</button></div> : <>
          {step < 3 && <div className="kc-choices">{options.map((value, index) => <button key={value} onClick={() => choose(step === 0 ? 'institution' : step === 1 ? 'need' : 'size', value)}><span>{labels[index]}</span><ChevronRight size={17} aria-hidden="true" /></button>)}</div>}
          {step === 3 && <form className="kc-form" onSubmit={review}><label>{t.labels.name} <span>*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} value={data.name} onChange={(event) => update('name', event.target.value)} /></label><label>{t.labels.organization} <span>*</span><input name="organization" autoComplete="organization" required minLength={2} maxLength={160} value={data.organization} onChange={(event) => update('organization', event.target.value)} /></label><label>{t.labels.email} <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} value={data.email} onChange={(event) => update('email', event.target.value)} /></label><label>{t.labels.message} <small>({t.optional})</small><textarea name="message" rows={3} maxLength={3000} placeholder={t.placeholder} value={data.message} onChange={(event) => update('message', event.target.value)} /><small className="kc-count">{data.message.length}/3000</small></label><div className="kc-honeypot" aria-hidden="true"><label>Website<input name="bot-field" tabIndex={-1} autoComplete="off" value={data.website} onChange={(event) => update('website', event.target.value)} /></label></div>{error && <p role="alert" className="kc-error">{error}</p>}<button type="submit" className="kc-primary">{t.next}<ArrowRight size={17} /></button></form>}
          {step === 4 && <><p className="kc-muted">{t.reviewIntro}</p><dl className="kc-summary">{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><label className="kc-acknowledge"><input type="checkbox" checked={data.acknowledged} disabled={busy} onChange={(event) => update('acknowledged', event.target.checked)} /><span>{t.acknowledge} <a href="/#privacy" target="_blank" rel="noopener noreferrer">{t.privacy} ↗</a></span></label><p className="kc-privacy">{t.privacyNote}</p>{error && <p role="alert" className="kc-error">{error}</p>}{status === 'uncertain' ? <div className="kc-uncertain"><a className="kc-primary" href={`mailto:info@koprumezun.com?subject=${encodeURIComponent('KöprüMezun · ' + reference)}`}>{t.verify}<ArrowRight size={17} /></a><button className="kc-text-button" onClick={() => { setStatus('idle'); setError(''); }}>{t.retry}</button></div> : <button className="kc-primary" disabled={!data.acknowledged || busy} onClick={submit}>{busy ? t.sending : t.send}<ArrowRight size={17} /></button>}</>}
        </>}
      </div><footer className="kc-footer">{step > 0 && status !== 'success' ? <button disabled={busy} onClick={() => { setStep((value) => value - 1); setError(''); }}><ArrowLeft size={14} />{step === 4 ? t.edit : t.back}</button> : <span>KöprüMezun</span>}<span><ShieldCheck size={12} aria-hidden="true" />{t.note}</span></footer>
    </section></div>}
  </div>;
}
