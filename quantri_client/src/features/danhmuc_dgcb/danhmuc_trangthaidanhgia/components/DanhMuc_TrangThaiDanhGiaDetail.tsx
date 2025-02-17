import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_TrangThaiDanhGia } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_TrangThaiDanhGia, GetDanhMuc_TrangThaiDanhGia, UpdateDanhMuc_TrangThaiDanhGia } from "../redux/action"
import { useDanhMuc_TrangThaiDanhGiaContext } from "../contexts/DanhMuc_TrangThaiDanhGiaContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_trangthaidanhgia/redux/slice"

export const DanhMuc_TrangThaiDanhGiaDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_TrangThaiDanhGia, datas: danhMuc_TrangThaiDanhGias } = useAppSelector(state => state.danhmuc_trangthaidanhgia)
    const danhMuc_TrangThaiDanhGiaContext = useDanhMuc_TrangThaiDanhGiaContext()
    const [form] = Form.useForm<IDanhMuc_TrangThaiDanhGia>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_TrangThaiDanhGiaContext?.danhMuc_TrangThaiDanhGiaId) {
            dispatch(UpdateDanhMuc_TrangThaiDanhGia({ id: danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId, data: { ...formData, } }))
        } else {
            dispatch(AddDanhMuc_TrangThaiDanhGia({ ...formData }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_TrangThaiDanhGiaContext.setDanhMuc_TrangThaiDanhGiaModalVisible(false)
        danhMuc_TrangThaiDanhGiaContext.setDanhMuc_TrangThaiDanhGiaId(undefined)
    };
    useEffect(() => {
        if (danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId) {
            dispatch(GetDanhMuc_TrangThaiDanhGia(danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId))
        }
    }, [danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId])

    useEffect(() => {
        if (danhMuc_TrangThaiDanhGia) {
            form.setFieldsValue({ ...danhMuc_TrangThaiDanhGia })
        }
    }, [danhMuc_TrangThaiDanhGia])

    // useEffect(() => {
    //     if (!loaiDanhMuc_TrangThaiDanhGias?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_TrangThaiDanhGia({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId ? `Sửa thông tin trạng thái đánh giá` : `Thêm mới trạng thái đánh giá`} visible={danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_TrangThaiDanhGia' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_TrangThaiDanhGiaContext.danhMuc_TrangThaiDanhGiaId !== null}
                initialValues={{ laTrangThaiDonVi: false}}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Mã trạng thái"
                            name="ma"
                            rules={[{ required: true, message: 'Vui lòng nhập tên trạng thái đánh giá' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Tên trạng thái"
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber />
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
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Là trạng thái đơn vị"
                            name="laTrangThaiDonVi"
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