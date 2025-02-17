import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_KhoTieuChi extends IBaseExt {
  maTieuChi: string; // thuộc tính này không được null
  tenTieuChi: string; // tối đa 400 ký tự
  suDung: boolean; // thuộc tính boolean
  diemTru?: boolean; // có thể null
  thangDiem?: string; // kiểu VARCHAR tối đa 10 ký tự
  ghiChu?: string; // thuộc tính có thể null
  diemThuong?: boolean; // có thể null
  diemLiet?: boolean; // có thể null
  duocChamNhieuLan?: boolean; // có thể null
  kiemNhiem?: boolean; // có thể null
  donViTinh?: string; // tối đa 50 ký tự
  soLan?: number; // có thể null

  loaiDiem?:string;
  fullCode?: string;
  parrentCode?: string;
  parrentName?:string;
  jsonLienKet?:string;
  jsonDiemLiet?:string;
  tieuChiLienKet:boolean;
  sTT?:string;
  id:string;
  titleView?: string;
}

export interface ISearchDanhMuc_KhoTieuChi extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_KhoTieuChi, "maTieuChi" | "tenTieuChi" | "suDung"> {
  isParrentCode?: boolean;
}