import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_XepLoaiDanhGia } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_XepLoaiDanhGia, GetDanhMuc_XepLoaiDanhGia, UpdateDanhMuc_XepLoaiDanhGia } from "../redux/action"
import { useDanhMuc_XepLoaiDanhGiaContext } from "../contexts/DanhMuc_XepLoaiDanhGiaContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_xeploaidanhgia/redux/slice"
import { v4 as uuidv4 } from 'uuid';
const {Option} = Select;
export const DanhMuc_XepLoaiDanhGiaDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_XepLoaiDanhGia, datas: danhMuc_XepLoaiDanhGias } = useAppSelector(state => state.danhmuc_xeploaidanhgia)
    const { data: danhMuc_BoTieuChuan, datas: danhMuc_BoTieuChuans } = useAppSelector(state => state.danhmuc_botieuchuan)
    const danhMuc_XepLoaiDanhGiaContext = useDanhMuc_XepLoaiDanhGiaContext()
    const [form] = Form.useForm<IDanhMuc_XepLoaiDanhGia>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        const nameBoTieuChi = danhMuc_BoTieuChuans?.find(item => item.maBoTieuChi == formData.maBoTieuChi)?.tenBoTieuChi;
        if (danhMuc_XepLoaiDanhGiaContext?.danhMuc_XepLoaiDanhGiaId) {
            dispatch(UpdateDanhMuc_XepLoaiDanhGia({ id: danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId, data: { ...formData,tenBoTieuChi: nameBoTieuChi } }))
        } else {
            const newGuid = uuidv4();
            dispatch(AddDanhMuc_XepLoaiDanhGia({ ...formData,ma:newGuid,tenBoTieuChi:nameBoTieuChi}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaModalVisible(false)
        danhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaId(undefined)
    };
    useEffect(() => {
        if (danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId) {
            dispatch(GetDanhMuc_XepLoaiDanhGia(danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId))
        }
    }, [danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId])

    useEffect(() => {
        if (danhMuc_XepLoaiDanhGia) {
            form.setFieldsValue({ ...danhMuc_XepLoaiDanhGia })
        }
    }, [danhMuc_XepLoaiDanhGia])

    // useEffect(() => {
    //     if (!loaiDanhMuc_XepLoaiDanhGias?.length && !loading) {
    //         dispatch(SearchLoaiDanhMuc_XepLoaiDanhGia({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId ? `Sửa thông tin xếp loại đánh giá` : `Thêm mới xếp loại đánh giá`} visible={danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_XepLoaiDanhGia' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_XepLoaiDanhGiaContext.danhMuc_XepLoaiDanhGiaId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24}>
                        <Form.Item label="Thuộc bộ tiêu chuẩn" name="maBoTieuChi">
                            <Select  placeholder="Gõ để tìm kiếm bộ tiêu chuẩn" style={{ width: '100%' }}>
                                {danhMuc_BoTieuChuans?.map(boTieuChuan => (
                                    <Select.Option key={boTieuChuan.maBoTieuChi} value={boTieuChuan.maBoTieuChi}>
                                        {boTieuChuan.tenBoTieuChi}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Tên xếp loại đánh giá"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phân loại đánh giá' }]}

                        >
                             <Select placeholder="Chọn xếp loại đánh giá">
          <Option value="Loại A - Hoàn thành xuất sắc nhiệm vụ">Loại A - Hoàn thành xuất sắc nhiệm vụ</Option>
          <Option value="Loại B - Hoàn thành tốt nhiệm vụ">Loại B - Hoàn thành tốt nhiệm vụ</Option>
          <Option value="Loại C - Hoàn thành nhiệm vụ">Loại C - Hoàn thành nhiệm vụ</Option>
          <Option value="Loại D - Không hoàn thành nhiệm vụ">Loại D - Không hoàn thành nhiệm vụ</Option>
        </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Mã"
                            name="ma"
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Điểm tối thiểu"
                            name="diemToiThieu"
                        >
                           <InputNumber
                        min={0}              // Set minimum value if necessary
                        step={0.01}          // Set step size for decimal values
                        precision={2}        // Specify precision for decimal places
                        style={{ width: '100%' }} // Make sure the input takes full width
                    />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Điểm tối đa"
                            name="diemToiDa"
                        >
                           <InputNumber
                        min={0}              // Set minimum value if necessary
                        step={0.01}          // Set step size for decimal values
                        precision={2}        // Specify precision for decimal places
                        style={{ width: '100%' }} // Make sure the input takes full width
                    />
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