import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IHistoryCallApiTichHop extends IBaseExt {
    tenDanhMuc: string; // Maps to 'TenDanhMuc' in C#
    code: string;      // Maps to 'Code' in C#
    thuTu: number;    // Maps to 'ThuTu' in C#
    active: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
    tableName?:string;
}

export interface ISearchHistoryCallApiTichHop extends IBasePagination, IBaseSearch, IPickSearch<IHistoryCallApiTichHop, "tenDanhMuc" | "code" | "type"> {
    tableName?: string;
}