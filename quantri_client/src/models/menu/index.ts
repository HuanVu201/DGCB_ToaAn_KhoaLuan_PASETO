import { IBaseExt, IPickSearch } from "../basemodel";
import { IBasePagination } from "../search";

export const MENUMODULES = {
    "dvc": "Hệ thống một cửa điện tử",
    "portaldvc_admin": "Quản trị cổng DVC",
    "admin": "Quản trị hệ thống",
    "admin_tthc": "Quản trị kết quả TTHC điện tử",
} as const

export type MENUMODULE = keyof typeof MENUMODULES

export interface Menu extends IBaseExt{
    tenMenu: string;
    parentId?: string;
    thuTuMenu: number;
    active?: boolean;
    module: MENUMODULE;
    fullPath: string;
    iconName?: string;
    permission?: string;
    isTopMenu: boolean;
}

export interface SearchMenu extends IBasePagination, IPickSearch<Menu, "tenMenu" | "active" | "module">{
    filterByUserRole?: boolean
}