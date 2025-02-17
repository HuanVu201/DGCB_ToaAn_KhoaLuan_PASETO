import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_LoaiDiem extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
}

export interface ISearchDanhMuc_LoaiDiem extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_LoaiDiem, "tenDanhMuc" | "code" | "type"> {
   type: string;
   //LoaiDiem
}