import { IBaseExt, PartialBaseExtAndExtractPrimitiveProps, PartialPick } from "@/models";
import { User } from "@/models/user";
import { UserGroup } from "@/models/userGroup";

export type CreateUserWithDefaultPasswordRequest = Partial<Omit<User, keyof IBaseExt> & {
    chucDanhId?: string;
    chucVuId?: string;
    userGroupData?: AddUserGroupData;
}>

export type AddUserGroupData = Partial<UserGroup> & {
    userId?: string 
    nhomNguoiDungs?: {
        userGroupId?: string;
        nhomNguoiDungIds: string[];
    }
}
export type RemoveUserGroupRequest = {
    ids: string[]
}

export type IPasswordResetOptions = {
    userName?: string; // Tên người dùng
    password?: string; // Mật khẩu mới

    // Các yêu cầu mật khẩu
    minLength: number;  // Độ dài tối thiểu
    requireUppercase: boolean; // Chứa chữ hoa
    requireLowercase: boolean; // Chứa chữ thường
    requireDigit: boolean; // Chứa chữ số
    requireSpecialCharacter: boolean; // Chứa ký tự đặc biệt
    disallowUsernameInPassword: boolean; // Không chứa tên tài khoản trong mật khẩu
    disallowEmailInPassword: boolean; // Không chứa email trong mật khẩu
}