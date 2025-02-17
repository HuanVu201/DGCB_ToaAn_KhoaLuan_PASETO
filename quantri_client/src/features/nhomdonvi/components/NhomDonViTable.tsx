import { ComponentProps, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchNhomDonViAction } from "../redux/action";
import { NhomDonViSearch } from "./NhomDonViSearch";
import { NhomDonViDetail, NhomDonViDetailWithModal } from "./NhomDonViDetail";
import { useSearchStateHolder } from "@/hooks/useSearchStateHolder";
import { SearchNhomDonVi } from "@/models/nhomDonVi";
import { NhomDonViProvider, useNhomDonViContext } from "../contexts/QuyTrinhXuLyContext";

const NhomDonViTable = ({extraSearchParams} : {extraSearchParams: SearchNhomDonVi}) => {
  const dispatch = useAppDispatch();
  const NhomDonViContext = useNhomDonViContext();
  const { datas: NhomDonVis, count } = useAppSelector(
    (state) => state.nhomdonvis
  );
  const [searchParams, setSearchParams]= useState<SearchNhomDonVi>({
    pageNumber: 1,
    pageSize: 500,
    ...extraSearchParams
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  }, setSearchParams);
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <NhomDonViSearch setSearchParams={setSearchParams}/>
        <AntdTable
          columns={columns}
          dataSource={NhomDonVis}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchNhomDonViAction(params))}
        />
        {NhomDonViContext.NhomDonViModalVisible ? 
        <NhomDonViDetail setSearchParams={setSearchParams}/> : null}
      </AntdSpace>
    </>
  );
};
const NhomDonViTableWrapper = (props: ComponentProps<typeof NhomDonViTable>) => (
  <NhomDonViProvider>
    <NhomDonViTable {...props}/>
  </NhomDonViProvider>
);
export default NhomDonViTableWrapper;
