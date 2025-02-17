import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_ChucVu extends IBaseExt {
    ten: string,
    ma: string,
    moTa: string,
    active?: boolean
    maCapDanhGia?: string | undefined;
    tenCapDanhGia?: string | undefined;
}

export interface ISearchDanhMuc_ChucVu extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_ChucVu, "ma" | "ten"> {

}