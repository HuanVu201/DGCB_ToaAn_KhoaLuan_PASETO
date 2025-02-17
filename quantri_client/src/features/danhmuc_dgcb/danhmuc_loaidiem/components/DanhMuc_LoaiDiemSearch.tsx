import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_LoaiDiem, ISearchDanhMuc_LoaiDiem } from "../models"
import { useCallback } from "react"
import { DanhMuc_LoaiDiemDetail } from "./DanhMuc_LoaiDiemDetail"
import { useDanhMuc_LoaiDiemContext } from "../contexts/DanhMuc_LoaiDiemContext"

export const DanhMuc_LoaiDiemSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_LoaiDiem>> }) => {
  const danhMuc_LoaiDiemContext = useDanhMuc_LoaiDiemContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_LoaiDiem) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true ,type:"LoaiDiem"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_LoaiDiemContext.setDanhMuc_LoaiDiemModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_LoaiDiemSearch' layout="vertical" onFinish={onFinish} form={form}>
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