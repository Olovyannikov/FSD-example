import { createApi, createStore } from 'effector';

export const createRefStore = <El extends HTMLElement | null>() => {
    const $current = createStore<El | null>(null);

    const { refAdded, refRemoved } = createApi($current, {
        refAdded: (_, next: El) => next,
        refRemoved: () => null,
    });

    return {
        $current,
        refRemoved,
        refAdded,
    };
};
