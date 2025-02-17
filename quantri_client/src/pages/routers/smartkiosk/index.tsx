import { RouteObject } from "react-router-dom";
import { Service } from "@/services";
import { useAdminRoutes } from "../../utils/useAdminRoutes";
import { useAppSelector } from "@/lib/redux/Hooks";
import { NOTADMIN_ROUTE_ACCESS_TEXT } from "@/data";
import { lazy } from "@/utils/lazyLoading";


// const SmartKioskLazy = lazy(() => import("../../../features/smartkiosk/index"))


// const { apiEndpoints, primaryRoutes } = Service;

// export const smartKioskRoutes = (): RouteObject[] => {
//     const { data: user } = useAppSelector(state => state.user)
//     return useAdminRoutes({
//         routes: [
//             {
//                 path: primaryRoutes.smartkiosk.root,
//                 element: <SmartKioskLazy />,
//             },
//         ], condition: user?.typeUser != "Admin", replaceComponentWith: <>{NOTADMIN_ROUTE_ACCESS_TEXT}</>
//     })
// }
