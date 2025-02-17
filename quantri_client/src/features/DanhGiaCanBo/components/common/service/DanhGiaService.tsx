import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhGiaCanBo, IDuyetDanhGia, ISearchDanhGiaCanBo, ITraLaiThuHoiPhieuDanhGia, IUserDanhGia, IXoaDiemLanhDaoCham } from "../models";
import { IUrlPhieuDanhGia } from "../models/phieuDanhGia";

class DanhGiaCanBoService extends Service.BaseApi implements Service.ICrud<IDanhGiaCanBo> {
    constructor() {
        super("danhgias")
    }
    Search(_params: ISearchDanhGiaCanBo): AxiosResponseWrapper<IPaginationResponse<IDanhGiaCanBo[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhGiaCanBo>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    GetDanhGiaByMaPhieu(maPhieu: string): AxiosResponseWrapper<IResult<IDanhGiaCanBo>> {
        return axiosInstance.get(this._urlSuffix + "/GetDanhGiaByMaPhieu/" + maPhieu);
    }
    Create(_data: Partial<Omit<IDanhGiaCanBo, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhGiaCanBo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetCurrentUserDanhGia(): AxiosResponseWrapper<IResult<IUserDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/GetCurrentUserDanhGia");
    }
    DanhSachTruongDonVi(): AxiosResponseWrapper<IResult<IUserDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/DanhSachTruongDonVi");
    }
    GetPhieuDanhGia(_params: { _id: string, daXem?: number }): AxiosResponseWrapper<IResult<IDanhGiaCanBo>> {
        return axiosInstance.get(this._urlSuffix + "/GetPhieuDanhGia/" + (_params.daXem || -1) + '/' + _params._id);
    }
    XoaDiemLanhDaoCham(_params: IXoaDiemLanhDaoCham): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/XoaDiemLanhDaoCham/" + _params.danhGiaId, { data: _params })
    }
    ThuHoiPhieuDanhGia(_params: ITraLaiThuHoiPhieuDanhGia): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/ThuHoiPhieuDanhGia/" + _params.id, { tenBuocXuLy: _params.tenBuocXuLy })
    }
    TraLaiPhieuDanhGia(_params: ITraLaiThuHoiPhieuDanhGia): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/TraLaiPhieuDanhGia/" + _params.id, { tenBuocXuLy: _params.tenBuocXuLy })
    }
    DuyetDanhGia(_params: IDuyetDanhGia): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/DuyetDanhGia", _params)
    }
    XoaDanhGiaByListId(_params: { ids: string[] }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/XoaDanhGiaChon", _params)
    }
    KhoiPhucDanhGiaByListId(_params: { ids: string[] }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/KhoiPhucDanhGiaChon", _params)
    }
    GetUrlPhieuDanhGia(_params: { id: string }): AxiosResponseWrapper<IUrlPhieuDanhGia> {
        return axiosInstance.get(this._urlSuffix + "/UrlPhieuDanhGia", { params: _params })
    }
    UpdateUrlPhieuDanhGia(_params: IOmitUpdate<IUrlPhieuDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateUrlPhieuDanhGia/" + _params.id, _params.data)
    }
    UpdateDanhGiaWithoutBuocId(_params: IOmitUpdate<IDanhGiaCanBo>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateDanhGiaWithoutBuocId/" + _params.id, _params.data)
    }
}

export const danhGiaCanBoServiceApi = new DanhGiaCanBoService()