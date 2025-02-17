import { Form, Input, Space, Row } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { INhomNguoiDung, ISearchNhomNguoiDung } from "../models"
import { useCallback } from "react"
import { useNhomNguoiDungContext } from "../contexts/NhomNguoiDungContext"

export const NhomNguoiDungDonViSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchNhomNguoiDung>> }) => {
  const [form] = Form.useForm()
  const onFinish = (values: ISearchNhomNguoiDung) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({pageNumber:1, pageSize:10,  reFetch: true })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
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