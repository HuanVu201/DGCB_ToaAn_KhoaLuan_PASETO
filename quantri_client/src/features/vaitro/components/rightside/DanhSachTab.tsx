import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { DanhSachVaiTro } from './DanhSachVaiTro'
import { ZoomComponent } from '@/components/common'
import { DanhMucQuyen } from './DanhMucQuyen'
const TINBAI_TABS: IAntdTabsProps["items"] = [{
  label: "Người dùng",
  key: "nguoi-dung",
  children: <DanhSachVaiTro />
// }, {
//   label: "Danh mục quyền",
//   key: "danh-muc-quyen",
//   children: <DanhMucQuyen></DanhMucQuyen>
// }
}
]

export const DanhSachTab = () => {
  return <ZoomComponent onRefresh={() => { }}>
    <AntdTab size='small' style={{ marginBottom: 32 }} type="card" items={TINBAI_TABS} />
  </ZoomComponent>
}