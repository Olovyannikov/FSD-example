import type { SubmitEventHandler } from 'react';
import { Link } from '@argon-router/react';
import { useForm } from '@effector-reform/react';
import { Button, Stack } from '@mantine/core';

import { routes } from '@/shared/router';

import { SignInFormModel } from '../model';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';

export function AuthForm() {
    const { onSubmit } = useForm(SignInFormModel.$$form);

    const onSubmitForm: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <Stack miw={420} gap={12}>
            <form onSubmit={onSubmitForm} style={{ display: 'grid', gap: 12 }}>
                <UserEmail />
                <UserPassword />
                <Button size='md' bg='yellow.4' c='black' type='submit'>
                    Войти
                </Button>
            </form>
            {/* @ts-expect-error polymorph */}
            <Button size='md' variant='light' component={Link} to={routes.signUp}>
                Регистрация
            </Button>
        </Stack>
    );
}
