import { IBaseExt } from "@/models";
import { ChucDanh } from "@/models/chucDanh";
import { ChucVu } from "@/models/chucVu";
import { CoCauToChuc } from "@/models/cocautochuc";

export interface IApplicationUserGroups extends IBaseExt {
    userId?: string
    groupId?: string
    phongBanId?: string
    chucDanhId?: string
    chucVuId?: string
    isDefault?: boolean
    userOrder?: number
    kiemNhiem?: boolean
    noiDungKiemNhiem?: string
    thamQuyenXepLoai?: boolean
    truongDonVi?: boolean
    khongDanhGia?: boolean
    chucDanh?: ChucDanh;
    chucVu?: ChucVu;
    fullName?: ChucVu;
    userName?: ChucVu;
    maNguoiDung?: ChucVu;
    PhongBan?: CoCauToChuc
    Group?: CoCauToChuc
    officeCode?: string
    officeName?: string
    groupCode?: string
    groupName?: string
    maDonViCha?: string
    phone?: string
    email?: string
    thuTu?: string
    maPhieuDanhGia?: string;
    maDonViFull?: string;

}

export interface ISearchDanhSachNguoiXuLyTiep {
    sourceId?: string;
    groupCode?: string;
    officeCode?: string;
    quyTrinhXuLyId: string;
    laQuyTrinhDonVi?: boolean;
}

export interface INguoiXuLyTiep extends IBaseExt {
    userName?: string
    fullName?: string
    tenChucVu?: string
    buocXuLyId?: string
    tenTrangThai?: string
}

export interface DanhSachUserGroupVaiTroDto {
    userGroupId: string;
    tenPhongBan: string;
    tenDonVi: string;
}

export interface DanhSachTruongDonViDto extends Omit<IApplicationUserGroups, "isDefault"> {

}