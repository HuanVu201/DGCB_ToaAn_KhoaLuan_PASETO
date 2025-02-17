import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { INhomNguoiDung, ISearchNhomNguoiDung } from "../models"
import { useCallback } from "react"
import { NhomNguoiDungDetail } from "./NhomNguoiDungDetail"
import { useNhomNguoiDungContext } from "../contexts/NhomNguoiDungContext"

export const NhomNguoiDungSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchNhomNguoiDung>> }) => {
  const nhomNguoiDungContext = useNhomNguoiDungContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchNhomNguoiDung) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({pageNumber:1, pageSize:500,  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => {nhomNguoiDungContext.setNhomNguoiDungModalVisible(true)}}>Thêm mới</AntdButton>]}
    >
      <Form name='NhomNguoiDungSearch' layout="vertical" onFinish={onFinish} form={form}>
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