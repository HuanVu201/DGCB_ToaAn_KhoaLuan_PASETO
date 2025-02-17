import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Upload,
  Button,
  DatePicker,
  Radio,
  Table,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { AntdButton, AntdModal } from "@/lib/antd/components";
import {
  AddLstUsers,
  GetLstUsers,
  UpdateLstUsers,
} from "../redux/action";
import { useLstUsersContext } from "../contexts/LstUsersContext";
import { resetData } from "@/features/lstusers/redux/slice";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
export const LstUsersDetail = () => {
  const dispatch = useAppDispatch();
  const { data: lstUsers} = useAppSelector(
    (state) => state.lstusers
  );
  const lstUsersContext = useLstUsersContext();
  const [form] = useForm();
  const [timeType, setTimeType] = useState("Tháng");
  const onFinish = async () => {
    const formData = form.getFieldsValue();
    const ngayBanHanhFormatted = formData.ngayBanHanh
      ? dayjs(formData.ngayBanHanh).format("YYYY-MM-DD")
      : null; // Hoặc giá trị mặc định nếu cần

      let ketquathoigian="";
    if (timeType == "Tháng") {
       ketquathoigian = formData.DanhGiaTuNgay + "-" + formData.DanhGiaDenNgay;
    } else {
ketquathoigian =
        formData.thangThu +
        "##" +
        formData.DanhGiaTuNgay +
        "-" +
        formData.DanhGiaDenNgay;
    }
    const newGuid = uuidv4();
    const commonData = {
      ...formData,
      loaiThoiGian: timeType,
      thoiGian: ketquathoigian, // Bạn có thể đặt giá trị thời gian ở đây
      dinhKem: "string",
      donVi: "string",
      maBoTieuChi: newGuid,
      ngayBanHanh: ngayBanHanhFormatted, // Sử dụng giá trị đã định dạng
    };

    if (lstUsersContext?.lstUsersId) {
      dispatch(
        UpdateLstUsers({
          id: lstUsersContext.lstUsersId,
          data: commonData,
        })
      );
    } else {
      dispatch(AddLstUsers(commonData));
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    lstUsersContext.setLstUsersModalVisible(false);
    lstUsersContext.setLstUsersId(undefined);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (lstUsersContext.lstUsersId) {
        // Dispatch hành động đầu tiên
        await dispatch(
          GetLstUsers(lstUsersContext.lstUsersId)
        );

      }
    };
    fetchData();
  }, [lstUsersContext.lstUsersId]);

  

  useEffect(() => {
    if (lstUsers) {
      // form.setFieldsValue(lstUsers);
      setTimeType(lstUsers.loaiThoiGian);

      // Tách timeResult
      if (lstUsers.loaiThoiGian == "Tháng") {
        const [startDate, endDate] = lstUsers.thoiGian.split("-");
        form.setFieldsValue({
          DanhGiaTuNgay: startDate,
          DanhGiaDenNgay: endDate,
        });
      } else {
        const [month, dateRange] = lstUsers.thoiGian.split("##");
        const [startDate, endDate] = dateRange.split("-");
        form.setFieldsValue({
          thangThu: month,
          DanhGiaTuNgay: startDate,
          DanhGiaDenNgay: endDate,
        });
      }

      form.setFieldsValue({
        tenBoTieuChi: lstUsers.tenBoTieuChi,
        suDung: lstUsers.suDung,
        tuNgay: dayjs(lstUsers.tuNgay), // Chuyển đổi thành dayjs
        denNgay: dayjs(lstUsers.denNgay), // Chuyển đổi thành dayjs
        ngayBanHanh: dayjs(lstUsers.ngayBanHanh), // Chuyển đổi thành dayjs
        soKyHieu: lstUsers.soKyHieu,
        coQuanBanHanh: lstUsers.coQuanBanHanh,
        dinhKem: lstUsers.dinhKem,
        donVi: lstUsers.donVi,
        loaiThoiGian: lstUsers.loaiThoiGian,
        maBoTieuChi: lstUsers.maBoTieuChi,
        thoiGian: lstUsers.thoiGian,
      });
    }
  }, [lstUsers]);

  return (
    <AntdModal
      title={
        lstUsersContext.lstUsersId
          ? "Sửa thông tin bộ tiêu chuẩn"
          : "Thêm mới bộ tiêu chuẩn"
      }
      visible={lstUsersContext.lstUsersModalVisible}
      onCancel={handleCancel}
      footer={null}
      width="80%"
      bodyStyle={{ padding: "20px" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          soLuongThuTuc: 0,
          soLuongThuTucCapTinh: 0,
          soLuongThuTucCapHuyen: 0,
          soLuongThuTucCapXa: 0,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên bộ tiêu chuẩn"
              name="tenBoTieuChi"
              rules={[
                { required: true, message: "Tên bộ tiêu chuẩn là bắt buộc!" },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="suDung" valuePropName="checked" label="Áp dụng">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <h5 style={{ marginBottom: 16 }}>Thời gian đánh giá đột xuất</h5>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Từ ngày"
              name="tuNgay"
              rules={[{ required: true, message: "Từ ngày là bắt buộc!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  console.log(dayjs(date).format("DD/MM/YYYY"))
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đến ngày"
              name="denNgay"
              rules={[{ required: true, message: "Đến ngày là bắt buộc!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  console.log(dayjs(date).format("DD/MM/YYYY"))
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <h5>Thời gian đánh giá</h5>
            <div
              style={{ paddingTop: "5px", borderTop: "1px dashed #358dcf" }}
            ></div>
            <Form.Item>
              <Radio.Group
                onChange={(e) => setTimeType(e.target.value)}
                value={timeType}
              >
                <Radio value="Tháng">Tháng</Radio>
                <Radio value="Quý">Quý</Radio>
                <Radio value="6 Tháng">6 tháng</Radio>
                <Radio value="Năm">Năm</Radio>
              </Radio.Group>
            </Form.Item>

            {timeType !== "Tháng" && (
              <Form.Item label="Tháng thứ" name="thangThu">
                <Select style={{ width: "100%" }}>
                  {timeType === "Quý" &&
                    [1, 2, 3].map((num) => (
                      <Select.Option key={num} value={num}>
                        {num}
                      </Select.Option>
                    ))}
                  {timeType === "6 Tháng" &&
                    [1, 2, 3, 4, 5, 6].map((num) => (
                      <Select.Option key={num} value={num}>
                        {num}
                      </Select.Option>
                    ))}
                  {timeType === "Năm" &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <Select.Option key={num} value={num}>
                        {num}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Từ ngày" name="DanhGiaTuNgay">
              <Select id="DanhGiaTuNgay" style={{ width: "100%" }}>
                {[...Array(31).keys()].map((num) => (
                  <Select.Option key={num + 1} value={num + 1}>
                    {num + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Đến ngày" name="DanhGiaDenNgay">
              <Select id="DanhGiaDenNgay" style={{ width: "100%" }}>
                {[...Array(31).keys()].map((num) => (
                  <Select.Option key={num + 1} value={num + 1}>
                    {num + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Số, ký hiệu" name="soKyHieu">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày ban hành" name="ngayBanHanh">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Cơ quan ban hành" name="coQuanBanHanh">
              <Input />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item label="File đính kèm" name="DinhKem">
              <Upload id="FileDinhKem" multiple>
                <Button>Chọn tệp</Button>
              </Upload>
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item>
          <Space>
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton>
            <AntdButton onClick={handleCancel}>Đóng</AntdButton>
          </Space>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
