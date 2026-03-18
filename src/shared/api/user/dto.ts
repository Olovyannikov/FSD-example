import type { Like } from '@/shared/api';

import type { AuthenticationResponse } from '../auth/dto';

export interface User {
    id: string;
    email: string;
    name: string;
    avatarPath: string;
    about: string;
    phone: string;
    roles: string[];
    likes: Like[];
    password: string;
    favoritesPost: never[];
}

export type UserResponseDTO = User;

export type UpdateUserRequestDTO = Pick<
    User,
    'email' | 'name' | 'avatarPath' | 'about' | 'phone' | 'roles' | 'password'
>;

export type RegisterFormResponseDTO = AuthenticationResponse;

export type RegisterFormRequestDTO = Omit<
    User,
    'id' | 'likes' | 'favoritesPost' | 'avatarPath' | 'about' | 'phone' | 'roles'
>;
