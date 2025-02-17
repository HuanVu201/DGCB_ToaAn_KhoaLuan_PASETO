import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IRoles, ISearchRoles } from "../models"
import { useCallback } from "react"
import { RolesDetail } from "./RolesDetail"
import { useRolesContext } from "../contexts/RolesContext"

export const RolesSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchRoles>> }) => {
  const RolesContext = useRolesContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchRoles) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { RolesContext.setRolesModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='RolesSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên loại điểm"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã loại điểm"
              name="code"
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