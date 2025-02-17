import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export const TIEUCHIDANHGIAMODULES = {
    "dvc": "Hệ thống một cửa điện tử",
    "portaldvc_admin": "Quản trị cổng DVC",
    "admin": "Quản trị hệ thống",
    "admin_tthc": "Quản trị kết quả TTHC điện tử",
} as const

export type TIEUCHIDANHGIAMODULE = keyof typeof TIEUCHIDANHGIAMODULES

export interface ITieuChiDanhGia extends IBaseExt{
    tenTieuChiDanhGia: string;
    parentId?: string;
    parentCode?: string;
    thuTuTieuChiDanhGia: number;
    active?: boolean;
    module: TIEUCHIDANHGIAMODULE;
    fullPath: string;
    iconName?: string;
    permission?: string;
    isTopTieuChiDanhGia: boolean;
    
    ///

    maTieuChi: string;
    maDayDu: string;
    tenTieuChi: string;
    suDung: boolean;
    diemTru?: boolean;
    thuTu?: number;
    thuTuHienThi?: number;
    thangDiem?: string;
    ghiChu?: string;
    maMauPhieuDanhGia?: string;
    maDonVi?: string;
    diemThuong?: boolean;
    diemLiet?: boolean;
    tieuChiLienKet?: boolean;
    duocChamNhieuLan?: boolean;
    kiemNhiem?: boolean;
    sTT?: string;
    donViTinh?: string;
    jsonLienKet?: string;
    jsonDiemLiet?: string;
    soLan?: number;
    maKhoTieuChi?: string;
    data? : string;
    stt?: string;
    titleTree?: string;
}

export interface ISearchTieuChiDanhGia extends IBasePagination, IPickSearch<ITieuChiDanhGia, "tenTieuChiDanhGia" | "active" | "module">{
    filterByUserRole?: boolean
    loaiThoiGian?:string
}
export interface ITieuChiDoiLap{
    // maTieuChi: string;
    // maDayDu: string;
    // tenTieuChi: string;
    // maMauPhieuDanhGia?: string;
    Ma: string ;
    Ten: string;
    TenCha: string;
}
export interface IDiemLiet{
    Ma: string ;
    Ten: string;
    TenCha: string;
    SoLan: string;
}
export interface ICopyTieuChiDanhGiaTuKho extends IBaseExt{
    id: string;
    fullCode : string;
    maMauPhieuDanhGia? : string;
    parrentFullCode? : string;
}