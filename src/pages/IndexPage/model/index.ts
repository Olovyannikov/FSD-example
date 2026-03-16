import { sample } from 'effector';
import { createGate } from 'effector-react';

import { getProductsQuery } from '../api/products';
import { FiltersModel } from '../model/filters';

export * from './filters.ts';

export const IndexPageGate = createGate();
sample({
    clock: IndexPageGate.open,
    source: FiltersModel.$filters,
    target: getProductsQuery.start,
});
