import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IHistoryCallApiTichHop, ISearchHistoryCallApiTichHop } from "../models"
import { useCallback } from "react"
import { HistoryCallApiTichHopDetail } from "./HistoryCallApiTichHopDetail"
import { useHistoryCallApiTichHopContext } from "../contexts/HistoryCallApiTichHopContext"

export const HistoryCallApiTichHopSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHistoryCallApiTichHop>> }) => {
  const historyCallApiTichHopContext = useHistoryCallApiTichHopContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchHistoryCallApiTichHop) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { historyCallApiTichHopContext.setHistoryCallApiTichHopModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='HistoryCallApiTichHopSearch' layout="vertical" onFinish={onFinish} form={form}>
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