import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IHistoryCallApiTichHop, ISearchHistoryCallApiTichHop } from "../models";

class HistoryCallApiTichHopService extends Service.BaseApi implements Service.ICrud<IHistoryCallApiTichHop> {
    constructor() {
        super("historycallapitichhops")
    }
    Search(_params: IPickSearch<IHistoryCallApiTichHop, "tenDanhMuc" | "code" | "type">): AxiosResponseWrapper<IPaginationResponse<IHistoryCallApiTichHop[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IHistoryCallApiTichHop>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IHistoryCallApiTichHop, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IHistoryCallApiTichHop>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchHistoryCallApiTichHop): AxiosResponseWrapper<IPaginationResponse<IHistoryCallApiTichHop[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const historyCallApiTichHopApi = new HistoryCallApiTichHopService()