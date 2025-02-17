import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { INhomNguoiDung } from "../models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddNhomNguoiDung, GetNhomNguoiDung, UpdateNhomNguoiDung } from "../redux/action"
import { useNhomNguoiDungContext } from "../contexts/NhomNguoiDungContext"
import { resetData } from "@/features/nhomnguoidung/redux/slice"
import { nhomNguoiDungApi } from "../services"
import { ID_SEPARATE } from "@/data"
import { coCauToChucService } from "@/features/cocautochuc/services"
import { ICoCauToChuc } from "@/features/cocautochuc/models"

export const NhomNguoiDungDetail = () => {
    const dispatch = useAppDispatch()
    const { data: nhomNguoiDung } = useAppSelector(state => state.nhomnguoidung)
    const nhomNguoiDungContext = useNhomNguoiDungContext()
    const [form] = Form.useForm<INhomNguoiDung>()
    const [nhomNguoiDungs, setNhomNguoiDungs] = useState<ICoCauToChuc[]>([])

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (nhomNguoiDungContext?.nhomNguoiDungId) {
            dispatch(UpdateNhomNguoiDung({ id: nhomNguoiDungContext.nhomNguoiDungId, data: 
                { ...formData, 
                } 
            }))
        } else {
            dispatch(AddNhomNguoiDung({ ...formData}))
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        nhomNguoiDungContext.setNhomNguoiDungModalVisible(false)
        nhomNguoiDungContext.setNhomNguoiDungId(undefined)
    };
    // useEffect(() => {
    //     (async () => {
    //         if (nhomNguoiDungContext.nhomNguoiDungId) {
    //             dispatch(GetNhomNguoiDung(nhomNguoiDungContext.nhomNguoiDungId))
    //         }
    //         const res = await coCauToChucService.Search({pageSize:300, pageNumber: 1, cataLogs: ["quan-huyen", "so-ban-nganh"]})
    //         if(res.data.data){
    //             setNhomNguoiDungs(res.data.data)
    //         } 
    //     })()
        
    // }, [nhomNguoiDungContext.nhomNguoiDungId])

    useEffect(() => {
        if (nhomNguoiDung) {
            form.setFieldsValue({ ...nhomNguoiDung})
        }
    }, [nhomNguoiDung])

    // useEffect(() => {
    //     if (!loaiNhomNguoiDungs?.length && !loading) {
    //         dispatch(SearchLoaiNhomNguoiDung({}))
    //     }
    // }, [])

    return (
        <AntdModal title="Thêm mới nhóm người dùng" visible={nhomNguoiDungContext.nhomNguoiDungModalVisible} handlerCancel={handleCancel} footer={null}>
        <Form name='NhomNguoiDung' layout="vertical" onFinish={onFinish} form={form} requiredMark={nhomNguoiDungContext.nhomNguoiDungId !== null} 
            >
            <Row gutter={[8, 8]}>
                <Col md={24} span={24}>
                    <Form.Item
                        label="Tên nhóm người dùng"
                        name="ten"
                        hasFeedback
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhóm người dùng' }]}
                        
                    >
                        <Input />
                    </Form.Item>
                </Col>
                {/* <Col md={12} span={24}>
                    <Form.Item
                        label="Mã nhóm người dùng"
                        name="ma"
                    >
                        <Input />
                    </Form.Item>
                </Col> */}
                <Col span={24}>
                    <Form.Item
                        label="Mô tả"
                        name="moTa"
                    >
                        <Input.TextArea rows={5} />
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