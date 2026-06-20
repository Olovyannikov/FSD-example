import { combine, createEvent, restore, sample } from 'effector';
import { persist } from 'effector-storage/query';
import { debounce, spread } from 'patronum';
import { z } from 'zod';

import { appStarted } from '@/shared/config';
import { createModel } from '@/shared/lib/effector';
import { DEFAULT_QUERY_PARAMS } from '@/shared/lib/query-params';
import { router, routes } from '@/shared/router';

import { ProductModel } from '@/entities/Product';

import { DEBOUNCE_TIME, type Sort, SORT_VALUES } from './const';

export const FiltersModel = createModel(() => {
    const searchChanged = createEvent<string>();
    const debouncedSearchChanged = debounce({
        source: searchChanged,
        timeout: DEBOUNCE_TIME,
    });

    const $search = restore(searchChanged, '');
    const $query = restore(debouncedSearchChanged, '');
    persist({
        store: $search,
        key: 'searchTerm',
        timeout: DEBOUNCE_TIME,
        pickup: appStarted,
    });

    const sortChanged = createEvent<Sort['value']>();
    const $sort = restore(sortChanged, SORT_VALUES[0].value);
    persist({
        store: $sort,
        key: 'sort',
        pickup: appStarted,
    });

    const perPageChanged = createEvent<string>();
    const $perPage = restore(perPageChanged, DEFAULT_QUERY_PARAMS.perPage);
    persist({
        store: $perPage,
        key: 'perPage',
        pickup: appStarted,
    });

    const pageChanged = createEvent<string>();
    const $page = restore(pageChanged, '1').reset([
        searchChanged,
        sortChanged,
        debouncedSearchChanged,
        routes.home.opened,
    ]);
    persist({
        store: $page,
        key: 'page',
        pickup: appStarted,
    });

    const incrementPage = createEvent();
    sample({
        clock: incrementPage,
        source: $page,
        fn: (currentPage) => (Number(currentPage) + 1).toString(),
        target: $page,
    });

    const $filters = combine({ searchTerm: $query, sort: $sort, page: $page, perPage: $perPage });

    sample({
        clock: $filters,
        target: ProductModel.productsUpdated,
    });

    sample({
        clock: [$sort, $query, $search],
        target: ProductModel.productsUpdatedFullUpdate,
    });

    const searchTracker = router.trackQuery({
        check: appStarted,
        parameters: z.object({
            searchTerm: z.string().optional(),
            page: z.string().optional().default('1'),
            perPage: z.string().optional().default('12'),
            sort: z
                .union([z.literal('high-price'), z.literal('low-price'), z.literal('newest'), z.literal('oldest')])
                .optional()
                .default('high-price'),
        }),
        forRoutes: [routes.home],
    });

    sample({
        clock: searchTracker.entered,
        target: spread({
            page: $page,
            sort: $sort,
            perPage: $perPage,
            searchTerm: [$query, $search],
        }),
    });

    return {
        searchTracker,

        $filters,
        $query,
        $page,
        $sort,
        $search,

        incrementPage,

        viewModel: {
            $search,
            onSearchTermChange: searchChanged,
        },
    };
});
