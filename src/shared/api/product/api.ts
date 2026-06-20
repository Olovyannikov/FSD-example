import { concurrency, createQuery } from '@farfetched/core';

import { createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type {
    ProductBySlugResponseDTO,
    ProductsRequestDTO,
    ProductsResponseDTO,
    ProductWithLikeResponseDTO,
    RemoveProductWithLikeResponseDTO,
} from './types';

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

export const setProductLikeMutation = createQuery({
    effect: createInternalRequestFx<string, ProductWithLikeResponseDTO>((id) => ({
        url: `/products/${id}/likes`,
        method: HTTP_METHODS.PUT,
    })),
});

export const removeProductLikeMutation = createQuery({
    effect: createInternalRequestFx<string, RemoveProductWithLikeResponseDTO>((id) => ({
        url: `/products/${id}/likes`,
        method: HTTP_METHODS.DELETE,
    })),
});
