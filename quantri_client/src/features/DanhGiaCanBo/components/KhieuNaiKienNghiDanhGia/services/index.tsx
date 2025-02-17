import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IKhieuNaiDanhGia, ISearchKhieuNaiDanhGia } from "../model";

class KhieuNaiDanhGiaService extends Service.BaseApi implements Service.ICrud<IKhieuNaiDanhGia> {
    constructor() {
        super("khieunaidanhgias")
    }
    Search(_params: ISearchKhieuNaiDanhGia): AxiosResponseWrapper<IPaginationResponse<IKhieuNaiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IKhieuNaiDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IKhieuNaiDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IKhieuNaiDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GuiCapTren(_params: { ids: string[] }): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/GuiCapTren", _params)
    }
}

export const KhieuNaiDanhGiaServiceApi = new KhieuNaiDanhGiaService()