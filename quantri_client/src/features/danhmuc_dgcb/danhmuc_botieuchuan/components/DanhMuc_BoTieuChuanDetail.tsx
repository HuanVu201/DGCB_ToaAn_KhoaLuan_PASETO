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
  Tooltip,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { AntdButton, AntdModal, AntdSelect, AntdUploadPublicFile } from "@/lib/antd/components";
import {
  AddDanhMuc_BoTieuChuan,
  GetDanhMuc_BoTieuChuan,
  UpdateDanhMuc_BoTieuChuan,
} from "../redux/action";
import { useDanhMuc_BoTieuChuanContext } from "../contexts/DanhMuc_BoTieuChuanContext";
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/redux/slice";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { DanhMuc_XepLoaiDanhGiaDetail } from "../../danhmuc_xeploaidanhgia/components/DanhMuc_XepLoaiDanhGiaDetail";
import DanhMuc_XepLoaiDanhGiaTableWrapper from "../../danhmuc_xeploaidanhgia/components/DanhMuc_XepLoaiDanhGiaTable";
import DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuanWrapper from "../../danhmuc_xeploaidanhgia/components/DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuan";
import { v4 as uuidv4 } from 'uuid';
import { SearchDanhMuc_XepLoaiDanhGia } from "../../danhmuc_xeploaidanhgia/redux/action";
import { IDanhMuc_BoTieuChuan } from "../models";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { FastForwardFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { filterOptions } from "@/utils";
import { SearchDanhMuc_CacCap } from "../../danhmuc_caccap/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { CheckboxChangeEvent } from "antd/es/checkbox";
export const DanhMuc_BoTieuChuanDetail = () => {
  const dispatch = useAppDispatch();
  const { data: danhMuc_BoTieuChuan } = useAppSelector(
    (state) => state.danhmuc_botieuchuan
  );
  const {datas: capDanhGiaMaps } = useAppSelector((state) => state.danhmuc_caccap);
  const { data: group, datas: cocautochucs } = useAppSelector((state) => state.cocautochuc);
  const danhMuc_BoTieuChuanContext = useDanhMuc_BoTieuChuanContext();
  const [laDonVi, setLaDonVi] = useState(false);
  const [form] = useForm();
  const dinhKem = Form.useWatch("dinhKem", form);
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

    const lstName_DonViDanhGia = cocautochucs
    ?.filter((obj) => formData.maDonViDanhGia?.includes(obj.groupCode))
    .map((obj) => obj.groupName);
    const lstName_CapDanhGia = capDanhGiaMaps
    ?.filter((obj) => formData.maCapDanhGia?.includes(obj.code))
    .map((obj) => obj.tenDanhMuc);
    const newGuid = uuidv4();
    const commonData = {
      ...formData,
      loaiThoiGian: timeType,
      thoiGian: ketquathoigian, // Bạn có thể đặt giá trị thời gian ở đây
      //dinhKem: "string",
      donVi: "string",
      ngayBanHanh: ngayBanHanhFormatted, // Sử dụng giá trị đã định dạng
      donViDanhGia: JSON.stringify(lstName_DonViDanhGia),
      capDanhGia: JSON.stringify(lstName_CapDanhGia),
      maDonViDanhGia: JSON.stringify(formData.maDonViDanhGia)|| "[]",
      maCapDanhGia: JSON.stringify(formData.maCapDanhGia)|| "[]",
      
    };

    if (danhMuc_BoTieuChuanContext?.danhMuc_BoTieuChuanId) {
      dispatch(
        UpdateDanhMuc_BoTieuChuan({
          id: danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId,
          data: commonData,
        })
      );
    } else {
      dispatch(AddDanhMuc_BoTieuChuan({...commonData,maBoTieuChi:newGuid}));
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    danhMuc_BoTieuChuanContext.setDanhMuc_BoTieuChuanModalVisible(false);
    danhMuc_BoTieuChuanContext.setDanhMuc_BoTieuChuanId(undefined);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId) {
        // Dispatch hành động đầu tiên
        await dispatch(
          GetDanhMuc_BoTieuChuan(danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId)
        );

      }
    };
    fetchData();
  }, [danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId]);

  
  useEffect(() => {
    dispatch(
      SearchDanhMuc_XepLoaiDanhGia({ 
        pageNumber: 1, 
        pageSize: 45, 
        maBoTieuChi: danhMuc_BoTieuChuan?.maBoTieuChi 
      })
    );
  }, [danhMuc_BoTieuChuan?.maBoTieuChi]);

  useEffect(() => {
    if (danhMuc_BoTieuChuan?.loaiThoiGian && danhMuc_BoTieuChuan?.thoiGian && danhMuc_BoTieuChuan) {
      // form.setFieldsValue(danhMuc_BoTieuChuan);
      setTimeType(danhMuc_BoTieuChuan.loaiThoiGian);
      setLaDonVi(danhMuc_BoTieuChuan.laDonVi);
      // Tách timeResult
      if (danhMuc_BoTieuChuan.loaiThoiGian == "Tháng" ){
        const [startDate, endDate] = danhMuc_BoTieuChuan.thoiGian.split("-");
        form.setFieldsValue({
          DanhGiaTuNgay: startDate,
          DanhGiaDenNgay: endDate,
        });
      } else {
        const [month, dateRange] = danhMuc_BoTieuChuan.thoiGian.split("##");
        const [startDate, endDate] = dateRange.split("-");
        form.setFieldsValue({
          thangThu: month,
          DanhGiaTuNgay: startDate,
          DanhGiaDenNgay: endDate,
        });
      }
   
      form.setFieldsValue({
        tenBoTieuChi: danhMuc_BoTieuChuan.tenBoTieuChi,
        suDung: danhMuc_BoTieuChuan.suDung,
        tuNgay:danhMuc_BoTieuChuan.tuNgay ? dayjs(danhMuc_BoTieuChuan.tuNgay) : null, // Chuyển đổi thành dayjs
        denNgay:danhMuc_BoTieuChuan.denNgay ? dayjs(danhMuc_BoTieuChuan.denNgay) : null, // Chuyển đổi thành dayjs
        ngayBanHanh:danhMuc_BoTieuChuan.ngayBanHanh ? dayjs(danhMuc_BoTieuChuan.ngayBanHanh) : null, // Chuyển đổi thành dayjs
        soKyHieu: danhMuc_BoTieuChuan.soKyHieu,
        coQuanBanHanh: danhMuc_BoTieuChuan.coQuanBanHanh,
        dinhKem: danhMuc_BoTieuChuan.dinhKem,
        donVi: danhMuc_BoTieuChuan.donVi,
        loaiThoiGian: danhMuc_BoTieuChuan.loaiThoiGian,
        maBoTieuChi: danhMuc_BoTieuChuan.maBoTieuChi,
        thoiGian: danhMuc_BoTieuChuan.thoiGian,
        cauHinhThoiGianGiaHan:danhMuc_BoTieuChuan.cauHinhThoiGianGiaHan,
        maDonViDanhGia: JSON.parse(danhMuc_BoTieuChuan.maDonViDanhGia || '{}'),
        maCapDanhGia: JSON.parse(danhMuc_BoTieuChuan.maCapDanhGia || '{}'),
        laDonVi:danhMuc_BoTieuChuan.laDonVi,
      });
    }
  }, [danhMuc_BoTieuChuan]);
  useEffect(() => {
    dispatch(SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500 ,type:"CapDanhGia"}));
    dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 500,type: "don-vi" }));
  },[])
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setLaDonVi(e.target.checked); // Update the state based on checkbox change
  };
  return (
    <AntdModal
      title={
        danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId
          ? "Sửa thông tin bộ tiêu chuẩn"
          : "Thêm mới bộ tiêu chuẩn"
      }
      visible={danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanModalVisible}
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
          <Col span={6}>
            <Form.Item
                label={
                  <span>
                    Cấu hình thời gian gia hạn&nbsp;
                    <Tooltip title="Đơn vị nhập là ngày">
                      <QuestionCircleOutlined style={{ color: 'gray' }} />
                    </Tooltip>
                  </span>
                }
             name="cauHinhThoiGianGiaHan">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="File đính kèm" name="dinhKem">
            {/* <AntdUploadPublicFile
                form={form}
                fieldName="dinhKem"
                folderName="MauPhieuDanhGia"
                dinhKem={dinhKem}
              /> */}
              <RegularUpload
                                        dinhKem={dinhKem}
                                        fieldName={'dinhKem'}
                                        folderName={'BoTieuChuan'}
                                        form={form}
                                    />      
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="laDonVi" valuePropName="checked" label="Cấu hình cho đơn vị">
              <Checkbox  onChange={handleCheckboxChange} />
            </Form.Item>
          </Col>
          {laDonVi ? (<> <Col xs={24} sm={12} md={12}>
            <Form.Item label="Cấp đánh giá" name="maCapDanhGia">
              {/* <Select
                mode="multiple"
                placeholder="Chọn cấp đánh giá"
                style={{ width: "100%" }}
                allowClear
                showSearch
              >
                {capDanhGiaMap.map((option) => (
                  <Select.Option key={option.ma} value={option.ma}>
                    {option.ten}
                  </Select.Option>
                ))}
              </Select> */}
              <AntdSelect
                allowClear
                showSearch
                mode="multiple"
                filterOption={filterOptions}
                generateOptions={{
                  model: capDanhGiaMaps,
                  label: "tenDanhMuc",
                  value: "code",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Đơn vị sử dụng" name="maDonViDanhGia">
              {/* <Select  mode="multiple"  placeholder="Gõ để tìm kiếm đơn vị sử dụng" style={{ width: '100%' }} allowClear showSearch filterOption={filterOptions}>
                                {cocautochucs?.map(donvi => (
                                    <Select.Option key={donvi.groupCode} value={donvi.groupCode}>
                                        {donvi.groupName}
                                    </Select.Option>
                                ))}
                            </Select> */}
                            <AntdSelect
                            mode="multiple"
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: cocautochucs,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
              {/* <AntdTreeSelect
                generateOptions={{
                  model: groups,
                  key: "id",
                  parentKey: "ofGroupId",
                  title: "groupName",
                  value: "groupCode",
                }}
                allowClear
                showSearch
                treeLine
                multiple
                treeDefaultExpandAll
              /> */}
            </Form.Item>
          </Col></>) : (<></>)}
        </Row>

        {danhMuc_BoTieuChuanContext.danhMuc_BoTieuChuanId ? (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <h5>Thông tin phân loại đánh giá</h5>
                <div
                  style={{ paddingTop: "5px", borderTop: "1px dashed #358dcf" }}
                ></div>
              </Col>
              <Col span={24}>
                <DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuanWrapper />
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}

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
