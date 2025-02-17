import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_CongViecChuyenMon, ISearchDanhMuc_CongViecChuyenMon } from "../models"
import { useCallback } from "react"
import { DanhMuc_CongViecChuyenMonDetail } from "./DanhMuc_CongViecChuyenMonDetail"
import { useDanhMuc_CongViecChuyenMonContext } from "../contexts/DanhMuc_CongViecChuyenMonContext"

export const DanhMuc_CongViecChuyenMonSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_CongViecChuyenMon>> }) => {
  const danhMuc_CongViecChuyenMonContext = useDanhMuc_CongViecChuyenMonContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_CongViecChuyenMon) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true ,type:"CongViecChuyenMon"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_CongViecChuyenMonContext.setDanhMuc_CongViecChuyenMonModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_CongViecChuyenMonSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên công việc chuyên môn"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã công việc chuyên môn"
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