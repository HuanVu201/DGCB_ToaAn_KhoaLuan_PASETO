import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { IAction, ISearchAction } from "../models"
import { useCallback } from "react"
import { ActionDetail } from "./ActionDetail"
import { useActionContext } from "../contexts/ActionContext"

export const ActionSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchAction>> }) => {
  const ActionContext = useActionContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchAction) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { ActionContext.setActionModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='ActionSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              label="Tên"
              name="ten"
            >
              <Input />
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