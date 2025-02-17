import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IHistoryCallApiTichHop } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddHistoryCallApiTichHop, GetHistoryCallApiTichHop, UpdateHistoryCallApiTichHop } from "../redux/action"
import { useHistoryCallApiTichHopContext } from "../contexts/HistoryCallApiTichHopContext"
import { resetData } from "@/features/cachethongkhac/HistoryCallApiTichHop/redux/slice"

export const HistoryCallApiTichHopDetail = () => {
    const dispatch = useAppDispatch()
    const { data: historyCallApiTichHop, datas: historyCallApiTichHops } = useAppSelector(state => state.historycallapitichhop)
    const historyCallApiTichHopContext = useHistoryCallApiTichHopContext()
    const [form] = Form.useForm<IHistoryCallApiTichHop>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (historyCallApiTichHopContext?.historyCallApiTichHopId) {
            dispatch(UpdateHistoryCallApiTichHop({ id: historyCallApiTichHopContext.historyCallApiTichHopId, data: { ...formData, tableName:"DanhGia" } }))
        } else {
            dispatch(AddHistoryCallApiTichHop({ ...formData,tableName:"DanhGia" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        historyCallApiTichHopContext.setHistoryCallApiTichHopModalVisible(false)
        historyCallApiTichHopContext.setHistoryCallApiTichHopId(undefined)
    };
    useEffect(() => {
        if (historyCallApiTichHopContext.historyCallApiTichHopId) {
            dispatch(GetHistoryCallApiTichHop(historyCallApiTichHopContext.historyCallApiTichHopId))
        }
    }, [historyCallApiTichHopContext.historyCallApiTichHopId])

    useEffect(() => {
        if (historyCallApiTichHop) {
            form.setFieldsValue({ ...historyCallApiTichHop })
        }
    }, [historyCallApiTichHop])

    // useEffect(() => {
    //     if (!loaiHistoryCallApiTichHops?.length && !loading) {
    //         dispatch(SearchLoaiHistoryCallApiTichHop({}))
    //     }
    // }, [])

    return (
        <AntdModal title={historyCallApiTichHopContext.historyCallApiTichHopId ? `Sửa thông tin loại điểm` : `Thêm mới loại điểm`} visible={historyCallApiTichHopContext.historyCallApiTichHopModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='HistoryCallApiTichHop' layout="vertical" onFinish={onFinish} form={form} requiredMark={historyCallApiTichHopContext.historyCallApiTichHopId !== null}
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