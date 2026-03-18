import { useField } from '@effector-reform/react';
import { PasswordInput } from '@mantine/core';
import { useUnit } from 'effector-react';

import { signInUserMutation } from '@/shared/api';

import { SignInFormModel } from '../../model';

export function UserPassword() {
    const { value, onChange, error } = useField(SignInFormModel.$$form.fields.password);

    const { isLoading, isPasswordShown, setIsPasswordShown } = useUnit({
        isLoading: signInUserMutation.$pending,
        isPasswordShown: SignInFormModel.$passwordVisibility,
        setIsPasswordShown: SignInFormModel.passwordVisibilityChanged,
    });

    return (
        <PasswordInput
            disabled={isLoading}
            withAsterisk
            placeholder='Введите пароль'
            visible={isPasswordShown}
            onVisibilityChange={setIsPasswordShown}
            styles={{
                input: {
                    border: `1px solid var(--mantine-color-${error ? 'red' : 'gray'}-3)`,
                },
                label: {
                    color: `var(--mantine-color-${error ? 'red' : 'gray'}-6)`,
                },
            }}
            label='Пароль'
            size='md'
            error={error}
            onChange={(e) => onChange(e.target.value)}
            value={value}
        />
    );
}
