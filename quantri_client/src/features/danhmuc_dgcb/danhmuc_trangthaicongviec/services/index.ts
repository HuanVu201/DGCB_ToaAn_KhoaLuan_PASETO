import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_TrangThaiCongViec, ISearchDanhMuc_TrangThaiCongViec } from "../models";

class DanhMuc_TrangThaiCongViecService extends Service.BaseApi implements Service.ICrud<IDanhMuc_TrangThaiCongViec> {
    constructor() {
        super("danhmuc_trangthaicongviecs")
    }
    Search(_params: IPickSearch<IDanhMuc_TrangThaiCongViec, "tenDanhMuc" | "code" | "type">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_TrangThaiCongViec[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_TrangThaiCongViec>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_TrangThaiCongViec, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_TrangThaiCongViec>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_TrangThaiCongViec): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_TrangThaiCongViec[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhMuc_TrangThaiCongViecApi = new DanhMuc_TrangThaiCongViecService()