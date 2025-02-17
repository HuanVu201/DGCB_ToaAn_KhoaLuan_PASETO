
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service
const LoaiMauPhoiLazy = lazy(() => import('../../../features/quanlymauphoi/components/LoaiMauPhoi/LoaiMauPhoiTable'))
const MauPhoiLazy = lazy(() => import('../../../features/quanlymauphoi/components/MauPhoi/MauPhoiTable'))

export const quanLyMauPhoiRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.quanLymauPhoi.loaiPhoi,
            element: <LoaiMauPhoiLazy />
        },
        {
            path: primaryRoutes.admin.quanLymauPhoi.mauPhoi,
            element: <MauPhoiLazy />
        },
    ]
}