import { CheckboxOptionType } from "antd";
import { IBaseExt, IBasePagination, IPickSearch, ISoftDelete } from "../../../models";
export interface ICoCauToChuc extends IBaseExt {
    groupCode: string
    groupName: string
    ofGroupCode?: string | undefined | null
    ofGroupName?: string |  undefined | null
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
export type CataLog = "so-ban-nganh" | "quan-huyen" | "xa-phuong"

export interface ISearchCoCauToChuc extends IBasePagination, IPickSearch<ICoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active" | "type"> {
    groupCode?: string,
    isRootGroupCode?: boolean;
    cataLog?: string;
    cataLogs?: string[];
    otherCataLog?: string;
    otherCataLogs?: string[];
    type?: string;
    maDinhDanh?: string;
    getAllChildren?: boolean;
    maDinhDanhCha?: string;
    donViQuanLy?: string;
    GetAllChildren?:boolean;
}
export interface IDeleteCoCauToChuc extends ISoftDelete {
    parentCode: string;
}
export interface ICauHinhBienLaiThanhToan {
    ADMINACCOUNT: string,
    ADMINPASS: string
    SERVICEACCOUNT: string
    SERVICEPASS: string
    PUBLISHSERVICE: string
    PORTALSERVICE: string
    BUSINESSSERVICE: string
    SERIAL: string
    PATTERN: string
}

export interface CheckboxOptionTypeExtend extends CheckboxOptionType {
    number?: number;  // Thêm thuộc tính 'number'
  }