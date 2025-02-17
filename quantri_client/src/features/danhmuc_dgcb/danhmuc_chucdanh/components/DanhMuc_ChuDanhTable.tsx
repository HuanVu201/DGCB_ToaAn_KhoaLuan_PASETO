import { useState } from "react";
import { AntdTable, AntdSpace } from "@/lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchDanhMuc_ChucDanh } from "../models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDanhMuc_ChucDanh } from "../redux/action";
import { DanhMuc_ChucDanhSearch } from "./DanhMuc_ChuDanhSearch";
import { DanhMuc_ChucDanhProvider } from "../contexts/DanhMuc_ChuDanhContext";
import { DanhMuc_ChucDanhDetail } from "./DanhMuc_ChuDanhDetail";

const DanhMuc_ChucDanhTable = () => {
  const dispatch = useAppDispatch();
  const { datas: danhMuc_ChucDanhs, count } = useAppSelector(
    (state) => state.danhmuc_chucdanh
  );
  const [searchParams, setSearchParams] = useState<ISearchDanhMuc_ChucDanh>({
    pageNumber: 1,
    pageSize: 50,
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <DanhMuc_ChucDanhSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={danhMuc_ChucDanhs}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchDanhMuc_ChucDanh(params))}
        />
      </AntdSpace>
      <DanhMuc_ChucDanhDetail setSearchParams={setSearchParams}/>
    </>
  );
};
const DanhMuc_ChucDanhTableWrapper = () => (
  <DanhMuc_ChucDanhProvider>
    <DanhMuc_ChucDanhTable />
  </DanhMuc_ChucDanhProvider>
);
export default DanhMuc_ChucDanhTableWrapper;
