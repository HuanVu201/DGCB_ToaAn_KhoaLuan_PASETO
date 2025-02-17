import { useMemo, useState } from "react";
import { ISearchUser, IUser } from "../../user/models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space, TableColumnsType, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import {
  AdminResetPassword,
  DeleteUser,
  SearchUser,
} from "../../user/redux/Actions";
import { IBasePagination } from "../../../models";
import { useUserContext } from "../contexts/UserContext";
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from "@/data";
import { toast } from "react-toastify";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { UserGroupResponse } from "@/models/userGroup";

export const useColumn = (pagination: ISearchUser) => {
  const dispatch = useAppDispatch();
  const coCauModalContext = useCoCauModalContext();

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
        title:<p style={{textAlign : 'center'}}>Họ tên</p>,
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title:<p style={{textAlign : 'center'}}>Tài khoản</p>,
        key: "userName",
        dataIndex: "userName",
      },
      {
        title:<p style={{textAlign : 'center'}}>Chức vụ</p>,
        key: "tenChucVu",
        dataIndex: "tenChucVu",
      },
      {
        title:<p style={{textAlign : 'center'}}>Chức danh</p>,
        key: "tenChucDanh",
        dataIndex: "tenChucDanh",
      },
      {
        title:<p style={{textAlign : 'center'}}>Phòng ban</p>,
        key: "tenPhongBan",
        dataIndex: "tenPhongBan",
      },
      {
        title:<p style={{textAlign : 'center'}}>Đơn vị</p>,
        key: "tenDonVi",
        dataIndex: "tenDonVi",
      },
      // {
      //   title: "Thao tác",
      //   dataIndex: "",
      //   width: "10%",
      //   align: "center",
      //   key: "",
      //   render: (_, record) => (
      //     <Space direction="horizontal">
      //       <EditOutlined
      //         style={{ color: "cornflowerblue" }}
      //         title="Xem chi tiết/Sửa"
      //         onClick={() => {
      //           coCauModalContext.setSelectedUser(record);
      //           coCauModalContext.setShowModalUserCU({
      //             id: record.id,
      //             visible: true,
      //           });
      //         }}
      //       />
      //       <Popconfirm
      //         title="Đặt lại mật khẩu?"
      //         onConfirm={async () => {
      //           var res = await dispatch(
      //             AdminResetPassword(record.id)
      //           ).unwrap();
      //           if (res.succeeded)
      //             toast.success(
      //               `Thành công! mật khẩu mặc định là: ${res.message}`
      //             );
      //         }}
      //         okText="Đặt lại mật khẩu"
      //         cancelText="Huỷ"
      //       >
      //         <RollbackOutlined
      //           style={{ color: "orange" }}
      //           title="Đặt lại mật khẩu"
      //           // onClick={() => {
      //           //   coCauModalContext.setSelectedUser(record);
      //           //   coCauModalContext.setModalAdminResetPasswordVisible(true);
      //           // }}
      //         />
      //       </Popconfirm>

      //       <SwapOutlined
      //         style={{ color: "primary" }}
      //         title="Chuyển nhóm"
      //         onClick={() => {
      //           coCauModalContext.setSelectedUser(record);
      //           coCauModalContext.setModalChuyenNhomVisible(true);
      //         }}
      //       />
      //       <Popconfirm
      //         title="Xoá?"
      //         onConfirm={async () => {
      //           var delRes = await dispatch(
      //             DeleteUser({ id: record.id, forceDelete: false })
      //           ).unwrap();

      //           await dispatch(SearchUser(pagination));
      //         }}
      //         okText="Xoá"
      //         cancelText="Huỷ"
      //       >
      //         <DeleteOutlined style={{ color: "tomato" }} />
      //       </Popconfirm>
      //     </Space>
      //   ),
      // },
    ];
  }, [pagination]);
  return { columns };
};
