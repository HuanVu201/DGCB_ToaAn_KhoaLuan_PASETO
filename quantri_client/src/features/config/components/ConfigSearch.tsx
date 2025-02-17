import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IConfig, ISearchConfig } from "../models"
import { useCallback } from "react"
import { useConfigContext } from "../contexts/ConfigContext"

export const ConfigSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchConfig>> }) => {
    const configContext = useConfigContext()
    const [form] = Form.useForm()
    const onFinish = (values: ISearchConfig) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        setSearchParams({  reFetch: true })
        form.resetFields()
    }, [])
    return (
        <CollapseContent
            extraButtons={[<AntdButton onClick={() => { configContext.setConfigModalVisible(true) }}>Thêm mới</AntdButton>]}
        >
            <Form name='diaBan' layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Tên Config"
                    name="tenDiaBan"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã Config"
                    name="maDiaBan"
                >
                    <Input />
                </Form.Item>
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