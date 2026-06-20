import { useField } from '@effector-reform/react';
import { TextInput } from '@mantine/core';
import { useUnit } from 'effector-react';

import { signInUserMutation } from '@/shared/api';

import { SignInFormModel } from '../../model';

export function UserEmail() {
    const { value, onChange, error } = useField(SignInFormModel.$$form.fields.email);
    const { isLoading } = useUnit({
        isLoading: signInUserMutation.$pending,
    });
    return (
        <TextInput
            disabled={isLoading}
            withAsterisk
            type='text'
            value={value}
            size='md'
            label='Электронная почта'
            styles={{
                input: {
                    border: `1px solid var(--mantine-color-${error ? 'red' : 'gray'}-3)`,
                },
                label: {
                    color: `var(--mantine-color-${error ? 'red' : 'gray'}-6)`,
                },
            }}
            error={error}
            placeholder='Введите email'
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
