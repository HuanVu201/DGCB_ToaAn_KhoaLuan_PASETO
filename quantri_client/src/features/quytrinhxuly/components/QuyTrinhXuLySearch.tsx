import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"
import { QuyTrinhXuLy, SearchQuyTrinhXuLy } from "@/models/quytrinhxuly"
import { SetSearchParams } from "@/hooks/useSearchStateHolder"

export const QuyTrinhXuLySearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<SearchQuyTrinhXuLy>> }) => {
  const QuyTrinhXuLyContext = useQuyTrinhXuLyContext()
  const [form] = Form.useForm()
  const onFinish = (values: SearchQuyTrinhXuLy) => {
    setSearchParams(values)
  }
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {QuyTrinhXuLyContext.setQuyTrinhXuLyModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='QuyTrinhXuLySearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên nhóm người dùng"
          name="ten"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit" >
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={() => setSearchParams((curr) => ({...curr}))}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  )
}