import type { SubmitEventHandler } from 'react';
import { Link } from '@argon-router/react';
import { useForm } from '@effector-reform/react';
import { Button, Stack } from '@mantine/core';
import { useUnit } from 'effector-react';

import { registerUserMutation } from '@/shared/api';
import { routes } from '@/shared/router';

import { RegisterFormModel } from '../model';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';

export function RegisterForm() {
    const { isLoading } = useUnit({
        isLoading: registerUserMutation.$pending,
        isPasswordShown: RegisterFormModel.$passwordVisibility,
    });
    const { onSubmit } = useForm(RegisterFormModel.$$form);

    const onSubmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <Stack gap={12}>
            <form onSubmit={onSubmitForm}>
                <Stack miw='420' gap={12}>
                    <UserName />
                    <UserEmail />
                    <UserPassword />
                    <Button size='md' bg='yellow.4' c='black' type='submit'>
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
            {/* @ts-expect-error polymorph */}
            <Button loading={isLoading} size='md' variant='light' component={Link} to={routes.signIn}>
                Войти
            </Button>
        </Stack>
    );
}
