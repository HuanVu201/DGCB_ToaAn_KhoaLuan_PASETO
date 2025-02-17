import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { BuocXuLy } from "@/models/buocXuLy";
import { AddBuocXuLyCommand, GetBuocXuLyQuery, UpdateBuocXuLyCommand } from "./params";
import { Node } from "reactflow"

class BuocXuLyService extends Service.BaseApi implements Omit<Service.ICrud<BuocXuLy>, "Get"> {
    constructor() {
        super("buocxulys")
    }
    Search(_params: IPickSearch<BuocXuLy, "tenBuoc">): AxiosResponseWrapper<IPaginationResponse<BuocXuLy[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(params: GetBuocXuLyQuery): AxiosResponseWrapper<IResult<Node<BuocXuLy>>> {
        return axiosInstance.get(this._urlSuffix + "/" + params.id, { params: params });
    }
    GetBuocHienTai(params: { loaiBuoc: "START" | "END", laQuyTrinhDonVi?: boolean }): AxiosResponseWrapper<IResult<BuocXuLy>> {
        return axiosInstance.get(this._urlSuffix + "/GetBuocHienTai", { params });
    }
    Create(_data: AddBuocXuLyCommand): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: UpdateBuocXuLyCommand): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params)
    }
}

export const buocXuLyApi = new BuocXuLyService()