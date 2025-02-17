import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDongBoDuLieu, ISearchDongBoDuLieu } from "../models"
import { useCallback } from "react"
import { DongBoDuLieuDetail } from "./DongBoDuLieuDetail"
import { useDongBoDuLieuContext } from "../contexts/DongBoDuLieuContext"

export const DongBoDuLieuSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDongBoDuLieu>> }) => {
  const DongBoDuLieuContext = useDongBoDuLieuContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDongBoDuLieu) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true ,type:"DongBoDuLieu"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { DongBoDuLieuContext.setDongBoDuLieuModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DongBoDuLieuSearch' layout="vertical" onFinish={onFinish} form={form}>
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