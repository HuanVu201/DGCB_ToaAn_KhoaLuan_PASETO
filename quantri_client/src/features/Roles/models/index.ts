import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IRoles extends IBaseExt {
    id: string; 
    name: string;      
    description: string;  
    totalCount: number; 
    permissions?: IPermisstion[];   
}

export interface ISearchRoles extends IBasePagination, IBaseSearch, IPickSearch<IRoles> {
}

export interface IPermisstion 
{
    id: string;
    claimValue:string;
    description: string;
}

export interface IRoleClaim {
    claimValue:string;
    description: string;
    totalCount: string;
}

export interface IUpdateRoleClaim 
{
    roleId? : string;
    listPermission? : IRoleClaim[];
    //listPermission? : string[];
}