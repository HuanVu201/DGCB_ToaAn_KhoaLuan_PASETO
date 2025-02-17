import { AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { DownOutlined, LoadingOutlined, PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, DatePicker, Dropdown, Form, Input, Row, Select } from "antd";
import { ISearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan } from "../models";
import { SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan } from "../redux/action";
import dayjs from "dayjs"; // Import Day.js
import WordBaoCao from "./WordBaoCao/WordBaoCao";
import { useState } from "react";
import { filterOptions } from "@/utils";
const { Option } = Select;

export const SearchTongHopKetQuaDanhGia = () => {
  const dispatch = useAppDispatch();
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const { datas: lstusers } = useAppSelector(
    (state) => state.lstusers
  );
  const { datas: user } = useAppSelector(
    (state) => state.user
  );
  const onFinish = async (values: ISearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan) => {
    try {
      if (values.namHienTai && dayjs.isDayjs(values.namHienTai)) { // Kiểm tra xem date có phải là Day.js không
        const year = values.namHienTai.year();
        values.namHienTai = year.toString(); // Lấy năm từ đối tượng Day.js
      } else {
        values.namHienTai = undefined;
      }
      await dispatch(SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan({ ...values }));

    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const [form] = Form.useForm<any>();

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
          <Col xs={24} sm={8} md={4}>
            {/* <h4>Theo tiêu chí</h4> */}
          </Col>
          <Col xs={24} sm={16} md={18}>
            <Row gutter={[8, 8]}>
              <Col xs={24} md={24}>
                <Form.Item
                  label="Họ và tên"
                  name="MaNguoiDung"
                  labelCol={{ span: 4 }} // Chiều rộng label
                  wrapperCol={{ span: 16 }} // Chiều rộng input

                >
                  {/* <Select placeholder="Chọn tháng" onChange={setSelectedUserId}>
                    {lstusers?.map(item => (
                      <Option key={item.id} value={item.id}>{item.fullNameWithGroup} ( {item.userName} ) </Option>
                    ))}
                  </Select> */}
                      <AntdSelect
                      onChange={setSelectedUserId}
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: lstusers,
                  label: "fullNameWithGroup",
                  value: "id",
                }}
              />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item
                  label="Năm đánh giá"
                  name="namHienTai"
                  rules={[{ required: true, message: "Năm đánh giá không được để trống!" }]}
                  labelCol={{ span: 4 }} // Chiều rộng label
                  wrapperCol={{ span: 6 }} // Chiều rộng input
                >
                  <DatePicker
                    picker="year"
                    placeholder="Chọn năm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
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
          // onClick={() => onFinish(thongKeHoSoContext.searchBaoCaoThuTuc)}
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
      <WordBaoCao selectIdUser={selectedUserId} />
    </>
  );
};
