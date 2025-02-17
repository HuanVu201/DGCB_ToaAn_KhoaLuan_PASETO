import { IBaseExt, IPickSearch } from "../basemodel";
import { INhomNguoiDung } from "@/features/nhomnguoidung/models";
import { BuocXuLyChucDanh } from "../buocXuLyChucDanh";
import { BuocXuLyChucVu } from "../buocXuLyChucVu";
import { BuocXuLyNhomNguoiDung } from "../buocXuLyNhomNguoiDung";
import { QuyTrinhXuLy } from "../quytrinhxuly";
import { TrangThaiDanhGia } from "../trangThaiDanhGia";
import { IBasePagination } from "../search";
import { KeyObject } from "tls";
import { ChucDanh } from "../chucDanh";
import { ChucVu } from "../chucVu";
import { INguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models";
import { CoCauToChuc } from "../cocautochuc";
import { BuocXuLyGroup } from "../buocxulygroup";

export interface BuocXuLy extends IBaseExt {
    tenBuoc : string;
    laBuocDauTien : boolean;
    laBuocCuoiCung : boolean;
    cungDonVi : boolean;
    cungPhongBan : boolean;
    khongCoChucDanh : boolean;
    khongCoChucVu : boolean;
    layDonViCapTren : boolean;
    layNguoiQuanLy : boolean;
    quyTrinhXuLyId : string;
    trangThaiDanhGiaId : string;
    positionX : number;
    positionY : number;
    positionAbsoluteX : number;
    positionAbsoluteY : number;
    type : string;
    deletable : boolean;
    width : number;
    thoiHanXuLy : number;
    height : number;
    selected : boolean;
    dragging : boolean;
    sources : BuocXuLy;
    targets : BuocXuLy;
    buocXuLyChucDanhs?: BuocXuLyChucDanh[];
    buocXuLyChucVus?: BuocXuLyChucVu[];
    buocXuLyNhomNguoiDungs?: BuocXuLyNhomNguoiDung[];
    quyTrinhXuLy : QuyTrinhXuLy;
    trangThaiDanhGia : TrangThaiDanhGia;

    nhomNguoiDungs?: INhomNguoiDung[];
    chucDanhs?: ChucDanh[];
    chucVus?: ChucVu[];
    donVis?: BuocXuLyGroup[];
}

export interface SearchBuocXuLy extends IBasePagination, IPickSearch<BuocXuLy> {
}