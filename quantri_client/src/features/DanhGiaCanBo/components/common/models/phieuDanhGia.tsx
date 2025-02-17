import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";


export interface IDanhGia extends IBaseExt {
    maPhieu?: string,
    boTieuChuan?: string
    loaiDanhGia?: string,
    chiTietDiemDanhGia?: number,
    hoVaTen?: string,
    taiKhoan?: string,
    maNguoiDung?: string,
    chucVu?: string,
    congChucXepLoai?: string
    chucDanh?: string,
    tenPhongBan?: string,
    maPhongBan?: string,
    tenDonVi?: string,
    maDonVi?: string,
    trangThai?: string,
    phanLoaiTuDanhGia?: string,
    phanLoaiDanhGia?: string,
    phanLoaiNhanXet?: string,
    diemDanhGia?: string,
    diemTuDanhGia?: string,
    diemNhanXet?: string,
    diemThamMuu?: string,
    diemLanhDaoDanhGia?: string,
    phanLoaiThamMuu?: string,
    phanLoaiLanhDaoDanhGia?: string,
    namDanhGia?: string,
    thoiGianTao?: string,
    thoiGianNhanXet?: string,
    thoiGianDanhGia?: string,
    thoiGianHDDanhGia?: string,
    thoiGianThamMuu?: string,
    truongDonVi?: string,
    suDung?: string,
    maDonViCha?: string,
    lyDoThayDoiXepLoai?: string,
    yKienLanhDao?: string,
    yKienTuDanhGia?: string,
    yKienNhanXet?: string,
    yKienThamMuu?: string,
    ykienDanhGia?: string,
    fileDinhKem?: string,
    fileDinhKemNX?: string,
    fileDinhKemTM?: string,
    fileDinhKemDG?: string,
    khongDanhGia?: string,
    kiemNhiem?: boolean,
    noiDungKiemNhiem?: string,
    phone?: string,
    email?: string,
    nguoiTaoUser?: string,
    nguoiSuaUser?: string,
    ngaySuaUser?: string,
    ngayTaoUser?: string,
    thuTu?: string,
    tenMauPhieuDanhGia?: string,
    maMauPhieuDanhGia?: string,
    nguoiTuDanhGia?: string,
    nguoiNhanXet?: string,
    nguoiThamMuu?: string,
    nguoiDanhGia?: string,
    thamQuyenXepLoai?: string,
    createdBy?: string,
    createdOn?: string,
    lastModifiedBy?: string,
    lastModifiedOn?: string,
    deletedOn?: string,
    deletedBy?: string,
    buocHienTaiId?: string,
    buocTruocId?: string,
    applicationUserId?: string,
    nguoiDangXuLyId?: string,
    daXem?: string,
    loaiThoiGian?: string,
    maHoSo?: string,
    thoiGian?: string,
    thoiGianQuery?: string,
    nguoiXuLyTiep?: string,


    lyDo?: string
    dinhKemKhieuNai?: string
    ketQua?: string
    dinhKemKetQua?: string
}

export interface IDanhGiaColumn {
    ID?: string,
    TenTieuChi?: string,
    MaTieuChi: string,
    Level?: string,
    MaDayDu?: string,
    ThangDiem?: number,
    GhiChu?: string,
    CreatedBy?: string,
    DiemTru?: boolean,
    MaDonVi?: string,
    DiemDatYeuCau?: boolean,
    DiemThuong?: boolean,
    DiemLiet?: boolean,
    KiemNhiem?: boolean,
    TieuChiLienKet?: boolean,
    DuocChamNhieuLan?: boolean,
    STT?: string,
    JsonDiemLiet?: string,
    JsonLienKet?: string,
    SoLuong?: string,
    DonViTinh?: string,
    SoLan?: string,
    ThuTu?: string,
    DanhSachTieuChiCon?: IDanhGiaColumn[],
    DiemTuCham?: number,
    DiemNhanXet?: number,
    DiemThamMuu?: number,
    DiemDanhGia?: number,
    isDisabled?: boolean,
    isDisabledNX?: boolean,
    isDisabledTM?: boolean,
    isDisabledDG?: boolean,
    isChecked?: boolean,
    isCheckedNX?: boolean,
    isCheckedTM?: boolean,
    isCheckedDG?: boolean,
    isGiaiTrinh?: boolean,
    isGiaiTrinhNX?: boolean,
    isGiaiTrinhTM?: boolean,
    isGiaiTrinhDG?: boolean,
    NoiDungGiaiTrinh?: string,
    NoiDungGiaiTrinhNX?: string,
    NoiDungGiaiTrinhTM?: string,
    NoiDungGiaiTrinhDG?: string,
    DinhKem?: string,
    DinhKemNX?: string,
    DinhKemTM?: string,
    DinhKemDG?: string,
    isKhieuNai?: boolean
    NoiDungKhieuNai?: string,
    DinhKemKhieuNai?: string,
    NoiDungXuLyKhieuNai?: string,
    DinhKemXuLyKhieuNai?: string,
    isXuLyKhieuNai?: boolean
    SoLuongPrev?: string
    DiemDanhGiaPrev?: number,
    isCheckedDGPrev?: boolean,
    isDisabledDGPrev?: boolean,
    isReference?: boolean
}

export interface ITieuChiCouple {
    tieuChi1: string,
    tieuChi2: string,
    soLanTieuChi1?: number
}
export interface IPhanLoaiDanhGia {
    Ten: string,
    Ma: string,
    DiemToiThieu?: number
    DiemToiDa?: number
}

export interface IBuocHienTaiRes extends IBaseExt {
    tenBuoc?: string
    tenTrangThai?: string
    quyTrinhXuLyId?: string
    trangThaiDanhGiaId?: string
}

export interface ILichSuDanhGiaSwapper {
    tieuChiId?: string
    datas?: ILichSuDanhGia[]
}

export interface ILichSuDanhGia {
    id: string,
    type: string,
    fullName?: string
    noiDungGiaiTrinh: string
    dinhKem?: string
}

export interface IUrlPhieuDanhGia {
    urlPdf?: string
    urlDocx?: string
    isKySo?: boolean
}

