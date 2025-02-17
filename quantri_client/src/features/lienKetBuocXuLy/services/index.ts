import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { Node } from "reactflow"
import { IBuocXuLyTiep, LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";
import { UpdateLienKetBuocXuLyCommand } from "./params";

class LienKetBuocXuLyService extends Service.BaseApi implements Omit<Service.ICrud<LienKetBuocXuLy>, "Get">{
    constructor(){
        super("lienketbuocxulys")
    }
    Search(_params: IPickSearch<LienKetBuocXuLy, "label">): AxiosResponseWrapper<IPaginationResponse<LienKetBuocXuLy[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<Node<LienKetBuocXuLy>>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<LienKetBuocXuLy, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: UpdateLienKetBuocXuLyCommand): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params)
    }
    
    SearchDanhSachBuocXuLyTiep(params: {sourceId: string}): AxiosResponseWrapper<IResult<IBuocXuLyTiep[]>> {
        return axiosInstance.post(this._urlSuffix + "/DanhSachBuocXuLyTiep", params)
    }
}

export const LienKetbuocXuLyApi = new LienKetBuocXuLyService()