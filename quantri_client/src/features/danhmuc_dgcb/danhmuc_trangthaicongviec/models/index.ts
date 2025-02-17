import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_TrangThaiCongViec extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;
    moTa?: string;    // Maps to 'Type' in C#, optional
}

export interface ISearchDanhMuc_TrangThaiCongViec extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_TrangThaiCongViec, "tenDanhMuc" | "code" | "type"> {
   type: string;
   //TrangThaiCongViec
}