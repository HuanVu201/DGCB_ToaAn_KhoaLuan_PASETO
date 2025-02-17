import { useAppSelector } from "@/lib/redux/Hooks";
import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Login, RequiredAuth } from "../../features/auth/components";
import React, { Suspense } from "react";
import { MasterLayout } from "../../components/layout";
import { Service } from "@/services";
import {
  quanTriNguoiDungRouters,
  danhMucDungChungRouters,
  quanTriDonViRouters,
  thongKeQuanTriRouters,
  quyTrinhXuLyRouters,
  quanLyMauPhoiRouters,
} from "./admin";
import {
  tuChamDiemRouters,
  lanhDaoTrucTiepChamDiemRouters,
  lanhDaoDonViChamDiemRouters,
  chamDiemThuTruongDonViRouters,
  danhGiaDonViRouters,
  danhGiaToanDonViRouters,
  hoSoCongTacRouters,
  khieuNaiKienNghiRouters,
  giaHanDanhGiaRouters
} from "./danhGiaCanBo";
import { thongKeRouters } from "./thongke/thongKe";
import { cauHinhHeThongRouters } from "./admin/cauHinhHeThong";

import { RedirectUser } from "./RedirectUser";
import { DynamicImportFailBoundary } from "./DynamicImportFailBoundary";
import { lazy } from "@/utils/lazyLoading";
import { FileGetterComponent } from "../file/FileGetterComponent";
import { quanLyTruyCapDgcbRouters } from "./admin/quanLyTruyCapDgcb";
import DashBoardWrapper from "@/features/dashboard/components/DashBoardWrapper";
import { nhomDonViRouters } from "./admin/nhomDonVi";

const { apiEndpoints, primaryRoutes } = Service;

export const MyRouterProvider = () => {
  const routes: RouteObject[] = [
    {
      path: primaryRoutes.redirectUser,
      element: <RedirectUser />,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<></>}>
          <RequiredAuth>
            <MasterLayout />
          </RequiredAuth>
        </Suspense>
      ),
      errorElement: <DynamicImportFailBoundary />,
      children: [
        {
          index: true,
          element: <Navigate to={primaryRoutes.redirectUser} />,
        },
        {
          path: primaryRoutes.admin.root,
          children: [
            ...quyTrinhXuLyRouters(),
            ...quanTriNguoiDungRouters(),
            ...danhMucDungChungRouters(),
            ...cauHinhHeThongRouters(),
            ...quanLyTruyCapDgcbRouters(),
            ...quanTriDonViRouters(),
            ...quanLyMauPhoiRouters(),
            ...nhomDonViRouters(),
          ],
        },
        {
          path: primaryRoutes.danhGiaCanBo.root,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={primaryRoutes.danhGiaCanBo.tuChamDiem.canBoTuDanhGia}
                  replace={true}
                />
              ),
            },
            ...tuChamDiemRouters,
            ...lanhDaoTrucTiepChamDiemRouters,
            ...lanhDaoDonViChamDiemRouters,
            ...chamDiemThuTruongDonViRouters,
            ...danhGiaDonViRouters,
            ...danhGiaToanDonViRouters,
            ...hoSoCongTacRouters,
            ...khieuNaiKienNghiRouters,
            ...giaHanDanhGiaRouters
            // viết tiếp các router Đánh giá cán bộ tại đây
          ],
        },
        {
          path: primaryRoutes.thongkeDgcb.root,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={primaryRoutes.thongkeDgcb.thongBaoDanhGiaCoQuan}
                  replace={true}
                />
              ),
            },
            ...thongKeRouters,
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: 
      (<RequiredAuth>
        <DashBoardWrapper />
      </RequiredAuth> ),
    },
    {
      path: primaryRoutes.file.root,
      element: <RequiredAuth>
        <FileGetterComponent></FileGetterComponent>
      </RequiredAuth>
    },
  ];
  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      future={{ v7_startTransition: true }}
    />
  );
};
