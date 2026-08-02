import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, BarChart3, BriefcaseBusiness, Building2, Check,
  CheckCircle2, ChevronDown, Database, Download, Globe2, GraduationCap,
  HeartHandshake, Landmark, LockKeyhole, Mail, Menu, MessageSquareText,
  Network, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react';
import { copy, institutions } from './content';

const iconSet = [Database, BarChart3, HeartHandshake, Network, ShieldCheck];
const audienceIcons = [Users, BriefcaseBusiness, Landmark, LockKeyhole, GraduationCap];

function SectionHeading({ eyebrow, title, intro, light = false }) {
  return (
    <div className="section-heading">
      <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>
      <h2 className={light ? 'text-white' : ''}>{title}</h2>
      {intro && <p className={light ? 'text-slate-300' : 'text-slate-600'}>{intro}</p>}
    </div>
  );
}

function DemoModal({ open, onClose, language, openerRef }) {
  const t = copy[language].form;
  const dialogRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    setStatus('idle');
    setError('');
    const dialog = dialogRef.current;
    const opener = openerRef.current;
    const focusable = () => [...dialog.querySelectorAll('button, input, select, textarea, a[href]')]
      .filter((element) => !element.disabled && element.getAttribute('aria-hidden') !== 'true');
    focusable()[0]?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, [open, onClose, openerRef]);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('sending');
    setError('');
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) params.append(key, value);
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
      setError(t.error);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label={t.close}>
          <X size={20} aria-hidden="true" />
        </button>
        {status === 'success' ? (
          <div className="success-state" aria-live="polite">
            <CheckCircle2 size={48} aria-hidden="true" />
            <h2 id="demo-title">{t.successTitle}</h2>
            <p>{t.successBody}</p>
            <button type="button" className="button button-primary" onClick={onClose}>{t.close}</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">{copy[language].nav.cta}</p>
            <h2 id="demo-title">{t.title}</h2>
            <p className="modal-intro">{t.body}</p>
            <form name="demo-request" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
              <input type="hidden" name="form-name" value="demo-request" />
              <input type="hidden" name="subject" value={t.subject} />
              <input type="hidden" name="language" value={language} />
              <input className="hidden" name="bot-field" tabIndex="-1" autoComplete="off" />
              <div className="form-grid">
                <label>{t.fields.name}<span aria-label={t.required}>*</span><input name="name" type="text" required autoComplete="name" /></label>
                <label>{t.fields.organization}<span aria-label={t.required}>*</span><input name="organization" type="text" required autoComplete="organization" /></label>
                <label>{t.fields.email}<span aria-label={t.required}>*</span><input name="email" type="email" required autoComplete="email" /></label>
                <label>{t.fields.size}<span aria-label={t.required}>*</span>
                  <select name="community-size" required defaultValue=""><option value="" disabled>—</option>{t.sizes.map((item) => <option key={item}>{item}</option>)}</select>
                </label>
              </div>
              <label>{t.fields.need}<span className="optional-label">{t.optional}</span><textarea name="need" rows="3" /></label>
              <p className="form-privacy">{t.consent} <a href="#privacy" onClick={onClose}>{t.privacy}</a></p>
              {status === 'error' && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-primary button-wide" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.sending : t.submit}<ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('koprumezun-language') || 'tr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const openerRef = useRef(null);
  const t = copy[language];

  useEffect(() => {
    localStorage.setItem('koprumezun-language', language);
    document.documentElement.lang = language;
    document.title = t.meta.title;
    const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute('content', value);
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', language === 'tr' ? 'tr_TR' : 'en_US');
    setMeta('meta[name="twitter:title"]', t.meta.title);
    setMeta('meta[name="twitter:description"]', t.meta.description);
  }, [language, t]);

  const openDemo = (event) => {
    openerRef.current = event?.currentTarget || document.activeElement;
    setMenuOpen(false);
    setDemoOpen(true);
  };

  const navItems = [
    ['#product', t.nav.product], ['#solutions', t.nav.solutions], ['#modules', t.nav.modules],
    ['#security', t.nav.security], ['#pricing', t.nav.pricing], ['#faq', t.nav.faq],
  ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{language === 'tr' ? 'Ana içeriğe geç' : 'Skip to main content'}</a>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="KöprüMezun">
            <span>Köprü</span><strong>Mezun</strong>
          </a>
          <nav className="desktop-nav" aria-label={language === 'tr' ? 'Ana navigasyon' : 'Primary navigation'}>
            {navItems.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <button type="button" className="language-button" onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}><Globe2 size={16} aria-hidden="true" />{t.nav.language}</button>
            <button type="button" className="button button-accent desktop-cta" onClick={openDemo}>{t.nav.cta}</button>
            <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? t.nav.close : t.nav.menu}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label={language === 'tr' ? 'Mobil navigasyon' : 'Mobile navigation'}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button type="button" className="button button-accent" onClick={openDemo}>{t.nav.cta}</button>
        </nav>}
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light"><Sparkles size={15} aria-hidden="true" />{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-lead">{t.hero.body}</p>
              <div className="hero-actions">
                <button type="button" className="button button-accent" onClick={openDemo}>{t.hero.primary}<ArrowRight size={18} aria-hidden="true" /></button>
                <a className="button button-ghost" href="#product">{t.hero.secondary}<ArrowDown size={18} aria-hidden="true" /></a>
              </div>
              <ul className="hero-points">{t.hero.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
            </div>
            <figure className="product-frame hero-frame">
              <div className="browser-bar"><span /><span /><span /><small>portal.kurum.edu</small></div>
              <img src="/product/home-dashboard.png" alt={language === 'tr' ? 'KöprüMezun ana sayfa, etkinlik ve topluluk akışı ekranı' : 'KöprüMezun home, event and community feed screen'} />
              <figcaption>{t.hero.proof}</figcaption>
            </figure>
          </div>
        </section>

        <section className="trust-section" aria-labelledby="trust-title">
          <div className="container">
            <div className="trust-heading"><div><p className="eyebrow">{t.trust.eyebrow}</p><h2 id="trust-title">{t.trust.title}</h2></div><p>{t.trust.note}</p></div>
            <div className="logo-row">{institutions.map((institution) => <div className="institution" key={institution.name}><img src={institution.logo} alt={`${institution.name} logo`} /><span>{institution.name}</span></div>)}</div>
          </div>
        </section>

        <section id="product" className="section section-soft">
          <div className="container">
            <SectionHeading eyebrow={t.problems.eyebrow} title={t.problems.title} />
            <div className="problem-grid">{t.problems.items.map(([title, body], index) => { const Icon = iconSet[index]; return <article className="problem-card" key={title}><span className="number">0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>; })}</div>
          </div>
        </section>

        <section id="modules" className="section modules-section">
          <div className="container">
            <SectionHeading eyebrow={t.modules.eyebrow} title={t.modules.title} intro={t.modules.intro} light />
            <div className="module-stack">{t.modules.groups.map((group, index) => (
              <article className={`module-row ${index % 2 ? 'module-row-reverse' : ''}`} key={group.title}>
                <div className="module-copy"><span className="module-index">0{index + 1}</span><h3>{group.title}</h3>
                  <dl><div><dt>{t.modules.labels.problem}</dt><dd>{group.problem}</dd></div><div><dt>{t.modules.labels.flow}</dt><dd>{group.flow}</dd></div><div className="result"><dt>{t.modules.labels.result}</dt><dd>{group.result}</dd></div></dl>
                </div>
                <figure className="product-frame"><div className="browser-bar"><span /><span /><span /></div><img src={group.image} alt={`${group.title} — ${t.modules.labels.screenshot}`} loading="lazy" /><figcaption>{t.modules.labels.screenshot}</figcaption></figure>
              </article>
            ))}</div>
          </div>
        </section>

        <section id="solutions" className="section">
          <div className="container">
            <SectionHeading eyebrow={t.solutions.eyebrow} title={t.solutions.title} />
            <div className="audience-grid">{t.solutions.items.map(([title, body], index) => { const Icon = audienceIcons[index]; return <article className="audience-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>; })}</div>
            <div className="secondary-use"><Building2 aria-hidden="true" /><div><h3>{t.solutions.secondaryTitle}</h3><p>{t.solutions.secondaryBody}</p></div></div>
          </div>
        </section>

        <section className="section journey-section">
          <div className="container"><SectionHeading eyebrow={t.journey.eyebrow} title={t.journey.title} light />
            <ol className="journey-list">{t.journey.steps.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong>{index < t.journey.steps.length - 1 && <ArrowRight aria-hidden="true" />}</li>)}</ol>
          </div>
        </section>

        <section className="section control-section">
          <div className="container control-grid"><div><SectionHeading eyebrow={t.control.eyebrow} title={t.control.title} intro={t.control.body} />
            <figure className="product-frame control-image"><div className="browser-bar"><span /><span /><span /></div><img src="/product/tenant-landing.png" alt={language === 'tr' ? 'Kuruma özel KöprüMezun landing sayfası' : 'Institution-branded KöprüMezun landing page'} loading="lazy" /></figure>
          </div><div className="control-list">{t.control.items.map(([title, body]) => <article key={title}><CheckCircle2 aria-hidden="true" /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div>
        </section>

        <section id="security" className="section security-section">
          <div className="container"><div className="security-grid"><div><SectionHeading eyebrow={t.security.eyebrow} title={t.security.title} intro={t.security.body} light />
            <div className="control-chip-grid">{t.security.controls.map((control) => <div key={control}><ShieldCheck aria-hidden="true" />{control}</div>)}</div>
          </div><aside className="security-note"><LockKeyhole aria-hidden="true" /><h3>{language === 'tr' ? 'Teslim modeli netliği' : 'Delivery model clarity'}</h3><p>{t.security.dataNote}</p><hr /><p className="small-note">{t.security.legalNote}</p></aside></div></div>
        </section>

        <section className="section onboarding-section">
          <div className="container"><SectionHeading eyebrow={t.onboarding.eyebrow} title={t.onboarding.title} />
            <ol className="onboarding-grid">{t.onboarding.steps.map(([number, title, body]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol><p className="onboarding-note">{t.onboarding.note}</p>
          </div>
        </section>

        <section id="pricing" className="section pricing-section">
          <div className="container"><div className="pricing-intro"><SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} intro={t.pricing.body} light /><button className="button button-accent" type="button" onClick={openDemo}>{t.pricing.cta}<ArrowRight size={18} aria-hidden="true" /></button></div>
            <div className="pricing-grid"><div className="factor-panel"><h3>{t.pricing.factorsTitle}</h3><ul>{t.pricing.factors.map((factor) => <li key={factor}><Check aria-hidden="true" />{factor}</li>)}</ul></div>
              <div className="delivery-panel"><h3>{t.pricing.modelsTitle}</h3>{t.pricing.models.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{body}</p></div></article>)}<p className="availability-note">{t.pricing.availability}</p></div>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="container faq-grid"><SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} /><div className="faq-list">{t.faq.items.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner"><div><p className="eyebrow eyebrow-light">{t.nav.cta}</p><h2>{language === 'tr' ? 'Kurumunuzun mezun deneyimini birlikte tasarlayalım.' : 'Let’s design your institution’s alumni experience together.'}</h2></div><div><button type="button" className="button button-accent" onClick={openDemo}>{t.pricing.cta}<ArrowRight size={18} aria-hidden="true" /></button><a className="text-link" href="/brochure.pdf" download><Download size={18} aria-hidden="true" />{t.footer.brochure}</a></div></div>
        </section>

        <section id="privacy" className="privacy-section">
          <div className="container privacy-inner"><Mail aria-hidden="true" /><div><p className="eyebrow">{t.privacy.eyebrow}</p><h2>{t.privacy.title}</h2><p>{t.privacy.body}</p></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top" aria-label="KöprüMezun"><span>Köprü</span><strong>Mezun</strong></a><p>{t.footer.summary}</p></div><div><h3>{t.footer.product}</h3><a href="#modules">{t.nav.modules}</a><a href="#security">{t.nav.security}</a><a href="#pricing">{t.nav.pricing}</a></div><div><h3>{t.footer.company}</h3><a href="/brochure.pdf" download>{t.footer.brochure}</a><a href="#privacy">{t.footer.privacy}</a><a href="mailto:info@koprumezun.com">info@koprumezun.com</a></div></div><div className="container footer-bottom">© {new Date().getFullYear()} {t.footer.copyright}<span>koprumezun.com</span></div></footer>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} language={language} openerRef={openerRef} />
    </div>
  );
}

export default App;
