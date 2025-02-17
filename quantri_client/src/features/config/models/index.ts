import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IConfig extends IBaseExt {
    ten: string;
    code: string;
    thuTu: number;
    active: boolean;
    module : string;
    content : string;
}

export interface ISearchConfig extends IBasePagination, IBaseSearch, IPickSearch<IConfig, "ten" | "code" | "module"> {
}
