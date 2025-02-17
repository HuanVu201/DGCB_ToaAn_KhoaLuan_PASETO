import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
import  { Dayjs } from "dayjs"
export interface IKyDanhGia extends IBaseExt {
    ten?: string; // Maps to 'TenDanhMuc' in C#
    ma?: string;      // Maps to 'Code' in C#
    thuTu?: number;    // Maps to 'ThuTu' in C#
    active?: boolean;  // Maps to 'Active' in C#
    type?: string;    // Maps to 'Type' in C#, optional
    // tuNgayDanhGia?: string;
    // denNgayDanhGia?: string;
    tuNgayDanhGia?: Dayjs | string | undefined;
    denNgayDanhGia?: Dayjs | string | undefined;
    thoiGianGiaHan?: string;
}

export interface ISearchKyDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IKyDanhGia, "ten"> {

}