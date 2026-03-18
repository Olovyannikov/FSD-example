export interface AuthenticationResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: `Bearer ${string}`;
}

export interface SignInFormRequestDTO {
    email: string;
    password: string;
}

export type SignInFormResponseDTO = AuthenticationResponse;
