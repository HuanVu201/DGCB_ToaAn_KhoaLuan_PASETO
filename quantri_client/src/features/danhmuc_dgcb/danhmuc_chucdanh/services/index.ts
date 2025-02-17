import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ChucDanh, ISearchChucDanh } from "@/models/chucDanh";
import { ChucDanhMauPhieuDanhGia } from "@/models/mauPhieuDanhGias";
import { IDanhMuc_PhieuDanhGia } from "../../danhmuc_phieudanhgia/models";

class DanhMuc_ChucDanhService extends Service.BaseApi implements Service.ICrud<ChucDanh> {
    constructor() {
        super("danhmuc_chucdanhs")
    }
    Search(_params: ISearchChucDanh): AxiosResponseWrapper<IPaginationResponse<ChucDanh[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ChucDanh>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ChucDanh, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ChucDanh>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchChucDanh): AxiosResponseWrapper<IPaginationResponse<ChucDanh[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
    MauPhieuDanhGias(id: string) :AxiosResponseWrapper<IResult<IDanhMuc_PhieuDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix + "/MauPhieuDanhGias/" + id)
    }
}

export const danhMuc_ChucDanhApi = new DanhMuc_ChucDanhService()