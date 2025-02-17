import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const TTDVChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/ChamDiemThuTruongDonVi/components/ChamDiemThuTruongDonViTable")
);

export const chamDiemThuTruongDonViRouters: RouteObject[] = [
  {
    path: primaryRoutes.danhGiaCanBo.chamDiemThuTruongDonVi.root,
    element: <TTDVChamDiemTableLazy />
  },
  
]
