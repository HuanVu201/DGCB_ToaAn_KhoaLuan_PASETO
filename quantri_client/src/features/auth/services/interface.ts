import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper"
import { ICredential, ILogin } from "../models"

export interface IAuthenticate{
    // GetUser(params: Pick<ICredential, "access_token">): AxiosResponseWrapper<IUser>
    GetToken(params: ILogin): AxiosResponseWrapper<ICredential>
}