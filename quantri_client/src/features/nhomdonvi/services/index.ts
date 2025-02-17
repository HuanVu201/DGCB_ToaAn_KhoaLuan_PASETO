import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import { Service } from "@/services";
import { NhomDonVi } from "@/models/nhomDonVi";
import { AddNhomDonViRequest } from "./params";

class NhomDonViService extends Service.BaseApi implements Service.ICrud<NhomDonVi>{

    constructor(){
        super("nhomdonvis")
    }

    Search(_params: IPickSearch<NhomDonVi>): AxiosResponseWrapper<IPaginationResponse<NhomDonVi[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<NhomDonVi>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: AddNhomDonViRequest): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(params: ISoftDelete): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.delete(this._urlSuffix + "/" + params.id, {data: {forceDelete: params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<NhomDonVi>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}
export const NhomDonViApi = new NhomDonViService();
