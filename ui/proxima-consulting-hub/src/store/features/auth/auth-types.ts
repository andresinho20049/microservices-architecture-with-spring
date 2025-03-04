export type UserAuthenticatedType = {
    name: string;
    username: string;
    roles: string[];
}

export type AuthStateType = {
    isAuthenticated: boolean;
    user: UserAuthenticatedType | null;
}