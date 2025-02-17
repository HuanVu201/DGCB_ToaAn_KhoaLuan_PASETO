import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IKyDanhGia } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddKyDanhGia, GetKyDanhGia, UpdateKyDanhGia } from "../redux/action"
import { useKyDanhGiaContext } from "../contexts/KyDanhGiaContext"
import { resetData } from "@/features/danhmuc_dgcb/kydanhgia/redux/slice"
import dayjs from "dayjs";
export const KyDanhGiaDetail = () => {
    const dispatch = useAppDispatch()
    const { data: kyDanhGia, datas: kyDanhGias } = useAppSelector(state => state.kydanhgia)
    const kyDanhGiaContext = useKyDanhGiaContext()
    const [form] = Form.useForm<IKyDanhGia>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        const formattedData = {
            ...formData,
            tuNgayDanhGia: formData.tuNgayDanhGia ? dayjs(formData.tuNgayDanhGia): undefined,
            denNgayDanhGia: formData.denNgayDanhGia ? dayjs(formData.denNgayDanhGia) : undefined,
            thoiGianGiaHan: formData.thoiGianGiaHan?.toString(),
        };
        if (kyDanhGiaContext?.kyDanhGiaId) {
            dispatch(UpdateKyDanhGia({ id: kyDanhGiaContext.kyDanhGiaId, data: { ...formattedData } }))
        } else {
            dispatch(AddKyDanhGia({ ...formattedData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        kyDanhGiaContext.setKyDanhGiaModalVisible(false)
        kyDanhGiaContext.setKyDanhGiaId(undefined)
    };
    useEffect(() => {
        if (kyDanhGiaContext.kyDanhGiaId) {
            dispatch(GetKyDanhGia(kyDanhGiaContext.kyDanhGiaId))
        }
    }, [kyDanhGiaContext.kyDanhGiaId])

    useEffect(() => {
        if (kyDanhGia) {
            form.setFieldsValue({
                ...kyDanhGia,
                tuNgayDanhGia: kyDanhGia.tuNgayDanhGia ? dayjs(kyDanhGia.tuNgayDanhGia) : undefined,
                denNgayDanhGia: kyDanhGia.denNgayDanhGia ? dayjs(kyDanhGia.denNgayDanhGia) : undefined,
            });
        }
    }, [kyDanhGia])

    // useEffect(() => {
    //     if (!loaiKyDanhGias?.length && !loading) {
    //         dispatch(SearchLoaiKyDanhGia({}))
    //     }
    // }, [])

    return (
        <AntdModal title={kyDanhGiaContext.kyDanhGiaId ? `Sửa thông tin kỳ đánh giá` : `Thêm mới kỳ đánh giá`} visible={kyDanhGiaContext.kyDanhGiaModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='KyDanhGia' layout="vertical" onFinish={onFinish} form={form} requiredMark={kyDanhGiaContext.kyDanhGiaId !== null}
                //initialValues
                >
                 <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên kỳ đánh giá"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên kỳ đánh giá' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thời gian đánh giá từ ngày :"
                            name="tuNgayDanhGia"
                        >
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thời gian đánh giá đến ngày"
                            name="denNgayDanhGia"
                        >
                            <DatePicker format="DD/MM/YYYY"/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số ngày được phép gia hạn"
                            name="thoiGianGiaHan"
                        >
                            <InputNumber min={0}/>
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