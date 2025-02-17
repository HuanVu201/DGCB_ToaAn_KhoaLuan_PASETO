import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IDanhMuc_KhoTieuChi } from "../models";
import { useEffect } from "react";
import { AntdButton, AntdModal } from "@/lib/antd/components";
import {
  AddDanhMuc_KhoTieuChi,
  GetDanhMuc_KhoTieuChi,
  UpdateDanhMuc_KhoTieuChi,
} from "../redux/action";
import { useDanhMuc_KhoTieuChiContext } from "../contexts/DanhMuc_KhoTieuChiContext";
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_khotieuchi/redux/slice";
import { v4 as uuidv4 } from "uuid";
const { Option } = Select;
export const DanhMuc_KhoTieuChiDetail = () => {
  const dispatch = useAppDispatch();
  const { data: danhMuc_KhoTieuChi, datas: danhMuc_KhoTieuChis } =
    useAppSelector((state) => state.danhmuc_khotieuchi);
  const { datas: danhmuc_donvitinhs } = useAppSelector(
    (state) => state.danhmuc_donvitinh
  );
  const danhMuc_KhoTieuChiContext = useDanhMuc_KhoTieuChiContext();
  const [form] = Form.useForm<IDanhMuc_KhoTieuChi>();

  const onFinish = async () => {
    const formData = form.getFieldsValue();
    let pointThuong = false;
    let pointLiet = false;
    let pointTru = false;
    if (formData.loaiDiem == "diemThuong") {
      pointThuong = true;
    }
    if (formData.loaiDiem == "diemTru") {
      pointTru = true;
    }
    if (formData.loaiDiem == "diemLiet") {
      pointLiet = true;
    }

    const commonData = {
      ...formData,
      thangDiem: formData?.thangDiem?.toString(),
      diemLiet: pointLiet,
      diemTru: pointTru,
      diemThuong: pointThuong,
    };
    if (danhMuc_KhoTieuChiContext?.danhMuc_KhoTieuChiId) {
      dispatch(
        UpdateDanhMuc_KhoTieuChi({
          id: danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId,
          data: { ...commonData, maTieuChi: danhMuc_KhoTieuChi?.maTieuChi },
        })
      );
    } else {
      const newGuid = uuidv4();
      dispatch(AddDanhMuc_KhoTieuChi({ ...commonData, maTieuChi: newGuid }));
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    danhMuc_KhoTieuChiContext.setDanhMuc_KhoTieuChiModalVisible(false);
    danhMuc_KhoTieuChiContext.setDanhMuc_KhoTieuChiId(undefined);
  };

  useEffect(() => {
    if (danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId) {
      dispatch(
        GetDanhMuc_KhoTieuChi(danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId)
      );
    }
  }, [danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId]);

  useEffect(() => {
    if (danhMuc_KhoTieuChi) {
      let loaiDiem;
      if (danhMuc_KhoTieuChi.diemLiet) {
        loaiDiem = "diemLiet";
      } else if (danhMuc_KhoTieuChi.diemThuong) {
        loaiDiem = "diemThuong";
      } else if (danhMuc_KhoTieuChi.diemTru) {
        loaiDiem = "diemTru";
      } else {
        loaiDiem = "diemDatYeuCau";
      }
      form.setFieldsValue({ ...danhMuc_KhoTieuChi,loaiDiem });
    }
  }, [danhMuc_KhoTieuChi]);

  return (
    <AntdModal
      title={
        danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId
          ? `Sửa thông tin kho tiêu chí`
          : `Thêm mới kho tiêu chí`
      }
      visible={danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="DanhMuc_KhoTieuChi"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={danhMuc_KhoTieuChiContext.danhMuc_KhoTieuChiId !== null}
        initialValues={{
          soLuongThuTuc: 0,
          soLuongThuTucCapTinh: 0,
          soLuongThuTucCapHuyen: 0,
          soLuongThuTucCapXa: 0,
        }}
      >
        <Row
          gutter={[8, 8]}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {/* <Col span={24}>
          <Form.Item
            label="Nhóm tiêu chí"
            name="nhomDanhMuc_KhoTieuChi"
            rules={[
              { required: true, message: "Vui lòng nhập tên danhmuc_khotieuchi" },
            ]}
            style={{ textAlign: "left" }}
          >
            <Select disabled>
              {
                danhmuc_khotieuchis?.map((item) => (
                  <Option key={item.maTieuChi} value = {item.maTieuChi}>
                      {item.tenTieuChi}
                  </Option>
                )
              )
              }
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Tiêu chí cha"
            name="tieuchicha"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: "left" }}
          >
           <Select disabled>
              {
                danhmuc_khotieuchis?.map((item) => (
                  <Option key={item.id} value = {item.id}>
                      {item.tenTieuChi}
                  </Option>
                )
              )
              }
            </Select>
          </Form.Item>
        </Col> */}

          {/* <Col span={24}>
            <Form.Item
              label="Thứ tự sắp xếp"
              name="thuTu"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm chức năng" },
              ]}
              style={{ textAlign: "left" }}
            >
              <InputNumber />
            </Form.Item>
          </Col> */}

          <Col span={24}>
            <Form.Item
              label="Tên tiêu chí"
              name="tenTieuChi"
              style={{ textAlign: "left" }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              label="Đơn vị tính"
              name="donViTinh"
              style={{ textAlign: "left" }}
            >
              <Select placeholder="Chọn đơn vị tính">
                {danhmuc_donvitinhs?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.tenDanhMuc}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Sử dụng"
              name="suDung"
              valuePropName="checked"
              style={{ textAlign: "left" }}
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Loại điểm"
              name="loaiDiem"
              rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
              style={{ textAlign: "left" }}
            >
              <Select
                options={[
                  { value: "diemDatYeuCau", label: "Điểm đạt yêu cầu" },
                  { value: "diemThuong", label: "Điểm thưởng" },
                  { value: "diemTru", label: "Điểm trừ" },
                  { value: "diemLiet", label: "Điểm liệt" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Thang điểm"
              name="thangDiem"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm chức năng" },
              ]}
              style={{ textAlign: "left" }}
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Ghi chú"
              name="ghiChu"
              style={{ textAlign: "left" }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Kiêm nhiệm"
              name="kiemNhiem"
              valuePropName="checked"
              style={{ textAlign: "left" }}
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <AntdButton type="primary" htmlType="submit">
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
