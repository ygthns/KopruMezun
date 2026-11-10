import { renderToString } from 'react-dom/server';
import Root from '../src/Root';
export const render = (path) => renderToString(<Root path={path} />);
