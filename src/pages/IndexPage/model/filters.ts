import { combine, createEvent, restore, sample } from 'effector';
import { persist } from 'effector-storage/query';
import { debounce } from 'patronum';

import { appStarted } from '../lib/app-started';
import { createModel } from '../lib/create-model';
import { DEFAULT_PRODUCTS_QUERY_PARAMS } from '../lib/get-search-params';

export interface Sort {
    label: string;
    value: 'high-price' | 'low-price' | 'newest' | 'oldest' | null;
}

export const DEBOUNCE_TIME = 600;

export const SORT_VALUES: Sort[] = [
    {
        label: 'По убыванию цены',
        value: 'high-price',
    },
    {
        label: 'По возрастанию цены',
        value: 'low-price',
    },
    {
        label: 'Сначала новые',
        value: 'newest',
    },
    {
        label: 'Сначала старые',
        value: 'oldest',
    },
];

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
    const $perPage = restore(perPageChanged, DEFAULT_PRODUCTS_QUERY_PARAMS.perPage);
    persist({
        store: $perPage,
        key: 'perPage',
        pickup: appStarted,
    });

    const pageChanged = createEvent<string>();
    const $page = restore(pageChanged, '1').reset([searchChanged, sortChanged, debouncedSearchChanged]);
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

    return {
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
