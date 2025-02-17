import { useEffect, useState } from "react";
import { AntdTable, AntdSpace } from "@/lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchThongKeKhieuNai } from "../models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchThongKeKhieuNai } from "../redux/action";
import { ThongKeKhieuNaiSearch } from "./ThongKeKhieuNaiSearch";
import { ThongKeKhieuNaiProvider } from "../contexts/ThongKeKhieuNaiContext";
import { ThongKeKhieuNaiDetail } from "./ThongKeKhieuNaiDetail";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ThongKeKhieuNaiTableOfDonVi } from "./ThongKeKhieuNaiTableOfDonVi";

const ThongKeKhieuNaiTable = () => {
  const dispatch = useAppDispatch();
  const { datas: thongKeKhieuNais, count } = useAppSelector(
    (state) => state.thongkekhieunai
  );
  const { parseToken } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useState<ISearchThongKeKhieuNai>({
    pageNumber: 1,
    pageSize: 50,
    maDonVi: parseToken?.officeCode,
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  useEffect(() => {
    dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 5000,GetAllChildren:true,groupCode:parseToken?.officeCode }));
  }, []);
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <ThongKeKhieuNaiSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={thongKeKhieuNais}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchThongKeKhieuNai(params))}
        />
      </AntdSpace>
      <ThongKeKhieuNaiTableOfDonVi/>
    </>
  );
};
const ThongKeKhieuNaiTableWrapper = () => (
  <ThongKeKhieuNaiProvider>
    <ThongKeKhieuNaiTable />
  </ThongKeKhieuNaiProvider>
);
export default ThongKeKhieuNaiTableWrapper;
