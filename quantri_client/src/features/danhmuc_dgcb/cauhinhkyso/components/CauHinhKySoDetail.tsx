import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { ICauHinhKySo } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddCauHinhKySo, GetCauHinhKySo, UpdateCauHinhKySo } from "../redux/action"
import { useCauHinhKySoContext } from "../contexts/CauHinhKySoContext"
import { resetData } from "@/features/danhmuc_dgcb/cauhinhkyso/redux/slice"

export const CauHinhKySoDetail = () => {
    const dispatch = useAppDispatch()
    const { data: cauHinhKySo, datas: cauHinhKySos } = useAppSelector(state => state.cauhinhkyso)
    const cauHinhKySoContext = useCauHinhKySoContext()
    const [form] = Form.useForm<ICauHinhKySo>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (cauHinhKySoContext?.cauHinhKySoId) {
            dispatch(UpdateCauHinhKySo({ id: cauHinhKySoContext.cauHinhKySoId, data: { ...formData,type:"CauHinhKySo"} }))
        } else {
            dispatch(AddCauHinhKySo({ ...formData,type:"CauHinhKySo"}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        cauHinhKySoContext.setCauHinhKySoModalVisible(false)
        cauHinhKySoContext.setCauHinhKySoId(undefined)
    };
    useEffect(() => {
        if (cauHinhKySoContext.cauHinhKySoId) {
            dispatch(GetCauHinhKySo(cauHinhKySoContext.cauHinhKySoId))
        }
    }, [cauHinhKySoContext.cauHinhKySoId])

    useEffect(() => {
        if (cauHinhKySo) {
            form.setFieldsValue({ ...cauHinhKySo })
        }
    }, [cauHinhKySo])

    // useEffect(() => {
    //     if (!loaiCauHinhKySos?.length && !loading) {
    //         dispatch(SearchLoaiCauHinhKySo({}))
    //     }
    // }, [])

    return (
        <AntdModal title={cauHinhKySoContext.cauHinhKySoId ? `Sửa thông tin cấu hình ký số` : `Thêm mới cấu hình ký số`} visible={cauHinhKySoContext.cauHinhKySoModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='CauHinhKySo' layout="vertical" onFinish={onFinish} form={form} requiredMark={cauHinhKySoContext.cauHinhKySoId !== null}
                initialValues={{  }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên cấu hình"
                            name="tenDanhMuc"
                            rules={[{ required: true, message: 'Vui lòng nhập tên cấu hình ký số' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Mã cấu hình"
                            name="code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"
                           
                            valuePropName="checked"
                           
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Được chấm nhiều lần"
                            name="duocChamNhieuLan"
                           
                            valuePropName="checked"
                           
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col> */}

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