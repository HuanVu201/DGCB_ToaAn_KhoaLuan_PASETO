import { useMemo } from "react";
import { INguoiDungNhomNguoiDung } from "../models";
import { ColumnsType } from "antd/es/table";
import { IBasePagination } from "../../../models";
import { IUser } from "@/features/user/models";

export const useThemNguoiDungColumn = (pagination: IBasePagination) => {
  const columns = useMemo((): ColumnsType<IUser> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Họ và tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Tên đăng nhập",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Thuộc",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Đơn vị",
        key: "officeName",
        dataIndex: "officeName",
      },
    ];
  }, [pagination]);
  return { columns };
};
