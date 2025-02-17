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
import { IDanhMuc_ChucDanh, ISearchDanhMuc_ChucDanh } from "../models";
import React, { useEffect, useMemo, useRef } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "@/lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddDanhMuc_ChucDanh,
  GetDanhMuc_ChucDanh,
  UpdateDanhMuc_ChucDanh,
} from "../redux/action";
import { useDanhMuc_ChucDanhContext } from "../contexts/DanhMuc_ChuDanhContext";
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/slice";
import { resetDatas as resetMauPhieuDatas } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice";
import { SearchDanhMuc_CacCap } from "../../danhmuc_caccap/redux/action";
import { filterOptions } from "@/utils";
import { ChucDanh } from "@/models/chucDanh";
import { SearchDanhMuc_PhieuDanhGia } from "../../danhmuc_phieudanhgia/redux/action";

export const DanhMuc_ChucDanhDetail = ({setSearchParams}: {setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_ChucDanh>>}) => {
  const dispatch = useAppDispatch();
  const { data: danhMuc_ChucDanh, datas: danhMuc_ChucDanhs } = useAppSelector(
    (state) => state.danhmuc_chucdanh
  );
  const { datas: capDanhGiaMaps } = useAppSelector(
    (state) => state.danhmuc_caccap
  );
  const { datas: mauPhieuDanhGias } = useAppSelector(
    (state) => state.danhmuc_phieudanhgia
  );
  const danhMuc_ChucDanhContext = useDanhMuc_ChucDanhContext();
  const [form] = Form.useForm<ChucDanh>();

  const onFinish = async () => {
    const formData = form.getFieldsValue();
    if (danhMuc_ChucDanhContext?.danhMuc_ChucDanhId) {
      const res = await dispatch(
        UpdateDanhMuc_ChucDanh({
          id: danhMuc_ChucDanhContext.danhMuc_ChucDanhId,
          data: { ...formData },
        })
      ).unwrap();
      if(res.succeeded){
        setSearchParams((curr) => ({...curr}))
      }
    } else {
      const res = await dispatch(AddDanhMuc_ChucDanh({ ...formData })).unwrap();
      if(res.succeeded){
        setSearchParams((curr) => ({...curr}))
      }
    }
    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    dispatch(resetMauPhieuDatas())
    danhMuc_ChucDanhContext.setDanhMuc_ChucDanhModalVisible(false);
    danhMuc_ChucDanhContext.setDanhMuc_ChucDanhId(undefined);
  };
  useEffect(() => {
    if (danhMuc_ChucDanhContext.danhMuc_ChucDanhId) {
      dispatch(GetDanhMuc_ChucDanh(danhMuc_ChucDanhContext.danhMuc_ChucDanhId));
    }
  }, [danhMuc_ChucDanhContext.danhMuc_ChucDanhId]);

  useEffect(() => {
    if (danhMuc_ChucDanh) {
      form.setFieldsValue({ ...danhMuc_ChucDanh, mauPhieuDanhGiaIds: danhMuc_ChucDanh.mauPhieuDanhGias?.flatMap(x => x.id) } as any);
    }
  }, [danhMuc_ChucDanh]);

  // useEffect(() => {
  //     if (!loaiDanhMuc_ChucDanhs?.length && !loading) {
  //         dispatch(SearchLoaiDanhMuc_ChucDanh({}))
  //     }
  // }, [])
  useEffect(() => {
    dispatch(
      SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500, type: "CapDanhGia" })
    );
  }, []);

  useEffect(() => {
    if(mauPhieuDanhGias === undefined){
      dispatch(
        SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 500 })
      );
    }
  }, [mauPhieuDanhGias])

  return (
    <AntdModal
      title={
        danhMuc_ChucDanhContext.danhMuc_ChucDanhId
          ? `Sửa thông tin chức danh`
          : `Thêm mới chức danh`
      }
      visible={danhMuc_ChucDanhContext.danhMuc_ChucDanhModalVisible}
      handlerCancel={handleCancel}
      footer={null}
    >
      <Form
        name="DanhMuc_ChucDanh"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={danhMuc_ChucDanhContext.danhMuc_ChucDanhId !== null}
        initialValues={{
          soLuongThuTuc: 0,
          soLuongThuTucCapTinh: 0,
          soLuongThuTucCapHuyen: 0,
          soLuongThuTucCapXa: 0,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên chức danh"
              name="ten"
              rules={[
                { required: true, message: "Vui lòng nhập tên chức danh" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã chức danh"
              name="ma"
              rules={[
                { required: true, message: "Vui lòng nhập mã chức danh" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mô tả" name="moTa">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Cấp đánh giá" name="maCapDanhGia">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: capDanhGiaMaps,
                  label: "tenDanhMuc",
                  value: "code",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <Form.Item label="Mẫu phiếu đánh giá" name="mauPhieuDanhGiaIds">
              <AntdSelect
                allowClear
                showSearch
                mode="multiple"
                filterOption={filterOptions}
                generateOptions={{
                  model: mauPhieuDanhGias,
                  label: "ten",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col>
            <Form.Item
              name="codePays"
              rules={[{ required: true, message: "Please input your code!" }]}
              normalize={(value) => (value || "").toUpperCase()}
            >
              <Input/>
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <AntdButton type="primary" onClick={onFinish}>
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </Space>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
