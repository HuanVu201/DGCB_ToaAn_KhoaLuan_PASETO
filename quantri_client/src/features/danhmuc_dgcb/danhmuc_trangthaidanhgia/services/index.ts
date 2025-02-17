import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_TrangThaiDanhGia, ISearchDanhMuc_TrangThaiDanhGia } from "../models";

class DanhMuc_TrangThaiDanhGiaService extends Service.BaseApi implements Service.ICrud<IDanhMuc_TrangThaiDanhGia> {
    constructor() {
        super("danhmuc_trangthaidanhgias")
    }
    Search(_params: IPickSearch<IDanhMuc_TrangThaiDanhGia, "ten" | "ma" >): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_TrangThaiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_TrangThaiDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_TrangThaiDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_TrangThaiDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_TrangThaiDanhGia): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_TrangThaiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhMuc_TrangThaiDanhGiaApi = new DanhMuc_TrangThaiDanhGiaService()