import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetLogAuthenParams, ILogAuthen, ISearchLogAuthenParams } from "../model";

class LogAuthenService extends Service.BaseApi {
    constructor() {
        super("logauthens")
    }
    SearchLogAuthen(_params: ISearchLogAuthenParams): AxiosResponseWrapper<IPaginationResponse<ILogAuthen[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetLogAuthenDetail(_params: IPickSearch<IGetLogAuthenParams, "id">): AxiosResponseWrapper<ILogAuthen> {
        return axiosInstance.get(this._urlSuffix + "/detail", { params: _params })
    }
    DeleteLogAuthenDetail(_params: IPickSearch<IGetLogAuthenParams, "id">): AxiosResponseWrapper<ILogAuthen> {
        return axiosInstance.delete(this._urlSuffix+"/"+_params.id, { params: _params })
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    CountAccessPortal(): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/countaccessportal")
    }
}

export const LogAuthenApi = new LogAuthenService()