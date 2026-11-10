import App from './App';
import Guide from './Guide';
export default function Root({ path = '/' }) {
  if (path === '/' || path === '/index.html') return <App />;
  return <Guide path={/^\/rehber(?:\/|$)/.test(path) ? path : '/rehber/bulunamadi/'} />;
}
