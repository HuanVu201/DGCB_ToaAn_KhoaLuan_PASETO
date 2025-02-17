import { useState } from "react";
import { AntdTable, AntdSpace } from "@/lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchAuditLog } from "../models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchAuditLog } from "../redux/action";
import { AuditLogSearch } from "./AuditLogSearch";
import { AuditLogProvider } from "../contexts/AuditLogContext";
import { AuditLogDetail } from "./AuditLogDetail";

const AuditLogTable = () => {
  const dispatch = useAppDispatch();
  const { datas: auditLogs, count } = useAppSelector(
    (state) => state.auditlog
  );
  const [searchParams, setSearchParams] = useState<ISearchAuditLog>({
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
        <AuditLogSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={auditLogs}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchAuditLog(params))}
        />
      </AntdSpace>
      <AuditLogDetail />
    </>
  );
};
const AuditLogTableWrapper = () => (
  <AuditLogProvider>
    <AuditLogTable />
  </AuditLogProvider>
);
export default AuditLogTableWrapper;
