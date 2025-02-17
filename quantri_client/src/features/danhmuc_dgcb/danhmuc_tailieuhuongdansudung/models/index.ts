import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhmuc_TaiLieuHuongDanSuDung extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
    dinhKem?: string;
}

export interface ISearchDanhmuc_TaiLieuHuongDanSuDung extends IBasePagination, IBaseSearch, IPickSearch<IDanhmuc_TaiLieuHuongDanSuDung, "tenDanhMuc" | "code" | "type"> {
   type: string;
   //TaiLieuHuongDanSuDung
}