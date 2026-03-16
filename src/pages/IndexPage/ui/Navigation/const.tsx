import { IconHeart, IconHome, IconShoppingCart, IconStack2 } from '@tabler/icons-react';

import IconDog from './dog-icon.svg?react';

export const NAV_ITEMS = [
    { id: 0, name: 'Главная', path: '/', icon: <IconHome />, hideOnLarge: true },
    { id: 1, name: 'Каталог', path: '#', icon: <IconStack2 />, hideOnLarge: true },
    {
        id: 3,
        name: 'Избранное',
        path: '/favorites',
        icon: <IconHeart />,
        hideOnLarge: false,
        protectedPath: '/sign-in',
    },
    {
        id: 2,
        name: 'Корзина',
        path: '/cart',
        icon: <IconShoppingCart />,
        hideOnLarge: false,
        protectedPath: '/sign-in',
    },
    { id: 4, name: 'Профиль', path: '/profile/me', icon: <IconDog />, hideOnLarge: false, protectedPath: '/sign-in' },
];

export const LARGE_SCREEN_NAV_ITEMS = NAV_ITEMS.filter((el) => !el.hideOnLarge);
