import { IBaseExt, IPickSearch } from "../basemodel";
import { IBasePagination } from "../search";

export interface UserGroup extends IBaseExt{
    userId : string;
    groupCode : string;
    officeCode : string;
    chucDanhId?: string;
    chucVuId?: string;
    isDefault : boolean;
    userOrder : number;
    thamQuyenXepLoai?: boolean;
    kiemNhiem?: boolean;
    truongDonVi?: boolean;
    khongDanhGia?: boolean;
    noiDungKiemNhiem ?: string;
}

export interface SearchUserGroup extends IBasePagination, IPickSearch<UserGroup> {
}

export interface UserGroupResponse extends Pick<UserGroup, "id" | "userId"> {
    tenChucVu: string;
    userName: string;
    fullName: string;
    tenChucDanh:string;
}
