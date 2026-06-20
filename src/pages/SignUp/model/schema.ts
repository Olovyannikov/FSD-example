import { z } from 'zod';

export const RegistrationFormSchema = z.object({
    email: z.email({ error: 'Email в формате example@example.com' }),
    name: z
        .string({
            error: 'Это поле обязательно',
        })
        .min(1, { error: 'Это поле обязательно' }),
    password: z
        .string({ error: 'Это поле обязательно' })
        .min(8, { error: 'Пароль должен содержать не менее 8 символов' }),
});

export type RegistrationForm = z.infer<typeof RegistrationFormSchema>;
