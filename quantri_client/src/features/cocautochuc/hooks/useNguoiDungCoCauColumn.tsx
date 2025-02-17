import React, { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  RollbackOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { IBasePagination } from "../../../models";
import { ISearchUser, IUser } from "@/features/user/models";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { DeleteCoCauToChuc } from "../redux/crud";
import { useCoCauModalContext } from "../contexts/CoCauModalContext";
import {
  AdminResetPassword,
  DeleteUser,
  SearchUser,
} from "@/features/user/redux/Actions";
import { toast } from "react-toastify";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";
import { userService } from "@/features/user/services";

export const useCoCauUser = (pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>>) => {
  const coCauModalContext = useCoCauModalContext();
  const dispatch = useAppDispatch();
  const columns = useMemo((): ColumnsType<UserGroupResponse> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Họ tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Tài khoản",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Chức vụ / Chức danh",
        key: "tenChucVu",
        dataIndex: "tenChucVu",
        render: (_, record) => {
          const tenChucVu = record.tenChucVu || '';  // Nếu null hoặc undefined thì trả về ''
          const tenChucDanh = record.tenChucDanh || '';  // Nếu null hoặc undefined thì trả về ''
      
          // Kiểm tra nếu có dữ liệu thì hiển thị, nếu không thì không hiển thị dấu gạch
          if (tenChucVu && tenChucDanh) {
            return <span>{tenChucVu} / {tenChucDanh}</span>;
          }
          
          // Nếu chỉ có một trong hai, chỉ hiển thị cái không null
          if (tenChucVu) {
            return <span>{tenChucVu}</span>;
          }
          if (tenChucDanh) {
            return <span>{tenChucDanh}</span>;
          }
          
          // Nếu cả hai đều null, không hiển thị gì
          return null;
        },
      },
      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết/Sửa"
              onClick={() => {
                console.log(record);
                coCauModalContext.setSelectedUser(record);
                coCauModalContext.setShowModalUserCU({
                  id: record.id,
                  visible: true,
                });
              }}
            />
            {/* <Popconfirm
              title="Đặt lại mật khẩu?"
              onConfirm={async () => {
                var res = await dispatch(
                  AdminResetPassword(record.id)
                ).unwrap();
                if (res.succeeded)
                  toast.success(
                    `Thành công! mật khẩu mới là: ${res.message}`
                  );
              }}
              okText="Đặt lại mật khẩu"
              cancelText="Huỷ"
            >
              <RollbackOutlined
                style={{ color: "orange" }}
                title="Đặt lại mật khẩu"
                // onClick={() => {
                //   coCauModalContext.setSelectedUser(record);
                //   coCauModalContext.setModalAdminResetPasswordVisible(true);
                // }}
              />
            </Popconfirm> */}
              <ReloadOutlined  title="Đặt lại mật khẩu?"   style={{ color: "green" }} 
                onClick={() => {
                  coCauModalContext.setSelectedUser(record);
                  coCauModalContext.setShowModalReSetPassWorld(true);
                }}
              />
            {/* <SwapOutlined
              style={{ color: "primary" }}
              title="Chuyển nhóm"
              onClick={() => {
                coCauModalContext.setSelectedUser(record);
                coCauModalContext.setModalChuyenNhomVisible(true);
              }}
            /> */}
            <Popconfirm
              title="Xoá?"
              onConfirm={async () => {
                try {
                  var delRes = await userService.DeleteAccount({
                    ids: [record.id]
                  })
                  if(delRes.data.succeeded){
                    setSearchParams((curr) => ({...curr}))
                  } else {
                    toast.warn(delRes.data.message)
                  }
                } catch (error) {
                  console.log(error);
                  toast.warn("Có lỗi xảy ra, vui lòng thử lại sau")
                }
              }}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <DeleteOutlined style={{ color: "tomato" }} />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [pagination]);
  return columns;
};

