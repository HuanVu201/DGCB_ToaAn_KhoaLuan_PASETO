import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDanhMuc_DonViTinh extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
    duocChamNhieuLan? : boolean;
}


export interface ISearchDanhMuc_DonViTinh extends IBasePagination, IBaseSearch, IPickSearch<IDanhMuc_DonViTinh, "tenDanhMuc" | "code" | "type"> {
    type: string;
}