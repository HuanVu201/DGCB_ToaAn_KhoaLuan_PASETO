import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IGiaHanDanhGia, ISearchGiaHanDanhGia } from "../models";


class GiaHanDanhGiaService extends Service.BaseApi implements Service.ICrud<IGiaHanDanhGia> {
    constructor() {
        super("giahandanhgias")
    }
    Search(_params: ISearchGiaHanDanhGia): AxiosResponseWrapper<IPaginationResponse<IGiaHanDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IGiaHanDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IGiaHanDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IGiaHanDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GuiCapTren(_params: { ids: string[] }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/GuiCapTren", _params)
    }

    DuyetGiaHanDanhGia(_params: { ids: string[], noiDung: string }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/DuyetGiaHanDanhGia", _params)
    }
}

export const GiaHanDanhGiaServiceApi = new GiaHanDanhGiaService()