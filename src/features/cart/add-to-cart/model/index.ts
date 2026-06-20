import { createEvent, sample } from 'effector';

import type { Product } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';

import { CartModel } from '@/entities/Cart';

export const AddToCartModel = createModel(() => {
    const cartProductAdded = createEvent<Product>();
    const cartProductRemoved = createEvent<Product>();
    const cartProductTotalRemoved = createEvent<string>();

    sample({
        clock: cartProductAdded,
        source: CartModel.$cart,
        fn: (store, product) => {
            const existedProduct = store.find((el) => el.product.id === product.id);
            if (existedProduct && existedProduct.count > 0) {
                const preparedStore = [...store];
                const idx = preparedStore.findIndex((val) => val.product.id === existedProduct.product.id);
                preparedStore[idx] = {
                    product: existedProduct.product,
                    count: existedProduct.count + 1,
                };
                return preparedStore;
            }

            return [...store, { product, count: 1 }];
        },
        target: CartModel.$cart,
    });

    sample({
        clock: cartProductRemoved,
        source: CartModel.$cart,
        fn: (store, product) => {
            const existedProduct = store.find((el) => el.product.id === product.id);
            if (existedProduct && existedProduct.count > 1) {
                const preparedStore = [...store];
                const idx = preparedStore.findIndex((val) => val.product.id === existedProduct.product.id);
                preparedStore[idx] = {
                    product: existedProduct.product,
                    count: existedProduct.count - 1,
                };
                return preparedStore;
            }
            return store.filter((el) => el.product.id !== product.id);
        },
        target: CartModel.$cart,
    });

    sample({
        clock: cartProductTotalRemoved,
        source: CartModel.$cart,
        fn: (store, id) => store.filter((el) => el.product.id !== id),
        target: CartModel.$cart,
    });

    return {
        cartProductAdded,
        cartProductRemoved,
        cartProductTotalRemoved,
    };
});
