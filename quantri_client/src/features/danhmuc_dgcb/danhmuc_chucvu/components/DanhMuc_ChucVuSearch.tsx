import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_ChucVu, ISearchDanhMuc_ChucVu } from "../models"
import { useCallback } from "react"
import { DanhMuc_ChucVuDetail } from "./DanhMuc_ChucVuDetail"
import { useDanhMuc_ChucVuContext } from "../contexts/DanhMuc_ChucVuContext"

export const DanhMuc_ChucVuSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_ChucVu>> }) => {
  const danhMuc_ChucVuContext = useDanhMuc_ChucVuContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_ChucVu) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_ChucVuContext.setDanhMuc_ChucVuModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_ChucVuSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên chức vụ"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã chức vụ"
              name="ma"
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