import { IBaseExt, IPickSearch } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { BuocXuLyChucVu } from "../buocXuLyChucVu";
import { IBasePagination } from "../search";

export interface ChucVu extends IBaseExt {
    ten : string;
    ma : string;
    moTa : string;
    active : boolean;
    buocXuLys?: BuocXuLyChucVu[];
    tenCapDanhGia?: string
    maCapDanhGia?: string
}

export interface ISearchChucVu extends IBasePagination, IPickSearch<ChucVu, "ten" | "ma" | "id" | "tenCapDanhGia" | "maCapDanhGia">{

}