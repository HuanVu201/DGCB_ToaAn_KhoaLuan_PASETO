import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { ICauHinhKySo, ISearchCauHinhKySo } from "../models"
import { useCallback } from "react"
import { CauHinhKySoDetail } from "./CauHinhKySoDetail"
import { useCauHinhKySoContext } from "../contexts/CauHinhKySoContext"

export const CauHinhKySoSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchCauHinhKySo>> }) => {
  const cauHinhKySoContext = useCauHinhKySoContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchCauHinhKySo) => {
    setSearchParams((curr) => ({...curr, ...values, type: "CauHinhKySo"}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, type:"CauHinhKySo"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { cauHinhKySoContext.setCauHinhKySoModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='CauHinhKySoSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã"
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