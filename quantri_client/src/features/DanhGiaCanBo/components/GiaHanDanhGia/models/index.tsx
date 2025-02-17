import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";

export interface IGiaHanDanhGia extends IBaseExt {
    noiDung?: string
    yKien?: string
    trangThai?: string
    dinhKem?: string
    maDonVi?: string
    maDonViCha?: string
    tuNgay?: string
    denNgay?: string
    fullName?: string
    userName?: string
    createdOn?: string
    tenPhongBan?: string
    tenDonVi?: string

    maBoTieuChi?: string
    tenBoTieuChi?: string
}

export interface ISearchGiaHanDanhGia extends IBasePagination, IBaseSearch {

    noiDung?: string
    yKien?: string
    trangThai?: string
    dinhKem?: string
    maDonVi?: string
    maDonViCha?: string
    filterByUserRole?: boolean
}

export const indexMonthOfYear = [
    { label: 'Tháng thứ 1', value: '1' },
    { label: 'Tháng thứ 2', value: '2' },
    { label: 'Tháng thứ 3', value: '3' },
    { label: 'Tháng thứ 4', value: '4' },
    { label: 'Tháng thứ 5', value: '5' },
    { label: 'Tháng thứ 6', value: '6' },
    { label: 'Tháng thứ 7', value: '7' },
    { label: 'Tháng thứ 8', value: '8' },
    { label: 'Tháng thứ 9', value: '9' },
    { label: 'Tháng thứ 10', value: '10' },
    { label: 'Tháng thứ 11', value: '11' },
    { label: 'Tháng thứ 12', value: '12' },
]

export const indexMonthOfPartYear = [
    { label: 'Tháng thứ 1', value: '1' },
    { label: 'Tháng thứ 2', value: '2' },
    { label: 'Tháng thứ 3', value: '3' },
    { label: 'Tháng thứ 4', value: '4' },
    { label: 'Tháng thứ 5', value: '5' },
    { label: 'Tháng thứ 6', value: '6' },
]

export const indexMonthOfQuater = [
    { label: 'Tháng thứ 1', value: '1' },
    { label: 'Tháng thứ 2', value: '2' },
    { label: 'Tháng thứ 3', value: '3' },
]