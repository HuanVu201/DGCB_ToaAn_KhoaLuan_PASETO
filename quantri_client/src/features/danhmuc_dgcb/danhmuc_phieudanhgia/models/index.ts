import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_PhieuDanhGia extends IBaseExt {
    levelBoTieuChi?: string;
    ten?: string;
    ma?: string;
    diemDatYeuCau?: number | null;
    diemThuong?: number | null;
    diemTru?: number | null;
    xepLoai?: string;
    maCapDanhGia?: string;
    capDanhGia?: string;
    maDonViDanhGia?: string;
    donViDanhGia?: string;
    maChucVuDanhGia?: string;
    tenChucVuDanhGia?: string;
    maChucDanhDanhGia?: string;
    tenChucDanhDanhGia?: string;
    maCaNhanDanhGia?: string;
    caNhanDanhGia?: string;
    maBoTieuChi?: string;
    jsonDanhGia?: string;
    danhSachPhanLoaiDanhGia: string;
    suDung: boolean;
}

export interface ISearchDanhMuc_PhieuDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_PhieuDanhGia, "ma" | "ten" | "diemDatYeuCau"> {
    maBoTieuChuan?: string
    truongDonViUserGroupId? : string // dành cho đánh giá thủ trưởng đơn vị
    maDonVi?: string
    loaiThoiGian? : string
}
export interface ISearchDanhMuc_PhieuDanhGiaHistory extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_PhieuDanhGiaHistory, "tableName" > {
    mauPhieuDanhGiaId?: string
}
export interface IDanhMuc_PhieuDanhGiaHistory extends IBaseExt{
    id: string;
    userId: string;
    type?: string;
    tableName?:string;
    dateTime?: string;
    oldValues?:string;
    newValues?: string;
    primaryKey?: string;
    tenantId?: string;
    userFullName?: string;
    userUserName?: string;
}