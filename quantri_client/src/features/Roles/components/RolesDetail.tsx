import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Table, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IRoles } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddRoles, GetPermissionOfRole, GetRoles, UpdateRoles } from "../redux/action"
import { useRolesContext } from "../contexts/RolesContext"
import { resetData } from "@/features/Roles/redux/slice"
import { GetPermissionVaiTro } from "@/features/vaitro/redux/action"
import { RolesApi } from "../services"

export const RolesDetail =() => {
    const dispatch = useAppDispatch()
    const { data: Roles, datas: Roless , loading} = useAppSelector(state => state.roles)
    const RolesContext = useRolesContext()
    const [form] = Form.useForm<IRoles>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (RolesContext?.RolesId) {
            dispatch(UpdateRoles({ id: RolesContext.RolesId, data: { ...formData} }))
        } else {
            dispatch(AddRoles({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        RolesContext.setRolesModalVisible(false)
        RolesContext.setRolesId(undefined)
    };
    useEffect(() => {
        const fetchPermissions =  () => {
            if (RolesContext.RolesId) {
              //  var res = await RolesApi.GetPermissionOfRole(RolesContext.RolesId);
              dispatch(GetPermissionOfRole(RolesContext.RolesId))
            }
        }
        fetchPermissions();
    }, [RolesContext.RolesId])

    useEffect(() => {
        if (Roles) {
            form.setFieldsValue({ ...Roles })
        }
    }, [Roles])

    // useEffect(() => {
    //     if (!loaiRoless?.length && !loading) {
    //         dispatch(SearchLoaiRoles({}))
    //     }
    // }, [])
    const columns = [
        // {
        //     title: "ID Quyền",
        //     dataIndex: "id",
        //     key: "id",
        // },
        // {
        //     title: "Claim Value",
        //     dataIndex: "claimValue",
        //     key: "claimValue",
        // },
        {
            title: "Quyền",
            dataIndex: "description",
            key: "description",
        },
    ];
    return (
        <AntdModal title={RolesContext.RolesId ? `Sửa thông tin vai trò` : `Thêm mới vai trò`} visible={RolesContext.RolesModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='Roles' layout="vertical" onFinish={onFinish} form={form} requiredMark={RolesContext.RolesId !== null}
                initialValues={{ }}>
                 <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên Role"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đơn vị tính' }]}
                        >
                            <Input 
                            //disabled={true}
                            />
                        </Form.Item>
                    </Col>
                    {/* <Col md={24} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input 
                            //disabled={true}
                            />
                        </Form.Item>
                    </Col> */}

                </Row>
                {/* Table hiển thị permissions */}
                {RolesContext.RolesId ? (<>
                    <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item label="">
                            <Table
                                columns={columns}
                                dataSource={Roles?.permissions}
                                rowKey="id"
                                pagination={false}
                                loading={loading}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                </>) : (<></>)}
               
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
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
    )
}