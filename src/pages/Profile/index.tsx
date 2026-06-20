import { createLazyRouteView } from '@argon-router/react';
import { sample } from 'effector';
import { noop } from 'lodash-es';
import { not } from 'patronum';

import { routes } from '@/shared/router';
import { PageLoader } from '@/shared/ui';

import { UserModel } from '@/entities/User';

import { RootLayout } from '@/widgets/root-layout';

export const ProfilePageLazyScreen = createLazyRouteView({
    route: routes.profile,
    view: () => import('./ui/page.tsx'),
    fallback: PageLoader,
    layout: RootLayout,
});

sample({
    clock: routes.profile.opened,
    filter: not(UserModel.$isAuthorized),
    fn: noop,
    target: routes.signIn.open,
});
