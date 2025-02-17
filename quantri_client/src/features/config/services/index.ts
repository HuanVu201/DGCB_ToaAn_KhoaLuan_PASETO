import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IConfig, ISearchConfig } from "../models";

class ConfigService extends Service.BaseApi implements Service.ICrud<IConfig>{
    constructor(){
        super("configs")
    }
    Search(_params: ISearchConfig): AxiosResponseWrapper<IPaginationResponse<IConfig[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(ma: string): AxiosResponseWrapper<IResult<IConfig>> {
        return axiosInstance.get(this._urlSuffix + "/" + ma);
    }
    Create(_data: Partial<Omit<IConfig, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IConfig>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchPublicModule(): AxiosResponseWrapper<IPaginationResponse<IConfig[]>> {
        return axiosInstance.get(this._urlSuffix + "/" + "publicmodule", {params: {}})
    }
}

export const configApi = new ConfigService()