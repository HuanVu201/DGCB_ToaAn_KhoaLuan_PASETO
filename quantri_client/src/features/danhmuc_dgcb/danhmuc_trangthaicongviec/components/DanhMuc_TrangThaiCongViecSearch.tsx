import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_TrangThaiCongViec, ISearchDanhMuc_TrangThaiCongViec } from "../models"
import { useCallback } from "react"
import { DanhMuc_TrangThaiCongViecDetail } from "./DanhMuc_TrangThaiCongViecDetail"
import { useDanhMuc_TrangThaiCongViecContext } from "../contexts/DanhMuc_TrangThaiCongViecContext"

export const DanhMuc_TrangThaiCongViecSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_TrangThaiCongViec>> }) => {
  const danhMuc_TrangThaiCongViecContext = useDanhMuc_TrangThaiCongViecContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_TrangThaiCongViec) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true ,type:"TrangThaiCongViec"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_TrangThaiCongViecContext.setDanhMuc_TrangThaiCongViecModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_TrangThaiCongViecSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên trạng thái công việc"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã trạng thái công việc"
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