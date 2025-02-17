import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IThongKeKhieuNai extends IBaseExt {
    ten: string,
    ma: string,
    maNganh: string,
    suDung?: boolean
}

export interface ISearchThongKeKhieuNai extends IBasePagination, IBaseSearch, IPickSearch<IThongKeKhieuNai, "ma" | "maNganh" | "ten"> {
    maThongKeKhieuNai?: string;
    tuKhoa?: string;
    maDonVi? : string;
}