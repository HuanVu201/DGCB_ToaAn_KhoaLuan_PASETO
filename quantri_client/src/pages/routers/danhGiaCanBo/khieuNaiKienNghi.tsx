import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const KhieuNaiKienNghiTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/KhieuNaiKienNghiDanhGia/components/KhieuNaiKienNghi/KhieuNaiKienNghiTable")
);
const XuLyKhieuNaiKienNghiTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/KhieuNaiKienNghiDanhGia/components/XuLyKhieuNaiKienNghi/XuLyKhieuNaiKienNghiTable")
);

export const khieuNaiKienNghiRouters: RouteObject[] = [
    {
        path: primaryRoutes.danhGiaCanBo.khieuNaiKienNghiDanhGia.khieuNaiKienNghi,
        element: <KhieuNaiKienNghiTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.khieuNaiKienNghiDanhGia.xuLyKhieuNaiKienNghi,
        element: <XuLyKhieuNaiKienNghiTableLazy />
    },

]
