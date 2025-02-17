import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IBasePagination } from "../../../models";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { DeleteVaiTro } from "../redux/action";
import { ISearchUserRoles, IUserRoles } from "@/features/userroles/models";
import { DeleteUser } from "@/features/user/redux/Actions";
import { useVaiTroModalContext } from "../contexts/VaiTroModalContext";
import { toast } from "react-toastify";

export const useVaiTro = (pagination: IBasePagination) => {
  const dispatch = useAppDispatch();
  const vaiTroModalContext = useVaiTroModalContext()
  const columns = useMemo((): ColumnsType<IUserRoles> => {
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
        title: "Phòng ban",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Đơn vị",
        key: "officeName",
        dataIndex: "officeName",
      },
      // {
      //   title: "Nhóm",
      //   key: "groupName",
      //   dataIndex: "groupName",
      // },
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
      //           // vaiTroModalContext.setRoleId(record.id)
      //           // vaiTroModalContext.setRoleModalVisible({
      //           //   id: record.id,
      //           //   visible: true,
      //           // })
      //           vaiTroModalContext.setSelectedUser(record);
      //           vaiTroModalContext.setShowModalUserCU({
      //             id: record.id,
      //             visible: true,
      //           });
      //         }}
      //       />
      //       <Popconfirm
      //         title="Xoá?"
      //         onConfirm={() => {
      //           toast.warn('Chức năng đang bị tắt!')
      //           // dispatch(DeleteUser({ id: record.id, forceDelete: false }));
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
  return columns;
};
