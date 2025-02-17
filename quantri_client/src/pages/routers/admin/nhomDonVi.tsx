import { useAppSelector } from "@/lib/redux/Hooks";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const NhomDonVi = lazy(() => import('../../admin/nhomdonvi/NhomDonVi'))


export const nhomDonViRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.nhomDonVi.danhSach,
      element: <NhomDonVi/>
    },
  ]
}
