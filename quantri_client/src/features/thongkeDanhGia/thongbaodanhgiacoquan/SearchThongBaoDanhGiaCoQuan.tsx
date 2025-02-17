import { AntdSelect } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  DownOutlined,
  LoadingOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, DatePicker, Dropdown, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { ISearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ } from "../models";
import { SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ } from "../redux/action";
import dayjs from "dayjs"; // Import Day.js
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchDanhMuc_XepLoaiDanhGia } from "@/features/danhmuc_dgcb/danhmuc_xeploaidanhgia/redux/action";
import { filterOptions } from "@/utils";
const { Option } = Select;

export const SearchThongBaoDanhGiaCoQuan = () => {
  const dispatch = useAppDispatch();
  // const { datas: thongKeDatas, loading } = useAppSelector(
  //   (state) => state.danhmucdungchung
  // );
  const { data: user } = useAppSelector((state) => state.user);
  const { parseToken } = useAppSelector((state) => state.auth);
  const { data: group, datas: cocautochucs } = useAppSelector(
    (state) => state.cocautochuc
  );
  const groupsDonVis = cocautochucs?.filter(x => x.type == 'don-vi')
  // Danh sách 4 mục cụ thể bạn muốn hiển thị
  const selectedItems = [
    {
      id: "04ef90f8-b559-440f-72eb-08dcdd33175c",
      ten: "Loại A - Hoàn thành xuất sắc nhiệm vụ",
      maBoTieuChi: "4563cdb2-9568-4cf7-8207-e1c443553144",
      tenBoTieuChi: "Đánh giá, xếp loại chất lượng đối với công chức, viên chức, người lao động trong Tòa án nhân dân"
    },
    {
      id: "6f1d026b-264e-41f6-72ea-08dcdd33175c",
      ten: "Loại B - Hoàn thành tốt nhiệm vụ",
      maBoTieuChi: "4563cdb2-9568-4cf7-8207-e1c443553144",
      tenBoTieuChi: "Đánh giá, xếp loại chất lượng đối với công chức, viên chức, người lao động trong Tòa án nhân dân"
    },
    {
      id: "ac580152-fa2d-45c9-874e-08dce1cad4a9",
      ten: "Loại C - Hoàn thành nhiệm vụ",
      maBoTieuChi: "4563cdb2-9568-4cf7-8207-e1c443553144",
      tenBoTieuChi: "Đánh giá, xếp loại chất lượng đối với công chức, viên chức, người lao động trong Tòa án nhân dân"
    },
    {
      id: "fe24833a-77ae-4d8d-874f-08dce1cad4a9",
      ten: "Loại D - Không hoàn thành nhiệm vụ",
      maBoTieuChi: "4563cdb2-9568-4cf7-8207-e1c443553144",
      tenBoTieuChi: "Đánh giá, xếp loại chất lượng đối với công chức, viên chức, người lao động trong Tòa án nhân dân"
    }
  ];
  const { data: danhmuc_xeploaidanhgia, datas: danhmuc_xeploaidanhgias } =
    useAppSelector((state) => state.danhmuc_xeploaidanhgia);
  const onFinish = async (values: ISearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ) => {
    try {
      if ( values.namHienTai && dayjs.isDayjs(values.namHienTai)) { // Kiểm tra xem date có phải là Day.js không
        const year =  values.namHienTai.year();
        values.namHienTai = year.toString(); // Lấy năm từ đối tượng Day.js
      } else {
        values.namHienTai = undefined;
      }
       
        if(user?.userName == "root.admin")
        {
          // values.maPhongBan = 'MDV01';
          // values.kyDanhGia='string';
         //values.maPhongBan = 'TA.01';
        }
      await dispatch(SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ({ ...values }));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const [form] = Form.useForm<any>();
  const [loaiThoiGian, setLoaiThoiGian] = useState<string | undefined>(
    undefined
  );

  const handleLoaiThoiGianChange = (value: string) => {
    setLoaiThoiGian(value);
    form.setFieldsValue({ kyDanhGia: undefined }); // Reset kỳ đánh giá khi loại thời gian thay đổi
  };

  useEffect(() => {
    dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 5000 ,GetAllChildren:true,groupCode:parseToken?.officeCode }));
    dispatch(SearchDanhMuc_XepLoaiDanhGia({ pageNumber: 1, pageSize: 500 }));
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
          <Col xs={24} sm={6} md={2}>
            {/* <h5>Theo tiêu chí</h5> */}
          </Col>
          <Col xs={24} sm={18} md={18}>
            <Row gutter={[8, 8]} justify="start">
              <Col xs={24}>
                <Form.Item
                  label="Đơn vị"
                  name="maPhongBan"
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
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Xếp loại"
                  name="xepLoai"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  {/* <Select
                    placeholder="Chọn xếp loại đánh giá"
                    style={{ width: "100%" }}
                    allowClear
                    showSearch
                  >
                    {danhmuc_xeploaidanhgias?.map((item) => (
                      <Select.Option key={item.id} value={item.ten}>
                        {item.ten}{" "}
                        <span style={{ color: "#6ec6e4", fontWeight: "bold" }}>
                          ({item.tenBoTieuChi})
                        </span>
                      </Select.Option>
                    ))}
                  </Select> */}
                    <Select placeholder="Chọn xếp loại đánh giá">
          <Option value="Loại A - Hoàn thành xuất sắc nhiệm vụ">Loại A - Hoàn thành xuất sắc nhiệm vụ</Option>
          <Option value="Loại B - Hoàn thành tốt nhiệm vụ">Loại B - Hoàn thành tốt nhiệm vụ</Option>
          <Option value="Loại C - Hoàn thành nhiệm vụ">Loại C - Hoàn thành nhiệm vụ</Option>
          <Option value="Loại D - Không hoàn thành nhiệm vụ">Loại D - Không hoàn thành nhiệm vụ</Option>
        </Select>
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12}>
                <Form.Item
                  label="Năm đánh giá"
                  name="namHienTai"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <DatePicker
                    picker="year"
                    placeholder="Chọn năm"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12}>
                <Form.Item
                  label="Loại thời gian"
                  name="loaiThoiGian"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ marginBottom: 10 }}   
                >
                  <Select
                    placeholder="Chọn loại thời gian"
                    onChange={handleLoaiThoiGianChange}
                    allowClear
                  >
                    <Option value="Tháng">Tháng</Option>
                    <Option value="Quý">Quý</Option>
                    <Option value="6 Tháng">6 Tháng</Option>
                    <Option value="Năm">Năm</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
                    <Select placeholder="Chọn kỳ đánh giá" allowClear>
                      {loaiThoiGian === "Quý" &&
                        Array.from({ length: 4 }, (_, index) => (
                          <Option key={index + 1} value={index + 1}>{`Quý ${
                            index + 1
                          }`}</Option>
                        ))}
                      {loaiThoiGian === "6 Tháng" && (
                        <>
                          <Option value="1">6 Tháng đầu năm</Option>
                          <Option value="2">6 Tháng cuối năm</Option>
                        </>
                      )}
                      {loaiThoiGian === "Tháng" &&
                        Array.from({ length: 12 }, (_, index) => (
                          <Option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>{`Tháng ${
                            (index + 1).toString().padStart(2, '0')
                          }`}</Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
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
        </div>
      </Form>
    </>
  );
};
