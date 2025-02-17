import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ChucDanh, ISearchChucDanh } from "@/models/chucDanh";
import { IThongKeKhieuNai } from "../models";

class ThongKeKhieuNaiService extends Service.BaseApi implements Service.ICrud<IThongKeKhieuNai> {
    constructor() {
        super("thongkekhieunais")
    }
    Search(_params: ISearchChucDanh): AxiosResponseWrapper<IPaginationResponse<IThongKeKhieuNai[]>> {
        return axiosInstance.post(this._urlSuffix + "/ThongKeKhieuNaiQuery",_params )
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IThongKeKhieuNai>> {
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
    GetDanhSachKhieuNaiDanhGiaTk(_params: ISearchChucDanh):AxiosResponseWrapper<IPaginationResponse<IThongKeKhieuNai[]>>{
        return axiosInstance.post(this._urlSuffix +"/GetDanhSachKhieuNaiDanhGiaTK",_params)
    }
}

export const thongKeKhieuNaiApi = new ThongKeKhieuNaiService()