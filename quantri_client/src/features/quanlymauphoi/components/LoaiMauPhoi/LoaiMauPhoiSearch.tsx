import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../../lib/antd/components"
import { useCallback } from "react"
import { useMauPhoiContext } from "../../context/MauPhoiContext"
import { ISearchLoaiMauPhoi, loaiPhois } from "../../models/loaiMauPhoi"

export const LoaiMauPhoiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiMauPhoi>> }) => {
    const mauPhoiContext = useMauPhoiContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchLoaiMauPhoi) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 10, reFetch: true })
        form.resetFields()
    }, [])
    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { mauPhoiContext.setLoaiMauPhoiModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='MauPhoiSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Loại phôi"
                            name="loaiPhoi"
                        >
                            <AntdSelect
                                virtual={true}
                                generateOptions={{
                                    model: loaiPhois,
                                    label: "label",
                                    value: "value",
                                }}
                                placeholder="Chọn loại phôi"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Mã loại phôi"
                            name="maMauPhoi"
                        >
                            <Input placeholder="Nhập mã loại phôi..." />
                        </Form.Item>
                    </Col>
                    <Col md={8} span={24}>
                        <Form.Item
                            label="Tên loại phôi"
                            name="tenMaMauPhoi"
                        >
                            <Input placeholder="Nhập tên loại phôi..." />
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