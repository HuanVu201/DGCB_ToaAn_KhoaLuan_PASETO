import { Service } from "@/services";
import { IScreenAction, ISearchScreenAction } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";
import { IAction } from "@/features/action/models";

export type ISearchScreenActionCanBo = Omit<ISearchScreenAction, "screenId">

class ScreenActionService extends Service.BaseApi implements Omit<Service.ICrud<IScreenAction>, "Restore" | "Update">{
    constructor() {
        super("screenactions")
    }
    Search(_params: ISearchScreenAction): AxiosResponseWrapper<IPaginationResponse<IScreenAction[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params});
    }
    SearchCanBo(_params: ISearchScreenActionCanBo): AxiosResponseWrapper<IPaginationResponse<IScreenAction[]>> {
        return axiosInstance.get(this._urlSuffix + "/canbo", {params: _params});
    }
    SearchActionNotInScreen(params: Omit<ISearchScreenAction, "maScreen">): AxiosResponseWrapper<IPaginationResponse<IAction[]>> {
        return axiosInstance.get(this._urlSuffix + "/screen", {params});
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IScreenAction>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IScreenAction, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix,_data)
    }
    CreateRange(data: {screenActions: Pick<IScreenAction, "actionId" | "screenId">[]}): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    // Restore(_id: string): AxiosResponseWrapper {
    //     throw new Error("Method not implemented.");
    // }
    // Update(_params: IOmitUpdate<IScreenAction>): AxiosResponseWrapper {
    //     return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    // }
}

export const screenActionService= new ScreenActionService()