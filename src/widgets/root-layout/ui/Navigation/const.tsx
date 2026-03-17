import { IconHeart, IconHome, IconShoppingCart, IconStack2 } from '@tabler/icons-react';

import { routes } from '@/shared/router';

import IconDog from './dog-icon.svg?react';

export const NAV_ITEMS = [
    { id: 0, name: 'Главная', path: routes.home, icon: <IconHome />, hideOnLarge: true },
    { id: 1, name: 'Каталог', path: routes.home, icon: <IconStack2 />, hideOnLarge: true },
    {
        id: 3,
        name: 'Избранное',
        path: routes.favorites,
        icon: <IconHeart />,
        hideOnLarge: false,
        protectedPath: routes.signIn,
    },
    {
        id: 2,
        name: 'Корзина',
        path: routes.cart,
        icon: <IconShoppingCart />,
        hideOnLarge: false,
        protectedPath: routes.signIn,
    },
    {
        id: 4,
        name: 'Профиль',
        path: routes.profile,
        icon: <IconDog />,
        hideOnLarge: false,
        protectedPath: routes.signIn,
    },
];

export const LARGE_SCREEN_NAV_ITEMS = NAV_ITEMS.filter((el) => !el.hideOnLarge);
