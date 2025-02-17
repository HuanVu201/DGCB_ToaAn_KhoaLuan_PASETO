import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;

const HoSoCongTacCaNhanTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/HoSoCongTac/components/CaNhan/HoSoCongTacCaNhanTable")
);
const HoSoCongTacDonViTableLazy = lazy(
    () => import("../../../features/DanhGiaCanBo/components/HoSoCongTac/components/DonVi/HoSoCongTacDonViTable")
);

export const hoSoCongTacRouters: RouteObject[] = [
    {
        path: primaryRoutes.danhGiaCanBo.hoSoCongtacDanhGia.caNhan,
        element: <HoSoCongTacCaNhanTableLazy />
    },
    {
        path: primaryRoutes.danhGiaCanBo.hoSoCongtacDanhGia.donVi,
        element: <HoSoCongTacDonViTableLazy />
    },
]
