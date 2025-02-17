import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IAction extends IBaseExt {
    ten: string;
    ma: string;
    thuTu: string;
    quyen?: string; 
    moTa : string;
    iconName : string;
    colorCode : string;
    showInModal : boolean;
    showInTable : boolean;
    applyForUsers ?: string;
    applyForUserGroups ?: string;
    applyForUserData ?: {id: string; userName: string}[];
}

export interface ISearchAction extends IBasePagination, IBaseSearch, IPickSearch<IAction, "ten">{
    
}