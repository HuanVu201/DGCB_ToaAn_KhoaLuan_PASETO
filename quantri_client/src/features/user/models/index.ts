import { UserGroup } from "@/models/userGroup";
import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface IUser extends IBaseExt {
    fullName: string,
    userName: string
    groupCode: string,
    groupName: string,
    positionCode: string,
    positionName: string,
    userOrder: string,
    isSystemAccount: string,
    officeCode: string;
    officeName: string;
    typeUser: UserType;
    imageUrl: string;
    hoVaTen: string;
    roleId: string;
    forcePasswordChange?:string;
    userGroupId?: string;
}

export type UserType = "CongDan" | "CanBo" | "Admin"

export type NguoiThan = {
    hoVaTen: string,
    quocTich: string,
    soCMND: string,
    soDinhDanh: string,
}
export type ChuHo = {
    hoVaTen: string,
    quanHe: string,
    soCMND: string,
    soDinhDanh: string,
}
export type DiaChi = {
    maTinhThanh: string;
    maQuanHuyen: string;
    maPhuongXa: string;
    tenTinhThanh: string;
    tenQuanHuyen: string;
    tenPhuongXa: string;
    chiTiet: string;
    quocGia: string;
}

export type GetCSDLDanCuResponse = {
    // envelope: {
    //     body: {
    //         congdanCollection: {
    //             congDan: {
    cha: NguoiThan;
    email?: string;
    phoneNumber?: string;
    me: NguoiThan;
    voChong: NguoiThan;
    nguoiDaiDien: NguoiThan;
    hoVaTen: { ho: string; ten: string; chuDem: string };
    fullName: string;
    lastName: string;
    firstName: string;
    chuHo: ChuHo;
    danToc: string;
    tonGiao: string;
    gioiTinh: string;
    tinhTrangHonNhan: string;
    nhomMau: string;
    // ngayThangNamSinh : {
    //     nam: string;
    //     ngayThangNam:string;
    // }
    namSinh: string;
    ngayThangNamSinh: { nam: string, ngayThangNam: string };
    noiDangKyKhaiSinh: DiaChi;
    noiOHienTai: DiaChi;
    thuongTru: DiaChi;
    queQuan: DiaChi;
    quocTich: string;
    soCMND: string;
    soDinhDanh: string;
    soSoHoKhau: string;
    //             }
    //         }
    //     }
    // }
}

export interface IChangePassWord {
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    userName?: string
}

export interface IGetUser {
    data?: IUser
}
export interface ISearchUser extends IBasePagination, IPickSearch<UserGroup, "groupCode"| "officeCode"> {
    isActive?: boolean,
    typeUser?: string,
    laCanBoTiepNhan?: boolean,
    officeCodeWithChildren?: string;
    donViQuanLy?: string
}
export interface IUserRole extends IBaseExt {
    roleId: string,
    roleName: string,
    description?: string,
    enabled?: boolean,
    number?: number,
}
export interface IUpdateUserRole {
    userRoles: IUserRole[]
}

export type ThongTinCSDLDanCuSearchParams = {
    // MaYeuCau: string,
    // MaDVC: string,
    // MaTichHop: string,
    // MaCanBo: string,
    SoDinhDanh: string,
    SoCMND: string,
    HoVaTen: string,
    LoaiGiayTo?: string,
    NgayThangNam: string,
    Nam: string
    UpdateEntity?: boolean;
    MaHoSo?: string;
}

export interface ILogOut {
    access_token: string,
    returnUrl?: string
}

export type SearchNhomLanhDaoResponse = {
    id: string;
    fullName: string;
    name: string;
    officeName: string;
    groupName: string;
    userName: string;
    positionName: string;
}


export interface ISearchUserByPermision extends IBasePagination, IPickSearch<IUser> {
    isActive?: boolean,
    typeUser?: string,
    laCanBoTiepNhan?: boolean,
    officeCodeWithChildren?: string;
    donViQuanLy?: string
}
export type UpdateEmailAndPhoneNumberPortalParams = {
    userName: string
    email?: string
    phoneNumber?: string

}

export interface IPasswordResetOptions {
    userName: string; // Tên người dùng
    password?: string; // Mật khẩu mới (tùy chọn)
  
    // Các yêu cầu mật khẩu
    minLength: number;  // Độ dài tối thiểu
    requireUppercase: boolean; // Chứa chữ hoa
    requireLowercase: boolean; // Chứa chữ thường
    requireDigit: boolean; // Chứa chữ số
    requireSpecialCharacter: boolean; // Chứa ký tự đặc biệt
    disallowUsernameInPassword: boolean; // Không chứa tên tài khoản trong mật khẩu
    disallowEmailInPassword: boolean; // Không chứa email trong mật khẩu
    disallowFullNameInPassword: boolean; // Không chứa full name trong pass
    disallowDateOfBirthInPassword: boolean; // Không chứa ngày sinh trong mật khẩu
    disallowNumberPhoneInPassword: boolean; // Không chứa số điện thoại trong mật khẩu
    maxFailedLoginAttempts: number;  // Số lần đăng nhập sai liên tiếp sẽ khóa tài khoản
    passwordExpiryTime: number; // Thời gian yêu cầu thay đổi mật khẩu (theo ngày)
    passwordNotEqualToOld: boolean; // Mật khẩu mới không trùng với mật khẩu cũ
}