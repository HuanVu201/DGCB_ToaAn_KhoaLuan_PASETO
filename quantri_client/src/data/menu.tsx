import { MenuProps } from "antd/es/menu";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  ContainerOutlined,
  UserOutlined,
  FormOutlined,
  IssuesCloseOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  ExportOutlined,
  DollarOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  PlusOutlined,
  StepForwardOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SwapOutlined,
  DeleteOutlined,
  FastForwardOutlined,
  RollbackOutlined,
  CheckOutlined,
  StopOutlined,
  StepBackwardOutlined,
  RetweetOutlined,
  LogoutOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import { Service } from "@/services";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { resetData } from "@/features/auth/redux/Slice";
import resetDataUser from "../features/user/redux/Slice";
import { Link } from "react-router-dom";
const { apiEndpoints, primaryRoutes } = Service;

export const ICON_HOLDER_KEYS = {
  FormOutlined: "FormOutlined",
  IssuesCloseOutlined: "IssuesCloseOutlined",
  EyeOutlined: "EyeOutlined",
  PlayCircleOutlined: "PlayCircleOutlined",
  ExportOutlined: "ExportOutlined",
  DollarOutlined: "DollarOutlined",
  SearchOutlined: "SearchOutlined",
  MenuUnfoldOutlined: "MenuUnfoldOutlined",
  StarOutlined: "StarOutlined",
  SettingOutlined: "SettingOutlined",
  UserOutlined: "UserOutlined",
  PlusOutlined: "PlusOutlined",
  StepForwardOutlined: "StepForwardOutlined",
  EditOutlined: "EditOutlined",
  CloudUploadOutlined: "CloudUploadOutlined",
  SwapOutlined: "SwapOutlined",
  DeleteOutlined: "DeleteOutlined",
  FastForwardOutlined: "FastForwardOutlined",
  RollbackOutlined: "RollbackOutlined",
  CheckOutlined: "CheckOutlined",
  StopOutlined: "StopOutlined",
  StepBackwardOutlined: "StepBackwardOutlined",
  RetweetOutlined: "RetweetOutlined",
  LogoutOutlined: "LogoutOutlined",
  FileDoneOutlined: "FileDoneOutlined",
  AlignCenterOutlined: "AlignCenterOutlined",
} as const;

export const ICON_HOLDER: Record<
  keyof typeof ICON_HOLDER_KEYS,
  React.JSX.Element
> = {
  FormOutlined: <FormOutlined />,
  IssuesCloseOutlined: <IssuesCloseOutlined />,
  EyeOutlined: <EyeOutlined />,
  PlayCircleOutlined: <PlayCircleOutlined />,
  ExportOutlined: <ExportOutlined />,
  DollarOutlined: <DollarOutlined />,
  SearchOutlined: <SearchOutlined />,
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  StarOutlined: <StarOutlined />,
  SettingOutlined: <SettingOutlined />,
  UserOutlined: <UserOutlined />,
  PlusOutlined: <PlusOutlined />,
  StepForwardOutlined: <StepForwardOutlined />,
  EditOutlined: <EditOutlined />,
  CloudUploadOutlined: <CloudUploadOutlined />,
  SwapOutlined: <SwapOutlined />,
  DeleteOutlined: <DeleteOutlined />,
  FastForwardOutlined: <FastForwardOutlined />,
  RollbackOutlined: <RollbackOutlined />,
  CheckOutlined: <CheckOutlined />,
  StopOutlined: <StopOutlined />,
  StepBackwardOutlined: <StepBackwardOutlined />,
  RetweetOutlined: <RetweetOutlined />,
  LogoutOutlined: <LogoutOutlined />,
  FileDoneOutlined: <FileDoneOutlined />,
  AlignCenterOutlined: <AlignCenterOutlined></AlignCenterOutlined>,
};

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: keyof typeof ICON_HOLDER_KEYS,
  children?: MenuItem[],
  title?: string,
  type?: "group"
): MenuItem {
  return {
    title: title ? title : label,
    key,
    icon: icon ? ICON_HOLDER[icon] : "",
    children,
    label,
    type,
  } as MenuItem;
}

