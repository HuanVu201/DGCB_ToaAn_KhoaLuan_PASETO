import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const LanhDaoChoChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoTrucTiepChamDiem/components/LDNXChoNhanXetTable")
);
const LanhDaoDaChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoTrucTiepChamDiem/components/LDNXDaNhanXetTable")
);

export const lanhDaoTrucTiepChamDiemRouters: RouteObject[] = [
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoTrucTiepChamDiem.choChamDiem,
    element: <LanhDaoChoChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoTrucTiepChamDiem.daChamDiem,
    element: <LanhDaoDaChamDiemTableLazy />
  },
]
