import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IBaseExt, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IMenu } from "../models";

class MenuService extends Service.BaseApi implements Service.ICrud<IMenu>{
   constructor(){
    super("menus");
   }
    Search(_params: IPickSearch<IMenu, "tenMenu">): AxiosResponseWrapper<IPaginationResponse<IMenu[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IMenu>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<IMenu, keyof IBaseExt<string>>>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IMenu>): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
   
}

export const MenuApi = new MenuService()