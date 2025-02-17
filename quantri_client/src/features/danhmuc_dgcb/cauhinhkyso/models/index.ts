import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface ICauHinhKySo extends IBaseExt {
    tenDanhMuc?: string; // Maps to 'TenDanhMuc' in C#
    code?: string | null;      // Maps to 'Code' in C#
    thuTu?: number;    // Maps to 'ThuTu' in C#
    active?: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
    duocChamNhieuLan? : boolean;
}


export interface ISearchCauHinhKySo extends IBasePagination, IBaseSearch, IPickSearch<ICauHinhKySo, "tenDanhMuc" | "code" | "type"> {
    type: string;
}