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
import React, { useEffect, useMemo, useRef } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "@/lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddThongKeKhieuNai,
  GetThongKeKhieuNai,
  UpdateThongKeKhieuNai,
} from "../redux/action";
import { useThongKeKhieuNaiContext } from "../contexts/ThongKeKhieuNaiContext";
import { resetData } from "@/features/thongkeKhieuNai/redux/slice";
import { resetDatas as resetMauPhieuDatas } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice";
import { filterOptions } from "@/utils";
import { ChucDanh } from "@/models/chucDanh";

export const ThongKeKhieuNaiDetail = ({setSearchParams}: {setSearchParams: React.Dispatch<React.SetStateAction<ISearchThongKeKhieuNai>>}) => {
  const dispatch = useAppDispatch();
  const { data: thongKeKhieuNai, datas: thongKeKhieuNais } = useAppSelector(
    (state) => state.thongkekhieunai
  );
  const { datas: capDanhGiaMaps } = useAppSelector(
    (state) => state.danhmuc_caccap
  );
  const { datas: mauPhieuDanhGias } = useAppSelector(
    (state) => state.danhmuc_phieudanhgia
  );
  const thongKeKhieuNaiContext = useThongKeKhieuNaiContext();
  const [form] = Form.useForm<ChucDanh>();

  const onFinish = async () => {
    const formData = form.getFieldsValue();
    if (thongKeKhieuNaiContext?.thongKeKhieuNaiId) {
      const res = await dispatch(
        UpdateThongKeKhieuNai({
          id: thongKeKhieuNaiContext.thongKeKhieuNaiId,
          data: { ...formData },
        })
      ).unwrap();
      if(res.succeeded){
        setSearchParams((curr) => ({...curr}))
      }
    } else {
      const res = await dispatch(AddThongKeKhieuNai({ ...formData })).unwrap();
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
    thongKeKhieuNaiContext.setThongKeKhieuNaiModalVisible(false);
    thongKeKhieuNaiContext.setThongKeKhieuNaiId(undefined);
  };
  useEffect(() => {
    if (thongKeKhieuNaiContext.thongKeKhieuNaiId) {
      dispatch(GetThongKeKhieuNai(thongKeKhieuNaiContext.thongKeKhieuNaiId));
    }
  }, [thongKeKhieuNaiContext.thongKeKhieuNaiId]);

  // useEffect(() => {
  //   if (thongKeKhieuNai) {
  //     form.setFieldsValue({ ...thongKeKhieuNai, mauPhieuDanhGiaIds: thongKeKhieuNai.mauPhieuDanhGias?.flatMap(x => x.id) } as any);
  //   }
  // }, [thongKeKhieuNai]);

  // useEffect(() => {
  //     if (!loaiThongKeKhieuNais?.length && !loading) {
  //         dispatch(SearchLoaiThongKeKhieuNai({}))
  //     }
  // }, [])
  // useEffect(() => {
  //   dispatch(
  //     SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500, type: "CapDanhGia" })
  //   );
  // }, []);

  // useEffect(() => {
  //   if(mauPhieuDanhGias === undefined){
  //     dispatch(
  //       SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 500 })
  //     );
  //   }
  // }, [mauPhieuDanhGias])

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
      <Form
        name="ThongKeKhieuNai"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={thongKeKhieuNaiContext.thongKeKhieuNaiId !== null}
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
              label="Họ và tên"
              name="hoVaTen"
              // rules={[
              //   { required: true, message: "Vui lòng nhập tên chức danh" },
              // ]}
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
