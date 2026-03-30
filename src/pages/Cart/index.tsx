import { createLazyRouteView } from '@argon-router/react';

import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { RootLayout } from '@/widgets/root-layout';

export const CartPageLazyScreen = createLazyRouteView({
    route: routes.cart,
    fallback: PageLoader,
    view: () => import('./ui/page.tsx'),
    layout: ({ children }) => <RootLayout title='DogFood | Корзина'>{children}</RootLayout>,
});
