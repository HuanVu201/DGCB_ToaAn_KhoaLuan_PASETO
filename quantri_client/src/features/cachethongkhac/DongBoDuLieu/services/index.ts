import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDongBoDuLieu, ISearchDongBoDuLieu } from "../models";

class DongBoDuLieuService extends Service.BaseApi implements Service.ICrud<IDongBoDuLieu> {
    constructor() {
        super("dongbodulieus")
    }
    Search(_params: IPickSearch<IDongBoDuLieu, "tenDanhMuc" | "code" | "type">): AxiosResponseWrapper<IPaginationResponse<IDongBoDuLieu[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDongBoDuLieu>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDongBoDuLieu, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDongBoDuLieu>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDongBoDuLieu): AxiosResponseWrapper<IPaginationResponse<IDongBoDuLieu[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const DongBoDuLieuApi = new DongBoDuLieuService()