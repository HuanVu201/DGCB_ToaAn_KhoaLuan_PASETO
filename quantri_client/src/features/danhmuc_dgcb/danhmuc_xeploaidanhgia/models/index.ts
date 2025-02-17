import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_XepLoaiDanhGia extends IBaseExt {
    ten: string,
    ma: string,
    diemToiThieu: string,
    diemToiDa: number,
    active?: boolean
    maBoTieuChi?:string,
    tenBoTieuChi?:string,
}

export interface ISearchDanhMuc_XepLoaiDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_XepLoaiDanhGia, "ten" | "ma" | "maBoTieuChi"> {
    maBoTieuChi?:string,
}