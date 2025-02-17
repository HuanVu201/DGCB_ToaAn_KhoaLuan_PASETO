import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IMauPhoi extends IBaseExt {
    loaiPhoi: string,
    maMauPhoi: string,
    tenMauPhoi: string,
    maDonVi?: any,
    urlMauPhoi?: string,
    laPhoiMacDinh?: boolean,
    customerId?: string

}

export interface IGetUrlPhoi {
    loaiPhoi?: string,
    maMauPhoi?: string,
    maDonVi?: any,
}

export interface ISearchMauPhoi extends IBasePagination, IBaseSearch, IPickSearch<IMauPhoi> {
    loaiPhoi?: string,
    maMauPhoi?: string,
    tenMauPhoi?: string,
    maDonVi?: string,
    laPhoiMacDinh?: boolean
    customerId?: string

}