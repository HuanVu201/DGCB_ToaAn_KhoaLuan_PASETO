import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IKyDanhGia, ISearchKyDanhGia } from "../models"
import { useCallback } from "react"
import { KyDanhGiaDetail } from "./KyDanhGiaDetail"
import { useKyDanhGiaContext } from "../contexts/KyDanhGiaContext"

export const KyDanhGiaSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchKyDanhGia>> }) => {
  const kyDanhGiaContext = useKyDanhGiaContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchKyDanhGia) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { kyDanhGiaContext.setKyDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='KyDanhGiaSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên kỳ đánh giá"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          {/* <Col md={12} span={24}>
            <Form.Item
              label="Mã kỳ đánh giá"
              name="code"
            >
              <Input />
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
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}