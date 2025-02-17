import { useState, useEffect } from "react";
import { IUpdateUserRole, IUser, IUserRole } from "@/features/user/models";
import {
  AntdButton,
  AntdModal,
  AntdSpace,
  AntdTab,
  IAntdTabsProps,
} from "@/lib/antd/components";
import {
  Checkbox,
  CheckboxOptionType,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Progress,
  Radio,
  Row,
  Spin,
} from "antd";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { userService } from "@/features/user/services";
import { vaiTroService } from "@/features/vaitro/services";
import { toast } from "react-toastify";
import { IVaiTro } from "@/features/vaitro/models";
import { UserGroupResponse } from "@/models/userGroup";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckboxOptionTypeExtend } from "../../models";
const INPUT_RULES = {
  ROLES: [
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
};

const PhanQuyen = ({
  users,
  visible,
  handleClose,
}: {
  users?: UserGroupResponse[];
  visible: boolean;
  handleClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [percentProgress, setPercentProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const [roleOptions, setRoleOptions] = useState<CheckboxOptionTypeExtend[]>([]);
  const [roles, setRoles] = useState<IUserRole[]>([]);
  const TABDATA: IAntdTabsProps["items"] = [
    {
      label: "Vai trò",
      key: "vai-tro",
      children: (
        <Spin spinning={loading}
          indicator={<LoadingOutlined spin />}
        >
          <Row gutter={[8, 8]}>
            <Col md={24} span={24}>
              <Form.Item name="role" required rules={INPUT_RULES.ROLES}>
                <Checkbox.Group
                // onChange={(value) => {
                //   console.log("====================================");
                //   console.log(value);
                //   console.log("====================================");
                // }}
                >
                  <AntdSpace direction="vertical">
                    {roleOptions
                    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
                    .map((item) => {
                      return (
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      );
                    })}
                  </AntdSpace>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </Spin>
      ),
    },
  ];
  const onFinish: FormProps["onFinish"] = async (values) => {
    setLoading(true);
    if (values?.role) {
      if (users && users.length > 0) {
        users.map(async (user, index) => {
          setProgressVisible(true);
          let userId = user.userId;
          let userGroupId = user.id;
          let userName = user.userName;

          var tmpRoles = roles.map((x: IUserRole) => {
            let role = values?.role.find((item: string) => x.roleId == item);

            return {
              roleId: x?.roleId,
              roleName: x?.roleName,
              enabled: role ? true : false,
            } as IUserRole;
          });
          let postData: IUpdateUserRole = {
            userRoles: tmpRoles,
          };
          userService
            .UpdateUserGroupRoles(userId, userGroupId, postData)
            .then((res) => {
              if (res) {
                let percent = Math.round(((index + 1) / users.length) * 100);
                setPercentProgress(percent);
                toast.success("Phân quyền thành công tài khoản: " + userName);
              }
            })
            .catch((err) => {
              console.log("Phân quyền thất bại tài khoản");
              console.log(err);
              toast.error("Phân quyền thất bại tài khoản: " + userName);
            });

          setProgressVisible(false);
        });
      }
    }
    setLoading(false);
    handleCancel();
  };

  const handleCancel = () => {
    handleClose();
  };
  const loadRoles = async () => {
    let res = await vaiTroService.Search({ pageNumber: 10, pageSize: 1 });
    if (res?.data && res?.data.length > 0) {
      let tmpRoles: IUserRole[] = res?.data?.map((item: IVaiTro) => {
        return {
          roleId: item.id,
          roleName: item.name,
        } as IUserRole;
      });
      setRoles(tmpRoles);
      let tmp = res?.data.map((item: IVaiTro) => {
        return {
          value: item.id,
          label: item.name,
          number: item.number,
        };
      });
      setRoleOptions(tmp);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (users && users.length == 1) {
        let userId = users[0].userId;
        let userGroupId = users[0].id;
        let user = await userService.GetUserGroupRoles(userId, userGroupId);
        if (user?.data && user?.data?.length > 0) {
          let userRoles = user?.data
            ?.filter((x: IUserRole) => x.enabled)
            .map((item: IUserRole) => item.roleId);
          let tmp = user?.data.map((item: IUserRole) => {
            return {
              value: item.roleId,
              label: item.roleName,
              number: item.number,
            };
          });
          setRoles(user?.data);
          setRoleOptions(tmp);
          form.setFieldValue("role", userRoles);
        }
      } else {
        await loadRoles();
      }
      setLoading(false);
    })();
  }, [users]);
  return (
    <AntdModal
      title="Phân quyền người dùng"
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Form
        name="users"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={true}
      >
        <AntdTab items={TABDATA}></AntdTab>
        {progressVisible ? <Progress percent={percentProgress} /> : null}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <AntdSpace>
            <AntdButton type="primary" htmlType="submit" disabled={loading}>
              Xác nhận
            </AntdButton>
            <AntdButton
              type="default"
              onClick={handleCancel}
              disabled={loading}
            >
              Đóng
            </AntdButton>
          </AntdSpace>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};

export { PhanQuyen };
