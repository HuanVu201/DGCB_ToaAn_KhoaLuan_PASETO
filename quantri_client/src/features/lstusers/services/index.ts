import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ILstUsers, ISearchLstUsers} from "../models";

class LstUsersService extends Service.BaseApi implements Service.ICrud<ILstUsers> {
    constructor() {
        super("lstusers")
    }
    Search(_params: IPickSearch<ILstUsers, "tenBoTieuChi" | "maBoTieuChi" | "coQuanBanHanh">): AxiosResponseWrapper<IPaginationResponse<ILstUsers[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILstUsers>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILstUsers, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILstUsers>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchListAUGOfGroupQuery(_params: ISearchLstUsers): AxiosResponseWrapper<IPaginationResponse<ILstUsers[]>> {
        return axiosInstance.get(this._urlSuffix + "/searchlistaugofgroupquery", { params: _params })
    }
    SearchListAUGNotPermissionDanhGia(_params: ISearchLstUsers): AxiosResponseWrapper<IPaginationResponse<ILstUsers[]>> {
        return axiosInstance.get(this._urlSuffix + "/searchlistaugnotpermissiondanhgia", { params: _params })
    }
    SearchListAUGNotPermission(_params: ISearchLstUsers): AxiosResponseWrapper<IPaginationResponse<ILstUsers[]>> {
        return axiosInstance.get(this._urlSuffix + "/searchlistaugnotpermission", { params: _params })
    }
    SearchUserNotBuocXuLy(_params: ISearchLstUsers): AxiosResponseWrapper<IPaginationResponse<ILstUsers[]>> {
        return axiosInstance.get(this._urlSuffix + "/searchUserNotBuocXuLy", { params: _params })
    }
}
export const lstUsersApi = new LstUsersService()