import { createEvent } from 'effector';
import { createAction } from 'effector-action';

import type { RegisterFormResponseDTO } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';
import { routes } from '@/shared/router';

import { UserModel } from '@/entities/User';

export const LoginModel = createModel(() => {
    const userInfoUpdated = createEvent<RegisterFormResponseDTO | null>();

    createAction(userInfoUpdated, {
        target: {
            isAuthorized: UserModel.$isAuthorized,
            userInfo: UserModel.$userInfo,
            updateUserId: UserModel.updateUserId,
            token: UserModel.$accessToken,
            profileOpened: routes.profile.open,
        },
        fn: (target, authentication) => {
            if (!authentication) return;

            const { user, accessToken } = authentication;

            target.isAuthorized(accessToken.length > 0);
            target.userInfo(user);
            target.token(accessToken);
            target.updateUserId(user);
            target.profileOpened();
        },
    });

    return {
        userInfoUpdated,
        viewModel: {
            onLoginAction: userInfoUpdated,
        },
    };
});
