import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const DanhGiaDonViTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/DanhGiaDonViPhongBan/components/TaoDanhGiaDonViPhongBan/DanhGiaDonViPhongBanTable")
);
const ThamMuuDanhGiaDonViTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/DanhGiaDonViPhongBan/components/ThamMuuDanhGiaDonViPhongBan/ThamMuuDanhGiaDonViPhongBanTable")
);
const DanhGiaXepLoaiDonViTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/DanhGiaDonViPhongBan/components/DanhGiaXepLoaiDonViPhongBan/DanhGiaXepLoaiDonViPhongBanTable")
);

export const danhGiaDonViRouters: RouteObject[] = [
    {
        path: primaryRoutes.danhGiaCanBo.danhGiaDonVi.danhGiaDonVi,
        element: <DanhGiaDonViTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.danhGiaDonVi.thamMuuDanhGiaDonVi,
        element: <ThamMuuDanhGiaDonViTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.danhGiaDonVi.danhGiaXepLoaiDonVi,
        element: <DanhGiaXepLoaiDonViTableLazy />
    },

]
