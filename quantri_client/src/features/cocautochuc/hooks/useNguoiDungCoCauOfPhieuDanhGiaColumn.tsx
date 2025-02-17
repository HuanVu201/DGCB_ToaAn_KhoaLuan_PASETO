import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
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
import { UserGroupResponse } from "@/models/userGroup";

export const useCoCauUserOfPhieuDanhGia = (pagination: ISearchUser) => {
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
      // {
      //   title: "Chức vụ",
      //   key: "positionName",
      //   dataIndex: "positionName",
      // },
//       {
//         title: "Thao tác",
//         dataIndex: "",
//         width: "10%",
//         align: "center",
//         key: "",
//         render: (_, record) => (
//           <Space direction="horizontal">
//             <EyeOutlined 
//               style={{ color: "cornflowerblue" }}
//               title="Xem chi tiết"
//               onClick={() => {
//                 coCauModalContext.setSelectedUser(record);
//                 coCauModalContext.setShowModalUserCU({
//                   id: record.id,
//                   visible: true,
//                 });
//               }}
//             />
//             {/* <Popconfirm
//               title="Đặt lại mật khẩu?"
//               onConfirm={async () => {
//                 var res = await dispatch(
//                   AdminResetPassword(record.id)
//                 ).unwrap();
//                 if (res.succeeded)
//                   toast.success(
//                     `Thành công! mật khẩu mặc định là: ${res.message}`
//                   );
//               }}
//               okText="Đặt lại mật khẩu"
//               cancelText="Huỷ"
//             >
//               <RollbackOutlined
//                 style={{ color: "orange" }}
//                 title="Đặt lại mật khẩu"
//                 // onClick={() => {
//                 //   coCauModalContext.setSelectedUser(record);
//                 //   coCauModalContext.setModalAdminResetPasswordVisible(true);
//                 // }}
//               />
//             </Popconfirm> */}
// {/* 
//             <SwapOutlined
//               style={{ color: "primary" }}
//               title="Chuyển nhóm"
//               onClick={() => {
//                 coCauModalContext.setSelectedUser(record);
//                 coCauModalContext.setModalChuyenNhomVisible(true);
//               }}
//             /> */}
//             {/* <Popconfirm
//               title="Xoá?"
//               onConfirm={async () => {
//                 var delRes = await dispatch(
//                   DeleteUser({ id: record.id, forceDelete: false })
//                 ).unwrap();

//                 await dispatch(SearchUser(pagination));
//               }}
//               okText="Xoá"
//               cancelText="Huỷ"
//             >
//               <DeleteOutlined style={{ color: "tomato" }} />
//             </Popconfirm> */}
//           </Space>
//         ),
//       },
    ];
  }, [pagination]);
  return columns;
};
