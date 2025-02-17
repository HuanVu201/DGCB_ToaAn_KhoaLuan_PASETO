import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IChiTietDanhGia, ISearchDanhGiaCanBo } from "../../common/models";

class ChiTietDanhGiaDonViService extends Service.BaseApi implements Service.ICrud<IChiTietDanhGia> {
    constructor() {
        super("chitietdanhgiadonvis")
    }
    Search(_params: ISearchDanhGiaCanBo): AxiosResponseWrapper<IPaginationResponse<IChiTietDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IChiTietDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IChiTietDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IChiTietDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

    AddListChiTietDanhGia(_data: Partial<Omit<IChiTietDanhGia[], keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/AddListChiTietDanhGiaDonVi", { Data: _data })
    }

    UpdateListChiTietDanhGia(_data: Partial<Omit<IChiTietDanhGia[], keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateListChiTietDanhGiaDonVi", { Data: _data })
    }

}

export const ChiTietDanhGiaDonViServiceApi = new ChiTietDanhGiaDonViService()