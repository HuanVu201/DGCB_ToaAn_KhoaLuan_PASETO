import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_BoTieuChuan, ISearchDanhMuc_BoTieuChuan } from "../models";

class DanhMuc_BoTieuChuanService extends Service.BaseApi implements Service.ICrud<IDanhMuc_BoTieuChuan> {
    constructor() {
        super("danhmuc_botieuchuans")
    }
    Search(_params: IPickSearch<IDanhMuc_BoTieuChuan, "tenBoTieuChi" | "maBoTieuChi" | "coQuanBanHanh" | "suDung">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_BoTieuChuan[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_BoTieuChuan>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }

    Create(_data: Partial<Omit<IDanhMuc_BoTieuChuan, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_BoTieuChuan>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_BoTieuChuan): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_BoTieuChuan[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
    GetBoTieuChuans(_params: ISearchDanhMuc_BoTieuChuan): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_BoTieuChuan[]>> {
        return axiosInstance.get(this._urlSuffix + "/bo-tieu-chuan/theo-loai-thoi-gian", { params: _params })
    }
}

export const danhMuc_BoTieuChuanApi = new DanhMuc_BoTieuChuanService()