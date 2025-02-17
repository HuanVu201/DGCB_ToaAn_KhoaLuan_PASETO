import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "../models";

class vetXuLyDanhGiaDonViService extends Service.BaseApi {
    constructor() {
        super("vetxulydanhgiatochucs")
    }
    Search(_params: ISearchVetXuLyDanhGia): AxiosResponseWrapper<IPaginationResponse<IVetXuLyDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }

}

export const vetXuLyDanhGiaDonViServiceApi = new vetXuLyDanhGiaDonViService()