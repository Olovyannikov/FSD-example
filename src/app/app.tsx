import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { IndexPageLazy } from '@/pages/IndexPage';

import { ThemeProvider } from './providers';

import './assets/styles/index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
    <ThemeProvider>
        <Suspense fallback='Loading...'>
            <IndexPageLazy />
        </Suspense>
    </ThemeProvider>
);
