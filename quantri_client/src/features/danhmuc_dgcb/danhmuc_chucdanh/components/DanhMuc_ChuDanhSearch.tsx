import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_ChucDanh, ISearchDanhMuc_ChucDanh } from "../models"
import { useCallback } from "react"
import { DanhMuc_ChucDanhDetail } from "./DanhMuc_ChuDanhDetail"
import { useDanhMuc_ChucDanhContext } from "../contexts/DanhMuc_ChuDanhContext"

export const DanhMuc_ChucDanhSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_ChucDanh>> }) => {
  const danhMuc_ChucDanhContext = useDanhMuc_ChucDanhContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_ChucDanh) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_ChucDanhContext.setDanhMuc_ChucDanhModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_ChucDanhSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên chức danh"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã chức danh"
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