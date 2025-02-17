import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_TrangThaiDanhGia extends IBaseExt {
    id: string,
    ten?: string,
    ma?: string,
    active?: boolean,
    laTrangThaiDonVi: boolean
}

export interface ISearchDanhMuc_TrangThaiDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_TrangThaiDanhGia, "ma" | "ten" | "laTrangThaiDonVi"> {
    maDanhMuc_TrangThaiDanhGia?: string;
    tuKhoa?: string;
}