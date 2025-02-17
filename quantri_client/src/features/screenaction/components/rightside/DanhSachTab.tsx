import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { DanhSachAction } from './DanhSachAction'
import { ZoomComponent } from '@/components/common'
const SCREEN_TABS : IAntdTabsProps["items"] = [{
  label: "Danh sách action",
  key:"nguoi-dung",
  children: <DanhSachAction/>
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
    return <ZoomComponent onRefresh={() => {}}>
      <AntdTab size='small' style={{ marginBottom: 32 }} type="card" items={SCREEN_TABS} />
    </ZoomComponent>
}