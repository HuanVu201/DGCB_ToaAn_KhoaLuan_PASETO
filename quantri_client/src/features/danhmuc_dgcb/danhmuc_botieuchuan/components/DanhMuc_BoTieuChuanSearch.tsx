import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_BoTieuChuan, ISearchDanhMuc_BoTieuChuan } from "../models"
import { useCallback } from "react"
import { useDanhMuc_BoTieuChuanContext } from "../contexts/DanhMuc_BoTieuChuanContext"

export const DanhMuc_BoTieuChuanSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_BoTieuChuan>> }) => {
  const danhMuc_BoTieuChuanContext = useDanhMuc_BoTieuChuanContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_BoTieuChuan) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_BoTieuChuanContext.setDanhMuc_BoTieuChuanModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_BoTieuChuanSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên bộ tiêu chí"
              name="tenBoTieuChi"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Số hiệu"
              name="soKyHieu"
            >
              <Input />
            </Form.Item>
          </Col>
          {/* <Col md={8} span={24}>
            <Form.Item
              label="Mã ngành"
              name="maNganh"
            >
              <Input />
            </Form.Item>
          </Col> */}
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