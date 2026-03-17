import { createRoute, createRouter } from '@argon-router/core';

export const routes = {
    home: createRoute({ path: '/' }),
    product: createRoute({ path: '/product/:slug' }),
    signIn: createRoute({ path: '/sign-in' }),
    cart: createRoute({ path: '/cart' }),
    favorites: createRoute({ path: '/favorites' }),
    profile: createRoute({ path: '/profile/me' }),
};

export const router = createRouter({
    routes: [routes.home, routes.product, routes.cart, routes.signIn, routes.favorites, routes.profile],
});
