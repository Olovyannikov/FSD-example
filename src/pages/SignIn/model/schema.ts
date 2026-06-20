import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.email({ error: 'Email в формате example@example.com' }),
    password: z
        .string({ error: 'Это поле обязательно' })
        .min(8, { error: 'Пароль должен содержать не менее 8 символов' }),
});

export type SignInRequest = z.infer<typeof SignInSchema>;
