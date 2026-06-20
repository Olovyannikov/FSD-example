import { useMediaQuery } from '@mantine/hooks';
import { trackMediaQuery } from '@withease/web-api';

import { appStarted } from '../../config/app-started';

export const useIsLarge = () => useMediaQuery('(min-width: 768px)');

export const large = trackMediaQuery('(min-width: 768px)', {
    setup: appStarted,
});

export const small = trackMediaQuery('(max-width: 768px)', {
    setup: appStarted,
});
