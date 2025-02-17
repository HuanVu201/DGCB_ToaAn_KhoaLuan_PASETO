import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const ToanBoDanhGiaDonViTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/DanhGiaDonVi/components/ToanBoDanhGiaDonVi/ToanBoDanhGiaDonViTable")
);
const DanhGiaDaXoaTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/DanhGiaDonVi/components/DanhGiaDaXoa/DanhGiaDaXoaTabe")
);

export const danhGiaToanDonViRouters: RouteObject[] = [
    {
        path: primaryRoutes.danhGiaCanBo.danhGiaToanDonVi.toanBo,
        element: <ToanBoDanhGiaDonViTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.danhGiaToanDonVi.dgdvDaXoa,
        element: <DanhGiaDaXoaTableLazy />
    },

]
