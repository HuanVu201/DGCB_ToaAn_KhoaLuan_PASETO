import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_CacCap } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_CacCap, GetDanhMuc_CacCap, UpdateDanhMuc_CacCap } from "../redux/action"
import { useDanhMuc_CacCapContext } from "../contexts/DanhMuc_CacCapContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_caccap/redux/slice"

export const DanhMuc_CacCapDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_CacCap, datas: danhMuc_CacCaps } = useAppSelector(state => state.danhmuc_caccap)
    const danhMuc_CacCapContext = useDanhMuc_CacCapContext()
    const [form] = Form.useForm<IDanhMuc_CacCap>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_CacCapContext?.danhMuc_CacCapId) {
            dispatch(UpdateDanhMuc_CacCap({ id: danhMuc_CacCapContext.danhMuc_CacCapId, data: { ...formData,type:"CapDanhGia"} }))
        } else {
            dispatch(AddDanhMuc_CacCap({ ...formData,type:"CapDanhGia"}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_CacCapContext.setDanhMuc_CacCapModalVisible(false)
        danhMuc_CacCapContext.setDanhMuc_CacCapId(undefined)
    };
    useEffect(() => {
        if (danhMuc_CacCapContext.danhMuc_CacCapId) {
            dispatch(GetDanhMuc_CacCap(danhMuc_CacCapContext.danhMuc_CacCapId))
        }
    }, [danhMuc_CacCapContext.danhMuc_CacCapId])

    useEffect(() => {
        if (danhMuc_CacCap) {
            form.setFieldsValue({ ...danhMuc_CacCap })
        }
    }, [danhMuc_CacCap])

    // useEffect(() => {
    //     if (!loaiDanhMuc_CacCaps?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_CacCap({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_CacCapContext.danhMuc_CacCapId ? `Sửa thông tin đơn vị tính` : `Thêm mới đơn vị tính`} visible={danhMuc_CacCapContext.danhMuc_CacCapModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_CacCap' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_CacCapContext.danhMuc_CacCapId !== null}
                initialValues={{  }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="tenDanhMuc"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đơn vị tính' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"
                           
                            valuePropName="checked"
                           
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Được chấm nhiều lần"
                            name="duocChamNhieuLan"
                           
                            valuePropName="checked"
                           
                        >
                            <Checkbox/>
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