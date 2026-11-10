import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Root from './Root.jsx';
const element = document.getElementById('root');
const tree = <StrictMode><Root path={window.location.pathname} /></StrictMode>;
if (element.hasChildNodes() && !['/', '/index.html'].includes(window.location.pathname)) hydrateRoot(element, tree);
else createRoot(element).render(tree);
