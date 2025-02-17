import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton, AntdSelect } from "../../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { useCallback } from "react"
import { ISearchUser } from "@/features/user/models"

export const SearchUserTable = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>> }) => {
    const [form] = Form.useForm()
    const onFinish = (values: ISearchUser) => {

        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const { datas: users, data: user, count, loading, } = useAppSelector((state) => state.user);
    const { datas: donVis, } = useAppSelector((state) => state.cocautochuc);

    const resetSearchParams = useCallback(() => {
        form.resetFields()
        setSearchParams(() => ({ pageNumber: 1, pageSize: 100, reFetch: true, officeCode: user?.officeCode }))
    }, [])

    return (
        <CollapseContent
        >
            <Form name='QuanLyLienKetSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Tài khoản"
                            name="userName"
                        >
                            <Input placeholder="Nhập tài khoản" />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12}>
                        <Form.Item
                            label="Đơn vị"
                            name="officeName"
                            
                        >
                            <AntdSelect placeholder = "Chọn đơn vị" allowClear generateOptions={{ model: donVis, label: 'groupName', value: 'groupCode' }}></AntdSelect>
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Chức vụ"
                            name="positionName"
                        >
                            <Input placeholder="Nhập chức vụ" />
                        </Form.Item>
                    </Col> */}
                </Row>

                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Đặt lại
                            </AntdButton>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}