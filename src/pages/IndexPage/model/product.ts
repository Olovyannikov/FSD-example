import { combine, createEvent, createStore, sample } from 'effector';
import { uniqBy } from 'lodash-es';
import { and, not } from 'patronum';

import type { ProductsRequestDTO } from '../api/dto';
import { getProductsQuery } from '../api/products';
import { createModel } from '../lib/create-model';
import { DEFAULT_PRODUCTS_QUERY_PARAMS, getSearchParams } from '../lib/get-search-params';
import { FiltersModel } from './filters';

interface Product {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    wight: string;
}

export const PRODUCTS_SCROLL_THRESHOLD = {
    SMALL: 0.28,
    LARGE: 0.9,
};

const PER_PAGE = Number(
    getSearchParams({ keys: ['perPage'], url: location.href }).perPage ?? DEFAULT_PRODUCTS_QUERY_PARAMS.perPage
);

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
        clock: productsUpdated,
        target: getProductsQuery.start,
    });

    sample({
        clock: getProductsQuery.finished.success,
        fn: (data) => Math.ceil(data.result.length / PER_PAGE),
        target: $productsCount,
    });

    const $isEmpty = combine(FiltersModel.$query, $products, (query, products) => query.length > 0 && !products.length);
    const $isProductsShown = and(not(getProductsQuery.$pending), not($isEmpty));

    sample({
        clock: FiltersModel.$filters,
        target: productsUpdated,
    });

    sample({
        clock: [FiltersModel.$sort, FiltersModel.$query, FiltersModel.$search],
        target: productsUpdatedFullUpdate,
    });

    return {
        $isEmpty,
        $isProductsShown,
        $products,
        $isLoading: getProductsQuery.$pending,
        $productsCount,
        productsUpdated,
    };
});
