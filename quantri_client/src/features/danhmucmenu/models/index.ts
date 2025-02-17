import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export const MENUMODULES = {
    "dgcb": "Đánh giá cán bộ",
    // "dvc": "Hệ thống một cửa điện tử",
    // "portaldvc_admin": "Quản trị cổng DVC",
    "admin": "Quản trị hệ thống",
    // "admin_tthc": "Quản trị kết quả TTHC điện tử",
    "thongke": "Thống kê đánh giá",
} as const

export type MENUMODULE = keyof typeof MENUMODULES

export interface IMenu extends IBaseExt{
    tenMenu: string;
    parentId?: string;
    thuTuMenu: number;
    active?: boolean;
    module: MENUMODULE;
    fullPath: string;
    iconName?: string;
    permission?: string;
    descriptionPermission?:string;
    isTopMenu: boolean;
}

export interface ISearchMenu extends IBasePagination, IPickSearch<IMenu, "tenMenu" | "active" | "module">{
    filterByUserRole?: boolean
}