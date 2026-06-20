import { useField } from '@effector-reform/react';
import { PasswordInput } from '@mantine/core';
import { useUnit } from 'effector-react';

import { registerUserMutation } from '@/shared/api';

import { RegisterFormModel } from '../../model';

export function UserPassword() {
    const { value, onChange, error } = useField(RegisterFormModel.$$form.fields.password);

    const { isLoading, isPasswordShown, setIsPasswordShown } = useUnit({
        isLoading: registerUserMutation.$pending,
        isPasswordShown: RegisterFormModel.$passwordVisibility,
        setIsPasswordShown: RegisterFormModel.passwordVisibilityChanged,
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
