import { createRequestFx } from './create-request-fx';

export const createInternalRequestFx = createRequestFx({
    baseURL: import.meta.env.INTERNAL_API_URL ?? 'https://api.v2.react-learning.ru',
    withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
    baseURL: 'https://api.v2.react-learning.ru',
    headers: {
        'X-API-KEY': import.meta.env.API_TOKEN ?? '',
    },
});
