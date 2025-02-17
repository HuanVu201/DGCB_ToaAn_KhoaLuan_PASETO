import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IResult } from "@/models";
import { Service } from "@/services";
import { Stream } from "node:stream";
import { IUrlPhieuDanhGia } from "../DanhGiaCanBo/components/common/models/phieuDanhGia";
import { ISearchDanhGiaCanBo } from "../DanhGiaCanBo/components/common/models";

class ExportDataService extends Service.BaseApi {
    constructor() {
        super("exportDatas")
    }

    ExportPhieuDanhGiaCaNhan(_params: { danhGiaId: string, refresh?: boolean }): AxiosResponseWrapper<IResult<IUrlPhieuDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/ExportPhieuDanhGiaCaNhan", { params: _params })
    }

    ExportPhieuDanhGiaDonVi(_params: { danhGiaId: string, refresh?: boolean }): AxiosResponseWrapper<IResult<IUrlPhieuDanhGia>> {
        return axiosInstance.get(this._urlSuffix + "/ExportPhieuDanhGiaDonVi", { params: _params })
    }

    ExportExcelDanhGiaCaNhan(_params: ISearchDanhGiaCanBo): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.get(this._urlSuffix + "/ExportExcelDanhGiaCaNhan", { params: _params })
    }

    ExportExcelDanhGiaDonVi(_params: ISearchDanhGiaCanBo): AxiosResponseWrapper<IResult<string>> {
        return axiosInstance.get(this._urlSuffix + "/ExportExcelDanhGiaDonVi", { params: _params })
    }
}

export const exportDataServiceApi = new ExportDataService()