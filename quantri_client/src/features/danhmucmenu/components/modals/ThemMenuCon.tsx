import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  SelectProps,
} from "antd";
import { Rule } from "antd/es/form";
import { useMenuContext } from "../../contexts/MenuContext";
import { AddMenu } from "../../redux/action";
import { IMenu, MENUMODULE, MENUMODULES } from "../../models";
import { DefaultOptionType } from "antd/es/select";
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data";
import { useEffect, useMemo } from "react";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import { MenuApi } from "../../services";
import { toast } from "react-toastify";

const suDungPhiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];
export const ThemMenuCon = ({
  handlerClose,
  visible,
  folderId,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
}) => {
  const [form] = Form.useForm<
    Omit<IMenu, "permission"> & { permission?: string[] }
  >();
  const { datas: dataPermissions } = useAppSelector((state) => state.vaitro);
  const { datas: menus } = useAppSelector((state) => state.menu);
  const menuContext = useMenuContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataPermissions === undefined) {
      dispatch(SearchPermissionsVaiTro({}));
    }
  }, [dataPermissions]);
  const onOk: FormProps["onFinish"] = async () => {
    const formData = form.getFieldsValue();
    const res = await MenuApi.Create({
      ...formData,
      permission: formData.permission?.join(ID_SEPARATE_ONE_THUNK) || undefined,
    });
    if (res.data.succeeded) {
      toast.success("Thêm thành công");
      handleCancel();
    }
  };
  const handleCancel = () => {
    form.resetFields();
    menuContext.setMenuId(undefined);
    handlerClose();
  };

  const parentMenu = useMemo((): DefaultOptionType[] => {
    const parentMenu = menus?.find((menu) => menu.id == folderId);
    if (!parentMenu) {
      return [];
    }
    return [
      {
        value: parentMenu?.id,
        label: parentMenu?.tenMenu,
      },
    ];
  }, [menus]);
  return (
    <AntdModal
      title="Thêm mới Menu con"
      handlerCancel={handleCancel}
      visible={visible}
      onOk={onOk}
      okText="Xác nhận"
      cancelText="Đóng"
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Form
        name="AddSubMenu"
        layout="vertical"
        form={form}
        requiredMark={true}
        initialValues={{ parentId: folderId, active: true }}
      >
        <Row
          gutter={[8, 8]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col span={20}>
            <Form.Item
              label="Tên Menu"
              name="tenMenu"
              rules={[{ required: true, message: "Vui lòng nhập tên menu" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Thứ tự"
              name="thuTuMenu"
              rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Tên nhóm chức năng"
              name="module"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm chức năng" },
              ]}
            >
              <Select
                options={(Object.keys(MENUMODULES) as Array<MENUMODULE>).map(
                  (module): DefaultOptionType => ({
                    value: module,
                    label: MENUMODULES[module],
                  })
                )}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Sử dụng" name="active" valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Là menu trên"
              name="isTopMenu"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Tên đường dẫn"
              name="fullPath"
              rules={[
                { required: true, message: "Vui lòng nhập tên đường dẫn" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên Icon" name="iconName">
              <Select
                options={(
                  Object.keys(ICON_HOLDER_KEYS) as Array<
                    keyof typeof ICON_HOLDER_KEYS
                  >
                ).map((key) => {
                  const icon = ICON_HOLDER[key];
                  return {
                    value: key,
                    label: (
                      <>
                        <span>{icon}</span> : <span>{key}</span>
                      </>
                    ),
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IMenu> label="Tên menu cha" name="parentId">
              <Select disabled options={parentMenu} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Phân quyền" name="permission" hasFeedback>
              <AntdSelect
                virtual={false}
                mode="multiple"
                generateOptions={{
                  model: dataPermissions,
                  label: "claimValue",
                  value: "claimValue",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};
