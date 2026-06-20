import { combine } from 'effector';

import { createModel } from '@/shared/lib/effector';

import { ProductModel } from '@/entities/Product';

import { FiltersModel } from '@/features/filters';

export const ProductsModel = createModel(() => {
    const $isEmpty = combine(
        FiltersModel.$query,
        ProductModel.$products,
        (query, products) => query.length > 0 && !products.length
    );

    return {
        $isEmpty,
    };
});
