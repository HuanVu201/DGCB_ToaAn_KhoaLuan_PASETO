import { AntdButton, AntdModal, AntdSelect, AntdSpace, AntdUpLoad, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Checkbox, Col, Form, FormProps, Input, InputNumber, Popconfirm, Row, Select, SelectProps, Space } from "antd"
import { useEffect, useMemo } from "react"
import { DeleteMenu, GetMenu, SearchMenuAdmin, UpdateMenu } from "../../redux/action"
import { useMenuContext } from "../../contexts/MenuContext"
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data"
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action"
import { IMenu, MENUMODULE, MENUMODULES } from "../../models"
import { DefaultOptionType } from "antd/es/select"
import { MenuApi } from "../../services"
import { toast } from "react-toastify"

export const MenuChiTiet = () => {
    const menuContext = useMenuContext()
    const { data: menu } = useAppSelector((state) => state.menu)
    const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
    const { sideBarMenu } = useAppSelector(state => state.menu)
    const [form] = Form.useForm<Omit<IMenu, "permission"> & { permission?: string[] }>()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = async () => {
        const formData = form.getFieldsValue()
        if (menu?.id) {
            const res = await MenuApi.Update({ id: menu.id, data: { ...formData, permission: formData.permission?.join(ID_SEPARATE_ONE_THUNK) || undefined } })
            if (res.data.succeeded) {
                dispatch(SearchMenuAdmin({ pageNumber: 1, pageSize: 10000, reFetch: true }))
                toast.success("Cập nhật thành công")
            }
        }
    }
    useEffect(() => {
        if (dataPermissions === undefined) {
            dispatch(SearchPermissionsVaiTro({}))
        }
    }, [dataPermissions])
    // const handleCancel = () => {
    //     form.resetFields()
    // }
    useEffect(() => {
        if (menuContext.menuId)
            dispatch(GetMenu(menuContext.menuId))
    }, [menuContext.menuId])
    useEffect(() => {
        if (menu) {
            form.setFieldsValue({ ...menu, permission: menu.permission ? menu.permission.split(ID_SEPARATE_ONE_THUNK) : undefined})
        }
    }, [menu])

    return (
        <Form name='MenuAction' layout="vertical" form={form} requiredMark={true} >
            <Space wrap direction="horizontal" style={{ marginBottom: '20px' }}>
                <AntdButton size="small" type="primary" onClick={onFinish} icon={<EditOutlined color="#fff"></EditOutlined>}>Lưu</AntdButton>
                <Popconfirm
                    title='Xoá?'
                    onConfirm={() => {
                        if (menu?.id) {
                            dispatch(DeleteMenu({ id: menu.id, forceDelete: false }))
                        }
                    }}
                    okText='Xoá'
                    cancelText='Huỷ'
                >
                    <Button size="small" type="primary" danger icon={<DeleteOutlined></DeleteOutlined>}>Xóa</Button>
                </Popconfirm>
            </Space>
            <Row gutter={[8, 8]} style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item
                        label="Tên nhóm chức năng"
                        name="module"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhóm chức năng" }]}
                    >
                        <Select options={(Object.keys(MENUMODULES) as Array<MENUMODULE>).map((module): DefaultOptionType => ({
                            value: module,
                            label: MENUMODULES[module]
                        }))} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        label="Sử dụng"
                        name="active"
                        valuePropName="checked"
                    >
                        <Checkbox ></Checkbox>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        label="Là menu trên"
                        name="isTopMenu"
                        valuePropName="checked"
                    >
                        <Checkbox ></Checkbox>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Tên đường dẫn"
                        name="fullPath"
                        rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Tên Icon"
                        name="iconName"
                    >
                        <Select options={(Object.keys(ICON_HOLDER_KEYS) as Array<keyof typeof ICON_HOLDER_KEYS>).map((key) => {
                            const icon = (ICON_HOLDER)[key]
                            return {
                                value: key,
                                label: <><span>{icon}</span> : <span>{key}</span></>,
                            }
                        })} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item<IMenu>
                        label="Tên menu cha"
                        name="parentId"
                    >
                        <AntdSelect
                            showSearch
                            allowClear
                            generateOptions={{
                                model: sideBarMenu,
                                label: "tenMenu",
                                value: "id",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Phân quyền"
                        name="permission"
                        hasFeedback
                    >
                        <AntdSelect
                            virtual={false}
                            mode="multiple"
                            showSearch
                            allowClear
                            generateOptions={{
                                model: dataPermissions,
                                label: "description",
                                value: "claimValue",
                            }}
                        />
                    </Form.Item>
                </Col>
                {/* <Col span={24}>
                    <Form.Item
                        label="Phân quyền Descriptions"
                        name="descriptionPermission"
                        hasFeedback
                    >
                        <AntdSelect
                            virtual={false}
                            mode="multiple"
                            showSearch
                            allowClear
                            generateOptions={{
                                model: dataPermissions,
                                label: "description",
                                value: "claimValue",
                            }}
                        />
                    </Form.Item>
                </Col> */}
            </Row>
        </Form>
    )
}
