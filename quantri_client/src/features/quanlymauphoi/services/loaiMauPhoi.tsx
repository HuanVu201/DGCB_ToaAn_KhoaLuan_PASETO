import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetUrlPhoi, IMauPhoi } from "../models/mauPhoi";
import { ILoaiMauPhoi, ISearchLoaiMauPhoi } from "../models/loaiMauPhoi";

class LoaiMauPhoiService extends Service.BaseApi implements Service.ICrud<ILoaiMauPhoi> {
    constructor() {
        super("loaimauphois")
    }
    Search(_params: ISearchLoaiMauPhoi): AxiosResponseWrapper<IPaginationResponse<ILoaiMauPhoi[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    
    Get(_id: string): AxiosResponseWrapper<IResult<ILoaiMauPhoi>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ILoaiMauPhoi, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILoaiMauPhoi>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const LoaiMauPhoiApi = new LoaiMauPhoiService()