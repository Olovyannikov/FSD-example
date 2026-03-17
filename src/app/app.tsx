import { createRoot } from 'react-dom/client';
import { historyAdapter } from '@argon-router/core';
import { RouterProvider } from '@argon-router/react';
import { allSettled, fork } from 'effector';
import { Provider } from 'effector-react';
import { createBrowserHistory } from 'history';

import { router } from '@/shared/router';

import { ThemeProvider } from './providers';
import { RoutesView } from './routes';

import './assets/styles/index.css';

const root = document.getElementById('root') as HTMLDivElement;

const history = createBrowserHistory();

const scope = fork();

await allSettled(router.setHistory, {
    scope,
    params: historyAdapter(history),
});

createRoot(root).render(
    <Provider value={scope}>
        <ThemeProvider>
            <RouterProvider router={router}>
                <RoutesView />
            </RouterProvider>
        </ThemeProvider>
    </Provider>
);
