import { INhomNguoiDung } from "@/features/nhomnguoidung/models";
import { IBaseExt, IPickSearch } from "../basemodel";
import { ChucDanh } from "../chucDanh";
import { ChucVu } from "../chucVu";
import { IBasePagination } from "../search";
import { UserGroup } from "../userGroup";
export interface User extends IBaseExt {
    fullName: string,
    userName: string;
    userOrder: string,
    phoneNumber: string,
    email: string
    oldGroupCode: string
    hoVaTen: string;
    roleId: string;
    positionName: string;
    chucDanh: ChucDanh;
    chucVu: ChucVu;
    kiemNhiem: boolean;
    noiDungKiemNhiem?: string;
    nhomNguoiDungs: INhomNguoiDung[];

    tenPhongBan: string;
    officeCode: string;
    groupCode: string;
    tenDonVi: string;
    userGroupId: string;
    maDonViCha?: string
    forcePasswordChange:string | boolean;
    maPhieuDanhGia?: string;
}
export interface SearchUser extends Omit<IPickSearch<User>, "orderBy"> {
    isActive?: boolean,
    orderBy?: string[],
    typeUser?: string,
    laCanBoTiepNhan?: boolean,
    officeCodeWithChildren?: string;
    donViQuanLy?: string
}