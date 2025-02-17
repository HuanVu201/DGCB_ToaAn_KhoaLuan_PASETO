import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const LanhDaoThamMuuChoChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoDonViChamDiem/components/LanhDaoThamMuu/components/LDTMChoThamMuuTable")
);
const LanhDaoThamMuuDaChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoDonViChamDiem/components/LanhDaoThamMuu/components/LDTMDaThamMuuTable")
);
const LanhDaoDanhGiaChoChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoDonViChamDiem/components/LanhDaoDanhGia/components/LDDGChoDanhGiaTable")
);
const LanhDaoDanhGiaDaChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/LanhDaoDonViChamDiem/components/LanhDaoDanhGia/components/LDDGDaDanhGiaTable")
);

export const lanhDaoDonViChamDiemRouters: RouteObject[] = [
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choThamMuu,
    element: <LanhDaoThamMuuChoChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.daThamMuu,
    element: <LanhDaoThamMuuDaChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choDanhGia,
    element: <LanhDaoDanhGiaChoChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.daDanhGia,
    element: <LanhDaoDanhGiaDaChamDiemTableLazy />
  },
]
