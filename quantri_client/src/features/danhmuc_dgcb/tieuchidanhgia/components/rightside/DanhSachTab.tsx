import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { ZoomComponent } from '@/components/common'
import { TieuChiDanhGiaChiTiet } from './TieuChiDanhGiaChiTiet'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { useEffect } from 'react'
import { GetTieuChiDanhGia } from '../../redux/action'
import { useTieuChiDanhGiaContext } from '../../contexts/TieuChiDanhGiaContext'
const SCREEN_TABS: IAntdTabsProps["items"] = [{
  label: "Thông tin TieuChiDanhGia",
  key: "tieuchidanhgia-chi-tiet",
  children: <TieuChiDanhGiaChiTiet />
},
  // {
  //   label: "Phân quyền",
  //   key:"phan-quyen",
  //   children: <></>
  // }, 
  // {
  //   label: "Thông tin",
  //   key:"thong-tin",
  //   children: <ThongTin/>
  // }
]

export const DanhSachTab = () => {

  return <ZoomComponent onRefresh={() => { }}>
    <AntdTab size='small' style={{ marginBottom: 32 }} type="card" items={SCREEN_TABS} />
  </ZoomComponent>
}