export interface LoginI {
    email: string;
    password: string;
}

export class AuthDataI {
    accessToken: string = "";
    authDetail: any;
}

export interface UserI {
    _id: string,
    userName: string,
    email: string,
    password?: string,
    accessToken?: string
}