import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_TrangThaiCongViec } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_TrangThaiCongViec, GetDanhMuc_TrangThaiCongViec, UpdateDanhMuc_TrangThaiCongViec } from "../redux/action"
import { useDanhMuc_TrangThaiCongViecContext } from "../contexts/DanhMuc_TrangThaiCongViecContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_trangthaicongviec/redux/slice"

export const DanhMuc_TrangThaiCongViecDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_TrangThaiCongViec, datas: danhMuc_TrangThaiCongViecs } = useAppSelector(state => state.danhmuc_trangthaicongviec)
    const danhMuc_TrangThaiCongViecContext = useDanhMuc_TrangThaiCongViecContext()
    const [form] = Form.useForm<IDanhMuc_TrangThaiCongViec>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_TrangThaiCongViecContext?.danhMuc_TrangThaiCongViecId) {
            dispatch(UpdateDanhMuc_TrangThaiCongViec({ id: danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId, data: { ...formData, type:"TrangThaiCongViec" } }))
        } else {
            dispatch(AddDanhMuc_TrangThaiCongViec({ ...formData,type:"TrangThaiCongViec" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_TrangThaiCongViecContext.setDanhMuc_TrangThaiCongViecModalVisible(false)
        danhMuc_TrangThaiCongViecContext.setDanhMuc_TrangThaiCongViecId(undefined)
    };
    useEffect(() => {
        if (danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId) {
            dispatch(GetDanhMuc_TrangThaiCongViec(danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId))
        }
    }, [danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId])

    useEffect(() => {
        if (danhMuc_TrangThaiCongViec) {
            form.setFieldsValue({ ...danhMuc_TrangThaiCongViec })
        }
    }, [danhMuc_TrangThaiCongViec])

    // useEffect(() => {
    //     if (!loaiDanhMuc_TrangThaiCongViecs?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_TrangThaiCongViec({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId ? `Sửa thông tin trạng thái công việc` : `Thêm mới trạng thái công việc`} visible={danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_TrangThaiCongViec' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_TrangThaiCongViecContext.danhMuc_TrangThaiCongViecId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
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