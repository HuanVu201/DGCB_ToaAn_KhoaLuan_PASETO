import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IPermisstion, IRoleClaim, IRoles, ISearchRoles, IUpdateRoleClaim } from "../models";

class RolesService extends Service.BaseApi implements Service.ICrud<IRoles> {
    constructor() {
        super("roles",'/api/')
    }
    Search(_params: IPickSearch<IRoles>): AxiosResponseWrapper<IPaginationResponse<IRoles[]>> {
        return axiosInstance.get(this._urlSuffix +"/search", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IRoles>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IRoles, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IRoles>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetAll(): AxiosResponseWrapper<IResult<IRoles>> {
        return axiosInstance.get(this._urlSuffix);
    }
    GetPermissionOfRole(_id: string): AxiosResponseWrapper<IRoles> {
        return axiosInstance.get(this._urlSuffix + "/" + _id+"/permissions");
    }
    GetRoleClaimDistinct(_id: string): AxiosResponseWrapper<IRoleClaim[]> {
        return axiosInstance.get(this._urlSuffix + "/roleclaim/distinct");
    }
    UpdateRoleClaimDistinct(_params:IUpdateRoleClaim): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/update/roleclaim/distinct",_params)
    }
}

export const RolesApi = new RolesService()