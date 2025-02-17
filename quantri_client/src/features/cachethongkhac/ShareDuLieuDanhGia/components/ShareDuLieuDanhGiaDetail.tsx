import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IShareDuLieuDanhGia } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { AddShareDuLieuDanhGia, GetShareDuLieuDanhGia, UpdateShareDuLieuDanhGia } from "../redux/action"
import { useShareDuLieuDanhGiaContext } from "../contexts/ShareDuLieuDanhGiaContext"
import { resetData } from "@/features/cachethongkhac/ShareDuLieuDanhGia/redux/slice"
import { filterOptions } from "@/utils"
import TextArea from "antd/es/input/TextArea"

export const ShareDuLieuDanhGiaDetail = ({loaiDichVu}:{loaiDichVu:string | undefined}) => {
    const dispatch = useAppDispatch()
    const { data: shareDuLieuDanhGia, datas: shareDuLieuDanhGias } = useAppSelector(state => state.sharedulieudanhgia)
    const shareDuLieuDanhGiaContext = useShareDuLieuDanhGiaContext()
    const [form] = Form.useForm<IShareDuLieuDanhGia>()

    const onFinish = async () => {
        if(!loaiDichVu){
            return
        }
        const formData = form.getFieldsValue()
        // const tenMaCapDanhGia = capDanhGiaMaps
        // ?.filter((obj) => formData.maCapDanhGia.includes(obj.code))
        // .map((obj) => obj.tenDanhMuc);
        if (shareDuLieuDanhGiaContext?.shareDuLieuDanhGiaId) {
            dispatch(UpdateShareDuLieuDanhGia({ id: shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId, data: { ...formData,loaiDichVu: loaiDichVu} }))
        } else {
            dispatch(AddShareDuLieuDanhGia({ ...formData,loaiDichVu:loaiDichVu }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        shareDuLieuDanhGiaContext.setShareDuLieuDanhGiaModalVisible(false)
        shareDuLieuDanhGiaContext.setShareDuLieuDanhGiaId(undefined)
    };
    useEffect(() => {
        if (shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId) {
            dispatch(GetShareDuLieuDanhGia(shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId))
        }
    }, [shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId])

    useEffect(() => {
        if (shareDuLieuDanhGia) {
            form.setFieldsValue({ ...shareDuLieuDanhGia })
        }
    }, [shareDuLieuDanhGia])

    // useEffect(() => {
    //     // if (!loaiShareDuLieuDanhGias?.length && !loading) {
    //     //     dispatch(SearchLoaiShareDuLieuDanhGia({}))
    //     // }
    //     dispatch(SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500, type: "CapDanhGia" }));
    // }, [])

    return (
        <AntdModal title={shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId ? `Sửa thông tin ` : `Thêm mới `} visible={shareDuLieuDanhGiaContext.shareDuLieuDanhGiaModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='ShareDuLieuDanhGia' layout="vertical" onFinish={onFinish} form={form} requiredMark={shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập mã chức vụ' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Đường dẫn"
                            name="url"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Phương thức"
                            name="phuongThuc"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Đầu vào"
                            name="input"
                        >
                                        <TextArea   
            // value={value}
            // onChange={handleChange} // Update state on change
            rows={4} // Số dòng hiển thị ban đầu
            maxLength={200} // Giới hạn độ dài của văn bản
          />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Đầu ra"
                            name="output"
                        >
                                     <TextArea   
            // value={value}
            // onChange={handleChange} // Update state on change
            rows={4} // Số dòng hiển thị ban đầu
            maxLength={200} // Giới hạn độ dài của văn bản
          />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                           <TextArea   
            // value={value}
            // onChange={handleChange} // Update state on change
            rows={4} // Số dòng hiển thị ban đầu
            maxLength={200} // Giới hạn độ dài của văn bản
          />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Sử dụng"
                            name="suDung"

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