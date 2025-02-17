// import { RouteObject } from "react-router-dom";
// import { Service } from "@/services";
// import { RequiredAuth } from "@/features/auth/components";
// import { lazy } from "@/utils/lazyLoading";

// const HomeLazy = lazy(() => import("../../../features/portaldvc/home"));
// const TinTucPageLazy = lazy(
//   () => import("../../../features/portaldvc/TinTuc/TinTucWrapper")
// );
// const TinBaiPortalWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/TinTuc/TinBaiPortalWrapper")
// );
// const HoiDapPageLazy = lazy(
//   () => import("../../../features/portaldvc/HoiDap")
// );
// const DanhGiaHaiLongLazy = lazy(
//   () => import("../../../features/portaldvc/DanhGiaHaiLong")
// );
// const DanhMucThuTucPortalWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/DanhMucThuTuc")
// );
// const TrangWikiWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/TinTuc/TrangWikiWrapper")
// );
// const HoiDapChiTietLazy = lazy(
//   () => import("../../../features/portaldvc/HoiDap/components/HoiDapChitiet")
// );
// const TraCuuHoSoPortalWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/TraCuu")
// );
// const TraCuuBienLaiDienTuPortalWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/TraCuuBienLaiDienTu")
// );
// const ThanhToanPortalWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/ThanhToan")
// );

// const DichVuCongTrucTuyenWrapperLazy = lazy(
//   () => import("../../../features/portaldvc/DvcTrucTuyen/DvcTrucTuyen")
// );
// const TiepNhanTrucTuyenWrapperLazy = lazy(
//   () => import("../../portal/TiepNhanTrucTuyen/TiepNhanTrucTuyen")
// );
// const XacNhanThanhToanPortalLazy = lazy(
//   () => import("../../../features/portaldvc/ThanhToan/XacNhanThanhToan")
// );
// const ThongKePageLazy = lazy(
//   () => import("../../../features/portaldvc/ThongKe")
// );
// const ThongKeMapPageLazy = lazy(
//   () => import("../../../features/portaldvc/ThongKeMap/index")
// );
// const HuongDanSuDungPageLazy = lazy(
//   () => import("../../../features/portaldvc/HuongDanSuDungPortal")
// );
// const NhungCauHoiThuongGapPageLazy = lazy(
//   () => import("../../../features/portaldvc/NhungCauHoiThuongGap")
// );
// const NhungCauHoiThuongGapChiTietLazy = lazy(
//   () =>
//     import(
//       "../../../features/portaldvc/NhungCauHoiThuongGap/components/DetailNhungCauHoiThuongGap"
//     )
// );
// const DSTaiLieuHDSDLazy = lazy(
//   () => import("../../../features/portaldvc/DanhSachTaiLieuHDSD")
// );
// const GuiPaknLazy = lazy(
//   () => import("../../../features/portaldvc/PhanAnhKienNghi/guiPaknDvcTinh")
// );
// const DanhSachPaknLazy = lazy(
//   () => import("../../../features/portaldvc/PhanAnhKienNghi/listPaknDvcTinh")
// );
// const QuanLyVanBanLazy = lazy(
//   () => import("../../../features/portaldvc/QuanLyVanBan")
// );
// const LienHeCapHuyenXaLazy = lazy(
//   () => import("../../../features/portaldvc/LienHe/components/LienHePage")
// );
// const LienHeCapTinhLazy = lazy(
//   () => import("../../../features/portaldvc/LienHe/captinh")
// );
// const DVCQuocGia = lazy(
//   () => import("../../../features/dvcQuocGia/index")
// );

// const ChiSoTienDoGiaiQuyetLazy = lazy(
//   ()=> import("../../../features/portaldvc/PageThongKePortal/ChiSoTienDoGiaiQuyet/index")
// )
// const { apiEndpoints, primaryRoutes } = Service;
// export const portalRoutes: RouteObject[] = [
//   {
//     path: primaryRoutes.portaldvc.home,
//     element: <HomeLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.tinTuc,
//     element: <TinTucPageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.danhgiahailong,
//     element: <DanhGiaHaiLongLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.trangWiki,
//     element: <TrangWikiWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.tinbai,
//     element: <TinBaiPortalWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.hoidap,
//     element: <HoiDapPageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.hoidapchitiet,
//     element: <HoiDapChiTietLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.danhmucTTHC,
//     element: <DanhMucThuTucPortalWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.danhSachPAKN,
//     element: <DanhSachPaknLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.traCuu,
//     element: <TraCuuHoSoPortalWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.traCuuBienLaiDienTu,
//     element: <TraCuuBienLaiDienTuPortalWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.dvcTrucTuyen,
//     element: <DichVuCongTrucTuyenWrapperLazy />,
//   },

//   {
//     path: primaryRoutes.portaldvc.thanhToan,
//     element: <ThanhToanPortalWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.huongdansudungportal,
//     element: <HuongDanSuDungPageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.guiPAKN,
//     element: <GuiPaknLazy />,
//   },
//   // {
//   //   path: primaryRoutes.portaldvc.danhSachPAKN,
//   //   element: <DanhSachPaknLazy />,
//   // },
//   {
//     path: primaryRoutes.portaldvc.nopHoSoTrucTuyen,
//     element: <TiepNhanTrucTuyenWrapperLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.thongke,
//     element: <ThongKePageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.thongkeMap,
//     element: <ThongKeMapPageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.xacNhanThanhToan,
//     element: <XacNhanThanhToanPortalLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.nhungcauhoithuonggap,
//     element: <NhungCauHoiThuongGapPageLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.nhungcauhoithuonggapchitiet,
//     element: <NhungCauHoiThuongGapChiTietLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.dstailieuhuongdansudung,
//     element: <DSTaiLieuHDSDLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.quanlyvanban,
//     element: <QuanLyVanBanLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.lienhecaphuyenxa,
//     element: <LienHeCapHuyenXaLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.lienhecaptinh,
//     element: <LienHeCapTinhLazy />,
//   },
//   {
//     path: primaryRoutes.portaldvc.dvcQuocGia,
//     element: <DVCQuocGia />,
//   },
// ];
