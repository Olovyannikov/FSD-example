import { createForm } from '@effector-reform/core';
import { zodAdapter } from '@effector-reform/zod';
import { createEvent, sample } from 'effector';
import { restore } from 'effector/compat';

import { signInUserMutation } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';
import { notifyFx } from '@/shared/lib/notifications';
import { isErrorWithMessage } from '@/shared/lib/type-guards';

import { LoginModel } from '@/features/auth/login';

import { type SignInRequest, SignInSchema } from './schema.ts';

export const SignInFormModel = createModel(() => {
    const passwordVisibilityChanged = createEvent<boolean>();
    const $passwordVisibility = restore(passwordVisibilityChanged, false);

    const $$form = createForm<SignInRequest>({
        schema: {
            password: '',
            email: '',
        },
        validation: zodAdapter(SignInSchema),
    });

    sample({
        clock: signInUserMutation.finished.success,
        target: $$form.reset,
    });

    sample({
        clock: $$form.validatedAndSubmitted,
        target: signInUserMutation.start,
    });

    sample({
        clock: signInUserMutation.finished.failure,
        fn: (err) => {
            const e = err.error;
            if (isErrorWithMessage(e)) {
                return {
                    title: 'Ошибка',
                    message: e.data.message,
                    color: 'red.4',
                };
            }

            return {
                title: 'Ошибка',
                message: e.message,
                color: 'red.4',
            };
        },
        target: notifyFx,
    });

    sample({
        clock: signInUserMutation.finished.success,
        fn: ({ result }) => result,
        target: LoginModel.userInfoUpdated,
    });

    return {
        $$form,

        $passwordVisibility,

        passwordVisibilityChanged,
    };
});
