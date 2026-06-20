import { DEFAULT_QUERY_PARAMS, getSearchParams } from '@/shared/lib/query-params';

export const PRODUCTS_SCROLL_THRESHOLD = {
    SMALL: 0.28,
    LARGE: 0.9,
};

export const PER_PAGE = Number(
    getSearchParams({ keys: ['perPage'], url: location.href }).perPage ?? DEFAULT_QUERY_PARAMS.perPage
);
