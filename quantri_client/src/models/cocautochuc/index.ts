import { IBaseExt, IPickSearch } from "../basemodel"
import { IBasePagination } from "../search"

export interface CoCauToChuc extends IBaseExt {
    // groupCode: string
    // groupName: string
    // ofGroupCode: string
    // ofGroupName: string
    // ofGroupId: string
    // groupOrder: string
    // active: string
    // type: string
    // catalog?: string
    // otherCatalog: string
    
    groupCode: string
    groupName: string
    ofGroupCode?: string | null
    ofGroupName?: string| null
    ofGroupId: string
    groupOrder: string
    active: boolean
    agent: string
    description: string
    type: string
    maDinhDanh: string
    catalog?: string
    otherCatalog: string
    maNhomLienThong?: string
    diaChi?: string
    soDienThoai?: string
    thoiGianLamViec?: string
    loaiBienLaiThanhToan?: string
}

export interface SearchCoCauToChuc extends IBasePagination, IPickSearch<CoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active" | "type"> {
    groupCode?: string,
    isRootGroupCode?: boolean;
    cataLog?: string;
    cataLogs?: string[];
    otherCataLog?: string;
    otherCataLogs?: string[];
    type?: string;
    getAllChildren?: boolean;
    maDinhDanhCha?: string;
}