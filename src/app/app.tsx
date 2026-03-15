import { createRoot } from 'react-dom/client';

import { ThemeProvider } from './providers';

import './assets/styles/index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(<ThemeProvider>Hello World</ThemeProvider>);
