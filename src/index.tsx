import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';

import './style/main.scss';

const ClientApp: React.FC = () => (
    <HelmetProvider>
        <BrowserRouter>
            <App isServerRendered={false} />
        </BrowserRouter>
    </HelmetProvider>
);

/* On React 19 react-helmet-async renders the document metadata as regular elements and
 * lets React hoist them into the head, instead of taking over the existing tags. The
 * metadata baked into the prerendered html must then be removed, or it would linger
 * (and become stale) next to the tags rendered by the app. None of these selectors
 * matches the index.html template; they can only match prerendered metadata
 */
document
    .querySelectorAll('head > title, head > meta[name="description"], head > meta[property^="og:"]')
    .forEach((tag) => tag.remove());

const appPlaceholder = document.getElementById('app-placeholder')!;
createRoot(appPlaceholder).render(<ClientApp />);
