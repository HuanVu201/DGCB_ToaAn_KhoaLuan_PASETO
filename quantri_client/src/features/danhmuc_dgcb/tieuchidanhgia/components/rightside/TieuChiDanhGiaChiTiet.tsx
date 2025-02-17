//import { SearchKieuNoiDung } from "@/features/portaldvc_admin/kieunoidung/redux/action"
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdUpLoad,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import { useEffect, useMemo } from "react";
import {
  DeleteTieuChiDanhGia,
  GetTieuChiDanhGia,
  SearchTieuChiDanhGiaAdmin,
  UpdateTieuChiDanhGia,
} from "../../redux/action";
import { useTieuChiDanhGiaContext } from "../../contexts/TieuChiDanhGiaContext";
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import {
  ITieuChiDanhGia,
  TIEUCHIDANHGIAMODULE,
  TIEUCHIDANHGIAMODULES,
} from "../../models";
import { DefaultOptionType } from "antd/es/select";
import { TieuChiDanhGiaApi } from "../../services";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

const suDungPhiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];

export const TieuChiDanhGiaChiTiet = () => {
  const tieuchidanhgiaContext = useTieuChiDanhGiaContext();
  const { data: tieuchidanhgia } = useAppSelector(
    (state) => state.tieuchidanhgia
  );
  const { datas: dataPermissions } = useAppSelector((state) => state.vaitro);
  const { sideBarTieuChiDanhGia } = useAppSelector(
    (state) => state.tieuchidanhgia
  );
  const [form] = Form.useForm<
    Omit<ITieuChiDanhGia, "permission"> & { permission?: string[] }
  >();
  const dispatch = useAppDispatch();
  const onFinish: FormProps["onFinish"] = async () => {
    const formData = form.getFieldsValue();
    if (tieuchidanhgia?.id) {
      const res = await TieuChiDanhGiaApi.Update({
        id: tieuchidanhgia.id,
        data: {
          ...formData,
          permission:
            formData.permission?.join(ID_SEPARATE_ONE_THUNK) || undefined,
        },
      });
      if (res.data.succeeded) {
        dispatch(
          SearchTieuChiDanhGiaAdmin({
            pageNumber: 1,
            pageSize: 10000,
            reFetch: true,
          })
        );
        toast.success("Cập nhật thành công");
      }
    }
  };
  useEffect(() => {
    if (dataPermissions === undefined) {
      dispatch(SearchPermissionsVaiTro({}));
    }
  }, [dataPermissions]);
  // const handleCancel = () => {
  //     form.resetFields()
  // }
  useEffect(() => {
    if (tieuchidanhgiaContext.tieuchidanhgiaId)
      dispatch(GetTieuChiDanhGia(tieuchidanhgiaContext.tieuchidanhgiaId));
  }, [tieuchidanhgiaContext.tieuchidanhgiaId]);
  useEffect(() => {
    if (tieuchidanhgia) {
      form.setFieldsValue({
        ...tieuchidanhgia,
        permission: tieuchidanhgia.permission
          ? tieuchidanhgia.permission.split(ID_SEPARATE_ONE_THUNK)
          : undefined,
      });
    }
  }, [tieuchidanhgia]);

  return (
    <Form
      name="TieuChiDanhGiaAction"
      layout="vertical"
      form={form}
      requiredMark={true}
    >
      <Space wrap direction="horizontal" style={{ marginBottom: "20px" }}>
        <AntdButton
          size="small"
          type="primary"
          onClick={onFinish}
          icon={<EditOutlined></EditOutlined>}
        >
          Lưu
        </AntdButton>
        <Popconfirm
          title="Xoá?"
          onConfirm={() => {
            if (tieuchidanhgia?.id) {
              dispatch(
                DeleteTieuChiDanhGia({
                  id: tieuchidanhgia.id,
                  forceDelete: false,
                })
              );
            }
          }}
          okText="Xoá"
          cancelText="Huỷ"
        >
          <Button
            size="small"
            type="primary"
            danger
            icon={<DeleteOutlined></DeleteOutlined>}
          >
            Xóa
          </Button>
        </Popconfirm>
      </Space>
      <Row
        gutter={[8, 8]}
        style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <Col span={24}>
          <Form.Item
            label="Nhóm tiêu chí"
            name="tenTieuChiDanhGia"
            rules={[
              { required: true, message: "Vui lòng nhập tên tieuchidanhgia" },
            ]}
            style={{ textAlign: "left" }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Tiêu chí"
            name="thuTuTieuChiDanhGia"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: "left" }}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Thứ tự sắp xếp"
            name="module"
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
            label="Tên tiêu chí"
            name="tenTieuChi"
            style={{ textAlign: "left" }}
          >
            <Input />
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

        <Col span={8}>
          <Form.Item
            label="STT"
            name="stt"
            rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
            style={{ textAlign: "left" }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Đơn vị tính"
            name="donViTinh"
            rules={[
              { required: true, message: "Vui lòng nhập tên tieuchidanhgia" },
            ]}
            style={{ textAlign: "left" }}
          >
            <Select />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Loại điểm"
            name="loaiDiem"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: "left" }}
          >
            <Select
      options={[
        { value: 'diemDatYeuCau', label: 'Điểm đạt yêu cầu' },
        { value: 'diemThuong', label: 'Điểm thưởng' },
        { value: 'diemTru', label: 'Điểm trừ' },
        { value: 'diemLiet', label: 'Điểm liệt' },
      ]}
    />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Thang điểm"
            name="thang"
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
            name="active"
            valuePropName="checked"
            style={{ textAlign: "left" }}
          >
            <TextArea />
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

        <Col span={8}>
          <Form.Item
            label="Tiêu chí đối lập"
            name="fullPath"
            rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
            style={{ textAlign: "left" }}
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
