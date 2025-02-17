import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_KhoTieuChi, ISearchDanhMuc_KhoTieuChi } from "../models"
import { useCallback } from "react"
import { DanhMuc_KhoTieuChiDetail } from "./DanhMuc_KhoTieuChiDetail"
import { useDanhMuc_KhoTieuChiContext } from "../contexts/DanhMuc_KhoTieuChiContext"

export const DanhMuc_KhoTieuChiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_KhoTieuChi>> }) => {
  const danhMuc_KhoTieuChiContext = useDanhMuc_KhoTieuChiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_KhoTieuChi) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_KhoTieuChiContext.setDanhMuc_KhoTieuChiModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_KhoTieuChiSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
            <Form.Item
              label="Tên kho tiêu chí"
              name="tenTieuChi"
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