import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import { QuyTrinhXuLy } from "@/models/quytrinhxuly";
import { Service } from "@/services";
import { AddQuyTrinhXuLyRequest, AddReactFlowQuyTrinhCommand, GetReactFlowQuyTrinhXuLyQuery, ReactFlowQuyTrinhXuLyDto, UpdateReactFlowQuyTrinhCommand } from "./params";
import { BuocXuLy } from "@/models/buocXuLy";

class QuyTrinhXuLyService extends Service.BaseApi implements Service.ICrud<QuyTrinhXuLy>{

    constructor(){
        super("quytrinhxulys")
    }

    Search(_params: IPickSearch<QuyTrinhXuLy>): AxiosResponseWrapper<IPaginationResponse<QuyTrinhXuLy[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<QuyTrinhXuLy>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: AddQuyTrinhXuLyRequest): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(params: ISoftDelete): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + params.id, {data: {forceDelete: params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<QuyTrinhXuLy>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetFlow(params: GetReactFlowQuyTrinhXuLyQuery ): AxiosResponseWrapper<IResult<ReactFlowQuyTrinhXuLyDto>> {
        return axiosInstance.get(this._urlSuffix + "/GetFlow/" + params.id);
    }
    AddFlow(_data: AddReactFlowQuyTrinhCommand): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/AddFlow", _data)
    }
    UpdateFlow(_params: UpdateReactFlowQuyTrinhCommand): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/UpdateFlow", _params)
    }
}
export const quyTrinhXuLyApi = new QuyTrinhXuLyService();
