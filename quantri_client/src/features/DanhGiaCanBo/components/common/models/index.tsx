import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IDanhGiaCanBo extends IBaseExt {
    maPhieu?: string
    tenMauPhieu?: string
    loaiDanhGia?: string
    chiTietDiemDanhGia?: string
    chiTietDiemLanhDaoDanhGia?: string
    chiTietDiemTuDanhGia?: string
    chiTietDiemNhanXet?: string
    chiTietDiemThamMuu?: string
    dataTuDanhGia?: string
    dataNhanXet?: string
    dataThamMuu?: string
    dataLanhDaoDanhGia?: string
    dataKhieuNai?: string
    dataXuLyKhieuNai?: string
    dataDanhGia?: string
    hoVaTen?: string
    taiKhoan?: string
    maNguoiDung?: string
    chucVu?: string
    chucDanh?: string
    tenPhongBan?: string
    maPhongBan?: string
    tenDonVi?: string
    maDonVi?: string
    trangThai?: string
    phanLoaiTuDanhGia?: string
    phanLoaiDanhGia?: string
    phanLoaiNhanXet?: string
    diemDanhGia?: number
    diemTuDanhGia?: number
    diemNhanXet?: number
    diemThamMuu?: number
    diemLanhDaoDanhGia?: number
    phanLoaiThamMuu?: string
    phanLoaiLanhDaoDanhGia?: string
    namDanhGia?: number
    thoiGianTao?: string
    thoiGianNhanXet?: string
    thoiGianDanhGia?: string
    thoiGianHDDanhGia?: string
    thoiGianThamMuu?: string
    suDung?: boolean
    maDonViCha?: string
    lyDoThayDoiXepLoai?: string
    yKienLanhDao?: string
    yKienTuDanhGia?: string
    yKienNhanXet?: string
    yKienThamMuu?: string
    yKienDanhGia?: string
    fileDinhKem?: string
    fileDinhKemNX?: string
    fileDinhKemTM?: string
    fileDinhKemDG?: string
    khongDanhGia?: boolean
    kiemNhiem?: boolean
    noiDungKiemNhiem?: string
    phone?: string
    email?: string
    nguoiTaoUser?: string
    nguoiSuaUser?: string
    ngaySuaUser?: string
    ngayTaoUser?: string
    thuTu?: number
    tenMauPhieuDanhGia?: string
    maMauPhieuDanhGia?: string
    nguoiTuDanhGia?: string
    nguoiNhanXet?: string
    nguoiThamMuu?: string
    nguoiDanhGia?: string
    nguoiTuDanhGiaId?: string
    nguoiNhanXetId?: string
    nguoiThamMuuId?: string
    nguoiDanhGiaId?: string
    thamQuyenXepLoai?: string
    buocTruocId?: string
    buocHienTaiId?: string
    nguoiDangXuLyId?: string
    daXem?: string
    maHoSo?: string
    thoiGianQuery?: string
    loaiThoiGian?: string
    thoiGian?: string
    maBoTieuChuan?: string
    tenBoTieuChuan?: string
    danhSachPhanLoaiDanhGia?: string
    mauPhieus?: IChiTietDanhGia[]
    laNguoiDaXuLy?: boolean
    scorePoint?: string
    tenThaoTacVetXuLy?: string
    hasDiemLietTuDanhGia?: boolean
    hasDiemLietNhanXet?: boolean
    hasDiemLietThamMuu?: boolean
    hasDiemLietLanhDaoDanhGia?: boolean
    hasDiemLietDanhGia?: boolean
    truongDonVi?: number
    lastModifiedOn?: string
    quyTrinhXuLyId?: string
    urlPdf?: string
    urlDocx?: string
    soLuongKhieuNai?: number
    khieuNaiId?: string
    trangThaiKhieuNai?: string
    hoSoCongTacId?: string
    isKySoCaNhan?: boolean
    isKySoDonVi?: boolean
    isKySoNhanXet?: boolean
    isKySoThamMuu?: boolean
    isKySoLanhDao?: boolean
    resetUrlPhieu?: boolean
    maDonViFull?: string
}

export interface IChiTietDanhGia extends IBaseExt {
    tenMauPhieu?: string
    maMauPhieu?: string
    maPhieu?: string
    chiTietDiemTuDanhGia?: string
    chiTietDiemLanhDaoDanhGia?: string
    chiTietDiemThamMuu?: string
    chiTietDiemNhanXet?: string
    chiTietDiemDanhGia?: string
    dataTuDanhGia?: string
    dataNhanXet?: string
    dataThamMuu?: string
    dataLanhDaoDanhGia?: string
    dataDanhGia?: string
    diemDanhGia?: number
    diemTuDanhGia?: number
    diemNhanXet?: number
    diemThamMuu?: number
    diemLanhDaoDanhGia?: number
    thuTu?: number
    scorePoint?: string
    hasDiemLietTuDanhGia?: boolean
    hasDiemLietNhanXet?: boolean
    hasDiemLietThamMuu?: boolean
    hasDiemLietLanhDaoDanhGia?: boolean
    hasDiemLietDanhGia?: boolean
    dataKhieuNai?: string
    dataXuLyKhieuNai?: string
    soLuongKhieuNai?: number
}

export interface ISearchDanhGiaCanBo extends IBasePagination, IBaseSearch, IPickSearch<IDanhGiaCanBo> {
    ten?: string,
    ma?: string,
    trangThai?: string,
    trangThais?: string[],
    loaiNgay?: string,
    loaiDanhGia?: string,
    phanLoaiDanhGia?: string,
    loaiThoiGian?: string,
    namDanhGia?: string,
    thoiGian?: string
    thoiGianQuery?: string
    nguoiDanhGia?: string
    tuNgay?: string
    denNgay?: string
    type?: string
    thuocHoSo?: string
    maDonVi?: string
    maDonViCha?: string
    maPhongBan?: string
    getDataCurrentUser?: boolean
    differencePerson?: boolean
    filterByUserRole?: boolean
    toanBoDonVi?: boolean
    truongDonVi?: boolean
    suDung?: boolean
    isCungDonVi?: boolean
    chuaKhieuNai?: boolean

}

export interface IUserDanhGia {
    fullName?: string
    userName?: string
    maNguoiDung?: string
    chucVuId?: string
    chucVu?: string
    chucDanhId?: string
    chucDanh?: string
    tenPhongBan?: string
    maPhongBan?: string
    tenDonVi?: string
    maDonVi?: string
    maDonViCha?: string
    phone?: string
    email?: string
    nguoiTaoUser?: string
    ngayTaoUser?: string
    nguoiSuaUser?: string
    ngaySuaUser?: string
    thuTu?: number
    nguoiDangXuLyId?: string
    kiemNhiem?: boolean
    noiDungKiemNhiem?: string
    khongDanhGia?: boolean
    maDonViFull?: string
}

export interface IXoaDiemLanhDaoCham {
    danhGiaId: string
    loaiDiem: string
    tenThaoTac?: string
    thuHoi?: boolean
}
export interface ITraLaiThuHoiPhieuDanhGia {
    id: string
    tenBuocXuLy: string
}

export interface IDuyetDanhGia {
    ids: string[]
    loaiDiem: string
    tenThaoTac: string
}

export interface IGetDanhSachDanhGia {

}

export interface IGetNhacViec {

}

export interface IGetTKDanhGiaCaNhan {

}