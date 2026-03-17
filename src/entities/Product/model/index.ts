import { createEvent, createStore, sample } from 'effector';
import { uniqBy } from 'lodash-es';

import { createModel } from '@/shared/lib/effector';

import { getProductsQuery } from '../api';
import type { ProductsRequestDTO } from '../api/dto';
import { PER_PAGE } from '../lib';
import type { Product } from './types';

export const ProductModel = createModel(() => {
    const productsUpdated = createEvent<Partial<ProductsRequestDTO>>();
    const productsUpdatedFullUpdate = createEvent();

    const $productsCount = createStore(1);

    const $products = createStore<Product[]>([]).reset(productsUpdatedFullUpdate);
    sample({
        clock: getProductsQuery.finished.success,
        source: $products,
        fn: (data, payload) => uniqBy([...data, ...payload.result.products], 'id'),
        target: $products,
    });

    sample({
        clock: [productsUpdated],
        target: getProductsQuery.start,
    });

    sample({
        clock: getProductsQuery.finished.success,
        fn: (data) => Math.ceil(data.result.length / PER_PAGE),
        target: $productsCount,
    });

    return {
        $products,
        $isLoading: getProductsQuery.$pending,
        $productsCount,
        productsUpdated,
        productsUpdatedFullUpdate,
    };
});
