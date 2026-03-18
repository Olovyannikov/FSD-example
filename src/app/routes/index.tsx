import { createRoutesView } from '@argon-router/react';
import { nprogress } from '@mantine/nprogress';
import { sample } from 'effector';
import { createEffect } from 'effector/compat';
import { and, not, or } from 'patronum';

import { CartPageLazyScreen } from '@/pages/Cart';
import { ErrorPageLazy } from '@/pages/Error';
import { IndexPageLazyScreen } from '@/pages/Index';
import { ProductPageLazyScreen } from '@/pages/Product';
import { ProfilePageLazyScreen } from '@/pages/Profile';
import { SignInPageLazyScreen } from '@/pages/SignIn';
import { SignUpPageLazyScreen } from '@/pages/SignUp';

import { routes } from '@/shared/router';

export const RoutesView = createRoutesView({
    routes: [
        IndexPageLazyScreen,
        ProductPageLazyScreen,
        CartPageLazyScreen,
        SignInPageLazyScreen,
        SignUpPageLazyScreen,
        ProfilePageLazyScreen,
    ],
    otherwise: ErrorPageLazy,
});

const createNprogressStartFx = createEffect(() => {
    nprogress.start();
});

const createNprogressCompleteFx = createEffect(() => {
    nprogress.complete();
});

sample({
    source: {
        home: routes.home.$isPending,
        profile: routes.profile.$isPending,
        signIn: routes.signIn.$isPending,
        cart: routes.cart.$isPending,
        favorites: routes.favorites.$isPending,
        signUp: routes.signUp.$isPending,
        product: routes.product.$isPending,
    },
    filter: or(
        routes.home.$isPending,
        routes.profile.$isPending,
        routes.signIn.$isPending,
        routes.cart.$isPending,
        routes.favorites.$isPending,
        routes.signUp.$isPending,
        routes.product.$isPending
    ),
    target: createNprogressStartFx,
});

sample({
    source: {
        home: routes.home.$isPending,
        profile: routes.profile.$isPending,
        signIn: routes.signIn.$isPending,
        cart: routes.cart.$isPending,
        favorites: routes.favorites.$isPending,
        signUp: routes.signUp.$isPending,
        product: routes.product.$isPending,
    },
    filter: and(
        not(routes.home.$isPending),
        not(routes.profile.$isPending),
        not(routes.signIn.$isPending),
        not(routes.cart.$isPending),
        not(routes.favorites.$isPending),
        not(routes.signUp.$isPending),
        not(routes.product.$isPending)
    ),
    target: createNprogressCompleteFx,
});
