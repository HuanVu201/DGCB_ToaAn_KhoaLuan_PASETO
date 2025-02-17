import { useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchNhomNguoiDung } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchNhomNguoiDung } from "../redux/action";
import { NhomNguoiDungDonViSearch } from "./NhomNguoiDungDonViSearch";
import {
  NhomNguoiDungProvider,
  useNhomNguoiDungContext,
} from "../contexts/NhomNguoiDungContext";
import { NhomNguoiDungDetail } from "../components/NhomNguoiDungDetail"
import { DanhSachNguoiDungTable } from "@/features/nguoidungnhomnguoidung/components/DanhSachNguoiDungTable";
import { useQuanTriDonViColumn } from "./hooks/useQuanTriDonViColumn";
import { DanhSachNguoiDungDonVi, DanhSachNguoiDungDonViTable } from "@/features/nguoidungnhomnguoidung/NguoiDungNhomNguoiDungDonVi/DanhSachNguoiDungTableDonVi";

const NhomNguoiDungDonViTable = () => {
  const dispatch = useAppDispatch();
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const { datas: nhomNguoiDungs, count } = useAppSelector(
    (state) => state.nhomnguoidung
  );
  const [searchParams, setSearchParams] = useState<ISearchNhomNguoiDung>({
    pageNumber: 1,
    pageSize: 100,
  });
  const { columns } = useQuanTriDonViColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <NhomNguoiDungDonViSearch setSearchParams={setSearchParams} />
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
      {nhomNguoiDungContext.danhSachNguoiDungDonViModalVisible ? (
        <DanhSachNguoiDungDonViTable />
      ) : null}
    </>
  );
};
const NhomNguoiDungDonViTableWrapper = () => (
  <NhomNguoiDungProvider>
    <NhomNguoiDungDonViTable />
  </NhomNguoiDungProvider>
);
export default NhomNguoiDungDonViTableWrapper;
