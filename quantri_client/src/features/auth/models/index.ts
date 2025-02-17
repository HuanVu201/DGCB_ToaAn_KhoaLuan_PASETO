import { UserType } from "@/features/user/models";
import { IBaseExt} from "../../../models/basemodel";

export interface ICredential {
    refreshToken: string,
    refreshTokenExpiryTime: string,
    token: string,
}

export interface ICredentialUserGroup {
    refreshToken: string;
    refreshTokenExpiryTime: string;
    token: string;
    userGroupId: string;
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
    email: string;
    fullName: string;
    typeUser: UserType;
    uid: string;
    sub: string;
    tenPhongBan: string;
    groupCode: string;
    tenDonVi: string;
    maDonViCha: string;
    officeCode: string;
    userGroupId: string;
    forcePasswordChange: string;
}