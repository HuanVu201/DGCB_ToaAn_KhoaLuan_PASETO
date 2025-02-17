import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { ZoomComponent } from '@/components/common'
import { MenuChiTiet } from './MenuChiTiet'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { useEffect } from 'react'
import { GetMenu } from '../../redux/action'
import { useMenuContext } from '../../contexts/MenuContext'
const SCREEN_TABS: IAntdTabsProps["items"] = [{
  label: "Thông tin Menu",
  key: "menu-chi-tiet",
  children: <MenuChiTiet />
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