import { createLazyRouteView } from '@argon-router/react';
import { sample } from 'effector';

import { getProductBySlugQuery } from '@/shared/api';
import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { RootLayout } from '@/widgets/root-layout';

export const ProductPageLazyScreen = createLazyRouteView({
    route: routes.product,
    view: () => import('./ui/page.tsx'),
    fallback: PageLoader,
    layout: RootLayout,
});

sample({
    clock: routes.product.opened,
    fn: ({ params }) => params.slug,
    target: getProductBySlugQuery.start,
});
