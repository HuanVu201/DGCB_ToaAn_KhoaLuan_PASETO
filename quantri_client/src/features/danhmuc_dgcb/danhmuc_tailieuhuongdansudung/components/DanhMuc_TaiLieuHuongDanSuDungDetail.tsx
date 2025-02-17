import { Checkbox, Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { IDanhmuc_TaiLieuHuongDanSuDung } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhmuc_TaiLieuHuongDanSuDung, GetDanhmuc_TaiLieuHuongDanSuDung, UpdateDanhmuc_TaiLieuHuongDanSuDung } from "../redux/action"
import { useDanhmuc_TaiLieuHuongDanSuDungContext } from "../contexts/DanhMuc_TaiLieuHuongDanSuDungContext"
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_tailieuhuongdansudung/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

export const Danhmuc_TaiLieuHuongDanSuDungDetail = () => {
    const dispatch = useAppDispatch()
    const { data: danhmuc_TaiLieuHuongDanSuDung, datas: danhmuc_TaiLieuHuongDanSuDungs } = useAppSelector(state => state.danhmuc_tailieuhuongdansudung)
    const danhmuc_TaiLieuHuongDanSuDungContext = useDanhmuc_TaiLieuHuongDanSuDungContext()
    const [form] = Form.useForm<IDanhmuc_TaiLieuHuongDanSuDung>()
    const dinhKem = Form.useWatch("dinhKem", form);
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhmuc_TaiLieuHuongDanSuDungContext?.danhmuc_TaiLieuHuongDanSuDungId) {
            dispatch(UpdateDanhmuc_TaiLieuHuongDanSuDung({ id: danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId, data: { ...formData, type:"TaiLieuHuongDanSuDung" } }))
        } else {
            dispatch(AddDanhmuc_TaiLieuHuongDanSuDung({ ...formData,type:"TaiLieuHuongDanSuDung" }))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhmuc_TaiLieuHuongDanSuDungContext.setDanhmuc_TaiLieuHuongDanSuDungModalVisible(false)
        danhmuc_TaiLieuHuongDanSuDungContext.setDanhmuc_TaiLieuHuongDanSuDungId(undefined)
    };
    useEffect(() => {
        if (danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId) {
            dispatch(GetDanhmuc_TaiLieuHuongDanSuDung(danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId))
        }
    }, [danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId])

    useEffect(() => {
        if (danhmuc_TaiLieuHuongDanSuDung) {
            form.setFieldsValue({ ...danhmuc_TaiLieuHuongDanSuDung })
        }
    }, [danhmuc_TaiLieuHuongDanSuDung])

    // useEffect(() => {
    //     if (!loaiDanhmuc_TaiLieuHuongDanSuDungs?.length && !loading) {
    //         dispatch(SearchLoaiDanhmuc_TaiLieuHuongDanSuDung({}))
    //     }
    // }, [])

    return (
        <AntdModal title={danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId ? `Sửa thông tin tài liệu hướng dẫn sử dụng` : `Thêm mới tài liệu hướng dẫn sử dụng`} visible={danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungModalVisible} handlerCancel={handleCancel} footer={null} width="80%">
            <Form name='Danhmuc_TaiLieuHuongDanSuDung' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhmuc_TaiLieuHuongDanSuDungContext.danhmuc_TaiLieuHuongDanSuDungId !== null}
                initialValues={{ soLuongThuTuc: 0, soLuongThuTucCapTinh: 0, soLuongThuTucCapHuyen: 0, soLuongThuTucCapXa: 0 }}>
                 <Row gutter={[8, 8]}>
                    <Col span={20}>
                        <Form.Item
                            label="Tên"
                            name="tenDanhMuc"
                            rules={[{ required: true, message: 'Vui lòng nhập tài liệu' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Sử dụng"
                            name="active"
                           
                            valuePropName="checked"
                           
                        >
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            label="Mã tài liệu"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng mã' }]}

                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col> */}
                   
                    <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Đính kèm" name="dinhKem">
               <RegularUpload
                                        dinhKem={dinhKem}
                                        fieldName={'dinhKem'}
                                        folderName={'TaiLieuHuongDanSuDung'}
                                        form={form}
                                    /> 
            </Form.Item>
          </Col>
        </Row>
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