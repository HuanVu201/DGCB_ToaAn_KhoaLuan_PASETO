
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes, apiEndpoints } = Service
const ScreenActionLazy = lazy(() => import('../../../features/screenaction/components/ScreenActionWrapper'))
const ActionLazy = lazy(() => import('../../../features/action/components/ActionTable'))
const ConfigLazy = lazy(() => import('../../../features/config/components/ConfigTable'))
const MenuLazy = lazy(() => import('../../../features/danhmucmenu/components/MenuWrapper'))
const RoleLazy = lazy(() => import('../../../features/Roles/components/RolesTable'))
const CauHinhKySoLazy = lazy(() => import('../../../features/danhmuc_dgcb/cauhinhkyso/components/CauHinhKySoTable'))
const CauHinhHeThongLazy = lazy(
    () => import("../../../features/CauHinhHeThong/components/CauHinhHeThongTable")
  );
  
export const cauHinhHeThongRouters = (): RouteObject[] => {
    return [
        {
            path: primaryRoutes.admin.quanTri.action,
            element: <ActionLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.screen,
            element: <ScreenActionLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.config,
            element: <ConfigLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.danhSachMenu,
            element: <MenuLazy />
        },
        {
            path: primaryRoutes.admin.root + apiEndpoints.cauhinhhethongs,
            element: <CauHinhHeThongLazy />,
        },
        {
            path: primaryRoutes.admin.quanTri.role,
            element: <RoleLazy />
        },
        {
            path: primaryRoutes.admin.quanTri.cauhinhkyso,
            element: <CauHinhKySoLazy />
        },
    ]
}