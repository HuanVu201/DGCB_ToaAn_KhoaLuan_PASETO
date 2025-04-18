import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IShareDuLieuDanhGia,ISearchShareDuLieuDanhGia } from "../models";

class ShareDuLieuDanhGiaService extends Service.BaseApi implements Service.ICrud<IShareDuLieuDanhGia> {
    constructor() {
        super("sharedulieudanhgias")
    }
    Search(_params: ISearchShareDuLieuDanhGia): AxiosResponseWrapper<IPaginationResponse<IShareDuLieuDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IShareDuLieuDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IShareDuLieuDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IShareDuLieuDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    DeleteHaveLoaiDichVu(_params: ISoftDelete,LoaiDichVu:string): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
}

export const shareDuLieuDanhGiaApi = new ShareDuLieuDanhGiaService()