import { createEvent } from 'effector';
import { createAction } from 'effector-action';
import { reset } from 'patronum';

import { getLogoutQuery } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';
import { notifyFx } from '@/shared/lib/notifications';
import { clearStorageFx } from '@/shared/lib/storage';
import { routes } from '@/shared/router';

import { UserModel } from '@/entities/User';

export const LogoutModel = createModel(() => {
    const logoutAction = createEvent();

    reset({
        clock: logoutAction,
        target: [UserModel.$isAuthorized, UserModel.$accessToken, UserModel.$userInfo],
    });

    createAction(logoutAction, {
        target: {
            clearStorageFx,
            homeOpened: routes.home.open,
            notifyFx,
            logout: getLogoutQuery.start,
        },
        fn: (target) => {
            target.clearStorageFx();
            target.homeOpened();
            target.logout();
            target.notifyFx({
                title: 'Успешно!',
                message: 'Вы вышли из аккаунта',
            });
        },
    });

    return {
        viewModel: {
            onLogoutAction: logoutAction,
        },
    };
});
