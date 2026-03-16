import { concurrency, createQuery } from '@farfetched/core';

import { createCommonRequestFx } from './api';
import type { ProductsRequestDTO, ProductsResponseDTO } from './dto';

export const getProductsQuery = createQuery({
    effect: createCommonRequestFx<Partial<ProductsRequestDTO>, ProductsResponseDTO>((params) => ({
        url: '/products',
        params,
    })),
});

concurrency(getProductsQuery, {
    strategy: 'TAKE_LATEST',
});
