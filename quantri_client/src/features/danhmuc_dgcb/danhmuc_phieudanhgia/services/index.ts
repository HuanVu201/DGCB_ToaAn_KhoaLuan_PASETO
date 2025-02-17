import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_PhieuDanhGia, IDanhMuc_PhieuDanhGiaHistory, ISearchDanhMuc_PhieuDanhGia, ISearchDanhMuc_PhieuDanhGiaHistory } from "../models";

class DanhMuc_PhieuDanhGiaService extends Service.BaseApi implements Service.ICrud<IDanhMuc_PhieuDanhGia> {
    constructor() {
        super("danhmuc_phieudanhgias")
    }
    Search(_params: IPickSearch<IDanhMuc_PhieuDanhGia, "ten" | "ma" | "diemDatYeuCau">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_PhieuDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_PhieuDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhMuc_PhieuDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_PhieuDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_PhieuDanhGia): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_PhieuDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
    SearchMauPhieusByUserAndBoTieuChuan(_params: ISearchDanhMuc_PhieuDanhGia): AxiosResponseWrapper<IResult<IPaginationResponse<IDanhMuc_PhieuDanhGia[]>>> {
        return axiosInstance.get(this._urlSuffix + "/GetListByUserAndBoTieuChuan", { params: _params })
    }
    SearchMauPhieuHistory(_params: ISearchDanhMuc_PhieuDanhGiaHistory): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_PhieuDanhGiaHistory[]>> {
        return axiosInstance.get(this._urlSuffix + "/Gethistorymauphieudanhgia", { params: _params })
    }
}

export const danhMuc_PhieuDanhGiaApi = new DanhMuc_PhieuDanhGiaService()