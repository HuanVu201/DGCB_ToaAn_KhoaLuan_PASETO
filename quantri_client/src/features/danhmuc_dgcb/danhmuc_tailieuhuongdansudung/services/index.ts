import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { IDanhmuc_TaiLieuHuongDanSuDung, ISearchDanhmuc_TaiLieuHuongDanSuDung } from "../models";

class Danhmuc_TaiLieuHuongDanSuDungService extends Service.BaseApi implements Service.ICrud<IDanhmuc_TaiLieuHuongDanSuDung> {
    constructor() {
        super("danhmuc_tailieuhuongdansudungs")
    }
    Search(_params: IPickSearch<IDanhmuc_TaiLieuHuongDanSuDung, "tenDanhMuc" | "code" | "type">): AxiosResponseWrapper<IPaginationResponse<IDanhmuc_TaiLieuHuongDanSuDung[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDanhmuc_TaiLieuHuongDanSuDung>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<IDanhmuc_TaiLieuHuongDanSuDung, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDanhmuc_TaiLieuHuongDanSuDung>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchDanhmuc_TaiLieuHuongDanSuDung): AxiosResponseWrapper<IPaginationResponse<IDanhmuc_TaiLieuHuongDanSuDung[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const danhmuc_TaiLieuHuongDanSuDungApi = new Danhmuc_TaiLieuHuongDanSuDungService()