import { ComponentProps, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchQuyTrinhXuLyAction } from "../redux/action";
import { QuyTrinhXuLySearch } from "./QuyTrinhXuLySearch";
import {
  QuyTrinhXuLyProvider,
  useQuyTrinhXuLyContext,
} from "../contexts/QuyTrinhXuLyContext";
import { QuyTrinhXuLyDetail, QuyTrinhXuLyDetailWithModal } from "./QuyTrinhXuLyDetail";
import { SearchQuyTrinhXuLy } from "@/models/quytrinhxuly";
import { useSearchStateHolder } from "@/hooks/useSearchStateHolder";
import ReactFlowModal from "../modals/ReactFlowModal";
import QuyTrinhTabWrapper from "./QuyTrinhTabWrapper";

const QuyTrinhXuLyTable = ({extraSearchParams} : {extraSearchParams: SearchQuyTrinhXuLy}) => {
  const dispatch = useAppDispatch();
  const QuyTrinhXuLyContext = useQuyTrinhXuLyContext();
  const { datas: QuyTrinhXuLys, count } = useAppSelector(
    (state) => state.quytrinhxulys
  );
  const [searchParams, setSearchParams]= useState<SearchQuyTrinhXuLy>({
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
        <QuyTrinhXuLySearch setSearchParams={setSearchParams}/>
        <AntdTable
          columns={columns}
          dataSource={QuyTrinhXuLys}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchQuyTrinhXuLyAction(params))}
        />
      </AntdSpace>
      {QuyTrinhXuLyContext.QuyTrinhXuLyModalVisible ? (
        <QuyTrinhXuLyDetailWithModal setSearchParams={setSearchParams}/>
      ) : null}
      {/* {QuyTrinhXuLyContext.reactFlowModalVisible ? (
        <ReactFlowModal laDonVi={QuyTrinhXuLyContext.laDonVi == true}/>
      ) : null} */}
      {QuyTrinhXuLyContext.reactFlowModalVisible ? 
      <QuyTrinhTabWrapper setSearchParams={setSearchParams} laDonVi={QuyTrinhXuLyContext.laDonVi}/> : null}
    </>
  );
};
const QuyTrinhXuLyTableWrapper = (props: ComponentProps<typeof QuyTrinhXuLyTable>) => (
  <QuyTrinhXuLyProvider laDonVi={props.extraSearchParams.laQuyTrinhDonVi == true}>
    <QuyTrinhXuLyTable {...props}/>
  </QuyTrinhXuLyProvider>
);
export default QuyTrinhXuLyTableWrapper;
