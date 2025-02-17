import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILogAuthen extends IBaseExt {
    id: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNumber?: string,
    soDinhDanh?: string,
    typeUser?: string,
    ngayThangNamSinh?: string,
    gioiTinh?: string,
    createdAt?: string,
    typeLogin?: string,
    device?: string,
    ip?: string,
}


export interface ISearchLogAuthenParams extends IBasePagination, IBaseSearch, IPickSearch<ILogAuthen> {
    tuNgay?: string,
    denNgay?: string,
    userName?: string,
    fullName?: string,
    ip?: string
    typeUser?: string,
    typeLogin?: string
    device?: string
}
export interface IGetLogAuthenParams {
    id?: string,

}