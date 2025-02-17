
import { IDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/models";
import { IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { ChucDanh } from "../chucDanh";
import { QuyTrinhXuLy } from "../quytrinhxuly";

export interface ChucDanhMauPhieuDanhGia extends IBaseExt {
    chucDanhId : string;
    mauPhieuDanhGiaId : string;
    ChucDanh : ChucDanh;
    MauPhieuDanhGia: IDanhMuc_PhieuDanhGia
}
