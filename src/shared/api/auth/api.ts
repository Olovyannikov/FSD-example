import { createQuery } from '@farfetched/core';

import { createCommonRequestFx, HTTP_METHODS } from '@/shared/api';

import type { SignInFormRequestDTO, SignInFormResponseDTO } from './dto.ts';

export const signInUserMutation = createQuery({
    effect: createCommonRequestFx<SignInFormRequestDTO, SignInFormResponseDTO>((body) => ({
        url: '/auth/login',
        method: HTTP_METHODS.POST,
        body,
    })),
});
