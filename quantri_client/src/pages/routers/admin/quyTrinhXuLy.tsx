import { useAppSelector } from "@/lib/redux/Hooks";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const CaNhan = lazy(() => import('../../admin/quytrinhxuly/CaNhan'))
const DonVi = lazy(() => import('../../admin/quytrinhxuly/DonVi'))


export const quyTrinhXuLyRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.quyTrinhXuLy.caNhan,
      element: <CaNhan/>
    },
    {
      path: primaryRoutes.admin.quyTrinhXuLy.donVi,
      element: <DonVi/>
    },
  ]
}
