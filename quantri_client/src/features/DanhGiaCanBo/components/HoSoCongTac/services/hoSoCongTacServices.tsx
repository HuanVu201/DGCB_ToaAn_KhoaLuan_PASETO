import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IHoSoCongTacDanhGia, ISearchHoSoCongTacDanhGia } from "../models";

class HoSoCongTacService extends Service.BaseApi implements Service.ICrud<IHoSoCongTacDanhGia> {
    constructor() {
        super("hosocongtacdanhgias")
    }
    Search(_params: ISearchHoSoCongTacDanhGia): AxiosResponseWrapper<IPaginationResponse<IHoSoCongTacDanhGia[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHoSoCongTacDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IHoSoCongTacDanhGia, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHoSoCongTacDanhGia>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

}

export const HoSoCongTacServiceApi = new HoSoCongTacService()