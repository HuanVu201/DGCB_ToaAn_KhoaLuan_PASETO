import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IDanhMucChung extends IBaseExt {
    tenDanhMuc: string,
    code: string,
    active: boolean,
    // type: "quoc-tich" | "dan-toc" | "hoc-van" | "chuc-vu" | "hoc-vi" | "lanh-dao" | "nghe-nghiep" | "ton-giao" | "ngay-nghi",
    type: string,
    thuTu: number,
    
}

export interface ISearchDanhMucChung extends IBasePagination, IBaseSearch, IPickSearch<IDanhMucChung, "tenDanhMuc" | "type" | "code"> {

}