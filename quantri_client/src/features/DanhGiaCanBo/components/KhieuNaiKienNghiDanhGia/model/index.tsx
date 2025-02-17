import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
import { PageNumberTypeAttributes } from "docx";
import { IDanhGiaCanBo } from "../../common/models";

export interface IKhieuNaiDanhGia extends IBaseExt, IDanhGiaCanBo {
    maPhieu: string
    lyDo?: string
    dinhKemKhieuNai?: string
    trangThai?: string
    maDonVi?: string
    maDonViCha?: string
    ketQua?: string
    dinhKemKetQua?: string
    thoiGianCapNhat?: string
    nguoiCapNhatKQId?: string
    createdOn?: string
    thoiDiemTuDanhGia?: string
    loaiThoiGian?: string
    thoiGian?: string
    // namDanhGia?: string
    hoVaTen?: string
    chucVu?: string
    tenPhongBan?: string
    tenDonVi?: string
    soLuongKhieuNai?: number

}

export interface IDanhGia_KhieuNai {
    maPhieu?: string
    hoVaTen?: string
    chucVu?: string
    tenDonVi?: string
    namDanhGia?: number
    loaiThoiGian?: string
    kyDanhGia?: string
    diemTuDanhGia?: number
    phanLoaiTuDanhGia?: string
    diemDanhGia?: number
    phanLoaiDanhGia?: string
    maDonVi?: string
    maDonViCha?: string
}

export interface ISearchKhieuNaiDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IKhieuNaiDanhGia> {
    maPhieu?: string
    lyDo?: string
    dinhKemKhieuNai?: string
    trangThai?: string
    maDonVi?: string
    maDonViCha?: string
    ketQua?: string
    dinhKemKetQua?: string
    thoiGianCapNhat?: string
    nguoiCapNhatKQId?: string
    getDataCurrentUser?: boolean
    filterByUserRole?: boolean
}
