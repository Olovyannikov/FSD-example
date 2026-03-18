import { createLazyRouteView } from '@argon-router/react';
import { sample } from 'effector';

import { getProductsQuery } from '@/shared/api';
import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { FiltersModel } from '@/features/filters';

import { RootLayout } from '@/widgets/root-layout';

export const IndexPageLazyScreen = createLazyRouteView({
    route: routes.home,
    view: () => import('./ui/page.tsx'),
    fallback: PageLoader,
    layout: RootLayout,
});

sample({
    clock: FiltersModel.searchTracker.entered,
    target: getProductsQuery.start,
});
