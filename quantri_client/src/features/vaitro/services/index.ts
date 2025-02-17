import { Service } from "@/services";
import { IVaiTro } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class VaiTroService extends Service.BaseApi implements Omit<Service.ICrud<IVaiTro>, "Search">{
    constructor() {
        super("roles","/api/")
    }
    Search(_params: IPickSearch<IVaiTro, "permissions">): AxiosResponseWrapper<IVaiTro[]> {
        return axiosInstance.get(this._urlSuffix, {params: _params});
    }
    SearchPermissions(_params: IPickSearch<IVaiTro, "permissions">): AxiosResponseWrapper<IVaiTro[]> {
        return axiosInstance.get(this._urlSuffix + "/permissions", {params: _params});
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IVaiTro>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    GetVaiTro(_id: string): AxiosResponseWrapper<IVaiTro> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    GetPermissions(_id: string): AxiosResponseWrapper<IVaiTro> {
        return axiosInstance.get(this._urlSuffix + "/" + _id + "/permissions")
    }
    Create(_data: Partial<Omit<IVaiTro, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IVaiTro>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _params.data)
    }
}

export const vaiTroService= new VaiTroService()