import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IBaseExt, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ICauHinhHeThong } from "../models";

class CauHinhHeThongService extends Service.BaseApi implements Service.ICrud<ICauHinhHeThong>{
   constructor(){
    super("cauhinhhethongs");
   }
    Search(_params: IPickSearch<ICauHinhHeThong, "ten">): AxiosResponseWrapper<IPaginationResponse<ICauHinhHeThong[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ICauHinhHeThong>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<ICauHinhHeThong, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ICauHinhHeThong>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
   
   
}

export const CauHinhHeThongApi = new CauHinhHeThongService()