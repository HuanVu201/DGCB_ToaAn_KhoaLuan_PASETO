import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface ILstUsers extends  IBaseExt {
  maBoTieuChi: string;
  tenBoTieuChi: string;
  suDung: boolean;
  dinhKem: string;
  soKyHieu: string;
  ngayBanHanh: string; // You might consider using Date type if you need date manipulation
  coQuanBanHanh: string;
  loaiThoiGian: string;
  thoiGian: string;
  donVi: string;
  tuNgay: string; // Similarly, consider Date type for date manipulations
  denNgay: string; // Similarly, consider Date type for date manipulations
  createdBy: string;
  created: string; // Similarly, consider Date type for date manipulations
  modifiedBy: string | null;
  modified: string | null; // Similarly, consider Date type for date manipulations
  id: string;
  groupCode:string,
  groupName:string,
  maDonVi:string,
  tenDonVi:string,
  fullName:string,
  fullNameWithGroup: string,
  userName: string,
  chucVu: string,
  userId: string,
  officeName:string,
  officeCode:string,
}
export interface ISearchLstUsers extends  IBasePagination, IBaseSearch, IPickSearch<ILstUsers, "maBoTieuChi" | "tenBoTieuChi" | "coQuanBanHanh"> {
 GroupId? : string;
 GroupCode?:string;
}