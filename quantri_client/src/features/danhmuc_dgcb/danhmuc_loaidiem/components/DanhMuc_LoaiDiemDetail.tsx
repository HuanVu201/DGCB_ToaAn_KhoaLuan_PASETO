import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_LoaiDiem } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_LoaiDiem, GetDanhMuc_LoaiDiem, UpdateDanhMuc_LoaiDiem } from "../redux/action"
import { useDanhMuc_LoaiDiemContext } from "../contexts/DanhMuc_LoaiDiemContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_loaidiem/redux/slice"

export const DanhMuc_LoaiDiemDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_LoaiDiem, datas: danhMuc_LoaiDiems } = useAppSelector(state => state.danhmuc_loaidiem)
    const danhMuc_LoaiDiemContext = useDanhMuc_LoaiDiemContext()
    const [form] = Form.useForm<IDanhMuc_LoaiDiem>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_LoaiDiemContext?.danhMuc_LoaiDiemId) {
            dispatch(UpdateDanhMuc_LoaiDiem({ id: danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId, data: { ...formData, type:"LoaiDiem" } }))
        } else {
            dispatch(AddDanhMuc_LoaiDiem({ ...formData,type:"LoaiDiem" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_LoaiDiemContext.setDanhMuc_LoaiDiemModalVisible(false)
        danhMuc_LoaiDiemContext.setDanhMuc_LoaiDiemId(undefined)
    };
    useEffect(() => {
        if (danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId) {
            dispatch(GetDanhMuc_LoaiDiem(danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId))
        }
    }, [danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId])

    useEffect(() => {
        if (danhMuc_LoaiDiem) {
            form.setFieldsValue({ ...danhMuc_LoaiDiem })
        }
    }, [danhMuc_LoaiDiem])

    // useEffect(() => {
    //     if (!loaiDanhMuc_LoaiDiems?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_LoaiDiem({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId ? `Sửa thông tin loại điểm` : `Thêm mới loại điểm`} visible={danhMuc_LoaiDiemContext.danhMuc_LoaiDiemModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_LoaiDiem' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_LoaiDiemContext.danhMuc_LoaiDiemId !== null}
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