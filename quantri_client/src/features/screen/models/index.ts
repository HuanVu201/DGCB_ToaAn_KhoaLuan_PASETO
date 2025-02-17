import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IScreen extends IBaseExt {
    moTa: string
    ma: string
}

export interface ISearchScreen extends IBasePagination, IBaseSearch, IPickSearch<IScreen, "ma">{
    
}