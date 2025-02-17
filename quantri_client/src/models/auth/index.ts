import { UserType } from "@/features/user/models";

export interface ICredential {
    refreshToken: string,
    refreshTokenExpiryTime: string,
    token: string,
}

export interface ILogin {
    username: string,
    password: string,
    securityCode?: string,
}

export interface IForgotPassword extends ILogin{
    confirmPassword: string,
}

export interface IParseUserToken {
    groupCode: string;
    positionName: string;
    email: string;
    fullName: string;
    groupName: string;
    officeCode: string;
    officeName: string;
    typeUser: UserType;
    uid: string;
    sub: string;
    maDinhDanh:string;
}