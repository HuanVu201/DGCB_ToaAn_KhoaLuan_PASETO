import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IAuditLog extends IBaseExt {
    //id: number;
    userId?: string;
    type?: string;
    tableName?: string;
    dateTime?: string; // or Date if you prefer to handle it as a Date object
    oldValues?: string;
    newValues?: string;
    affectedColumns?: string;
    primaryKey?: string;
    tenantId?: string;
    userName?: string;
}

export interface ISearchAuditLog extends IBasePagination, IBaseSearch, IPickSearch<IAuditLog, "userName" | "type" | "tableName"> {
    userName? : string;
    type? : string;
    tableName?: string;
}