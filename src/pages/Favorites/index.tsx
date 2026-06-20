import { createLazyRouteView } from '@argon-router/react';

import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { RootLayout } from '@/widgets/root-layout';

export const FavoritesPageLazyScreen = createLazyRouteView({
    route: routes.favorites,
    view: () => import('./ui/page.tsx'),
    fallback: PageLoader,
    layout: ({ children }) => <RootLayout title='DogFood | Избранное'>{children}</RootLayout>,
});
