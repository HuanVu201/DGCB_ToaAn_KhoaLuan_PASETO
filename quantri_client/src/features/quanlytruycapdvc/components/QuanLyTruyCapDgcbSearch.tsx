import { Form, Input, Space, Row, Col, DatePicker, TimePicker } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ILogAuthen, ISearchLogAuthenParams } from "../model"
import { useCallback } from "react"
// import { LogAuthenDetail } from "./LogAuthenDetail"
import { useLogAuthenContext } from "../context"
import moment from "moment"
import { typeUsers } from "./QuanLyTruyCapDgcbTable"

export const LogAuthenSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLogAuthenParams>> }) => {
    const LogAuthenContext = useLogAuthenContext()
    const { datas: danhMucChungs } = useAppSelector((state) => state.danhmucdungchung);
    const [form] = Form.useForm()
    const onFinish = (values: ISearchLogAuthenParams) => {
        const ngayBatDau = form.getFieldValue('ngayBatDau') ? form.getFieldValue('ngayBatDau').format('YYYY-MM-DD') : undefined
        const thoiGianBatDau = form.getFieldValue('thoiGianBatDau') ? form.getFieldValue('thoiGianBatDau').format('HH:mm:ss') : undefined
        const ngayKetThuc = form.getFieldValue('ngayKetThuc') ? form.getFieldValue('ngayKetThuc').format('YYYY-MM-DD') : undefined
        const thoiGianKetThuc = form.getFieldValue('thoiGianKetThuc') ? form.getFieldValue('thoiGianKetThuc').format('HH:mm:ss') : undefined
        
        const date = new Date(); 
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        const now = moment.utc(); 
        const formattedNow = now.format('YYYY-MM-DDTHH:mm:ss.SSSSSSS');

        // 2024-05-30T11:11:41.4466667
        let tuNgay: string
        let denNgay: string

        if (ngayBatDau) {
            if (thoiGianBatDau) {
                tuNgay = `${ngayBatDau}T${thoiGianBatDau}`
            } else {
                tuNgay = `${ngayBatDau}T00:00:00`
            }
        } else {
            if (thoiGianBatDau) {
                tuNgay = `${firstDayOfMonth}T${thoiGianBatDau}`
            }
        }

        if (ngayKetThuc) {
            if (thoiGianKetThuc) {
                denNgay = `${ngayBatDau}T${thoiGianKetThuc}`
            } else {
                tuNgay = `${ngayBatDau}T${now.format("HH:mm:ss.SSSSSSS")}`
            }
        } 

        setSearchParams((curr) => ({ ...curr, ...values,             
            tuNgay: tuNgay || undefined,
            denNgay: denNgay || undefined
         }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])
    return (
        <CollapseContent>
            <Form name='LogAuthenSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={6} span={24}>
                        <Form.Item label="Từ ngày" name="ngayBatDau">
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item label="Thời gian bắt đầu" name="thoiGianBatDau">
                            <TimePicker
                                format={"HH:mm"}
                                placeholder="Chọn thời điểm bắt đầu"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item label="Đến ngày" name="ngayKetThuc">
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày"
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item label="Thời gian kết thúc" name="thoiGianKetThuc">
                            <TimePicker format={"HH:mm"} placeholder="Chọn thời điểm kết thúc" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col md={6} span={24}>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="userName"
                        >
                            <Input placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        {/* <Form.Item
                            label="Địa chỉ IP"
                            name="ip"
                        >
                            <Input placeholder="Nhập địa chỉ IP" />
                        </Form.Item> */}
                        <Form.Item
                            label="Đối tượng"
                            name="typeUser"
                        >
                            <AntdSelect
                                virtual={true}
                                placeholder={'Chọn đối tượng'}
                                allowClear

                                generateOptions={{
                                    model: typeUsers,
                                    label: "label",
                                    value: "value",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={24}>
                        <Form.Item
                            label="Đăng nhập qua"
                            name="typeLogin"
                        >
                            <AntdSelect
                                virtual={true}
                                placeholder={'Chọn hình thức đăng nhập'}
                                allowClear
                                generateOptions={{
                                    model: danhMucChungs,
                                    label: "tenDanhMuc",
                                    value: "code",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Tải lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}