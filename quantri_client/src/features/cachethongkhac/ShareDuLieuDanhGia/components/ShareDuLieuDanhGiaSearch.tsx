import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IShareDuLieuDanhGia, ISearchShareDuLieuDanhGia } from "../models"
import { useCallback } from "react"
import { ShareDuLieuDanhGiaDetail } from "./ShareDuLieuDanhGiaDetail"
import { useShareDuLieuDanhGiaContext } from "../contexts/ShareDuLieuDanhGiaContext"

export const ShareDuLieuDanhGiaSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchShareDuLieuDanhGia>> }) => {
  const shareDuLieuDanhGiaContext = useShareDuLieuDanhGiaContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchShareDuLieuDanhGia) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <>
    
    <AntdButton onClick={() => { shareDuLieuDanhGiaContext.setShareDuLieuDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>
    {/* <CollapseContent
      extraButtons={[<AntdButton onClick={() => { shareDuLieuDanhGiaContext.setShareDuLieuDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='ShareDuLieuDanhGiaSearch' layout="vertical" onFinish={onFinish} form={form}>
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
    </CollapseContent> */}
    </>
    
  )
}