import { useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchNhomNguoiDung } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchNhomNguoiDung } from "../redux/action";
import { NhomNguoiDungSearch } from "./NhomNguoiDungSearch";
import {
  NhomNguoiDungProvider,
  useNhomNguoiDungContext,
} from "../contexts/NhomNguoiDungContext";
import { NhomNguoiDungDetail } from "./NhomNguoiDungDetail";
import { DanhSachNguoiDungTable } from "@/features/nguoidungnhomnguoidung/components/DanhSachNguoiDungTable";

const NhomNguoiDungTable = () => {
  const dispatch = useAppDispatch();
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const { datas: nhomNguoiDungs, count } = useAppSelector(
    (state) => state.nhomnguoidung
  );
  const [searchParams, setSearchParams] = useState<ISearchNhomNguoiDung>({
    pageNumber: 1,
    pageSize: 500,
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <NhomNguoiDungSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={nhomNguoiDungs}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchNhomNguoiDung(params))}
        />
      </AntdSpace>
      {nhomNguoiDungContext.nhomNguoiDungModalVisible ? (
        <NhomNguoiDungDetail />
      ) : null}
      {nhomNguoiDungContext.danhSachNguoiDungModalVisible ? (
        <DanhSachNguoiDungTable />
      ) : null}
    </>
  );
};
const NhomNguoiDungTableWrapper = () => (
  <NhomNguoiDungProvider>
    <NhomNguoiDungTable />
  </NhomNguoiDungProvider>
);
export default NhomNguoiDungTableWrapper;
