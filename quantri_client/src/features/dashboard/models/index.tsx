import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IDasshBoards extends IBaseExt {
    maBoTieuChi?: string;
    tenBoTieuChi?: string;
    suDung?: boolean;
    dinhKem?: string;
    soKyHieu?: string;
    ngayBanHanh?: string; // You might consider using Date type if you need date manipulation
    coQuanBanHanh?: string;
    loaiThoiGian?: string;
    thoiGian?: string;
    donVi?: string;
    tuNgay?: string; // Similarly, consider Date type for date manipulations
    denNgay?: string; // Similarly, consider Date type for date manipulations
    created?: string; // Similarly, consider Date type for date manipulations
    modifiedBy?: string | null;
    modified?: string | null; // Similarly, consider Date type for date manipulations
  }


export interface IGetNhacViec 
{
  maDV?: string;
  taiKhoan?: string;
  loaiThoiGian?: string;
  duongDan?: string;
  mauSac?: string;
  class?: string;
  icon?: string;
  moTa?: string;
  ma?: string;
  giaTri?: string;
}

export interface IGetTKDanhGiaCaNhan 
{

}

export interface IDashBoards 
{

}
export interface GetGroupChild
{
  gruopCode:string;
}
export interface GetThongKeDonVi {
  groupCode?: string;        // Mã nhóm (string)
  includeChild?: boolean;    // Bao gồm con (boolean)
  loaiThoiGian?: string;     // Loại thời gian (string)
  kyDanhGia?: string;        // Kỳ đánh giá (string)
  namDanhGia?: number;       // Năm đánh giá (number)
  skip?: number;             // Số bản ghi bỏ qua (number)
  top?: number;              // Số bản ghi tối đa (number)
  thoiGianQueryFrom?: number; // Thời gian từ (number)
  thoiGianQueryTo?: number;  // Thời gian đến (number)
  orderBy?: string;          // Sắp xếp theo (string)
  category?: string;         // Danh mục 


  id?: string;                  // ID của thống kê (string)
  loaiThongKe?: string;         // Loại thống kê (string)
  tenDonVi?: string;            // Tên đơn vị (string)
  maDonVi?: string;             // Mã đơn vị (string)
 // loaiThoiGian: string;        // Loại thời gian (string)
  thoiGian?: string | null;     // Thời gian (string hoặc null)
 // namDanhGia: number;          // Năm đánh giá (number)
  thoiGianTao?: string;         // Thời gian tạo (string - ISO 8601)
  danhGiaLoaiA?: number;        // Đánh giá loại A (number)
  danhGiaLoaiB?: number;        // Đánh giá loại B (number)
  danhGiaLoaiC?: number;        // Đánh giá loại C (number)
  danhGiaLoaiD?: number;        // Đánh giá loại D (number)
  tongSoCanBo?: number;         // Tổng số cán bộ (number)
  tongSoKhongDanhGia?: number;  // Tổng số không đánh giá (number)
  tongSoTuDanhGia?: number;     // Tổng số tự đánh giá (number)
  tongSoDaXepLoai?: number;     // Tổng số đã xếp loại (number)
  tongSoCongViec?: number;      // Tổng số công việc (number)
  congViecChuaHoanThanh?: number; // Công việc chưa hoàn thành (number)
  congViecDangXuLy?: number;    // Công việc đang xử lý (number)
  congViecDaHoanThanh?: number; // Công việc đã hoàn thành (number)
  khenThuongDeXuat?: number;    // Khen thưởng đề xuất (number)
  khenThuong?: number;          // Khen thưởng (number)
  thoiGianQuery?: number;       // Thời gian query (number)
 // category: string | null;      // Danh mục (string hoặc null)
  createdBy?: string | null;     // Người tạo (string hoặc null)
  createdOn?: string;           // Thời gian tạo (string - ISO 8601)
  lastModifiedBy?: string | null; // Người sửa đổi cuối (string hoặc null)
  lastModifiedOn?: string;
}

