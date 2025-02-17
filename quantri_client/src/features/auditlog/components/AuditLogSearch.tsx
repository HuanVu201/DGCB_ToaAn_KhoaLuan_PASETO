import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IAuditLog, ISearchAuditLog } from "../models"
import { useCallback } from "react"
import { AuditLogDetail } from "./AuditLogDetail"
import { useAuditLogContext } from "../contexts/AuditLogContext"

export const AuditLogSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchAuditLog>> }) => {
  const auditLogContext = useAuditLogContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchAuditLog) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { auditLogContext.setAuditLogModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='AuditLogSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tài khoản"
              name="UserName"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Đối tượng"
              name="TableName"
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