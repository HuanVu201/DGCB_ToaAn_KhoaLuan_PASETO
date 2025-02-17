import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service
const CoCauToChucLazy = lazy(() => import('../../../features/cocautochuc/components/CoCauToChucDonViWrapper'))
const NhomNguoiDungLazy = lazy(() => import('../../../features/nhomnguoidung/quantridonvi/NhomNguoiDungDonViTable'))
const UserLazy = lazy(() => import('../../../features/danhsachnguoidung/UserQuanTriDonViWrapper'))
export const quanTriDonViRouters = (): RouteObject[] => {
    
    return  [
        {
            path: primaryRoutes.admin.quanTriDonVi.danhMucCoCauToChuc,
            element: <CoCauToChucLazy role='don-vi' />
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.nhomnguoidung,
            element: <NhomNguoiDungLazy></NhomNguoiDungLazy>
        },
        {
            path: primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung,
            element: <UserLazy></UserLazy>
        },
    ]
}