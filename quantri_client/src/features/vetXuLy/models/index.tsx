import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface IVetXuLyDanhGia extends IBaseExt {
    tenThaoTac?: string
    tenBuocXuLy?: string
    tenNguoiXuLy?: string
    taiKhoanXuLy?: string
    buocXuLyId?: string
    userId?: string
}

export interface ISearchVetXuLyDanhGia extends IBasePagination, IPickSearch<IVetXuLyDanhGia>{
    userId?: string
    buocXuLyId?: string
    danhGiaId?: string
    maPhieu?: string
}