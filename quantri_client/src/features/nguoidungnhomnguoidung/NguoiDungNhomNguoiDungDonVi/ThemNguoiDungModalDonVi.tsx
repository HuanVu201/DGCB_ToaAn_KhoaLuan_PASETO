import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ISearchNguoiDungNhomNguoiDung, ISearchUserNotInNhom } from "../models";
import { useEffect, useMemo, useState } from "react";
import { ThemNhomNguoiDungSearchDonVi } from "./ThemNguoiDungModalSearchDonVi";
import { useThemNguoiDungColumn } from "../hooks/useThemNguoiDungColumn";
import {
  AddNguoiDungNhomNguoiDungs,
  SearchNguoiDungNhomNguoiDung,
  SearchUserNotInNhom,
} from "../redux/action";
import { useNhomNguoiDungContext } from "@/features/nhomnguoidung/contexts/NhomNguoiDungContext";
import { useNguoiDungNhomNguoiDungContext } from "../contexts/NguoiDungNhomNguoiDungContext";

export const ThemNguoiDungModalDonVi = ({
  setSearchNhomParams,
}: {
  setSearchNhomParams: React.Dispatch<
    React.SetStateAction<ISearchNguoiDungNhomNguoiDung>
  >;
}) => {
  const { userCount, users, loading } = useAppSelector(
    (state) => state.nguoidungnhomnguoidung
  );
  const { data: user } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch();
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const nguoiDungNhomNguoiDungContext = useNguoiDungNhomNguoiDungContext();
  const [searchParams, setSearchParams] = useState<ISearchUserNotInNhom>({
    pageNumber: 1,
    pageSize: 20,
    reFetch: true,
    officeCode: user?.officeCode

  });
  const { columns } = useThemNguoiDungColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  useEffect(() => {
    if (nhomNguoiDungContext.nhomNguoiDungId) {
      setSearchParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      }));
    }
  }, [nhomNguoiDungContext.nhomNguoiDungId]);
  const handleCancel = () => {
    nguoiDungNhomNguoiDungContext.setThemNguoiDungModalVisible(false);
  };
  const onOk = async () => {
    if (nhomNguoiDungContext.nhomNguoiDungId) {
      await dispatch(
        AddNguoiDungNhomNguoiDungs({
          userIds: selectedUser,
          nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
        })
      ).unwrap();
      setSearchNhomParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      }));
      setSearchParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      }));
      // handleCancel()
    }
  };

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: React.Key[]) => {
        setSelectedUser(selectedRowKeys.map((x) => x as string));
      },
    }),
    []
  );
  return (
    <AntdModal
      confirmLoading={loading}
      title="Chọn người dùng muốn thêm vào danh sách"
      onOk={onOk}
      visible={true}
      handlerCancel={handleCancel}
      fullsizeScrollable
    >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <ThemNhomNguoiDungSearchDonVi setSearchParams={setSearchParams} />
        {searchParams.nhomNguoiDungId ? (
          <AntdTable
            rowKey="userName"
            columns={columns}
            dataSource={users}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchUserNotInNhom(params))}
            rowSelection={{
              ...rowSelection,
            }}
            pagination={{
              total: userCount,
            }}
          />
        ) : null}
      </AntdSpace>
    </AntdModal>
  );
};
