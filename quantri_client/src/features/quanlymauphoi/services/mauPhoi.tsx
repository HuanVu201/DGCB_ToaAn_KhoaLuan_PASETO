import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetUrlPhoi, IMauPhoi } from "../models/mauPhoi";

class MauPhoiService extends Service.BaseApi implements Service.ICrud<IMauPhoi> {
    constructor() {
        super("mauphois")
    }
    Search(_params: IPickSearch<IMauPhoi, "maMauPhoi" | "tenMauPhoi" | "maDonVi"| "laPhoiMacDinh">): AxiosResponseWrapper<IPaginationResponse<IMauPhoi[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    GetUrlPhoi(_params: IGetUrlPhoi): AxiosResponseWrapper<string> {
        return axiosInstance.get(this._urlSuffix + "/urlmauphoi", { params: _params })
    }
    GetUrlPhoiDefault(_params: IGetUrlPhoi): AxiosResponseWrapper<string> {
        return axiosInstance.get(this._urlSuffix + "/urlMauPhoiDefault", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IMauPhoi>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IMauPhoi, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IMauPhoi>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const MauPhoiApi = new MauPhoiService()