export const SIDER_MENU_ADMIN: MenuProps["items"] = [
  getItem(
    "Quản trị người dùng",
    primaryRoutes.admin.quanTriNguoiDung.root,
    "UserOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.coCauToChuc}>
          Danh mục người dùng
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.coCauToChuc,
        undefined,
        undefined,
        "Danh mục người dùng"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.vaiTro}>
          Danh mục vai trò
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.vaiTro,
        undefined,
        undefined,
        "Danh mục vai trò"
      ),

      getItem(
        <Link to={primaryRoutes.admin.quanTriNguoiDung.taiKhoanTuCSDLDanCu}>
          TK từ CSDL dân cư
        </Link>,
        primaryRoutes.admin.quanTriNguoiDung.taiKhoanTuCSDLDanCu,
        undefined,
        undefined,
        "TK từ CSDL dân cư"
      ),
      // getItem(<Link to={ primaryRoutes.admin.quanTriNguoiDung.doimatkhau}>Đổi mật khẩu</Link>, primaryRoutes.admin.quanTriNguoiDung.doimatkhau),
    ]
  ),
  getItem(
    "Danh mục dùng chung",
    primaryRoutes.admin.danhMucDungChung.root,
    "MenuUnfoldOutlined",
    [
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=quoc-tich"}
        >
          Danh mục quốc tịch
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=quoc-tich",
        undefined,
        undefined,
        "Danh mục quốc tịch"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=dan-toc"}
        >
          Danh mục dân tộc
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=dan-toc",
        undefined,
        undefined,
        "Danh mục dân tộc"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-van"}
        >
          Danh mục học vấn
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-van",
        undefined,
        undefined,
        "Danh mục học vấn"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=chuc-vu"}
        >
          Danh mục chức vụ
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=chuc-vu",
        undefined,
        undefined,
        "Danh mục chức vụ"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-vi"}
        >
          Danh mục học vị
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=hoc-vi",
        undefined,
        undefined,
        "Danh mục học vị"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=lanh-dao"}
        >
          Danh mục lãnh đạo
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=lanh-dao",
        undefined,
        undefined,
        "Danh mục lãnh đạo"
      ),
      getItem(
        <Link
          to={
            primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=nghe-nghiep"
          }
        >
          Danh mục nghề nghiệp
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=nghe-nghiep",
        undefined,
        undefined,
        "Danh mục nghề nghiệp"
      ),
      getItem(
        <Link
          to={primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=ton-giao"}
        >
          Danh mục tôn giáo
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMuc + "?type=ton-giao",
        undefined,
        undefined,
        ">Danh mục tôn giáo"
      ),
      getItem(
        <Link to={primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi}>
          Danh mục ngày nghỉ
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMucNgayNghi,
        undefined,
        undefined,
        "Danh mục ngày nghỉ"
      ),
      getItem(
        <Link to={primaryRoutes.admin.danhMucDungChung.danhMucDiaBan}>
          Danh mục địa bàn
        </Link>,
        primaryRoutes.admin.danhMucDungChung.danhMucDiaBan,
        undefined,
        undefined,
        "Danh mục địa bàn"
      ),
    ]
  ),
 
  getItem(
    "Quản trị khác",
    primaryRoutes.admin.quanTri.root,
    "SettingOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTri.danhSachMenu}>
          Danh sách menu
        </Link>,
        primaryRoutes.admin.quanTri.danhSachMenu,
        undefined,
        undefined,
        "Danh sách menu"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.action}>Quản trị action</Link>,
        primaryRoutes.admin.quanTri.action,
        undefined,
        undefined,
        "Quản trị action"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.screen}>Quản trị screen</Link>,
        primaryRoutes.admin.quanTri.screen,
        undefined,
        undefined,
        "Quản trị screen"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTri.config}>Quản trị cấu hình</Link>,
        primaryRoutes.admin.quanTri.config,
        undefined,
        undefined,
        "Quản trị config"
      ),
    ]
  ),
  getItem(
    "Quản trị đơn vị",
    primaryRoutes.admin.quanTriDonVi.root,
    "AlignCenterOutlined",
    [
      getItem(
        <Link to={primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung}>
          Quản trị người dùng{" "}
        </Link>,
        primaryRoutes.admin.quanTriDonVi.danhMucNguoiDung,
        undefined,
        undefined,
        "Quản trị người dùng"
      ),
      getItem(
        <Link to={primaryRoutes.admin.quanTriDonVi.thuTuc}>
          Quản trị thủ tục
        </Link>,
        primaryRoutes.admin.quanTriDonVi.thuTuc,
        undefined,
        undefined,
        "Quản trị thủ tục"
      ),
    ]
  ),
];

export const LOGOUT_MENU: MenuProps["items"] = [
  getItem(
    "Quản trị hệ thống",
    primaryRoutes.admin.quanTriNguoiDung.root,
    "FormOutlined",
    [
      getItem("Đăng xuất", "dangxuat"),
      getItem("Đổi mật khẩu", primaryRoutes.admin.quanTriNguoiDung.vaiTro),
    ]
  ),
];
