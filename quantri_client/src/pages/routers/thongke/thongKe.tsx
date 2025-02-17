import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";
const { primaryRoutes } = Service;

const ThongBaoDanhGiaCoQuanLazy = lazy(
  () =>
    import(
      "../../../features/thongkeDanhGia/thongbaodanhgiacoquan/ThongBaoDanhGiaCoQuan"
    )
);
const TongHopKetQuaDanhGiaLazy = lazy(
  () =>
    import(
      "../../../features/thongkeDanhGia/tonghopketquadanhgia/TongHopKetQuaDanhGia"
    )
);
const TongHopXepLoaiCoQuanLazy = lazy(
  () =>
    import(
      "../../../features/thongkeDanhGia/tonghopxeploaicoquan/TongHopXepLoaiCoQuan"
    )
);
const ThongKeKhieuNaiLazy = lazy(
  () =>
    import(
      "../../../features/thongkeKhieuNai/components/ThongKeKhieuNaiTable"
    )
);
// thongkeDgcb: {
//   root: '/thongKe',
//   tongHopXepLoaiCoQuan: "/thongKe/tong-hop-xep-loai-co-quan",
//   tongHopKetQuaDanhGia: "/thongKe/tong-hop-ket-qua-danh-gia",
//   thongBaoDanhGiaCoQuan: "/thongKe/thong-bao-danh-gia-co-quan",
//   thongKeKhieuNai: "/thongKe/thong-ke-khieu-nai-kien-nghi",
//   tkdgTheoBTC: "/thongke/tkdg-theo-bo-tieu-chi",
//   tkdgBTCCacDoiTuong: "/thongKe/tkdg-btc-cac-doi-tuong",
//   tkdgBTCCongTacLanhDao: "/thongKe/tkdg-btc-cong-tac-lanh-dao",
//   tkdgBTCCacDoiTuongTHT: "/thongKe/tkdg-btc-cac-doi-tuong-toan-he-thong",
//   tkdgBTCTHT: "/thongKe/tkdg-btc-toan-he-thong",
//   tkdgBTChung: "/thongKe/tkdg-bo-tieu-chi-chung",
// },
export const thongKeRouters: RouteObject[] = [
  {
    path: primaryRoutes.thongkeDgcb.tongHopXepLoaiCoQuan,
    element: <TongHopXepLoaiCoQuanLazy  title ='Tổng hợp đánh giá hàng tháng của đơn vị - Mẫu số 09'/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.tongHopKetQuaDanhGia,
    element: <TongHopKetQuaDanhGiaLazy  title="Thông báo đánh giá cơ quan"/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.thongBaoDanhGiaCoQuan,
    element: <ThongBaoDanhGiaCoQuanLazy title=""/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.thongKeKhieuNai,
    element: <ThongKeKhieuNaiLazy />,
  },

// tạm 
  {
    path: primaryRoutes.thongkeDgcb.tkdgTheoBTC,
    element: <TongHopXepLoaiCoQuanLazy title="Thống kê đánh giá theo bộ tiêu chí công tác lãnh đạo, chỉ đạo của đơn vị"/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.tkdgBTCCacDoiTuong,
    element: <ThongBaoDanhGiaCoQuanLazy  title="Thống kê đánh giá theo bộ tiêu chí đối với các đối tượng"/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.tkdgBTCCongTacLanhDao,
    element: <TongHopXepLoaiCoQuanLazy  title="Thống kê đánh giá theo bộ tiêu chí công tác lãnh đạo, chỉ đạo toàn hệ thống"/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.tkdgBTCCacDoiTuongTHT,
    element: <ThongBaoDanhGiaCoQuanLazy  title="Thống kê đánh giá theo bộ tiêu chí đối với các đối tượng toàn hệ thống" />,
  },
  {
    path: primaryRoutes.thongkeDgcb.tkdgBTCTHT,
    element: <TongHopXepLoaiCoQuanLazy  title="Thống kê đánh giá theo bộ tiêu chí chung toàn hệ thống"/>,
  },
  {
    path: primaryRoutes.thongkeDgcb.tkdgBTChung,
    element: <ThongBaoDanhGiaCoQuanLazy  title="Thống kê đánh giá cán bộ tiêu chí chung của đơn vị"/>,
  },
];
