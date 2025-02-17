import { IBaseExt, IPickSearch } from "../basemodel";
import { BuocXuLyChucDanh } from "../buocXuLyChucDanh";
import { ChucDanhMauPhieuDanhGia } from "../mauPhieuDanhGias";
import { IBasePagination } from "../search";

export interface ChucDanh extends IBaseExt {
    ten : string;
    ma : string;
    moTa ?: string;
    active : boolean;
    maCapDanhGia?: string;
    tenCapDanhGia?: string;
    buocXuLys?: BuocXuLyChucDanh[];
    mauPhieuDanhGias?: ChucDanhMauPhieuDanhGia[];
}

export interface ISearchChucDanh extends IBasePagination, IPickSearch<ChucDanh, "ten" | "ma" | "id" | "tenCapDanhGia" | "maCapDanhGia">{

}