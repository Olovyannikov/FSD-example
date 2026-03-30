import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { delay, once } from 'patronum';

import {
    getUserByIdQuery,
    type RegisterFormResponseDTO,
    removeProductLikeMutation,
    setProductLikeMutation,
    type User,
} from '@/shared/api';
import { appStarted } from '@/shared/config';
import { createModel } from '@/shared/lib/effector';
import { STORAGE } from '@/shared/lib/storage';

export const UserModel = createModel(() => {
    const $isAuthorized = createStore(Boolean(STORAGE.getJSON('accessToken')?.length ?? 0));

    sample({
        clock: [$isAuthorized],
        filter: Boolean,
        fn: () => 'me',
        target: getUserByIdQuery.start,
    });

    const $accessToken = createStore<`Bearer ${string}` | void>(STORAGE.getJSON('accessToken') ?? null);
    persist({
        store: $accessToken,
        key: 'accessToken',
        pickup: appStarted,
    });

    const updateUserId = createEvent<{ id: string }>();
    const updateUserIdFx = createEffect(({ id }: { id: string }) => {
        STORAGE.setItem('userId', id ?? '');
    });
    sample({
        clock: updateUserId,
        target: updateUserIdFx,
    });

    const getUser = createEvent<string>();

    const $user = createStore<User | null>(null);
    const $userInfo = createStore<RegisterFormResponseDTO['user'] | null>(null);

    const $userFavorites = getUserByIdQuery.$data.map((user) => user?.likes ?? []);

    const updateFav = createEvent<string>();

    delay({
        source: updateFav,
        timeout: 900,
        target: getUserByIdQuery.start,
    });

    sample({
        clock: [removeProductLikeMutation.finished.success, setProductLikeMutation.finished.success],
        fn: () => 'me',
        target: updateFav,
    });

    sample({
        clock: getUser,
        target: getUserByIdQuery.start,
    });

    sample({
        clock: once(appStarted),
        filter: $isAuthorized,
        fn: () => 'me',
        target: getUser,
    });

    return {
        $user,
        $userInfo,
        $accessToken,
        $isAuthorized,
        $userFavorites,

        getUser,
        updateUserId,
    };
});
