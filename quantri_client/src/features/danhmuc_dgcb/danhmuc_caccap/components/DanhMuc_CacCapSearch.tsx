import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_CacCap, ISearchDanhMuc_CacCap } from "../models"
import { useCallback } from "react"
import { DanhMuc_CacCapDetail } from "./DanhMuc_CacCapDetail"
import { useDanhMuc_CacCapContext } from "../contexts/DanhMuc_CacCapContext"

export const DanhMuc_CacCapSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_CacCap>> }) => {
  const danhMuc_CacCapContext = useDanhMuc_CacCapContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_CacCap) => {
    setSearchParams((curr) => ({...curr, ...values, type: "CapDanhGia"}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, type:"CapDanhGia"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_CacCapContext.setDanhMuc_CacCapModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_CacCapSearch' layout="vertical" onFinish={onFinish} form={form}>
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