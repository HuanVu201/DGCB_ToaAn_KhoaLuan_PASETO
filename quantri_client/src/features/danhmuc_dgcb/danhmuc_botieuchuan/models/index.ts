import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_BoTieuChuan extends IBaseExt {
  maBoTieuChi?: string;
  tenBoTieuChi?: string;
  suDung?: boolean;
  dinhKem?: string;
  soKyHieu?: string;
  ngayBanHanh?: string; // You might consider using Date type if you need date manipulation
  coQuanBanHanh?: string;
  loaiThoiGian?: string;
  thoiGian?: string;
  donVi?: string;
  tuNgay?: string; // Similarly, consider Date type for date manipulations
  denNgay?: string; // Similarly, consider Date type for date manipulations
  created?: string; // Similarly, consider Date type for date manipulations
  modifiedBy?: string | null;
  modified?: string | null; // Similarly, consider Date type for date manipulations
  cauHinhThoiGianGiaHan?: number;
  maCapDanhGia?: string;
  maDonViDanhGia?: string;
  capDanhGia?: string;
  donViDanhGia?: string;
  laDonVi:boolean;
}
export interface ISearchDanhMuc_BoTieuChuan extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_BoTieuChuan, "maBoTieuChi" | "tenBoTieuChi" | "coQuanBanHanh"> {
  loaiThoiGian?: string
  currentDayOfTime?: string
  thangThuOfThoiGian?: string
  thoiGianQuery?: string
  truongDonVi?: boolean,
  typeCheck?: string
  maDonVi?: string
  maPhongBan?: string
  isCungDonVi?: boolean
}