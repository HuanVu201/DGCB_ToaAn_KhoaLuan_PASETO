import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_DonViTinh, ISearchDanhMuc_DonViTinh } from "../models"
import { useCallback } from "react"
import { DanhMuc_DonViTinhDetail } from "./DanhMuc_DonViTinhDetail"
import { useDanhMuc_DonViTinhContext } from "../contexts/DanhMuc_DonViTinhContext"

export const DanhMuc_DonViTinhSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_DonViTinh>> }) => {
  const danhMuc_DonViTinhContext = useDanhMuc_DonViTinhContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_DonViTinh) => {
    setSearchParams((curr) => ({...curr, ...values, type: "DonViTinh"}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, type:"DonViTinh"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_DonViTinhContext.setDanhMuc_DonViTinhModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_DonViTinhSearch' layout="vertical" onFinish={onFinish} form={form}>
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