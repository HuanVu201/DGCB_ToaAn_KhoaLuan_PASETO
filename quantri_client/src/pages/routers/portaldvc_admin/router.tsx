import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const {apiEndpoints, primaryRoutes} = Service
// const BannerLazy = lazy(() => import("./banner"))
// const FooterLazy = lazy(() => import("./Footer"))
// // const KieuNoiDungLazy = lazy(() => import("./KieuNoiDung"))
// // const KenhTinLazy = lazy(() => import("./KenhTin"))
// // const TrangThaiLazy = lazy(() => import("./TrangThai"))
// // const TinBaiLazy = lazy(() => import("./TinBai"))
// const HuongDanSuDungLazy = lazy(() => import("./HuongDanSuDung"))

export const bannerRoutes: RouteObject[] = [
    // {
    //     path: primaryRoutes.portaldvc_admin.banner,
    //     element: <BannerLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.footer,
    //     element: <FooterLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.kieunoidung,
    //     element: <KieuNoiDungLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.kenhtin,
    //     element: <KenhTinLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.trangthai,
    //     element: <TrangThaiLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.tinbai,
    //     element: <TinBaiLazy />
    // },
    // {
    //     path: primaryRoutes.portaldvc_admin.huongdansudung,
    //     element: <HuongDanSuDungLazy />
    // },
]