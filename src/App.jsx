import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, BarChart3, BriefcaseBusiness, Building2, Check,
  CheckCircle2, ChevronDown, Database, Download, Globe2, GraduationCap,
  HeartHandshake, Landmark, LockKeyhole, Mail, Menu, MessageSquareText,
  Network, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react';
import { copy, institutions } from './content';
import { GuideTeaser } from './Guide';

const iconSet = [Database, BarChart3, HeartHandshake, Network, ShieldCheck];
const audienceIcons = [Users, BriefcaseBusiness, Landmark, LockKeyhole, GraduationCap];

function SectionHeading({ eyebrow, title, intro, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => { try { return typeof localStorage !== 'undefined' && localStorage.getItem('koprumezun-language') === 'en' ? 'en' : 'tr'; } catch { return 'tr'; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const brochureUrl = language === 'tr' ? '/kopru-mezun-katalog-tr.pdf' : '/brochure.pdf';

  useEffect(() => {
    try { localStorage.setItem('koprumezun-language', language); } catch { /* Language still works when storage is unavailable. */ }
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

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  const openDemo = (event) => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('kopru:contact-open', { detail: { opener: event?.currentTarget } }));
  };

  const navItems = [
    ['#product', t.nav.product], ['#solutions', t.nav.solutions], ['#modules', t.nav.modules],
    ['/rehber/', language === 'tr' ? 'Rehber' : 'Guides (TR)'], ['#security', t.nav.security], ['#pricing', t.nav.pricing], ['#faq', t.nav.faq],
  ];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{language === 'tr' ? 'Ana içeriğe geç' : 'Skip to main content'}</a>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="KöprüMezun">
            <span className="brand-mark" aria-hidden="true"><img src="/logos/kopruyazisizbeyazlogo.svg" alt="" /></span>
            <span className="brand-name"><span>Köprü</span><strong>Mezun</strong></span>
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
            <div className="trust-heading"><div><p className="eyebrow">{t.trust.eyebrow}</p><h2 id="trust-title">{t.trust.title}</h2></div></div>
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
            <div className="module-stack">{t.modules.groups.map((group, index) => {
              const image = language === 'tr' && group.imageTr ? group.imageTr : group.image;
              return (
                <article className={`module-row ${index % 2 ? 'module-row-reverse' : ''} ${group.highlight ? 'module-row-featured' : ''}`} key={group.title}>
                  <div className="module-copy">{group.highlight && <span className="module-highlight"><HeartHandshake size={17} aria-hidden="true" />{group.highlight}</span>}<span className="module-index">0{index + 1}</span><h3>{group.title}</h3>
                    <dl><div><dt>{t.modules.labels.problem}</dt><dd>{group.problem}</dd></div><div><dt>{t.modules.labels.flow}</dt><dd>{group.flow}</dd></div><div className="result"><dt>{t.modules.labels.result}</dt><dd>{group.result}</dd></div></dl>
                  </div>
                  <figure className="product-frame"><div className="browser-bar"><span /><span /><span /></div><img src={image} alt={`${group.title} — ${t.modules.labels.screenshot}`} loading="lazy" /><figcaption>{t.modules.labels.screenshot}</figcaption></figure>
                </article>
              );
            })}</div>
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

        <section id="contact" className="cta-section">
          <div className="container cta-inner"><div><p className="eyebrow eyebrow-light">{t.nav.cta}</p><h2>{language === 'tr' ? 'Kurumunuzun mezun deneyimini birlikte tasarlayalım.' : 'Let’s design your institution’s alumni experience together.'}</h2></div><div><button type="button" className="button button-accent" onClick={openDemo}>{t.pricing.cta}<ArrowRight size={18} aria-hidden="true" /></button><a className="text-link" href={brochureUrl} download><Download size={18} aria-hidden="true" />{t.footer.brochure}</a></div></div>
        </section>

        <GuideTeaser language={language} />

        <section id="privacy" className="privacy-section" aria-labelledby="privacy-title">
          <div className="container">
            <header className="privacy-hero">
              <span className="privacy-icon"><Mail aria-hidden="true" /></span>
              <div><p className="eyebrow">{t.privacy.eyebrow}</p><h2 id="privacy-title">{t.privacy.title}</h2><p>{t.privacy.intro}</p></div>
            </header>
            <div className="privacy-layout">
              <aside className="privacy-summary" aria-label={t.privacy.summaryLabel}>
                <p className="privacy-kicker">{t.privacy.scopeLabel}</p>
                <strong>{t.privacy.scope}</strong>
                <dl>
                  <div><dt>{t.privacy.updatedLabel}</dt><dd>{t.privacy.updated}</dd></div>
                  <div><dt>{t.privacy.contactLabel}</dt><dd><a href="mailto:info@koprumezun.com">info@koprumezun.com</a></dd></div>
                </dl>
                <p>{t.privacy.scopeNote}</p>
              </aside>
              <article className="privacy-content">
                {t.privacy.sections.map((section) => (
                  <section key={section.title}>
                    <h3>{section.title}</h3>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                  </section>
                ))}
              </article>
            </div>
            <p className="privacy-footnote">{t.privacy.footnote}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top" aria-label="KöprüMezun"><span className="brand-mark" aria-hidden="true"><img src="/logos/kopruyazisizbeyazlogo.svg" alt="" /></span><span className="brand-name"><span>Köprü</span><strong>Mezun</strong></span></a><p>{t.footer.summary}</p></div><div><h3>{t.footer.product}</h3><a href="#modules">{t.nav.modules}</a><a href="#security">{t.nav.security}</a><a href="#pricing">{t.nav.pricing}</a></div><div><h3>{t.footer.company}</h3><a href={brochureUrl} download>{t.footer.brochure}</a><a href="/rehber/">Köprü Rehber</a><a href="#privacy">{t.footer.privacy}</a><a href="mailto:info@koprumezun.com">info@koprumezun.com</a></div></div><div className="container footer-bottom">© {new Date().getFullYear()} {t.footer.copyright}<span>koprumezun.com</span></div></footer>
    </div>
  );
}

export default App;
