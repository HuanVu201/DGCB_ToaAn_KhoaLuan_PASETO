import { TrangThai_ChoDanhGia, TrangThai_ChoNhanXet, TrangThai_ChoThamMuu, TrangThai_DaDanhGia, TrangThai_DangDanhGia } from "./TenVetXuLyConstants"

export type DanhGiaTableActions = {
    icon: React.JSX.Element,
    key?: string
}


export const loaiThoiGians = [
    { label: <p>Tháng</p>, value: 'Tháng' },
    { label: <p>6 tháng</p>, value: '6 tháng' },
    { label: <p>Quý</p>, value: 'Quý' },
    { label: <p>Năm</p>, value: 'Năm' },
]

export const months = [
    { label: 'Tháng 1', value: '01' },
    { label: 'Tháng 2', value: '02' },
    { label: 'Tháng 3', value: '03' },
    { label: 'Tháng 4', value: '04' },
    { label: 'Tháng 5', value: '05' },
    { label: 'Tháng 6', value: '06' },
    { label: 'Tháng 7', value: '07' },
    { label: 'Tháng 8', value: '08' },
    { label: 'Tháng 9', value: '09' },
    { label: 'Tháng 10', value: '10' },
    { label: 'Tháng 11', value: '11' },
    { label: 'Tháng 12', value: '12' },
]

export const comboMonths = [
    { label: '6 tháng đầu năm', value: '0001' },
    { label: '6 tháng cuối năm', value: '0002' },
]

export const quarters = [
    { label: 'Quý 1', value: '001' },
    { label: 'Quý 2', value: '002' },
    { label: 'Quý 3', value: '003' },
    { label: 'Quý 4', value: '004' },
]


export const trangThaiChamDiems = [
    // { label: 'Chưa đánh giá', value: "Chưa đánh giá" },
    { label: 'Đang đánh giá', value: TrangThai_DangDanhGia },
    { label: 'Chờ chấm điểm, nhận xét', value: TrangThai_ChoNhanXet },
    { label: 'Chờ tham mưu đánh giá', value: TrangThai_ChoThamMuu },
    { label: 'Chờ đánh giá, xếp loại', value: TrangThai_ChoDanhGia },
    { label: 'Đã đánh giá, xếp loại', value: TrangThai_DaDanhGia },
]

export const phanLoaiChamDiems = [
    { label: 'Loại A - Hoàn thành xuất sắc nhiệm vụ', value: "Loại A - Hoàn thành xuất sắc nhiệm vụ" },
    { label: 'Loại B - Hoàn thành tốt nhiệm vụ', value: "Loại B - Hoàn thành tốt nhiệm vụ" },
    { label: 'Loại C - Hoàn thành nhiệm vụ', value: "Loại C - Hoàn thành nhiệm vụ" },
    { label: 'Loại D - Không hoàn thành nhiệm vụ', value: "Loại A - Không hoàn thành nhiệm vụ" },
]

export const PhanLoai_A = "Loại A - Hoàn thành xuất sắc nhiệm vụ"
export const PhanLoai_B = "Loại B - Hoàn thành tốt nhiệm vụ"
export const PhanLoai_C = "Loại C - Hoàn thành nhiệm vụ"
export const PhanLoai_D = "Loại D - Không hoàn thành nhiệm vụ"


export const DoiTuong_Truong = "Thủ trưởng cơ quan đơn vị"
export const DoiTuong_Pho = "Phó thủ trưởng cơ quan đơn vị"