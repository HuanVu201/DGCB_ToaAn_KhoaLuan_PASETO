import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILogAuthen } from "../model"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "../../../lib/antd/components"
import { resetData } from "../redux/slice"

import { toast } from "react-toastify"
import { useLogAuthenContext } from "../context"
import { GetLogAuthenDetail } from "../redux/action"
import { typeUsers } from "./QuanLyTruyCapDgcbTable"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"

export const LogAuthenDetail = () => {

    const dispatch = useAppDispatch()
    const logAuthenContext = useLogAuthenContext()
    const { data: logAuthen } = useAppSelector(state => state.logAuthen)
    const [form] = Form.useForm<ILogAuthen>()

    const handleCancel = () => {
        form.resetFields();


        dispatch(resetData())
        logAuthenContext.setLogAuthenModalVisible(false)
        logAuthenContext.setIdLogAuthen(undefined)
    };

    useEffect(() => {
        if (logAuthenContext.idLogAuthen) {
            dispatch(GetLogAuthenDetail({ id: logAuthenContext.idLogAuthen }))
        }
    }, [logAuthenContext.idLogAuthen])

    useEffect(() => {
        if (logAuthen) {
            let nam, thang, ngay: any
            if (logAuthen.ngayThangNamSinh) {
                const ngayThangNamSinh: string = JSON.parse(logAuthen.ngayThangNamSinh).NgayThangNam
                nam = ngayThangNamSinh.substring(0, 4);
                thang = ngayThangNamSinh.substring(4, 6);
                ngay = ngayThangNamSinh.substring(6, 8);

            }


            form.setFieldsValue({
                ...logAuthen,
                ngayThangNamSinh: ngay && thang && nam ? `${ngay}/${thang}/${nam}` : ``,
                gioiTinh: logAuthen.gioiTinh == '1' ? "Nam" : logAuthen.gioiTinh == '0' ? "Nữ" : "",
                typeUser: logAuthen.typeUser ? typeUsers.find(x => x.value == logAuthen.typeUser)?.label : '',
                createdAt: `${logAuthen.createdAt ? dayjs.utc(logAuthen.createdAt).format("HH") + " giờ " + dayjs.utc(logAuthen.createdAt).format("mm") + " phút" : ""}`
                    + `${logAuthen.createdAt ? ", ngày " + dayjs.utc(logAuthen.createdAt).format(FORMAT_DATE_WITHOUT_TIME) : ""}`

            })
        }
    }, [logAuthen])


    return (
        <AntdModal title={"Thông tin đăng nhập DVC"} visible={logAuthenContext.logAuthenModalVisible} handlerCancel={handleCancel} footer={null} width={780}>
            <Form name='LogAuthen' layout="vertical" form={form} >
                <Row gutter={[8, 8]}>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="userName"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Ngày sinh"
                            name="ngayThangNamSinh"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Giới tính"
                            name="gioiTinh"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Số định danh"
                            name="soDinhDanh"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Đối tượng"
                            name="typeUser"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thời điểm đăng nhập"
                            name="createdAt"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Địa chỉ IP"
                            name="ip"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Thiết bị"
                            name="device"
                        >
                            <Input.TextArea disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'right' }}>
                        <Form.Item>
                            <Space >
                                <AntdButton type="default" onClick={handleCancel}>
                                    Đóng
                                </AntdButton>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}