import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common/CollapseContent"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IThongKeKhieuNai, ISearchThongKeKhieuNai } from "../models"
import { useCallback, useEffect, useState } from "react"
import { ThongKeKhieuNaiDetail } from "./ThongKeKhieuNaiDetail"
import { useThongKeKhieuNaiContext } from "../contexts/ThongKeKhieuNaiContext"
import { filterOptions } from "@/utils"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { CoCauToChuc } from "@/models/cocautochuc"

export const ThongKeKhieuNaiSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchThongKeKhieuNai>> }) => {
  const thongKeKhieuNaiContext = useThongKeKhieuNaiContext()
  const [form] = Form.useForm()
  const { datas: cocautochucs } = useAppSelector(state => state.cocautochuc)
  const {parseToken } = useAppSelector(state => state.auth)
  const onFinish = (values: ISearchThongKeKhieuNai) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const [listPhongBan,setListPhongBan] = useState<CoCauToChuc[]>();
  const donvis = cocautochucs?.filter(item => item.type == 'don-vi');
  const nhoms = cocautochucs?.filter(item => item.type == 'nhom');
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  const HandleOnChangeSelectDonVi = (value: string) =>
  {
      const donvi = nhoms?.filter(item => item.ofGroupCode?.toLocaleLowerCase() == value.toLocaleLowerCase());
      setListPhongBan(donvi || []);
      console.log(donvi)
      form.setFieldsValue({ maPhongBanTK: undefined }) // Clear the Phòng ban field
  }
  return (
    <CollapseContent
     // extraButtons={[<AntdButton onClick={() => { thongKeKhieuNaiContext.setThongKeKhieuNaiModalVisible(true) }}>Thêm mới</AntdButton>]}
    >
      <Form name='ThongKeKhieuNaiSearch' layout="vertical" onFinish={onFinish} form={form}
       initialValues={{}}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Đơn vị"
              name="maDonVi"
            >
               <AntdSelect
                allowClear
                showSearch
                //defaultValue={parseToken?.officeCode}
                filterOption={filterOptions}
                onChange={HandleOnChangeSelectDonVi}
                generateOptions={{
                  model: donvis,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Phòng ban"
              name="maPhongBanTK"
            >
                 <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: listPhongBan,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
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