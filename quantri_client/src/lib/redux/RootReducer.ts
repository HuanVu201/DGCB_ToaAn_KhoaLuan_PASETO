
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import auth from '../../features/auth/redux/Slice'
import user, { logout } from '../../features/user/redux/Slice'
import cocautochuc from '../../features/cocautochuc/redux/slice'
import nhomnguoidung from '../../features/nhomnguoidung/redux/slice'
import buocxuly from '../../features/buocxuly/redux/slice'
import cauhinhhethong from '../../features/CauHinhHeThong/redux/slice'
import menu from '../../features/danhmucmenu/redux/slice'

import vaitro from '../../features/vaitro/redux/slice'
import screen from '../../features/screen/redux/slice'
import action from '../../features/action/redux/slice'
import screenaction from '../../features/screenaction/redux/slice'
import nguoidungnhomnguoidung from '../../features/nguoidungnhomnguoidung/redux/slice'
import config from '../../features/config/redux/slice'
import danhmucdungchung from '../../features/danhmucdungchung/redux/slice'

import danhmuc_chucdanh from '@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/slice'
import danhmuc_chucvu from '@/features/danhmuc_dgcb/danhmuc_chucvu/redux/slice'
import danhmuc_trangthaidanhgia  from '@/features/danhmuc_dgcb/danhmuc_trangthaidanhgia/redux/slice'
import danhmuc_kieutieuchi from '@/features/danhmuc_dgcb/danhmuc_kieutieuchi/redux/slice'
import danhmuc_loaidiem from '@/features/danhmuc_dgcb/danhmuc_loaidiem/redux/slice'
import danhmuc_donvitinh  from '@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/slice'
import danhmuc_khotieuchi from '@/features/danhmuc_dgcb/danhmuc_khotieuchi/redux/slice'
import danhmuc_phieudanhgia from '@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice'
import danhmuc_xeploaidanhgia  from '@/features/danhmuc_dgcb/danhmuc_xeploaidanhgia/redux/slice'
import danhmuc_botieuchuan  from '@/features/danhmuc_dgcb/danhmuc_botieuchuan/redux/slice'
import cauhinhkyso  from '@/features/danhmuc_dgcb/cauhinhkyso/redux/slice'
import danhmuc_congviecchuyenmon from '@/features/danhmuc_dgcb/danhmuc_congviecchuyenmon/redux/slice'
import danhmuc_trangthaicongviec from '@/features/danhmuc_dgcb/danhmuc_trangthaicongviec/redux/slice'
import danhmuc_tailieuhuongdansudung from '@/features/danhmuc_dgcb/danhmuc_tailieuhuongdansudung/redux/slice'
import danhmuc_caccap  from '@/features/danhmuc_dgcb/danhmuc_caccap/redux/slice'
import dongbodulieu from '@/features/cachethongkhac/DongBoDuLieu/redux/slice'
import tieuchidanhgia  from '@/features/danhmuc_dgcb/tieuchidanhgia/redux/slice'
import logAuthen  from '@/features/quanlytruycapdvc/redux/slice'
import lstusers from '@/features/lstusers/redux/slice'
import danhmuc_thongkedanhgias from '@/features/thongkeDanhGia/redux/slice'
import sharedulieudanhgia from '@/features/cachethongkhac/ShareDuLieuDanhGia/redux/slice'
import historycallapitichhop from '@/features/cachethongkhac/HistoryCallApiTichHop/redux/slice'
import thongkekhieunai from '@/features/thongkeKhieuNai/redux/slice'
import auditlog from '@/features/auditlog/redux/slice'
import storage from 'redux-persist/lib/storage';
import userroles from '@/features/userroles/redux/slice'
import quytrinhxulys from '@/features/quytrinhxuly/redux/slice'
import kydanhgia from '@/features/danhmuc_dgcb/kydanhgia/redux/slice'
import dashboards from '@/features/dashboard/redux/slice'
import roles from '@/features/Roles/redux/slice'
import nhomdonvis from '@/features/nhomdonvi/redux/slice'
import { AnyAction } from '@reduxjs/toolkit';
import globalState from "./GlobalState";
export const appReducer = combineReducers({
  // user: persistReducer( {
  //     key: 'user',
  //     storage: storage,
  //     blacklist: ['userCDSLDanCu', 'donViThuTucUsers', 'datas']
  //   }, user),
  user: user,

  auth,
  cocautochuc,
  nhomnguoidung,
  buocxuly,
  cauhinhhethong,
  menu,
  vaitro,
  screen,
  screenaction,
  nguoidungnhomnguoidung,
  config,
  userroles,
  quytrinhxulys,
  danhmuc_chucdanh,
  danhmuc_chucvu,
  danhmuc_trangthaidanhgia,
  danhmuc_kieutieuchi,
  danhmuc_donvitinh,
  danhmuc_loaidiem,
  danhmuc_xeploaidanhgia,
  danhmuc_khotieuchi,
  danhmuc_phieudanhgia,
  danhmuc_botieuchuan,
  danhmuc_congviecchuyenmon,
  danhmuc_trangthaicongviec,
  danhmuc_tailieuhuongdansudung,
  tieuchidanhgia,
  lstusers,
  danhmuc_thongkedanhgias,
  danhmucdungchung,
  logAuthen,
  global: globalState,
  action,
  auditlog,
  danhmuc_caccap,
  dashboards,
  roles,
  sharedulieudanhgia,
  thongkekhieunai,
  historycallapitichhop,
  nhomdonvis,
  dongbodulieu,
  kydanhgia,
  cauhinhkyso,
})

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === logout.type) {
    return appReducer(undefined, { type: undefined });
  }

  return appReducer(state, action);
};

