import { IBaseExt, IPickSearch } from "../basemodel";
import { IBasePagination } from "../search";

export interface Config extends IBaseExt {
    ten: string;
    code: string;
    thuTu: number;
    active: boolean;
    module : string;
    content : string;
}

export interface SearchConfig extends IBasePagination, IPickSearch<Config, "ten" | "code" | "module"> {
}
