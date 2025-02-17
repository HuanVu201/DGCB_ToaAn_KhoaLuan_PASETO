import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_ChucDanh extends IBaseExt {
    ten: string,
    ma: string,
    maNganh: string,
    suDung?: boolean
}

export interface ISearchDanhMuc_ChucDanh extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_ChucDanh, "ma" | "maNganh" | "ten"> {
    maDanhMuc_ChucDanh?: string;
    tuKhoa?: string;
}