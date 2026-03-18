import { createQuery } from '@farfetched/core';

import { createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { RegisterFormRequestDTO, RegisterFormResponseDTO, UpdateUserRequestDTO, UserResponseDTO } from './dto.ts';

export const getUserByIdQuery = createQuery({
    name: 'getUserById',
    effect: createInternalRequestFx<string, UserResponseDTO>((id = 'me') => ({
        url: `/users/${id}`,
    })),
});

export const patchCurrentUserMutation = createQuery({
    effect: createInternalRequestFx<UpdateUserRequestDTO, UserResponseDTO>((body) => ({
        url: `/users/me`,
        method: HTTP_METHODS.PATCH,
        body,
    })),
});

export const deleteUserByIdMutation = createQuery({
    effect: createCommonRequestFx<string, UserResponseDTO>((id) => ({
        url: `/users/${id}`,
        method: HTTP_METHODS.DELETE,
    })),
});

export const getLogoutQuery = createQuery({
    effect: createCommonRequestFx<void, void>(() => ({
        url: `/auth/logout`,
    })),
});

export const registerUserMutation = createQuery({
    effect: createCommonRequestFx<RegisterFormRequestDTO, RegisterFormResponseDTO>((body) => ({
        url: '/auth/register',
        method: HTTP_METHODS.POST,
        body,
    })),
});
