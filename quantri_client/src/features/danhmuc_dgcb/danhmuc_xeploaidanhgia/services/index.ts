import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_XepLoaiDanhGia, ISearchDanhMuc_XepLoaiDanhGia } from "../models";

class DanhMuc_XepLoaiDanhGiaService extends Service.BaseApi implements Service.ICrud<IDanhMuc_XepLoaiDanhGia> {
    constructor() {
        super("danhmuc_xeploaidanhgias")
    }
    Search(_params: IPickSearch<IDanhMuc_XepLoaiDanhGia, "ten" | "ma" | "active">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_XepLoaiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_XepLoaiDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_XepLoaiDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_XepLoaiDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_XepLoaiDanhGia): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_XepLoaiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhMuc_XepLoaiDanhGiaApi = new DanhMuc_XepLoaiDanhGiaService()