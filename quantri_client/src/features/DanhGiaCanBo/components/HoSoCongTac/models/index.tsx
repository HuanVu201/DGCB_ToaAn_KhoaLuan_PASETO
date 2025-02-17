import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IHoSoCongTacDanhGia extends IBaseExt {
    danhGiaId?: string
    tenHoSo?: string
    tenDonVi?: string
    maDonVi?: string
    dkBanKiemDiem?: string
    dkBanNhanXetCapUy?: string
    dkBienBanHoiNghiKiemDiem?: string
    dkKetQuaThamDinhCuaCoQuanThamMuu?: string
    dkKetLuanDanhGiaXepLoai?: string
    dkVanBanGoiYKiemDiem?: string
    dkVanBanThamGiaGopY?: string
    dkHoSoGiaiQuyetKhieuNaiKienNghi?: string
    dkCacVanBanKhac?: string
   
}

export interface ISearchHoSoCongTacDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IHoSoCongTacDanhGia> {
    tenHoSo?: string
    tenDonVi?: string
    maDonVi?: string
    loaiThoiGian?: string
    loaiKetQua?: string
    maNguoiDanhGia?: string
    nguoiDanhGia?: string
    maDonViTongHop?: string
    donViTongHop?: string
    thoiGian?: string
    namDanhGia?: string
}
