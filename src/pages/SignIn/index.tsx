import { createLazyRouteView } from '@argon-router/react';

import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { RootLayout } from '@/widgets/root-layout';

export const SignInPageLazyScreen = createLazyRouteView({
    route: routes.signIn,
    view: () => import('./ui/page.tsx'),
    fallback: PageLoader,
    layout: RootLayout,
});
