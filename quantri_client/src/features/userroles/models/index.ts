import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export type UserType = "CongDan" | "CanBo" | "Admin"
export interface IUserRoles extends IBaseExt {
    userId: string,
    roleId: string,
    fullName: string,
    userName: string
    groupCode: string,
    groupName: string,
    positionCode: string,
    positionName: string,
    userOrder: string,
    isSystemAccount: string,
    phoneNumber: string,
    email: string
    oldGroupCode: string
    soDinhDanh: string;
    soCMND: string;
    gioiTinh: string;
    danToc: string;
    tonGiao: string;
    tinhTrangHonNhan: string;
    nhomMau: string;
    namSinh: string;
    ngayThangNamSinh: { nam: string, ngayThangNam: string };
    quocTich: string;
    noiDangKyKhaiSinh: string;
    queQuan: string;
    thuongTru: string;
    noiOHienTai: string;
    cha: string;
    me: string;
    voChong: string;
    nguoiDaiDien: string;
    chuHo: string;
    soSoHoKhau: string;
    officeCode: string;
    officeName: string;
    typeUser: UserType;
    diaChiThuongTru: string;
    diaChiKhaiSinh: string;
    diaChiQueQuan: string;
    imageUrl: string;
    hoVaTen: string;
    maDinhDanh?: string;
    roleIds? : string;
}

export interface ISearchUserRoles extends IBasePagination, IPickSearch<IUserRoles, "roleId"> {
    isActive: boolean
    roleIds?: string;
}

export interface ISearchUserWithRoleNames extends IBasePagination, IPickSearch<IUserRoles> {
    roleNames?: string[]
    officeCode?: string;
    groupCode?: string,
    // isActive: boolean
}

export interface ILanhDaoRoles extends IBaseExt {
    name?: string
    userName?: string
    fullName?: string
    groupName?: string
    officeName?: string
    positionName?: string
    chucDanh?: string
    roleId?: string
}
