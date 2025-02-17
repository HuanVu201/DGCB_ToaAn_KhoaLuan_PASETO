
import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { DanhSachVaiTro } from '@/features/vaitro/components/rightside/DanhSachVaiTro'
import { ZoomComponent } from '@/components/common'
import { DanhMucQuyen } from '@/features/vaitro/components/rightside/DanhMucQuyen'
import { SearchListUserByPermision } from './SearchListUserByPermision'
const TINBAI_TABS: IAntdTabsProps["items"] = [{
  label: "Người dùng",
  key: "nguoi-dung",
  children: <SearchListUserByPermision />
// }, {
//   label: "Danh mục quyền",
//   key: "danh-muc-quyen",
//   children: <DanhMucQuyen></DanhMucQuyen>
// }
}
]

 const UserTableByPermision = () => {
  return <ZoomComponent onRefresh={() => { }}>
    <AntdTab size='small' style={{ marginBottom: 32 }} type="card" items={TINBAI_TABS} />
  </ZoomComponent>
}

export default UserTableByPermision