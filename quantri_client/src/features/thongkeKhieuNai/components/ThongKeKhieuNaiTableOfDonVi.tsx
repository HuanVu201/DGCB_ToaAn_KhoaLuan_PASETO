import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IThongKeKhieuNai, ISearchThongKeKhieuNai } from "../models";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdTable,
  AntdUpLoad,
} from "@/lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddThongKeKhieuNai,
  GetDanhSachKhieuNaiDanhGiaTk,
  GetThongKeKhieuNai,
  UpdateThongKeKhieuNai,
} from "../redux/action";
import { useThongKeKhieuNaiContext } from "../contexts/ThongKeKhieuNaiContext";
import { resetData } from "@/features/thongkeKhieuNai/redux/slice";
import { resetDatas as resetMauPhieuDatas } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice";
import { filterOptions } from "@/utils";
import { ChucDanh } from "@/models/chucDanh";
import { useColumnKhieuNaiDanhGiaOfDonVi } from "../hooks/useColumnKhieuNaiDanhGiaOfDonVi";

export const ThongKeKhieuNaiTableOfDonVi = () => {
  const dispatch = useAppDispatch();
  const thongKeKhieuNaiContext = useThongKeKhieuNaiContext();
  const [searchParams, setSearchParams] = useState<ISearchThongKeKhieuNai>({
    pageNumber: 1,
    pageSize: 50,
  });
  const { GetDanhSachKhieuNaiDanhGiaTK, count } = useAppSelector(
    (state) => state.thongkekhieunai
  );
  const { columns } = useColumnKhieuNaiDanhGiaOfDonVi({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  useEffect(() => {
    if (thongKeKhieuNaiContext.thongKeKhieuNaiId) {
      dispatch(GetDanhSachKhieuNaiDanhGiaTk(searchParams));
    }
  }, [thongKeKhieuNaiContext.thongKeKhieuNaiId]);

  const handleCancel = () => {
    thongKeKhieuNaiContext.setThongKeKhieuNaiModalVisible(false);
    thongKeKhieuNaiContext.setThongKeKhieuNaiId(undefined);
  };
  return (
    <AntdModal
      title={
        thongKeKhieuNaiContext.thongKeKhieuNaiId
          ? `Sửa thông tin chức danh`
          : `Thêm mới chức danh`
      }
      visible={thongKeKhieuNaiContext.thongKeKhieuNaiModalVisible}
      handlerCancel={handleCancel}
      footer={null}
    >
           <AntdTable
          columns={columns}
          dataSource={GetDanhSachKhieuNaiDanhGiaTK}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(GetDanhSachKhieuNaiDanhGiaTk(params))}
        />
    </AntdModal>
  );
};
