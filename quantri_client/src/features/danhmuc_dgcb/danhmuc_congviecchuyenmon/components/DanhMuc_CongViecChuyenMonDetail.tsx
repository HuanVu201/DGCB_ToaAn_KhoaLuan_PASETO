import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_CongViecChuyenMon } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_CongViecChuyenMon, GetDanhMuc_CongViecChuyenMon, UpdateDanhMuc_CongViecChuyenMon } from "../redux/action"
import { useDanhMuc_CongViecChuyenMonContext } from "../contexts/DanhMuc_CongViecChuyenMonContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_congviecchuyenmon/redux/slice"

export const DanhMuc_CongViecChuyenMonDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_CongViecChuyenMon, datas: danhMuc_CongViecChuyenMons } = useAppSelector(state => state.danhmuc_congviecchuyenmon)
    const danhMuc_CongViecChuyenMonContext = useDanhMuc_CongViecChuyenMonContext()
    const [form] = Form.useForm<IDanhMuc_CongViecChuyenMon>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_CongViecChuyenMonContext?.danhMuc_CongViecChuyenMonId) {
            dispatch(UpdateDanhMuc_CongViecChuyenMon({ id: danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId, data: { ...formData, type:"CongViecChuyenMon" } }))
        } else {
            dispatch(AddDanhMuc_CongViecChuyenMon({ ...formData,type:"CongViecChuyenMon" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_CongViecChuyenMonContext.setDanhMuc_CongViecChuyenMonModalVisible(false)
        danhMuc_CongViecChuyenMonContext.setDanhMuc_CongViecChuyenMonId(undefined)
    };
    useEffect(() => {
        if (danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId) {
            dispatch(GetDanhMuc_CongViecChuyenMon(danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId))
        }
    }, [danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId])

    useEffect(() => {
        if (danhMuc_CongViecChuyenMon) {
            form.setFieldsValue({ ...danhMuc_CongViecChuyenMon })
        }
    }, [danhMuc_CongViecChuyenMon])

    // useEffect(() => {
    //     if (!loaiDanhMuc_CongViecChuyenMons?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_CongViecChuyenMon({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId ? `Sửa thông tin công việc chuyên môn` : `Thêm mới công việc chuyên môn`} visible={danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_CongViecChuyenMon' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_CongViecChuyenMonContext.danhMuc_CongViecChuyenMonId !== null}
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