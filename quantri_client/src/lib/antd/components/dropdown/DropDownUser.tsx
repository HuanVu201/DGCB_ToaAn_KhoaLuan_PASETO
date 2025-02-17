import React, { Suspense, useEffect, useState } from "react";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { resetData } from "@/features/auth/redux/Slice";
import { logout, resetData as resetDataUser } from "@/features/user/redux/Slice";
import { Link, useNavigate } from "react-router-dom";
import { Service } from "@/services";
import { AntdModal, AntdSpace } from "..";
import { resetPublicModule } from "@/features/config/redux/slice";
import { useMainContext } from "../layout/context/MainContext";
import { resetModule } from "@/features/danhmucmenu/redux/slice";
import { userService } from "@/features/user/services";
import { lazy } from "@/utils/lazyLoading";
import { toast } from "react-toastify";
const { apiEndpoints, primaryRoutes } = Service;

const items: MenuProps["items"] = [
  {
    label: "Thông tin người dùng",
    key: "thong-tin-nguoi-dung",
  },
  // {
  //   label: "Quản lý tài nguyên",
  //   key: "quan-ly-tai-nguyen",
  // },
  // {
  //   label: "Cá nhân hóa",
  //   key: "ca-nhan-hoa-nguoi-dung",
  // },
  {
    label: "Chuyển vai trò",
    key: "chuyen-vai-tro",
  },
  {
    label: "Đổi mật khẩu",
    key: "doi-mat-khau",
  },
  {
    label: "Thoát",
    key: "dang-xuat",
  },
];

const DoiMatKhauLazy = lazy(
  () => import("../../../../features/user/components/DoiMatKhau")
);
const ThongTinNguoiDungLazy = lazy(
  () => import("../../../../features/user/components/ThongTinNguoiDung")
);

const ChuyenVaiTroModal = lazy(
  () => import("../../../../features/user/components/ChuyenVaiTroModal")
);

export const DropDownUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useAppSelector((state) => state.user);
  const { data: auth, parseToken } = useAppSelector((state) => state.auth);
  const { publicModule: config } = useAppSelector(state => state.config)
  const [caNhanHoa, setCaNhanHoa] = useState<boolean>(false);
  const hostPath: string = `${window.location.host}`
  const [forcePasswordChange, SetForcePasswordChange] = useState<boolean>(false);
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ca-nhan-hoa-nguoi-dung' && item.content == '1') {
        setCaNhanHoa(true)
      }
    })
  }, [config])
  useEffect(() => {
    if(user?.forcePasswordChange == "True" || user?.forcePasswordChange == true)
    {
      SetForcePasswordChange(true)
    }
    else 
    {
      SetForcePasswordChange(false)
    }
  }, [user?.forcePasswordChange])
  const mainContext = useMainContext();
  const handleDropdownItemClick = async (e: any) => {
    if (e.key == "dang-xuat") {
      if (hostPath.includes('localhost')) {
        dispatch(logout())
        if (auth?.token) {
          await userService.LogoutSSO({ access_token: auth.token })

        }
        
      } else {
        if (top?.window) {
          top.location = `/logout?accessToken=${auth?.token}`;
        }
        else {
          dispatch(logout())
          if (auth?.token) {
            await userService.LogoutSSO({ access_token: auth.token })
          }
        }
      }
    }
    if (e.key == "doi-mat-khau") {
      // navigate(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
      mainContext.setChangePasswordModalVisible(true);
    }
    if (e.key == "thong-tin-nguoi-dung") {
      //   navigate(primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan);
      mainContext.setUserInfoModalVisible(true);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
    }
    if (e.key == "chuyen-vai-tro") {
      //   navigate(primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan);
      mainContext.setChuyenVaiTroModal(true);
      // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
    }
    // if (e.key == "quan-ly-tai-nguyen") {
    //   //   navigate(primaryRoutes.admin.quanTriNguoiDung.thongtintaikhoan);
    //   mainContext.setQuanLyTaiNguyenModalVisible(true);
    //   // console.log(primaryRoutes.admin.quanTriNguoiDung.doimatkhau);
    // }
  };
  return (
    <>
      <Dropdown
        menu={{ items: items, onClick: handleDropdownItemClick }}
        trigger={["click"]}
      >
        <AntdSpace
          style={{
            cursor: "pointer",
            justifyContent: "end",
            whiteSpace: "nowrap",
            alignItems: 'center',
            marginLeft: '10px'
          }}
          className="user-header"
          align="end"
        >
          <i className="fa-solid fa-circle-user" style={{ fontSize: '25px', display: 'block', color: '#b1b1b1' }}></i>
          <p style={{ marginBottom: 0, fontSize: '15px', color: '#2A3342' }}>{ user?.fullName ||parseToken?.fullName || "User"}</p>
          <i className="fa-solid fa-angle-down"></i>
        </AntdSpace>
      </Dropdown>
      <Suspense fallback={<Spin spinning={true} indicator={<LoadingOutlined spin />}/>}>
        {mainContext.userInfoModalVisible ? (
          <AntdModal
            title="Thông tin người dùng"
            visible={mainContext.userInfoModalVisible}
            handlerCancel={() => {
              mainContext.setUserInfoModalVisible(false);
            }}
            width={800}
            footer={null}
          >
            <ThongTinNguoiDungLazy />
          </AntdModal>
        ) : null}
        {mainContext.changePasswordModalVisible ? (
          <AntdModal
            title="Đổi mật khẩu"
            visible={mainContext.changePasswordModalVisible}
            handlerCancel={() => {
              mainContext.setChangePasswordModalVisible(false);
            }}
            footer={null}
          >
            <DoiMatKhauLazy />
          </AntdModal>
        ) : null}
        {mainContext.chuyenVaiTroModal ? (
          <AntdModal
            title="Chọn vai trò"
            visible={mainContext.chuyenVaiTroModal}
            handlerCancel={() => {
              mainContext.setChuyenVaiTroModal(false);
            }}
            footer={null}
          >
            <ChuyenVaiTroModal />
          </AntdModal>
        ) : null}
          {forcePasswordChange == true ? (
          <AntdModal
            title="Đổi mật khẩu sau khi reset"
            visible={forcePasswordChange}
            // handlerCancel={() => {
            //   mainContext.setChangePasswordModalVisible(false);
            // }}
            footer={null}
          >
            <DoiMatKhauLazy />
          </AntdModal>
        ) : null}
      </Suspense>
    </>
  );
};
