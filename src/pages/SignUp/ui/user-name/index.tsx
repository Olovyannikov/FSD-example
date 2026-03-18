import { useField } from '@effector-reform/react';
import { TextInput } from '@mantine/core';
import { useUnit } from 'effector-react';

import { registerUserMutation } from '@/shared/api';

import { RegisterFormModel } from '../../model';

export function UserName() {
    const { value, onChange, error } = useField(RegisterFormModel.$$form.fields.name);
    const { isLoading } = useUnit({
        isLoading: registerUserMutation.$pending,
    });
    return (
        <TextInput
            disabled={isLoading}
            withAsterisk
            autoFocus
            type='text'
            value={value}
            size='md'
            label='Имя пользователя'
            styles={{
                input: {
                    border: `1px solid var(--mantine-color-${error ? 'red' : 'gray'}-3)`,
                },
                label: {
                    color: `var(--mantine-color-${error ? 'red' : 'gray'}-6)`,
                },
            }}
            error={error}
            placeholder='Введите имя пользователя'
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
