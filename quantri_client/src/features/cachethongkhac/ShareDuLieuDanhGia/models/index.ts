import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IShareDuLieuDanhGia extends IBaseExt {         
    ten: string;             // Ten là chuỗi
    ma: string;              // Ma là chuỗi
    url: string;             // Url là chuỗi
    input: string;           // Input là chuỗi (nếu là đối tượng phức tạp thì cần thay đổi)
    output: string;          // Output là chuỗi
    phuongThuc: string;      // PhuongThuc là chuỗi
    moTa: string;            // MoTa là chuỗi
    loaiDichVu: string;      // LoaiDichVu là chuỗi
    loaiQuanLy: string;      // LoaiQuanLy là chuỗi
    suDung: boolean;         // SuDung là boolean
}

export interface ISearchShareDuLieuDanhGia extends IBasePagination, IBaseSearch, IPickSearch<IShareDuLieuDanhGia, "ma" | "ten"> {
    loaiDichVu?: string;
}