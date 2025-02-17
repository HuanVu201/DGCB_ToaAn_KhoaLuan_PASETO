import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_CongViecChuyenMon, ISearchDanhMuc_CongViecChuyenMon } from "../models";

class DanhMuc_CongViecChuyenMonService extends Service.BaseApi implements Service.ICrud<IDanhMuc_CongViecChuyenMon> {
    constructor() {
        super("danhmuc_congviecchuyenmons")
    }
    Search(_params: IPickSearch<IDanhMuc_CongViecChuyenMon, "tenDanhMuc" | "code" | "type">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_CongViecChuyenMon[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_CongViecChuyenMon>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_CongViecChuyenMon, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_CongViecChuyenMon>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_CongViecChuyenMon): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_CongViecChuyenMon[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhMuc_CongViecChuyenMonApi = new DanhMuc_CongViecChuyenMonService()