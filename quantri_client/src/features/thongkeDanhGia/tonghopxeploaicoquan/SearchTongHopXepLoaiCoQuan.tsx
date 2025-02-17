import { AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { DownOutlined, LoadingOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Row, Select } from "antd";
import { ISearchDanhMuc_ThongKeDanhGiaMau09 } from "../models";
import { SearchDanhMuc_ThongKeDanhGia_Mau09 } from "../redux/action";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import Day.js
import { filterOptions } from "@/utils";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
const { Option } = Select;

export const SearchTongHopXepLoaiCoQuan = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector(
    (state) => state.user
  );
  const { data: group, datas: cocautochucs } = useAppSelector(
    (state) => state.cocautochuc
  );
  const { parseToken } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<any>();
  
  const [loaiThoiGian, setLoaiThoiGian] = useState<string | undefined>(undefined);
  const groupsDonVis = cocautochucs?.filter(x => x.type == 'don-vi')
  const onFinish = async (values: ISearchDanhMuc_ThongKeDanhGiaMau09) => {
    try {
      if (values.namDanhGia && dayjs.isDayjs(values.namDanhGia)) { // Kiểm tra xem date có phải là Day.js không
        const year = values.namDanhGia.year();
        values.namDanhGia = year.toString(); // Lấy năm từ đối tượng Day.js
      } else {
        values.namDanhGia = undefined;
      }
      if (user?.groupCode) {
        values.maDonVi = user?.officeCode;
      }
      else {
        if (user?.userName == "root.admin") {
          // values.maDonVi = 'MDV01';
          // values.kyDanhGia = 'string';
        }
      }
      await dispatch(SearchDanhMuc_ThongKeDanhGia_Mau09({ ...values }));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleLoaiThoiGianChange = (value: string) => {
    setLoaiThoiGian(value);
    form.setFieldsValue({ kyDanhGia: undefined }); // Reset kỳ đánh giá khi loại thời gian thay đổi
  };

  useEffect(() => {
    dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 5000 ,GetAllChildren:true,groupCode:parseToken?.officeCode }));
  }, []);
  return (
    <>
      <Form
        name="ThongKeSearch"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        style={{
          padding: "20px",
          backgroundColor: "#f1f5f1",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        <Row gutter={[8, 8]}>
          {/* <Col md={4}>
            <h4>Theo tiêu chí</h4>
          </Col> */}
          <Col md={24}>
            <Row gutter={[8, 8]}>
              <Col md={12}>
                <Form.Item
                  label="Năm đánh giá"
                  name="namDanhGia"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }} // Cân bằng label và input
                  style={{ marginBottom: 10 }} // Giảm khoảng cách giữa các input
                >
                  <DatePicker
                    picker="year"
                    placeholder="Chọn năm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  label="Loại thời gian"
                  name="loaiThoiGian"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ marginBottom: 10 }}
                >
                  <Select placeholder="Chọn loại thời gian" onChange={handleLoaiThoiGianChange}>
                    <Option value="Tháng">Tháng</Option>
                    <Option value="Quý">Quý</Option>
                    <Option value="6 Tháng">6 Tháng</Option>
                    <Option value="Năm">Năm</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Ẩn trường "Kỳ đánh giá" nếu loại thời gian là "Năm" */}
            {loaiThoiGian !== "Năm" && (
              <Row gutter={[8, 8]}>
                <Col md={12}>
                  <Form.Item
                    label="Kỳ đánh giá"
                    name="kyDanhGia"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ marginBottom: 10 }}
                  >
                    <Select placeholder="Chọn kỳ đánh giá">
                      {loaiThoiGian === "Quý" &&
                        Array.from({ length: 4 }, (_, index) => (
                          <Option key={index + 1} value={index + 1}>{`Quý ${index + 1}`}</Option>
                        ))}
                      {loaiThoiGian === "6 Tháng" && (
                        <>
                          <Option value="1">6 Tháng đầu năm</Option>
                          <Option value="2">6 Tháng cuối năm</Option>
                        </>
                      )}
                      {loaiThoiGian === "Tháng" && (
                        Array.from({ length: 12 }, (_, index) => (
                          <Option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>{`Tháng ${(index + 1).toString().padStart(2, '0')}`}</Option>
                        ))
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
            {user?.userName == "root.admin" || "nghiepvu.admin" ? (<> <Col xs={24}>
                <Form.Item
                  label="Đơn vị"
                  name="maDonVi"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  {/* <Select
                    placeholder="Gõ để tìm kiếm đơn vị sử dụng"
                    style={{ width: "100%" }}
                    allowClear
                  >
                    {groupsDonVis?.map((donvi) => (
                      <Select.Option
                        key={donvi.groupCode}
                        value={donvi.groupCode}
                      >
                        {donvi.groupName}
                      </Select.Option>
                    ))}
                  </Select> */}
                  <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: groupsDonVis,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
                </Form.Item>
              </Col></>) : (<></>)}
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="btnThongKe"
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <SearchOutlined />
            <span> Thống kê</span>
          </button>
          {/* <button
            className="btnIn"
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            // onClick={() => handlePrint()} // Thêm hàm in nếu cần
          >
            <PrinterOutlined />
            <span> In</span>
          </button> */}
        </div>
      </Form>
    </>
  );
};
