import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhmuc_TaiLieuHuongDanSuDung, ISearchDanhmuc_TaiLieuHuongDanSuDung } from "../models"
import { useCallback } from "react"
import { Danhmuc_TaiLieuHuongDanSuDungDetail } from "./DanhMuc_TaiLieuHuongDanSuDungDetail"
import { useDanhmuc_TaiLieuHuongDanSuDungContext } from "../contexts/DanhMuc_TaiLieuHuongDanSuDungContext"

export const Danhmuc_TaiLieuHuongDanSuDungSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhmuc_TaiLieuHuongDanSuDung>> }) => {
  const danhmuc_TaiLieuHuongDanSuDungContext = useDanhmuc_TaiLieuHuongDanSuDungContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhmuc_TaiLieuHuongDanSuDung) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true ,type:"TaiLieuHuongDanSuDung"})
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      // extraButtons={[<AntdButton onClick={() => { danhmuc_TaiLieuHuongDanSuDungContext.setDanhmuc_TaiLieuHuongDanSuDungModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='Danhmuc_TaiLieuHuongDanSuDungSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên tài liệu hướng dẫn sử dụng"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã tài liệu hướng dẫn sử dụng"
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