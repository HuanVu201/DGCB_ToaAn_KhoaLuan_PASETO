import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDongBoDuLieu } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDongBoDuLieu, GetDongBoDuLieu, UpdateDongBoDuLieu } from "../redux/action"
import { useDongBoDuLieuContext } from "../contexts/DongBoDuLieuContext"
import { resetData } from "@/features/cachethongkhac/DongBoDuLieu/redux/slice"

export const DongBoDuLieuDetail = () => {
    const dispatch = useAppDispatch()
    const { data: DongBoDuLieu, datas: DongBoDuLieus } = useAppSelector(state => state.dongbodulieu)
    const DongBoDuLieuContext = useDongBoDuLieuContext()
    const [form] = Form.useForm<IDongBoDuLieu>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (DongBoDuLieuContext?.DongBoDuLieuId) {
            dispatch(UpdateDongBoDuLieu({ id: DongBoDuLieuContext.DongBoDuLieuId, data: { ...formData, type:"DongBoDuLieu" } }))
        } else {
            dispatch(AddDongBoDuLieu({ ...formData,type:"DongBoDuLieu" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        DongBoDuLieuContext.setDongBoDuLieuModalVisible(false)
        DongBoDuLieuContext.setDongBoDuLieuId(undefined)
    };
    useEffect(() => {
        if (DongBoDuLieuContext.DongBoDuLieuId) {
            dispatch(GetDongBoDuLieu(DongBoDuLieuContext.DongBoDuLieuId))
        }
    }, [DongBoDuLieuContext.DongBoDuLieuId])

    useEffect(() => {
        if (DongBoDuLieu) {
            form.setFieldsValue({ ...DongBoDuLieu })
        }
    }, [DongBoDuLieu])

    // useEffect(() => {
    //     if (!loaiDongBoDuLieus?.length && !loading) {
    //         dispatch(SearchLoaiDongBoDuLieu({}))
    //     }
    // }, [])

    return (
        <AntdModal title={DongBoDuLieuContext.DongBoDuLieuId ? `Sửa thông tin loại điểm` : `Thêm mới loại điểm`} visible={DongBoDuLieuContext.DongBoDuLieuModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DongBoDuLieu' layout="vertical" onFinish={onFinish} form={form} requiredMark={DongBoDuLieuContext.DongBoDuLieuId !== null}
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