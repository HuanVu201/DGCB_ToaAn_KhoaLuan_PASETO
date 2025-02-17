import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
import { StringEnumValueElement } from "docx";
export interface IDanhMuc_ThongKeDanhGia extends IBaseExt {
  hoTen: string;
  thuTuPB: string | null;
  diemTuDanhGia: string;
  diemNhanXet: string;
  diemDanhGia: string;
  maNguoiDung: string;
  phanLoaiDanhGia: string;
  yKien: string;
  tenDonVi: string;
  tenPhongBan: string;
  maPhongBan: string;
  maDonVi: string;
  type: string;
}
export interface ISearchDanhMuc_ThongKeDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_ThongKeDanhGia, "hoTen" | "thuTuPB" | "maNguoiDung"> {
  loaiThoiGian?: string
  currentDayOfTime?: string
  thangThuOfThoiGian?: string
}
export interface ISearchDanhMuc_ThongKeDanhGiaMau09 extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_ThongKeDanhGia, "hoTen"> {
  kyDanhGia?: string
  namDanhGia?: string
  maDonVi?: string
  loaiThoiGian? : string
}
export interface ISearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_ThongKeDanhGia, "hoTen"> {
  kyDanhGia?: string
  namHienTai?: string
  maPhongBan?: string
  type? : string
  xepLoai?: string
}
export interface IPhongTK {
  tenPhong: string;
  maPhong: string;
  users: IDanhMuc_ThongKeDanhGia[];
}

export interface IDepartmentTK {
  tenDonVi: string;
  maDonVi: string;
  phong: {
    [key: string]: IPhongTK;
  };
}

export interface IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ {
  hoVaTen: string;
  thuTuPB: number;
  thuTuND: number;
  taiKhoan: string;
  chucVu: string;
  xepLoaiTuDG: string;
  diemDanhGia: number | null;
  xepLoaiDG: string | null;
  truongDonVi: string;
  lyDo: string;
  tenDonVi: string;
  tenPhongBan: string;
  maPhongBan: string;
  maDonVi: string;
  maNguoiDung: string;
}
export interface IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan{
  thang?: string;
  diemDanhGia?: string;
  xepLoai?: string;
}
export interface ISearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan{
  maNguoiDung?: string;
  namHienTai?: string;
}