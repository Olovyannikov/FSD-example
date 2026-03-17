import { concurrency, createQuery } from '@farfetched/core';

import { createCommonRequestFx } from '@/shared/api';

import type { ProductBySlugResponseDTO, ProductsRequestDTO, ProductsResponseDTO } from './dto.ts';

export const getProductsQuery = createQuery({
    effect: createCommonRequestFx<Partial<ProductsRequestDTO>, ProductsResponseDTO>((params) => ({
        url: '/products',
        params,
    })),
});

concurrency(getProductsQuery, {
    strategy: 'TAKE_LATEST',
});

export const getProductBySlugQuery = createQuery({
    effect: createCommonRequestFx<string, ProductBySlugResponseDTO>((slug) => ({
        url: `/products/by-slug/${slug}`,
    })),
});
