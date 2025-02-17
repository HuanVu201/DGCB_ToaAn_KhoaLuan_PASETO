import { IBaseExt, IPickSearch } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { CoCauToChuc } from "../cocautochuc";
import { DonViSuDungQuyTrinhXuLy } from "../donViSuDungQuyTrinhXuLy";
import { LienKetBuocXuLy } from "../lienKetBuocXuLy";
import { IBasePagination } from "../search";

export interface QuyTrinhXuLy extends IBaseExt {
    tenQuyTrinh : string;
    thuTu : number;
    laQuyTrinhDonVi : boolean;
    buocXuLys : BuocXuLy[];
    lienKetBuocXuLys : LienKetBuocXuLy[];
    donVis : DonViSuDungQuyTrinhXuLy[];
}

export interface SearchQuyTrinhXuLy extends IBasePagination, IPickSearch<QuyTrinhXuLy, "laQuyTrinhDonVi" | "tenQuyTrinh"> {
}