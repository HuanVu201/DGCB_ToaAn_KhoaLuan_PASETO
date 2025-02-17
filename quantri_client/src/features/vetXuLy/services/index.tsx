import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "../models";

class vetXuLyService extends Service.BaseApi {
    constructor() {
        super("vetxulydanhgias")
    }
    Search(_params: ISearchVetXuLyDanhGia): AxiosResponseWrapper<IPaginationResponse<IVetXuLyDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }

}

export const vetXuLyServiceApi = new vetXuLyService()