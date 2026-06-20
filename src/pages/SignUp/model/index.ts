import { createForm } from '@effector-reform/core';
import { zodAdapter } from '@effector-reform/zod';
import { createEvent, restore, sample } from 'effector';

import { registerUserMutation } from '@/shared/api';
import { createModel } from '@/shared/lib/effector';
import { notifyFx } from '@/shared/lib/notifications';
import { isErrorWithMessage } from '@/shared/lib/type-guards';

import { LoginModel } from '@/features/auth/login';

import { type RegistrationForm, RegistrationFormSchema } from './schema.ts';

export const RegisterFormModel = createModel(() => {
    const passwordVisibilityChanged = createEvent<boolean>();
    const $passwordVisibility = restore(passwordVisibilityChanged, false);

    $passwordVisibility.on(passwordVisibilityChanged, (_, payload) => payload);

    const $$form = createForm<RegistrationForm>({
        schema: {
            email: '',
            name: '',
            password: '',
        },
        validation: zodAdapter(RegistrationFormSchema),
    });

    sample({
        clock: registerUserMutation.finished.success,
        target: $$form.reset,
    });

    sample({
        clock: $$form.validatedAndSubmitted,
        target: registerUserMutation.start,
    });

    sample({
        clock: registerUserMutation.finished.failure,
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
        clock: registerUserMutation.finished.success,
        fn: ({ result }) => result,
        target: LoginModel.userInfoUpdated,
    });

    return {
        $$form,

        $passwordVisibility,

        passwordVisibilityChanged,
    };
});
