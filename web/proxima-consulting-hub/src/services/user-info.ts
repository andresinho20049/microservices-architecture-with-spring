
type UserInfoType = {
    sub: string
    aud: string[]
    azp: string
    auth_time: string
    roles: RoleType[]
    iss: string
    exp: string
    iat: string
    nonce: string
    jti: string
    sid: string
}

type RoleType = {
    role: string;
}

export type {
    UserInfoType,
    RoleType
};

export const getUserInfoService = async () => {
    const data = await fetch("http://localhost:8000/userinfo", {
        credentials: 'include'
    });
    return await data.json();
}

