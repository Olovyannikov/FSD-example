import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { getUserByIdQuery, type RegisterFormResponseDTO, type User } from '@/shared/api';
import { appStarted } from '@/shared/config';
import { createModel } from '@/shared/lib/effector';
import { STORAGE } from '@/shared/lib/storage';

export const UserModel = createModel(() => {
    const $isAuthorized = createStore(Boolean(STORAGE.getJSON('accessToken')?.length ?? 0));

    sample({
        clock: $isAuthorized,
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

    sample({
        clock: getUser,
        target: getUserByIdQuery.start,
    });

    return {
        $user,
        $userInfo,
        $accessToken,
        $isAuthorized,

        getUser,
        updateUserId,
    };
});
