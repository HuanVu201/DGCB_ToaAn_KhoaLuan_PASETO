import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhMuc_ThongKeDanhGia, IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ, ISearchDanhMuc_ThongKeDanhGiaMau09, ISearchDanhMuc_ThongKeDanhGia, IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan } from "../models";

class DanhMuc_ThongKeDanhGiaService extends Service.BaseApi implements Service.ICrud<IDanhMuc_ThongKeDanhGia> {
    constructor() {
        super("danhmuc_thongkedanhgias")
    }
    Search(_params: IPickSearch<IDanhMuc_ThongKeDanhGia, "hoTen" | "thuTuPB" | "maNguoiDung">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/", { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhMuc_ThongKeDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }

    Create(_data: Partial<Omit<IDanhMuc_ThongKeDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhMuc_ThongKeDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhMuc_ThongKeDanhGia): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
    GetThongKeDanhGias(_params: ISearchDanhMuc_ThongKeDanhGia): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/bo-tieu-chuan/theo-loai-thoi-gian", { params: _params })
    }
    SearchThongKeDanhGia_XuatDanhGiaMau09(_params: IPickSearch<ISearchDanhMuc_ThongKeDanhGiaMau09, "hoTen">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/XuatDanhGiaMau09", { params: _params })
    }
    SearchThongKeDanhGia_DuLieuPhieuCQ(_params: IPickSearch<IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ, "hoVaTen">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[]>> {
        return axiosInstance.get(this._urlSuffix + "/DuLieuPhieuCQ", { params: _params })
    }
    SearchThongKeDanhGia_GetTongHopCaNhan(_params: IPickSearch<IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan, "xepLoai">): AxiosResponseWrapper<IPaginationResponse<IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan[]>> {
        return axiosInstance.get(this._urlSuffix + "/GetTongHopCaNhan", { params: _params })
    }
}
export const danhMuc_ThongKeDanhGiaApi = new DanhMuc_ThongKeDanhGiaService()