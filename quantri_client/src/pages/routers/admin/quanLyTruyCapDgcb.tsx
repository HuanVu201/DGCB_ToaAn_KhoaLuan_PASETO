
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service

const QuanLyTruyCapDgcbLazy = lazy(
  () => import("../../../features/quanlytruycapdvc/components/QuanLyTruyCapDgcbTable")
);
const DashBoarLazy = lazy(
  () => import("../../../features/dashboard/components/DashBoardWrapper")
);
const AuditLogLayzy = lazy(() => import("../../../features/auditlog/components/AuditLogTable"))

export const quanLyTruyCapDgcbRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.quanLyTruyCapDgcb.quanLyTruyCapDgcb,
      element: <QuanLyTruyCapDgcbLazy />
    },
    {
      path: primaryRoutes.admin.quanLyTruyCapDgcb.auditLog,
      element: <AuditLogLayzy />
    },
    {
      path: primaryRoutes.admin.quanLyTruyCapDgcb.dashboard,
      element: <DashBoarLazy />
    },
  ]
}