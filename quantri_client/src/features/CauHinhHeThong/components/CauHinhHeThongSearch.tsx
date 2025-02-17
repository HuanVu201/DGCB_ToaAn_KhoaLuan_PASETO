import { Form, Input, Row, Space } from "antd"
import { CollapseContent } from "../../../components/common/CollapseContent"
import { AntdButton } from "../../../lib/antd/components"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { ISearchCauHinhHeThong } from "../models"
import { useCallback } from "react"
import { CauHinhHeThongDetail } from "./CauHinhHeThongDetail"
import { useCauHinhHeThongContext } from "../contexts/CauHinhHeThongContext"

export const CauHinhHeThongSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchCauHinhHeThong>> }) => {
  const cauHinhHeThongContext = useCauHinhHeThongContext()
  const [form] = Form.useForm()
  const onFinish = (values: ISearchCauHinhHeThong) => {
    console.log(values);
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50 })
    form.resetFields()
  }, [])
  return (
    <CollapseContent
      extraButtons={[<AntdButton onClick={() => cauHinhHeThongContext.setCauHinhHeThongModalVisible(true)}>Thêm mới</AntdButton>]}
    >
      <Form name='cauHinhHeThongSearch' layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên cấu hình"
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