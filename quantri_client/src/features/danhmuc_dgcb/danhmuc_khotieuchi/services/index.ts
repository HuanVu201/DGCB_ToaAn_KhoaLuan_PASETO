import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_KhoTieuChi, ISearchDanhMuc_KhoTieuChi } from "../models";

class DanhMuc_KhoTieuChiService extends Service.BaseApi implements Service.ICrud<IDanhMuc_KhoTieuChi> {
    constructor() {
        super("danhmuc_khotieuchis")
    }
    Search(_params: IPickSearch<IDanhMuc_KhoTieuChi, "maTieuChi" | "tenTieuChi" | "suDung">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_KhoTieuChi[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_KhoTieuChi>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_KhoTieuChi, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_KhoTieuChi>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_KhoTieuChi): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_KhoTieuChi[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhMuc_KhoTieuChiApi = new DanhMuc_KhoTieuChiService()