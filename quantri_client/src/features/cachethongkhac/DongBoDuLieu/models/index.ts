import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDongBoDuLieu extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
}

export interface ISearchDongBoDuLieu extends IBasePagination, IBaseSearch, IPickSearch<IDongBoDuLieu, "tenDanhMuc" | "code" | "type"> {
   type: string;
   //DongBoDuLieu
}