export interface IResponesGetThongKeDonVi
{
  id: string;                  // ID của thống kê (string)
  loaiThongKe: string;         // Loại thống kê (string)
  tenDonVi: string;            // Tên đơn vị (string)
  maDonVi: string;             // Mã đơn vị (string)
  loaiThoiGian: string;        // Loại thời gian (string)
  thoiGian: string | null;     // Thời gian (string hoặc null)
  namDanhGia: number;          // Năm đánh giá (number)
  thoiGianTao: string;         // Thời gian tạo (string - ISO 8601)
  danhGiaLoaiA: number;        // Đánh giá loại A (number)
  danhGiaLoaiB: number;        // Đánh giá loại B (number)
  danhGiaLoaiC: number;        // Đánh giá loại C (number)
  danhGiaLoaiD: number;        // Đánh giá loại D (number)
  tongSoCanBo: number;         // Tổng số cán bộ (number)
  tongSoKhongDanhGia: number;  // Tổng số không đánh giá (number)
  tongSoTuDanhGia: number;     // Tổng số tự đánh giá (number)
  tongSoDaXepLoai: number;     // Tổng số đã xếp loại (number)
  tongSoCongViec: number;      // Tổng số công việc (number)
  congViecChuaHoanThanh: number; // Công việc chưa hoàn thành (number)
  congViecDangXuLy: number;    // Công việc đang xử lý (number)
  congViecDaHoanThanh: number; // Công việc đã hoàn thành (number)
  khenThuongDeXuat: number;    // Khen thưởng đề xuất (number)
  khenThuong: number;          // Khen thưởng (number)
  thoiGianQuery: number;       // Thời gian query (number)
  category: string | null;      // Danh mục (string hoặc null)
  createdBy: string | null;     // Người tạo (string hoặc null)
  createdOn: string;           // Thời gian tạo (string - ISO 8601)
  lastModifiedBy: string | null; // Người sửa đổi cuối (string hoặc null)
  lastModifiedOn: string;     
}
export interface ISearchDashBoards extends IBasePagination, IBaseSearch, IPickSearch<IDashBoards> {

  }

  export interface IGetDanhSachDanhGia extends IBasePagination, IBaseSearch
  {
    tenDonViTK?: string | null;
    maDonViTK?: string | null;
    thoiGianQueryTK?: string | null;
    trangThaiTK?: string | null;
    loaiThoiGian?: string | null;
  
    trangThai?: string | null;
    phanLoaiDanhGia?: string | null;
    loaiNgay?: string | null;
    loaiDanhGia?: string | null;
    type?: string | null;
    maPhongBan?: string | null;
    maDonVi?: string | null;
    maDonViCha?: string | null;
    thoiGianQuery?: string | null;
    kyDanhGia?: string | null;
    namDanhGia?: number | null;
  
    tuNgay?: Date | null;
    denNgay?: Date | null;
    truongDonVi?: boolean | null;
    getDataCurrentUser?: boolean | null;
    filterByUserRole?: boolean | null;
    sendDanhGia?: boolean | null;
  
    chucVu?: string | null;
    chucDanh?: string | null;
    hoVaTen?: string | null;
    toanBoDonVi?: boolean | null;
    suDung?: boolean | null;
    differencePerson?: boolean | null;
    // pageNumber?: number | null | undefined;
    // pageSize?: number| null|undefined;
  }

  export interface IUserResponeOfGetDanhSach
  {
    id: string;
  maPhieu: string;
  hoVaTen: string;
  taiKhoan: string;
  phone: string | null;
  email: string;
  chucVu: string;
  tenDonVi: string;
  maDonVi: string;
  tenPhongBan: string;
  maPhongBan: string;
  trangThai: string;
  phanLoaiTuDanhGia: string;
  phanLoaiDanhGia: string;
  diemDanhGia: number;
  diemTuDanhGia: number;
  namDanhGia: number;
  thoiGianTao: string; // Có thể là Date nếu muốn làm việc với đối tượng Date
  thoiGianNhanXet: string | null;
  thoiGianDanhGia: string | null;
  thoiGianHDDanhGia: string | null;
  thoiGianThamMuu: string | null;
  truongDonVi: number;
  thoiGianQuery: number;
  loaiThoiGian: string;
  thoiGian: string;
  }