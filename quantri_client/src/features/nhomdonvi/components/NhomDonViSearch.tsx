import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { SetSearchParams } from "@/hooks/useSearchStateHolder"
import { SearchNhomDonVi } from "@/models/nhomDonVi"
import { useNhomDonViContext } from "../contexts/QuyTrinhXuLyContext"

export const NhomDonViSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<SearchNhomDonVi>> }) => {
  const NhomDonViContext = useNhomDonViContext()
  const [form] = Form.useForm()
  const onFinish = (values: SearchNhomDonVi) => {
    setSearchParams(values)
  }
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {NhomDonViContext.setNhomDonViModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='NhomDonViSearch' layout="vertical" onFinish={onFinish} form={form}>
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