import { Form, Input, Space, Row, Col, Select } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton, AntdSelect, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMuc_PhieuDanhGia, ISearchDanhMuc_PhieuDanhGia } from "../models"
import { useCallback, useEffect } from "react"
import { useDanhMuc_PhieuDanhGiaContext } from "../contexts/DanhMuc_PhieuDanhGiaContext"
import { filterOptions, filterOptionsWithTitle } from "@/utils";
const { Option } = Select;
export const DanhMuc_PhieuDanhGiaSearch = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_PhieuDanhGia>> }) => {
  const danhMuc_PhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext()
  const [form] = Form.useForm()
  
  const { data: danhMuc_BoTieuChuan, datas: danhMuc_BoTieuChuans } =
  useAppSelector((state) => state.danhmuc_botieuchuan);
  let boTieuChuanNam = danhMuc_BoTieuChuans?.find(
    (boTieuChuan) => boTieuChuan.loaiThoiGian === "Năm" && boTieuChuan.suDung === true
  );
  useEffect(() => {
    // Cập nhật bộ tiêu chuẩn Nam khi dữ liệu thay đổi
    boTieuChuanNam = danhMuc_BoTieuChuans?.find(
      (boTieuChuan) => boTieuChuan.loaiThoiGian === "Năm" && boTieuChuan.suDung === true
    );
    
    // Đặt lại giá trị của "maBoTieuChi" trong form nếu tìm thấy bộ tiêu chuẩn phù hợp
    if (boTieuChuanNam) {
      form.setFieldsValue({ maBoTieuChi: boTieuChuanNam?.maBoTieuChi });
      setSearchParams((curr) => ({...curr,  maBoTieuChi: boTieuChuanNam?.maBoTieuChi}))
    }
  }, [danhMuc_BoTieuChuans]);

    // Hàm xử lý khi chọn bộ tiêu chuẩn
    const handleSelectChange = (value: any, field: string) => {
      // Cập nhật search params dựa trên giá trị của từng field
      setSearchParams((curr) => ({ ...curr, [field]: value }));
    };
  const onFinish = (values: ISearchDanhMuc_PhieuDanhGia) => {
    setSearchParams((curr) => ({...curr, ...values}))
  }
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, reFetch: true })
    form.resetFields()
  }, [])
  return (
    <>
    {/* <CollapseContent
      extraButtons={[<AntdButton onClick={() => { danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>]}
    > */}
      <AntdSpace direction="vertical" style={{width:"100%"}}>
      <AntdButton onClick={() => { danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(true) }}>Thêm mới</AntdButton>
      <Form name='DanhMuc_PhieuDanhGiaSearch' layout="vertical" onFinish={onFinish} form={form}  initialValues={{maBoTieuChi:boTieuChuanNam?.maBoTieuChi}}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Tên mẫu phiếu đánh giá"
              name="ten"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Kỳ đánh giá"
              name="loaiThoiGian"
            >
                  <Select
          style={{ width: '100%' }}
          allowClear
        >
          <Option value="Năm">Năm</Option>
          <Option value="6 Tháng">6 Tháng</Option>
          <Option value="Quý">Quý</Option>
          <Option value="Tháng">Tháng</Option>
        </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item label="Thuộc bộ tiêu chuẩn" name="maBoTieuChi"  
           // rules={[{ required: true, message: "Yêu cầu chọn mẫu phiếu" }]}

            >
              {/* <Select
                placeholder="Gõ để tìm kiếm bộ tiêu chuẩn"
                style={{ width: "100%" }}
                allowClear
                showSearch // Bật chức năng tìm kiếm
                filterOption={filterOptions}
              >
                {danhMuc_BoTieuChuans?.map((boTieuChuan) => (
                  <Select.Option
                    key={boTieuChuan.maBoTieuChi}
                    value={boTieuChuan.maBoTieuChi}
                  >
                    {boTieuChuan.tenBoTieuChi}
                  </Select.Option>
                ))}
              </Select>  */}
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: danhMuc_BoTieuChuans,
                  label: "tenBoTieuChi",
                  value: "maBoTieuChi",
                }}
                onChange={(value) => handleSelectChange(value, "maBoTieuChi")}
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
      </AntdSpace>
    {/* </CollapseContent> */}
    </>
  )
}