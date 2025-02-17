import { useAppSelector } from "@/lib/redux/Hooks";
import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

const { primaryRoutes } = Service;
const CoCauToChucLazy = lazy(
  () => import("../../../features/cocautochuc/components/CoCauToChucWrapper")
);
const DanhMucDonViLazy = lazy(
  () => import("../../../features/cocautochuc/components/DanhMucDonViWrapper")
);
const CoCauToChucDVLazy = lazy(
  () => import("../../../features/cocautochuc/components/CoCauToChucDonViWrapper")
);
const VaiTroLazy = lazy(
  () => import("../../../features/vaitro/components/VaiTroWrapper")
);
const ChuaPhanQuyenNguoiDungDanhGiaLazy = lazy(
  () => import("../../../features/lstusers/components/chuaPhanQuyenDanhGia/NotPermissionDanhGiaTable")
);
const ChuaPhanQuyenNguoiDungLazy = lazy(
  () => import("../../../features/lstusers/components/chuaPhanQuyen/NotPermissionTable")
);
const UserNotBuocXulyLazy = lazy(
  () => import("../../../features/lstusers/components/UserNotBuocXuly/UserNotBuocXuLyTable")
);
const DoiMatKhauLazy = lazy(
  () => import("../../../features/user/components/DoiMatKhau")
);
const ThongTinNguoiDungLazy = lazy(
  () => import("../../../features/user/components/ThongTinNguoiDung")
);
const DanhSachNguoiDungLazy = lazy(
  () => import("../../../features/danhsachnguoidung/UserWrapper")
);


export const quanTriNguoiDungRouters = (): RouteObject[] => {
  const { data: user } = useAppSelector(state => state.user)
  return [
    {
      path: primaryRoutes.admin.quanTriNguoiDung.coCauToChuc,
      element: <CoCauToChucLazy role='root.admin' />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.vaiTro,
      element: <VaiTroLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.chuaPhanQuyenDanhGia,
      element: <ChuaPhanQuyenNguoiDungDanhGiaLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.chuaPhanQuyen,
      element: <ChuaPhanQuyenNguoiDungLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.userNotBuocXuLy,
      element: <UserNotBuocXulyLazy />
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.coCauToChucDV,
      element: <CoCauToChucDVLazy role='don-vi' />
    },
    //DanhMucDonViWrapper
    {
      path: primaryRoutes.admin.quanTriNguoiDung.danhsachnguoidung,
      element: <DanhSachNguoiDungLazy/>
    },
    {
      path: primaryRoutes.admin.quanTriNguoiDung.danhMucDonVi,
      element: <DanhMucDonViLazy  role='root.admin'/>
    },
  ]
}
