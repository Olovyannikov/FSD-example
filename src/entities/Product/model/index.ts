import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';
import { uniqBy } from 'lodash-es';

import { getProductsQuery, type Product, type ProductsRequestDTO } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';

import { PER_PAGE } from '../lib';

export const ProductModel = createModel(() => {
    const productsUpdated = createEvent<Partial<ProductsRequestDTO>>();
    const productsUpdatedFullUpdate = createEvent();

    const $productsCount = createStore(1);

    const $products = createStore<Product[]>([]).reset(productsUpdatedFullUpdate);
    createAction(getProductsQuery.finished.success, {
        target: {
            $products,
            $productsCount,
        },
        source: {
            $products,
        },
        fn: (target, { products }, { result }) => {
            target.$products(uniqBy([...products, ...result.products], 'id'));
            target.$productsCount(Math.ceil(result.length / PER_PAGE));
        },
    });

    sample({
        clock: [productsUpdated],
        target: getProductsQuery.start,
    });

    return {
        $products,
        $isLoading: getProductsQuery.$pending,
        $productsCount,
        productsUpdated,
        productsUpdatedFullUpdate,
    };
});
