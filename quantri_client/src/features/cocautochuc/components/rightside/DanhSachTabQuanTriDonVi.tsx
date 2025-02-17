import { AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { DanhSachNguoiDung } from "./DanhSachNguoiDung";
import { ZoomComponent } from "@/components/common";
import { ThongTin } from "./ThongTin";
import { AddUser, SetRoles } from "../button";
import { Space } from "antd";
import { DanhSachNguoiDungQuanTriDonVi } from "./DanhSachNguoiDungQTDV";
const TINBAI_TABS: IAntdTabsProps["items"] = [
  {
    label: "Người dùng",
    key: "nguoi-dung",
   // children: <DanhSachNguoiDungQuanTriDonVi />,
   children: <DanhSachNguoiDung />,
  },
  // {
  //   label: "Phân quyền",
  //   key: "phan-quyen",
  //   children: <></>,
  // },
  {
    label: "Thông tin",
    key: "thong-tin",
    children: <ThongTin />,
  },
];

const TabTitle = () => {
  return (
    <Space size="small">
      <AddUser />
      <SetRoles />
    </Space>
  );
};

export const DanhSachTabQuanTriDonVi = () => {
  return (
    <ZoomComponent onRefresh={() => {}} title={<TabTitle />}>
      <AntdTab
        size="small"
        style={{ marginBottom: 32 }}
        type="card"
        items={TINBAI_TABS}
      />
    </ZoomComponent>
  );
};
