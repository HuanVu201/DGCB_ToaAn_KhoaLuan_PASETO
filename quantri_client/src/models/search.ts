export interface IBaseSearch {
    removed?: boolean,
    reFetch?: boolean,
}
export interface IBasePagination {
    pageNumber?: number,
    pageSize?:number
    maBoTieuChi?: string,
    orderBy?: string,
}