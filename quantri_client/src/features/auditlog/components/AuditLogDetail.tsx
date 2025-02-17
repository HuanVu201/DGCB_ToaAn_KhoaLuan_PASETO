import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IAuditLog } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddAuditLog, GetAuditLog, UpdateAuditLog } from "../redux/action"
import { useAuditLogContext } from "../contexts/AuditLogContext"
import { resetData } from "@/features/auditlog/redux/slice"

export const AuditLogDetail = () => {
    const dispatch = useAppDispatch()
    const { data: auditLog, datas: auditLogs } = useAppSelector(state => state.auditlog)
    const auditLogContext = useAuditLogContext()
    const [form] = Form.useForm<IAuditLog>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (auditLogContext?.auditLogId) {
            dispatch(UpdateAuditLog({ id: auditLogContext.auditLogId, data: { ...formData, } }))
        } else {
            dispatch(AddAuditLog({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        auditLogContext.setAuditLogModalVisible(false)
        auditLogContext.setAuditLogId(undefined)
    };
    useEffect(() => {
        if (auditLogContext.auditLogId) {
            dispatch(GetAuditLog(auditLogContext.auditLogId))
        }
    }, [auditLogContext.auditLogId])

    useEffect(() => {
        if (auditLog) {
            form.setFieldsValue({ ...auditLog })
        }
    }, [auditLog])

    // useEffect(() => {
    //     if (!loaiAuditLogs?.length && !loading) {
    //         dispatch(SearchLoaiAuditLog({}))
    //     }
    // }, [])

    return (
        <AntdModal title={auditLogContext.auditLogId ? `Sửa thông tin chức danh` : `Thêm mới chức danh`} visible={auditLogContext.auditLogModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='AuditLog' layout="vertical" onFinish={onFinish} form={form} requiredMark={auditLogContext.auditLogId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên chức danh"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chức danh' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã chức danh"
                            name="ma"
                            rules={[{ required: true, message: 'Vui lòng nhập mã chức danh' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
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