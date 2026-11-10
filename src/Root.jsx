import { useEffect, useState } from 'react';
import App from './App';
import Guide from './Guide';
import ContactWidget from './contact/ContactWidget';
import { articles } from './guide-content';
export default function Root({ path = '/' }) {
  const [language, setLanguage] = useState('tr');
  useEffect(() => {
    const sync = () => setLanguage(document.documentElement.lang === 'en' ? 'en' : 'tr');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);
  const home = path === '/' || path === '/index.html';
  const known = home || /^\/rehber\/?$/.test(path) || articles.some((a) => path.replace(/\/+$/, '') === `/rehber/${a.slug}`);
  return <>{home ? <App /> : <Guide path={/^\/rehber(?:\/|$)/.test(path) ? path : '/rehber/bulunamadi/'} />}{known && <ContactWidget language={language} path={path} />}</>;
}
