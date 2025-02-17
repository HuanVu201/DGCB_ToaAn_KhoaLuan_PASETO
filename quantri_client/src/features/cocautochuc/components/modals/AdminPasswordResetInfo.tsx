import {
  GetUserById,
  UpdateUser,
  CreateUser,
  AdminResetPassword,
} from "@/features/user/redux/Actions";
import { userService } from "../../../user/services/index";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
  IAntdTabsProps,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";

export const AdminPasswordResetInfoModal = ({
  handlerClose,
  visible,
}: {
  handlerClose: () => void;
  visible: boolean;
}) => {
  const [form] = Form.useForm();
  const modalContext = useCoCauModalContext();
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    form.resetFields();
    handlerClose();
  };

  return (
    <AntdModal
      title="Đặt lại mật khẩu thành công"
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Form name="users" layout="vertical" form={form} requiredMark={true}>
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
            <Form.Item label="Mật khẩu mới" name="password">
              <Input disabled />
            </Form.Item>
          </Col>

          {/* <Col md={12} span={24}>
              <Form.Item
                  label="Thứ tự"
                  name="thuTu"
              >
                  <InputNumber min={1} />
              </Form.Item>
          </Col> */}
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <AntdSpace>
            {/* <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton> */}
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
