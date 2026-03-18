import { combine, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { appStarted } from '@/shared/config';
import { createModel } from '@/shared/lib/effector';
import { notifyFx } from '@/shared/lib/notifications';
import { router } from '@/shared/router';

import type { Cart } from './types';

export const CartModel = createModel(() => {
    const resetCart = createEvent();

    const $cart = createStore<Cart[]>([]).reset(resetCart);
    const $cartProductsCount = $cart.map((cart) => cart.map((el) => el.count).reduce((count, el) => count + el, 0));
    const $cartTotalFullPrice = combine($cart, (cart) =>
        cart.reduce((total, { product, count }) => total + product.price * count, 0)
    );
    const $cartTotalFullDiscount = $cart.map((cart) =>
        cart.reduce((total, { product, count }) => total + product.price * (product.discount / 100) * count, 0)
    );
    const $cartTotalFinalPrice = $cart.map((cart) =>
        cart.reduce(
            (total, { product, count }) => total + (product.price - product.price * (product.discount / 100)) * count,
            0
        )
    );

    const $cartProducts = $cart.map((cart) => cart.map(({ product }) => product));

    sample({
        clock: resetCart,
        fn: () => ({
            title: 'Успешно!',
            message: 'Ваш заказ оформлен',
        }),
        target: notifyFx,
    });

    persist({
        source: $cart,
        key: 'cart',
        target: $cart,
        pickup: [router.setHistory, appStarted],
    });

    return {
        $cart,
        $cartProductsCount,
        $cartTotalFullPrice,
        $cartTotalFullDiscount,
        $cartTotalFinalPrice,
        $cartProducts,

        resetCart,
    };
});
