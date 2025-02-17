import { IBaseExt, IPickSearch } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { CoCauToChuc } from "../cocautochuc";
import { DanhSachNhomDonVis } from "../danhSachNhomDonVi";
import { LienKetBuocXuLy } from "../lienKetBuocXuLy";
import { IBasePagination } from "../search";

export interface NhomDonVi extends IBaseExt {
    tenNhom : string;
    moTa?: string;
    danhSachNhomDonVis : DanhSachNhomDonVis[];
}

export interface SearchNhomDonVi extends IBasePagination, IPickSearch<NhomDonVi, "tenNhom"> {
}