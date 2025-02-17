import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { useCallback } from "react"
import { ISearchUserRoles } from "@/features/userroles/models"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"

export const SearchUser = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchUserRoles>> }) => {
    const roleContext = useVaiTroModalContext();
    const [form] = Form.useForm()
    const onFinish = (values: ISearchUserRoles) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        form.resetFields()
        setSearchParams((curr) => ({ ...curr, fullName: undefined, userName: undefined }))
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