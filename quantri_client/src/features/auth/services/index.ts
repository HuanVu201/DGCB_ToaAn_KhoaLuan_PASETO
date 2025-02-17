import axios from "axios";
import { Service } from "../../../services/base";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import {ICredential, ICredentialUserGroup, ILogin } from "../../../models";
import { IAuthenticate } from "./interface";
import axiosInstance from "@/lib/axios";
class AuthService extends Service.BaseApi implements IAuthenticate{
    constructor() {
        super("tokens", "/api/")
    }
    GetToken(data: ILogin): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    RefreshToken(data: Omit<ICredential, "refreshTokenExpiryTime">): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix + "/refresh", data)
    }
    ChangeUserGroup(data: Omit<ICredentialUserGroup, "refreshTokenExpiryTime">): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix + "/ChangeUserGroup", data)
    }
}

export const authService = new AuthService();