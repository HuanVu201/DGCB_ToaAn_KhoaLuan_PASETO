import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_ChucVu } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMuc_ChucVu, GetDanhMuc_ChucVu, UpdateDanhMuc_ChucVu } from "../redux/action"
import { useDanhMuc_ChucVuContext } from "../contexts/DanhMuc_ChucVuContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/slice"
import { filterOptions } from "@/utils"
import { SearchDanhMuc_CacCap } from "../../danhmuc_caccap/redux/action"
import { IDanhMuc_CacCap } from "../../danhmuc_caccap/models"

export const DanhMuc_ChucVuDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhMuc_ChucVu, datas: danhMuc_ChucVus } = useAppSelector(state => state.danhmuc_chucvu)
    const { datas: capDanhGiaMaps } = useAppSelector((state) => state.danhmuc_caccap);
    const danhMuc_ChucVuContext = useDanhMuc_ChucVuContext()
    const [form] = Form.useForm<IDanhMuc_ChucVu>()

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        // const tenMaCapDanhGia = capDanhGiaMaps
        // ?.filter((obj) => formData.maCapDanhGia.includes(obj.code))
        // .map((obj) => obj.tenDanhMuc);
        const tenMaCapDanhGia = capDanhGiaMaps?.find((item) => item.code?.toLocaleLowerCase() == formData.maCapDanhGia)?.tenDanhMuc;
        if (danhMuc_ChucVuContext?.danhMuc_ChucVuId) {
            dispatch(UpdateDanhMuc_ChucVu({ id: danhMuc_ChucVuContext.danhMuc_ChucVuId, data: { ...formData, tenCapDanhGia: tenMaCapDanhGia } }))
        } else {
            dispatch(AddDanhMuc_ChucVu({ ...formData, active: formData.active ?? false }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMuc_ChucVuContext.setDanhMuc_ChucVuModalVisible(false)
        danhMuc_ChucVuContext.setDanhMuc_ChucVuId(undefined)
    };
    useEffect(() => {
        if (danhMuc_ChucVuContext.danhMuc_ChucVuId) {
            dispatch(GetDanhMuc_ChucVu(danhMuc_ChucVuContext.danhMuc_ChucVuId))
        }
    }, [danhMuc_ChucVuContext.danhMuc_ChucVuId])

    useEffect(() => {
        if (danhMuc_ChucVu) {
            form.setFieldsValue({ ...danhMuc_ChucVu })
        }
    }, [danhMuc_ChucVu])

    useEffect(() => {
        // if (!loaiDanhMuc_ChucVus?.length && !loading) {
        //     dispatch(SearchLoaiDanhMuc_ChucVu({}))
        // }
        dispatch(SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500, type: "CapDanhGia" }));
    }, [])

    return (
        <AntdModal title={danhMuc_ChucVuContext.danhMuc_ChucVuId ? `Sửa thông tin chức vụ` : `Thêm mới chức vụ`} visible={danhMuc_ChucVuContext.danhMuc_ChucVuModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='DanhMuc_ChucVu' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMuc_ChucVuContext.danhMuc_ChucVuId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Mã chức vụ"
                            name="ma"
                            rules={[{ required: true, message: 'Vui lòng nhập mã chức vụ' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Chức vụ"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Cấp đánh giá"
                            name="maCapDanhGia"
                        >
                            <AntdSelect
                                allowClear
                                showSearch
                                filterOption={filterOptions}
                                generateOptions={{
                                    model: capDanhGiaMaps,
                                    label: "tenDanhMuc",
                                    value: "code",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"

                            valuePropName="checked"

                        >
                            <Checkbox />
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