import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface IVaiTro extends IBaseExt {
    name : string,
    description : string,
    permissions : string[],
    claimValue : string
    number?: number,
}


export interface ISearchVaiTro extends IBasePagination, IPickSearch<IVaiTro, "permissions"> {

}
