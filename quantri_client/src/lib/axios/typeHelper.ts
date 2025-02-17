import { AxiosResponse } from "axios";

export type AxiosResponseWrapper<TRes = any> =  Promise<AxiosResponse<TRes>>

