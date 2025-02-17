import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import {
  NguoiDungNhomNguoiDungProvider,
  useNguoiDungNhomNguoiDungContext,
} from "../contexts/NguoiDungNhomNguoiDungContext";
import { useNhomNguoiDungContext } from "@/features/nhomnguoidung/contexts/NhomNguoiDungContext";
import { useCallback, useState, useMemo, useEffect } from "react";
import {
  INguoiDungNhomNguoiDung,
  ISearchNguoiDungNhomNguoiDung,
} from "../models";
import { NguoiDungNhomNguoiDungSearchDonVi } from "./DanhSachNguoiDungDonViSearchDonVi";
import { useDanhSachNguoiDungColumn } from "../hooks/useDanhSachNguoiDungColumn";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Space, Table } from "antd";
import { SearchNguoiDungNhomNguoiDung } from "../redux/action";
import { ThemNguoiDungModalDonVi } from "./ThemNguoiDungModalDonVi";

export const DanhSachNguoiDungDonVi = () => {
  const nguoiDungNhomNguoiDungContext = useNguoiDungNhomNguoiDungContext()
  const {data : user} = useAppSelector(state => state.user)
  const [searchParams, setSearchParams] =
    useState<ISearchNguoiDungNhomNguoiDung>({
      pageNumber: 1,
      pageSize: 50,
      reFetch: true,
      userGroupCode : user?.officeCode,
      loaiBuoc : "Khác"
    });
  const {
    datas: nguoiDungNhomNguoiDungs,
    loading,
    count,
  } = useAppSelector((state) => state.nguoidungnhomnguoidung);
  const dispatch = useAppDispatch();

  const [expandedRowKeys, setExpandedRowKeys] =
    useState<readonly React.Key[]>();
  const { columns } = useDanhSachNguoiDungColumn(searchParams,setSearchParams);
  const nhomNguoiDungContext = useNhomNguoiDungContext();

  useEffect(() => {
    if (nhomNguoiDungContext.nhomNguoiDungId) {
      setSearchParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      }));
    }
  }, [nhomNguoiDungContext.nhomNguoiDungId]);

  const handleCancel = () => {
    // nguoiDungNhomNguoiDungContext.setDanhSachNguoiDungModalVisible(false)
    nhomNguoiDungContext.setNhomNguoiDungId(undefined);
    nhomNguoiDungContext.setDanhSachNguoiDungDonViModalVisible(false);
  };
  // const expandedRowRender = useCallback((record: INguoiDungNhomNguoiDung) => {
  //     const filterThuTucByMaLinhVuc = nguoiDungNhomNguoiDungs?.filter(x => x.officeCode === record.officeCode)
  //     return <Table columns={expandedColumns} dataSource={filterThuTucByMaLinhVuc} pagination={false} rowKey={"id"} />;
  // }, [nguoiDungNhomNguoiDungs])
  const uniqueLinhVucFromThuTuc = useMemo(() => {
    if (nguoiDungNhomNguoiDungs) {
      const uniqueLinhVucFromThuTuc = [
        ...new Map(
          nguoiDungNhomNguoiDungs.map((item) => [item.officeCode, item])
        ).values(),
      ];
      

      setExpandedRowKeys(() => uniqueLinhVucFromThuTuc.map((x) => x.id));
      var tmpuniqueDanhSachNguoiDung = uniqueLinhVucFromThuTuc.map(
        (itemUnique) => {
          return {
            id: "parent" + itemUnique.id,
            donViId: itemUnique.officeCode,
            officeName: itemUnique.officeName,
            children: nguoiDungNhomNguoiDungs
              .filter((x) => x.officeCode == itemUnique.officeCode)
              .map((item) => {
                return { ...item, officeName: "" };
              }),
          };
        }
      );
      return tmpuniqueDanhSachNguoiDung;
    }
  }, [nguoiDungNhomNguoiDungs]);
  console.log(uniqueLinhVucFromThuTuc);
  
  
  return (
    <AntdModal
      title="Thêm mới người dùng"
      visible={true}
      handlerCancel={handleCancel}
      footer={null}
      fullsizeScrollable
    >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <NguoiDungNhomNguoiDungSearchDonVi setSearchParams={setSearchParams} />
        {searchParams.nhomNguoiDungId ? (
          <div>
            <Space>
              <span>Tổng số nhóm:</span>
              <span>{uniqueLinhVucFromThuTuc?.length || 0}</span>
            </Space>
            <AntdTable
              columns={columns}
              loading={loading}
              dataSource={uniqueLinhVucFromThuTuc as any}
              // rowSelection={{ ...rowSelection, checkStrictly: false }}
              // expandable={{
              //     expandedRowRender,
              //     expandedRowKeys: expandedRowKeys,
              //     onExpandedRowsChange: setExpandedRowKeys,
              //     expandRowByClick: true
              // }}
              pagination={{
                total: count,
              }}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) =>
                dispatch(SearchNguoiDungNhomNguoiDung(params))
              }
            />
          </div>
        ) : null}

        {nguoiDungNhomNguoiDungContext.themNguoiDungModalVisible ? (
          <ThemNguoiDungModalDonVi setSearchNhomParams={setSearchParams} />
        ) : null}
      </AntdSpace>
    </AntdModal>
  );
};

export const DanhSachNguoiDungDonViTable = () => (
  <NguoiDungNhomNguoiDungProvider>
    <DanhSachNguoiDungDonVi />
  </NguoiDungNhomNguoiDungProvider>
);
