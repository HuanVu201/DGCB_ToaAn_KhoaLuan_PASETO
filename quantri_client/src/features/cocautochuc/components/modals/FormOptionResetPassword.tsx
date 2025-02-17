import { useEffect, useMemo, useState } from "react";
import {
  CreateUserWithDefaultPassword,
  UpdateUser,
} from "@/features/user/redux/Actions";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, Form, FormProps, Input, InputNumber, message, Row } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { userService } from "@/features/user/services";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import { SearchDanhMuc_ChucDanh } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/action";
import { SearchDanhMuc_ChucVu } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/action";
import { SearchCoCauToChuc } from "../../redux/crud";
import { CreateUserWithDefaultPasswordRequest } from "@/features/user/services/params";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";
import { ISearchUser } from "@/features/user/models";
import { deleteObjectKeyValues } from "@/utils/common";
import { buocXuLyApi } from "@/features/buocxuly/services";
import { SearchNhomNguoiDung } from "@/features/nhomnguoidung/redux/action";
import { CopyOutlined } from "@ant-design/icons";
const INPUT_RULES = {
  ACCOUNT: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PASSWORD: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  FULLNAME: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  OFFICECODE: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  EMAIL: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PHONENUMBER: [
    {
      type: "regexp",
      pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g),
      message: "Số điện thoại không đúng định dạng",
    },
  ] as any,
};

export const FormOptionResetPassword = ({
  handlerClose,
  visible,
  selectedUser,
  currentGroup,
  setSearchParams,
}: {
  handlerClose: () => void;
  visible: boolean;
  selectedUser?: UserGroupResponse;
  currentGroup: string;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>>
}) => {
  const modalContext = useCoCauModalContext();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [initialValues, setInitialValues] = useState({
    minLength: 8,
    requireUppercase: true,
    maxFailedLoginAttempts: 5,
    passwordExpiryTime: 100,
    requireLowercase: true,
    requireSpecialCharacter: true,
    requireDigit: true,
    disallowUsernameInPassword: true,
    disallowFullNameInPassword: true,
    disallowNumberPhoneInPassword: true,
    disallowDateOfBirthInPassword: true,
  });
  const onFinish: FormProps["onFinish"] = async (values) => {
    if (selectedUser !== undefined) {
      try {
        const res = await userService.AddminResetPasswordValidation({
          ...values,
          userName: selectedUser?.userName,
        });

        if (res.status === 200) {
          // Giả sử API trả về mật khẩu mới
          setNewPassword(res.data.message); // Lưu mật khẩu mới từ phản hồi API
          setIsModalVisible(true); // Hiển thị modal thông báo thành công
        }
      } catch (error) {
        message.error('Đã xảy ra lỗi khi thay đổi mật khẩu:');
        console.log(error);
      }
    }

    //handleCancel();
  };


  const handleCancel = () => {
    form.resetFields();
    handlerClose();
  };

  useEffect(() => {
  }, [modalContext.selectedUser])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    //message.success('Mật khẩu đã được sao chép!');
  };
  // Default values


  return (
    <> <AntdModal
      title={selectedUser ? "Cấu hình quản lý mật khẩu đăng nhập" : ""}
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      width={1000}
      destroyOnClose
    >

      <Form
        name="users"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={true}
        initialValues={{
          minLength: "8",
          requireUppercase: true,
          requireLowercase: true,
          requireSpecialCharacter: true,
          requireDigit: true,
          disallowUsernameInPassword: true,
          disallowFullNameInPassword: true,
          disallowNumberPhoneInPassword: true,
          disallowDateOfBirthInPassword: true,
          maxFailedLoginAttempts: "10",
          passwordExpiryTime: "100",
          passwordNotEqualToOld: true,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
            <Form.Item label="" name="minLength" rules={[{ required: true, message: "Không được để trống" }]}>
              <Row align="middle">
                <Col span={12}>
                  <span>1.Độ dài tối thiểu</span>
                </Col>
                <Col span={12}>
                  <InputNumber defaultValue={8} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="requireUppercase" valuePropName="checked" >
              <Row align="middle">
                <Col span={12}>
                  <span>2.Phải có chữ hoa</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="requireLowercase" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>3.Phải có chữ thường</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="requireSpecialCharacter" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>4.Phải có ký tự đặc biệt</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="requireDigit" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>5.Phải có số</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="disallowUsernameInPassword" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>6.Không chứa tên tài khoản</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="DisallowFullNameInPassword" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>7.Không chứa tên người sử dụng</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="DisallowNumberPhoneInPassword" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>8.Không chứa số điện thoại</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="DisallowDateOfBirthInPassword" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>9.Không chứa chuỗi ngày tháng năm sinh</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="maxFailedLoginAttempts" rules={[{ required: true, message: "Không được để trống" }]}>
              <Row align="middle">
                <Col span={12}>
                  <span>10.Số lần đăng nhập sai liên tiếp sẽ khóa tài khoản</span>
                </Col>
                <Col span={12}>
                  <InputNumber defaultValue={10} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="passwordExpiryTime" rules={[{ required: true, message: "Không được để trống" }]}>
              <Row align="middle">
                <Col span={12}>
                  <span>11.Thời gian yêu cầu phải thay đổi mật khẩu</span>
                </Col>
                <Col span={12}>
                  <InputNumber defaultValue={100} />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item label="" name="passwordNotEqualToOld" valuePropName="checked">
              <Row align="middle">
                <Col span={12}>
                  <span>12.Mật khẩu mới phải không trùng với mật khẩu cũ</span>
                </Col>
                <Col span={12}>
                  <Checkbox defaultChecked={true} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 16, span: 24 }}>
          <AntdSpace>
            <AntdButton type="primary" htmlType="submit">
              Reset
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        </Form.Item>
      </Form>
    </AntdModal>
      {/* Modal thông báo thành công */}
      <AntdModal
        title="Thông báo"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <AntdButton key="copy" icon={<CopyOutlined />} onClick={copyToClipboard}>
            Sao chép mật khẩu
          </AntdButton>,
          <AntdButton key="ok" onClick={() => {
            setIsModalVisible(false)
            handleCancel();

          }}>
            OK
          </AntdButton>
        ]}
      >
        {/* <p>Đã thay đổi mật khẩu thành công cho tài khoản <strong>{selectedUser?.userName}</strong></p> */}
        <p>Mật khẩu khởi tạo mới là: <strong>{newPassword}</strong></p>
      </AntdModal>
    </>

  );
};
