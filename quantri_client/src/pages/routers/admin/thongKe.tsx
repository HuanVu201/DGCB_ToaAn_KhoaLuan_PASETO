import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service

export const thongKeQuanTriRouters = (): RouteObject[] => {

    return  [
        // {
        //     path: primaryRoutes.admin.thongke.danhGiaHaiLong,
        //     element: <ThongKeDanhGiaHaiLongLazy></ThongKeDanhGiaHaiLongLazy>
        // },
        // {
        //     path: primaryRoutes.admin.thongke.dashboardlienthongdvc,
        //     element: <DashboardPublicLazy></DashboardPublicLazy>
        // },
        // {
        //     path: primaryRoutes.admin.thongke.logdeleteduser,
        //     element: <DeletedUserLazy></DeletedUserLazy>
        // },
    ]
   
}