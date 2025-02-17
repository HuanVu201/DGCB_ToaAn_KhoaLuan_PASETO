import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const DanhSachChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/ToanBoChamDiemTable")
);
const ChoDanhGiaXepLoaiChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/ChoDanhGiaXepLoaiChamDiemTable")
);
const ChoLanhDaoTrucTiepChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/ChoLanhDaoTrucTiepChamDiemTable")
);
const DaDanhGiaXepLoaiChamDiemTableLazy = lazy(
  () => import("../../../features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/DaDanhGiaXepLoaiChamDiemTable")
);
export const tuChamDiemRouters: RouteObject[] = [
  {
    path: primaryRoutes.danhGiaCanBo.tuChamDiem.canBoTuDanhGia,
    element: <DanhSachChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.tuChamDiem.choLanhDaoTrucTiepCham,
    element: <ChoLanhDaoTrucTiepChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.tuChamDiem.choDanhGiaXepLoai,
    element: <ChoDanhGiaXepLoaiChamDiemTableLazy />
  },
  {
    path: primaryRoutes.danhGiaCanBo.tuChamDiem.daDanhGiaXepLoai,
    element: <DaDanhGiaXepLoaiChamDiemTableLazy />
  },
]
