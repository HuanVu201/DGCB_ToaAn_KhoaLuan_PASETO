import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useCallback, useEffect } from "react"
import { ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models"

import dayjs from 'dayjs'
import { useSearchParams } from "react-router-dom"

export const KhieuNaiKienNghiSearch = ({ searchParams, setSearchParams, searchParamOrigins, extraButtons }: {
    searchParams: ISearchDanhGiaCanBo,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhGiaCanBo>>,
    searchParamOrigins: ISearchDanhGiaCanBo,
    extraButtons: React.ReactNode[] | undefined

}) => {
    const [form] = Form.useForm()
    const [queryStringParams, setQueryStringParams] = useSearchParams();
    const trangThaiQueryString = queryStringParams.get('TrangThai');

    useEffect(() => {
        if (trangThaiQueryString) {
            setSearchParams({ ...searchParams, trangThai: trangThaiQueryString })
            form.setFieldValue('trangThai', trangThaiQueryString)
        }
    }, [trangThaiQueryString])

    const onFinish = (values: ISearchDanhGiaCanBo) => {
        setSearchParams((curr) => ({
            ...curr,
            ...values,
            tuNgay: values.tuNgay ? dayjs(values.tuNgay).format('YYYY-MM-DD') : undefined,
            denNgay: values.denNgay ? dayjs(values.denNgay).format('YYYY-MM-DD') : undefined,

        }))
        if (form.getFieldValue('trangThai') != trangThaiQueryString) {
            queryStringParams.delete('TrangThai');
            setQueryStringParams(queryStringParams);
        }
    }

    const resetSearchParams = useCallback(() => {
        queryStringParams.delete('TrangThai');
        setQueryStringParams(queryStringParams);
        setSearchParams(searchParamOrigins)
        form.resetFields()
    }, [])


    return (
        <CollapseContent
            extraButtons={extraButtons} nameSearch="Tìm kiếm nâng cao" classSearch="BtnSearchAdvClass"
        >
            <Form name='SearchPageDGDB' layout="horizontal" onFinish={onFinish} form={form} style={{ marginTop: 10, padding: '0px 12vw' }}>
                <Row gutter={[0, 0]}>

                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Thời gian tạo từ ngày"
                            name="tuNgay"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" format={"DD/MM/YYYY"} allowClear />
                        </Form.Item>

                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Đến ngày"
                            name="denNgay"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" format={"DD/MM/YYYY"} allowClear />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Năm đánh giá"
                            name="namDanhGia"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Input style={{ width: '100%' }} placeholder="Nhập năm chấm điểm" allowClear />
                        </Form.Item>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Form.Item
                            label="Trạng thái"
                            name="trangThai"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: [
                                        { label: 'Chờ gửi', value: 'Chờ gửi' },
                                        { label: 'Chờ xử lý', value: 'Chờ xử lý' },
                                        { label: 'Đã xử lý', value: 'Đã xử lý' }
                                    ],
                                    label: "label",
                                    value: "value",
                                }}
                                style={{ width: '100%' }}
                                placeholder="Chọn trạng thái"
                                allowClear
                                lowerCaseStringValue={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Row justify="space-around">
                        <Col span={1} />
                        <Col span={23} style={{ display: 'flex', justifyContent: 'center' }} >

                            <Space size="small">
                                <AntdButton type="primary" htmlType="submit" >
                                    Xác nhận
                                </AntdButton>
                                <AntdButton type="default" onClick={resetSearchParams}>
                                    Tải lại
                                </AntdButton>
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent >
    )
}