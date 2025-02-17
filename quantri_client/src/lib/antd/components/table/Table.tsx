import { Table } from "antd";
import React, { ComponentProps, Dispatch, useEffect } from "react";
import { ColumnsType, TableProps } from "antd/es/table";
import { IBaseExt, IBasePagination } from "../../../../models";
import { SetSearchParams } from "@/hooks/useSearchStateHolder";

export interface IAntdTableProps<IModel, ISearch>
  extends Omit<TableProps<IModel>, "columns"> {
  columns: ColumnsType<IModel>;
  onSearch: (params: ISearch) => void;
  searchParams: ISearch;
  setSearchParams: Dispatch<React.SetStateAction<ISearch>>;
}

export const AntdTable = <
  IModel extends IBaseExt,
  ISearch extends IBasePagination
>(
  props: IAntdTableProps<IModel, ISearch>
) => {
  const {
    columns,
    dataSource,
    pagination,
    loading,
    onSearch,
    searchParams,
    setSearchParams,
    rowKey,

    ...rest
  } = props;

  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams]);

  return (
    <Table
      rowKey={rowKey || "id"}
      loading={loading}
      columns={columns as any}
      dataSource={dataSource}
      bordered={true}
      pagination={
        pagination
          ? {
            current:
            searchParams.pageNumber === 0 ? 1 : searchParams.pageNumber,
            pageSize: searchParams.pageSize,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNumber: page,
                pageSize: pageSize,
              });
            },
            ...pagination,
           
            pageSizeOptions: [ "10", "20", "50", "100" , "1000","5000","10000"],
            showSizeChanger:true,
            }
          : {
            pageSizeOptions: [ "10", "20", "50", "100", "1000","5000","10000"],
            current:
              searchParams.pageNumber === 0 ? 1 : searchParams.pageNumber,
            pageSize: searchParams.pageSize,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNumber: page,
                pageSize: pageSize,
              });

            },
            showSizeChanger:true,
          
          }
      }
      {...rest}
    />
  );
};
