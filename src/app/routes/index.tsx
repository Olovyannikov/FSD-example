import { createRoutesView } from '@argon-router/react';

import { ErrorPageLazy } from '@/pages/Error';
import { IndexPageLazyScreen } from '@/pages/Index';
import { ProductPageLazyScreen } from '@/pages/Product';

export const RoutesView = createRoutesView({
    routes: [IndexPageLazyScreen, ProductPageLazyScreen],
    otherwise: ErrorPageLazy,
});
