import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_DonViTinh } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_DonViTinh, GetDanhMuc_DonViTinh, UpdateDanhMuc_DonViTinh } from "../redux/action"
import { useDanhMuc_DonViTinhContext } from "../contexts/DanhMuc_DonViTinhContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/slice"

export const DanhMuc_DonViTinhDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_DonViTinh, datas: danhMuc_DonViTinhs } = useAppSelector(state => state.danhmuc_donvitinh)
    const danhMuc_DonViTinhContext = useDanhMuc_DonViTinhContext()
    const [form] = Form.useForm<IDanhMuc_DonViTinh>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_DonViTinhContext?.danhMuc_DonViTinhId) {
            dispatch(UpdateDanhMuc_DonViTinh({ id: danhMuc_DonViTinhContext.danhMuc_DonViTinhId, data: { ...formData,type:"DonViTinh"} }))
        } else {
            dispatch(AddDanhMuc_DonViTinh({ ...formData,type:"DonViTinh"}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_DonViTinhContext.setDanhMuc_DonViTinhModalVisible(false)
        danhMuc_DonViTinhContext.setDanhMuc_DonViTinhId(undefined)
    };
    useEffect(() => {
        if (danhMuc_DonViTinhContext.danhMuc_DonViTinhId) {
            dispatch(GetDanhMuc_DonViTinh(danhMuc_DonViTinhContext.danhMuc_DonViTinhId))
        }
    }, [danhMuc_DonViTinhContext.danhMuc_DonViTinhId])

    useEffect(() => {
        if (danhMuc_DonViTinh) {
            form.setFieldsValue({ ...danhMuc_DonViTinh })
        }
    }, [danhMuc_DonViTinh])

    // useEffect(() => {
    //     if (!loaiDanhMuc_DonViTinhs?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_DonViTinh({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_DonViTinhContext.danhMuc_DonViTinhId ? `Sửa thông tin đơn vị tính` : `Thêm mới đơn vị tính`} visible={danhMuc_DonViTinhContext.danhMuc_DonViTinhModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_DonViTinh' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_DonViTinhContext.danhMuc_DonViTinhId !== null}
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
                            rules={[{ required: true, message: 'Vui lòng nhập Mã đơn vị tính' }]}
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