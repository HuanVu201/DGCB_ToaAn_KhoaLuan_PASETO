import { Service } from "@/services";
import { lazy } from "@/utils/lazyLoading";
import { RouteObject } from "react-router-dom";

// Extract primaryRoutes from the service
const { primaryRoutes } = Service;

// Lazy-loaded components
const DanhMuc_ChucDanhLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_chucdanh/components/DanhMuc_ChuDanhTable")
);

const DanhMuc_ChucVuLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_chucvu/components/DanhMuc_ChucVuTable")
);

const DanhMuc_TrangThaiDanhGiaLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_trangthaidanhgia/components/DanhMuc_TrangThaiDanhGiaTable")
);

const DanhMuc_KieuTieuChiLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_kieutieuchi/components/DanhMuc_KieuTieuChiTable")
);

const DanhMuc_DonViTinhLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_donvitinh/components/DanhMuc_DonViTinhTable")
);

const DanhMuc_LoaiDiemLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_loaidiem/components/DanhMuc_LoaiDiemTable")
);

const DanhMuc_XepLoaiDanhGiaLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_xeploaidanhgia/components/DanhMuc_XepLoaiDanhGiaTable")
);

const DanhMuc_KhoTieuChiLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_khotieuchi/components/DanhMuc_KhoTieuChiWrapper")
);

const DanhMuc_PhieuDanhGiaLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_phieudanhgia/components/DanhMuc_PhieuDanhGiaTable")
);
const KyDanhGiaLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/kydanhgia/components/KyDanhGiaTable")
);
const DanhMuc_BoTieuChuanLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_botieuchuan/components/DanhMuc_BoTieuChuanTable")
);
const TieuChiDanhGiaLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/tieuchidanhgia/components/TieuChiDanhGiaWrapper")
 
);
const DanhMuc_CacCapLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_caccap/components/DanhMuc_CacCapTable")
 
);
const DanhMuc_CongViecChuyenMonLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_congviecchuyenmon/components/DanhMuc_CongViecChuyenMonTable")
 
);
const DanhMuc_TrangThaiCongViecLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_trangthaicongviec/components/DanhMuc_TrangThaiCongViecTable")
 
);
const DanhMuc_TaiLieuHuongDanSuDungLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_tailieuhuongdansudung/components/DanhMuc_TaiLieuHuongDanSuDungTable")
 
);
const DanhMuc_TaiLieuHuongDanSuDungViewLazy = lazy(
  () => import("../../../features/danhmuc_dgcb/danhmuc_tailieuhuongdansudung/components/DanhMuc_TaiLieuHuongDanSuDungTableView")
 
);
const NhomNguoiDungTable = lazy(
  () => import("../../../features/nhomnguoidung/components/NhomNguoiDungTable")
 
);
const ShareDuLieuDanhGiaLazy = lazy(
  () => import("../../../features/cachethongkhac/ShareDuLieuDanhGia/components/ShareDuLieuDanhGiaTable")
 
);
const DongBoDuLieuLazy = lazy(
  () => import("../../../features/cachethongkhac/DongBoDuLieu/components/DongBoDuLieuTable")
 
);
const DongBoCoCauLazy = lazy(
  () => import("../../../features/cachethongkhac/DongBoCoCau/dongBoCoCau")
 
);
const DongBoNguoiDungLazy = lazy(
  () => import("../../../features/cachethongkhac/DongBoNguoiDung/dongBoNguoiDung")
 
);
//const MenuLazy = lazy(() => import('../../../features/danhmucmenu/components/MenuWrapper'))
export const danhMucDungChungRouters = (): RouteObject[] => {
  return [
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_chucdanh,
      element: <DanhMuc_ChucDanhLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_chucvu,
      element: <DanhMuc_ChucVuLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_trangthaidanhgia,
      element: <DanhMuc_TrangThaiDanhGiaLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_kieutieuchis,
      element: <DanhMuc_KieuTieuChiLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_donvitinhs,
      element: <DanhMuc_DonViTinhLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_loaidiems,
      element: <DanhMuc_LoaiDiemLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_xeploaidanhgias,
      element: <DanhMuc_XepLoaiDanhGiaLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_botieuchuans,
      element: <DanhMuc_BoTieuChuanLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.tieuchidanhgias,
      element: <TieuChiDanhGiaLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_khotieuchis,
      element: <DanhMuc_KhoTieuChiLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_phieudanhgias,
      element: <DanhMuc_PhieuDanhGiaLazy />
    },
    {
      path: primaryRoutes.admin.danhMucDGCB.nhomnguoidungs,
      element: <NhomNguoiDungTable />
    }
    ,{
      path: primaryRoutes.admin.danhMucDGCB.danhmuc_caccaps,
      element: <DanhMuc_CacCapLazy />
    }
    ,{
      path: primaryRoutes.admin.danhMucDGCB.kydanhgia,
      element: <KyDanhGiaLazy />
    }
    ,{
      path: primaryRoutes.admin.danhmucQLCV.danhmuc_congviecchuyenmons,
      element: <DanhMuc_CongViecChuyenMonLazy />
    }
    ,{
      path: primaryRoutes.admin.danhmucQLCV.danhmuc_trangthaicongviecs,
      element: <DanhMuc_TrangThaiCongViecLazy />
    }
    ,{
      path: primaryRoutes.admin.danhmucQlTaiLieu.danhmuc_tailieuhuongdansudung,
      element: <DanhMuc_TaiLieuHuongDanSuDungLazy />
    }
    ,{
      path: primaryRoutes.admin.danhmucQlTaiLieu.danhmuc_tailieuhuongdansudungview,
      element: <DanhMuc_TaiLieuHuongDanSuDungViewLazy />
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.shareDuLieuDanhGia,
      element: <ShareDuLieuDanhGiaLazy extraSearchParams={{loaiDichVu: "ShareDuLieuDanhGia"}} />
      //loaiDichVu="ShareDuLieuDanhGia"
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.shareKetQuaDanhGia,
      element: <ShareDuLieuDanhGiaLazy extraSearchParams={{loaiDichVu: "ShareKetQuaDanhGia"}}/>
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.shareDuLieuVsTTGSDH,
      element: <ShareDuLieuDanhGiaLazy extraSearchParams={{loaiDichVu: "ShareDuLieuVsTTGSDH"}}/>
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.shareDuLieuDanhGiaKetQuaCacDoiTuong,
      element: <ShareDuLieuDanhGiaLazy extraSearchParams={{loaiDichVu: "ShareDuLieuDanhGiaKetQuaCacDoiTuong"}}/>
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.dongBoDuLieu.root,
      element: <DongBoDuLieuLazy/>
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.dongBoDuLieu.dongBoCoCau,
      element: <DongBoCoCauLazy/>
    }
    ,{
      path: primaryRoutes.admin.cacHeThongKhac.dongBoDuLieu.dongBoNguoiDung,
      element: <DongBoNguoiDungLazy/>
    }
  ];
};
