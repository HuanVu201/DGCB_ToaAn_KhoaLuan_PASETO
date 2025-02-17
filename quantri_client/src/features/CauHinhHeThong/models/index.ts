import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface ICauHinhHeThong extends IBaseExt{
    ten: string,
    code: string,
    thuTu: number,
    active?: boolean,
    module: "QuanTriHeThong" | "DVC" |  "QuanTriCong",
    content: string,
    note: string
}

export interface ISearchCauHinhHeThong extends IBasePagination, IPickSearch<ICauHinhHeThong, "ten">{
    
}