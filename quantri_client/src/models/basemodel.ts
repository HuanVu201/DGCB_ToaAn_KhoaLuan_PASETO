import { IBasePagination, IBaseSearch } from "."

export interface IBaseExt<TId = string> {
    id: TId,
    createdOn?: string,
    createdBy?: string,
    deletedOn?: string
    deletedBy?: string
}

export interface IBaseEntityWithoutAuditable extends Pick<IBaseExt, "id"> {};

export type ExtractPrimitiveProps<T> = {
    [K in keyof T as T[K] extends number | string | boolean | symbol ? K : never]: T[K];
};

export type PartialPick<T extends IBaseExt> = Partial<Pick<T, keyof IBaseExt>>;

export type PartialBaseExtAndExtractPrimitiveProps<T extends IBaseExt> = PartialPick<T> & ExtractPrimitiveProps<Omit<T, keyof IBaseExt>>;

type KeyOfIBaseExt = keyof IBaseExt
export type IPickSearch<TObj , TPick extends keyof TObj = never> = Partial<Pick<TObj, TPick>> & IBasePagination & IBaseSearch
export type IOmitSearch<TObj, TOmit extends keyof TObj = never> = Partial<Omit<TObj, TOmit>> 
export type IOmitUpdate<TObj, TOmit extends keyof Omit<TObj, KeyOfIBaseExt> = never> = {
    id ?: string,
    data: Partial<Omit<TObj, TOmit | KeyOfIBaseExt>>
}
export type IOmitUpdateDanhGiaHaiLong<TObj, TOmit extends keyof Omit<TObj, KeyOfIBaseExt> = never> = {
    id ?: string,
    maHoSo ? : string,
    data: Partial<Omit<TObj, TOmit | KeyOfIBaseExt>>
}

export type ISoftDelete  = {
    forceDelete: boolean,
    id: string | undefined
}
export type IDeleteFiles  = {
    removeFiles?: string[]
}
export type IOmitCreate<TObj, TOmit extends keyof Omit<TObj, KeyOfIBaseExt> = never> = Partial<Omit<TObj, TOmit | KeyOfIBaseExt>>

