import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_KieuTieuChi } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_KieuTieuChi, GetDanhMuc_KieuTieuChi, UpdateDanhMuc_KieuTieuChi } from "../redux/action"
import { useDanhMuc_KieuTieuChiContext } from "../contexts/DanhMuc_KieuTieuChiContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_kieutieuchi/redux/slice"

export const DanhMuc_KieuTieuChiDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_KieuTieuChi, datas: danhMuc_KieuTieuChis } = useAppSelector(state => state.danhmuc_kieutieuchi)
    const danhMuc_KieuTieuChiContext = useDanhMuc_KieuTieuChiContext()
    const [form] = Form.useForm<IDanhMuc_KieuTieuChi>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMuc_KieuTieuChiContext?.danhMuc_KieuTieuChiId) {
            dispatch(UpdateDanhMuc_KieuTieuChi({ id: danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId, data: { ...formData, type : "KieuTieuChi" } }))
        } else {
            dispatch(AddDanhMuc_KieuTieuChi({ ...formData,type : "KieuTieuChi" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_KieuTieuChiContext.setDanhMuc_KieuTieuChiModalVisible(false)
        danhMuc_KieuTieuChiContext.setDanhMuc_KieuTieuChiId(undefined)
    };
    useEffect(() => {
        if (danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId) {
            dispatch(GetDanhMuc_KieuTieuChi(danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId))
        }
    }, [danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId])

    useEffect(() => {
        if (danhMuc_KieuTieuChi) {
            form.setFieldsValue({ ...danhMuc_KieuTieuChi })
        }
    }, [danhMuc_KieuTieuChi])

    // useEffect(() => {
    //     if (!loaiDanhMuc_KieuTieuChis?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_KieuTieuChi({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId ? `Sửa thông tin kiểu tiêu chí` : `Thêm mới kiểu tiêu chí`} visible={danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_KieuTieuChi' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_KieuTieuChiContext.danhMuc_KieuTieuChiId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="TenDanhMuc"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đơn vị tính' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="Code"
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