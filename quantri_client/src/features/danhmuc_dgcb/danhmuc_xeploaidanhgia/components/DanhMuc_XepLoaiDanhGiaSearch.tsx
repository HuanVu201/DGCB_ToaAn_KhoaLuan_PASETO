import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_XepLoaiDanhGia, ISearchDanhMuc_XepLoaiDanhGia } from "../models"
import { useCallback } from "react"
import { DanhMuc_XepLoaiDanhGiaDetail } from "./DanhMuc_XepLoaiDanhGiaDetail"
import { useDanhMuc_XepLoaiDanhGiaContext } from "../contexts/DanhMuc_XepLoaiDanhGiaContext"

export const DanhMuc_XepLoaiDanhGiaSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_XepLoaiDanhGia>> }) => {
  const danhMuc_XepLoaiDanhGiaContext = useDanhMuc_XepLoaiDanhGiaContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_XepLoaiDanhGia) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_XepLoaiDanhGiaSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
            <Form.Item
              label="Tên loại đánh giá"
              name="ten"
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