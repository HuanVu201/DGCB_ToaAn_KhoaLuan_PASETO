import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface INhomNguoiDung extends IBaseExt {
    ten: string,
    ma?: string,
    moTa?: string,
    maNhomLienThong?: string,
}

export interface ISearchNhomNguoiDung extends IBasePagination, IBaseSearch, IPickSearch<INhomNguoiDung, "ten" | "id">{
    
}