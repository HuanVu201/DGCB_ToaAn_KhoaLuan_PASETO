import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IBaseExt, IOmitUpdate, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ICopyTieuChiDanhGiaTuKho, ITieuChiDanhGia } from "../models";

class TieuChiDanhGiaService extends Service.BaseApi implements Service.ICrud<ITieuChiDanhGia>{
   constructor(){
    super("tieuchidanhgias");
   }
    Search(_params: IPickSearch<ITieuChiDanhGia, "tenTieuChiDanhGia">): AxiosResponseWrapper<IPaginationResponse<ITieuChiDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITieuChiDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<ITieuChiDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITieuChiDanhGia>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    UpdateOld(_params: IOmitUpdate<ITieuChiDanhGia>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/old/" + _params.id, _params.data)
    }
    DeleteOld(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/old/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    CopyTieuChiDanhGiaTuKho(_params: ICopyTieuChiDanhGiaTuKho): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/copytieuchidanhgiatukho", _params)
    }
}

export const TieuChiDanhGiaApi = new TieuChiDanhGiaService()