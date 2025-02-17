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
import { IDiemLiet } from "../../tieuchidanhgia/models";
import { useEffect, useMemo, useRef } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "@/lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import { useDiemLietContext } from "../../tieuchidanhgia/contexts/DiemLietContext";
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/slice";

export const DiemLietDetailOfKho = () => {
  const dispatch = useAppDispatch();
  const diemLietContext = useDiemLietContext();
  const [form] = Form.useForm<IDiemLiet>();

  const onFinish = async () => {
    const formData = form.getFieldsValue();
    if (diemLietContext?.diemLietId) {
      const updatedItem = { ...formData, Ma: diemLietContext.diemLietId };
     if(diemLietContext.listDiemLiet)
     {
        const updatedList =  Object.values(diemLietContext.listDiemLiet).map((item) =>
            item.Ma === diemLietContext.diemLietId ? updatedItem : item
          );
          diemLietContext.setListDiemLiet(updatedList);
     }
    } else {
    }
    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    diemLietContext.setDiemLietModalVisible(false);
    diemLietContext.setDiemLietId(undefined);
  };
  // useEffect(() => {
  //     if (danhMuc_ChucVuContext.danhMuc_ChucVuId) {
  //         dispatch(GetDiemLiet(danhMuc_ChucVuContext.danhMuc_ChucVuId))
  //     }
  // }, [danhMuc_ChucVuContext.danhMuc_ChucVuId])

  useEffect(() => {
    if (diemLietContext.diemLietId) {
      if (diemLietContext.listDiemLiet) {
        const array = Object.values(diemLietContext.listDiemLiet);
        const foundItem = array.find(
          (item) => item.Ma === diemLietContext.diemLietId
        );
        if (foundItem) {
          form.setFieldsValue({ ...foundItem });
        } else {
          form.setFieldsValue({ Ma: "", Ten: "", TenCha: "", SoLan: "" }); // Cung cấp giá trị mặc định nếu không tìm thấy
        }
      }
    }
  }, [diemLietContext.diemLietId]);

  // useEffect(() => {
  //     if (!loaiDiemLiets?.length && !loading) {
  //         dispatch(SearchLoaiDiemLiet({}))
  //     }
  // }, [])

  return (
    <AntdModal
      title={
        diemLietContext.diemLietId
          ? `Sửa thông tin chức vụ`
          : `Thêm mới chức vụ`
      }
      visible={diemLietContext.diemlietModalVisible}
      handlerCancel={handleCancel}
      footer={null}
      width="60%"
    >
      <Form
        name="DiemLiet"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={diemLietContext.diemLietId !== null}
        initialValues={{
          soLuongThuTuc: 0,
          soLuongThuTucCapTinh: 0,
          soLuongThuTucCapHuyen: 0,
          soLuongThuTucCapXa: 0,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item label="Tên tiêu chí cha" name="TenCha">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <Form.Item label="Tên tiêu chí" name="Ten">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <Form.Item label="Số lần" name="SoLan">
              <Input />
            </Form.Item>
          </Col>
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
