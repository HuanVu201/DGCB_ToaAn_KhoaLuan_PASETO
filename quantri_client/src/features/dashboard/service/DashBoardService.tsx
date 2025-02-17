import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { Service } from "@/services";
import { ISearchDanhGiaCanBo,IDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { IGetDanhSachDanhGia, GetGroupChild, GetThongKeDonVi, IDasshBoards, IGetNhacViec, IUserResponeOfGetDanhSach } from "../models";

class DashBoardsService extends Service.BaseApi implements Service.ICrud<IDanhGiaCanBo> {
    constructor() {
        super("dashboards")
    }
    Search(_params: IPickSearch<IDasshBoards, "tenBoTieuChi" | "maBoTieuChi" | "coQuanBanHanh">): AxiosResponseWrapper<IPaginationResponse<IDasshBoards[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<IDasshBoards>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }

    Create(_data: Partial<Omit<IDasshBoards, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IDasshBoards>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    GetDanhSachDanhGia(_params:IGetNhacViec): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/GetDanhSachDanhGia", _params)
    }
    GetNhacViec(_params: IGetNhacViec): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/GetNhacViec", _params)
    }
    GetThongKeDonVi(_params: GetThongKeDonVi): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/getthongketheodonvi", _params)
    }
    GetGroupChild(_params: GetGroupChild): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/GetGroupChild", _params)
    }
    GetThongKeDonViNotChild(_params: GetThongKeDonVi): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/getthongketheodonvi", _params)
    }
    GetDanhSachUserDanhGia(_params: IGetDanhSachDanhGia): AxiosResponseWrapper<IPaginationResponse<IUserResponeOfGetDanhSach[]>> {
        return axiosInstance.post(this._urlSuffix + "/GetDanhSachDanhGia", _params)
    }
    // SearchTheoDonVi(_params: ISearchDanhMuc_ChucVu): AxiosResponseWrapper<IPaginationResponse<IUserResponeOfGetDanhSach[]>> {
    //     return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    // }
}

export const DashBoardServiceApi = new DashBoardsService()

