import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const DanhSachGiaHanDanhGiaTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/GiaHanDanhGia/components/DanhSachGiaHanDanhGia/DanhSachGiaHanDanhGiaTable")
);
const XuLyGiaHanDanhGiaTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/GiaHanDanhGia/components/XuLyGiaHanDanhGia/XuLyGiaHanDanhGiaTable")
);

export const giaHanDanhGiaRouters: RouteObject[] = [
    {
        path: primaryRoutes.danhGiaCanBo.giaHanDanhGia.danhSachGiaHanDanhGia,
        element: <DanhSachGiaHanDanhGiaTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.giaHanDanhGia.xuLyGiaHanDanhGia,
        element: <XuLyGiaHanDanhGiaTableLazy />
    },

]
