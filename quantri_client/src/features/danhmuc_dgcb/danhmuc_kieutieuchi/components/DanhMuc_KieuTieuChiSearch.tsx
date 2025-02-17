import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_KieuTieuChi, ISearchDanhMuc_KieuTieuChi } from "../models"
import { useCallback } from "react"
import { DanhMuc_KieuTieuChiDetail } from "./DanhMuc_KieuTieuChiDetail"
import { useDanhMuc_KieuTieuChiContext } from "../contexts/DanhMuc_KieuTieuChiContext"

export const DanhMuc_KieuTieuChiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_KieuTieuChi>> }) => {
  const danhMuc_KieuTieuChiContext = useDanhMuc_KieuTieuChiContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchDanhMuc_KieuTieuChi) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50  , type: "KieuTieuChi" })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_KieuTieuChiContext.setDanhMuc_KieuTieuChiModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='DanhMuc_KieuTieuChiSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col md={8} span={24}>
            <Form.Item
              label="Tên kiểu tiêu chí"
              name="tenDanhMuc"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã kiểu tiêu chí"
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