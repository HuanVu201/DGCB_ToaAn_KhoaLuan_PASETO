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
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect,useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUploadPublicFile,
} from "@/lib/antd/components";
import {
  AddDanhMuc_PhieuDanhGia,
  GetDanhMuc_PhieuDanhGia,
  UpdateDanhMuc_PhieuDanhGia,
} from "../redux/action";
import { useDanhMuc_PhieuDanhGiaContext } from "../contexts/DanhMuc_PhieuDanhGiaContext";
import { resetData } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/slice";
import Search from "antd/es/transfer/search";
import { SearchDanhMuc_BoTieuChuan } from "../../danhmuc_botieuchuan/redux/action";
import { SearchDanhMuc_ChucDanh } from "../../danhmuc_chucdanh/redux/action";
import { SearchDanhMuc_ChucVu } from "../../danhmuc_chucvu/redux/action";
import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect";
import { PlusOutlined } from "@ant-design/icons";
import AddCaNhanOfDanhMucPhieuDanhGia from "./AddCaNhanOfDanhMucPhieuDanhGia";
import { toast } from 'react-toastify';
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { filterOptions, filterOptionsWithTitle } from "@/utils";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";
import { SearchDanhMuc_CacCap } from "../../danhmuc_caccap/redux/action";
export const DanhMuc_PhieuDanhGiaDetail = () => {
  const dispatch = useAppDispatch();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { data: danhMuc_PhieuDanhGia } = useAppSelector(
    (state) => state.danhmuc_phieudanhgia
  );
  const { data: danhMuc_ChucVu, datas: danhMuc_ChucVus } = useAppSelector(
    (state) => state.danhmuc_chucvu
  );
  const { data: danhMuc_ChucDanh, datas: danhMuc_ChucDanhs } = useAppSelector(
    (state) => state.danhmuc_chucdanh
  );
  const { data: danhMuc_BoTieuChuan, datas: danhMuc_BoTieuChuans } =
    useAppSelector((state) => state.danhmuc_botieuchuan);
  const { data: lstusers, datas: lstuserss } = useAppSelector(
    (state) => state.lstusers
  );
  const { data: group, datas: cocautochucs } = useAppSelector((state) => state.cocautochuc);
  const {datas: capDanhGiaMaps } = useAppSelector((state) => state.danhmuc_caccap);
  // const capDanhGiaMap = [
  //   { ma: "TAND_Toi_Cao", ten: "TAND Tối Cao" },
  //   { ma: "Cap_Cao", ten: "Cấp Cao" },
  //   { ma: "Cap_Tinh", ten: "Cấp Tỉnh" },
  //   { ma: "Cap_Huyen", ten: "Cấp Huyện" },
  // ];
  const { Option } = Select;
  const danhMuc_PhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext();
  const [form] = Form.useForm();
  const dinhKem = Form.useWatch("dinhKem", form);
  const onFinish = async () => {
    const formData = form.getFieldsValue();
    // let lstName_BoTieuChi = getFieldsByCodes(formData.maBoTieuChi,danhMuc_BoTieuChuans,'maBoTieuChi','tenBoTieuChi');

    // let lstName_ChuVuDanhGia = getFieldsByCodes(formData.maChucVu,danhMuc_ChucVus,'ma','ten');
    // let lstName_ChuDanhDanhGia =  getFieldsByCodes(formData.maChucDanh,danhMuc_ChucDanhs,'ma','ten');
    // let lstName_CaDanhGia= getFieldsByCodes(formData.maCaNhanDanhGia,lstuserss,'groupCode','fullName');
    // let lstName_DonViDanhGia = getFieldsByCodes(formData.maDonViDanhGia,groups,'groupCode','groupName');
    const lstName_ChuVuDanhGia  = danhMuc_ChucVus
      ?.filter((obj) => formData.maChucVuDanhGia?.includes(obj.ma))
      .map((obj) => obj.ten);
    const lstName_ChuDanhDanhGia = danhMuc_ChucDanhs
      ?.filter((obj) => formData.maChucDanhDanhGia?.includes(obj.ma))
      .map((obj) => obj.ten);
    const lstName_CaNhanDanhGia = lstuserss
      ?.filter((obj) => formData.maCaNhanDanhGia?.includes(obj.id))
      .map((obj) => obj.fullName);
    const lstName_DonViDanhGia = cocautochucs
      ?.filter((obj) => formData.maDonViDanhGia?.includes(obj.groupCode))
      .map((obj) => obj.groupName);
    const lstName_CapDanhGia = capDanhGiaMaps
      ?.filter((obj) => formData.maCapDanhGia.includes(obj.code))
      .map((obj) => obj.tenDanhMuc);
    const mappedData = {
      ...formData,
      // tenChucVuDanhGia: danhMuc_ChucVus?.find(chucVu => chucVu.ma === formData.maChucVu)?.ten || '',
      // tenChucDanhDanhGia: danhMuc_ChucDanhs?.find(chucDanh => chucDanh.ma === formData.maChucDanh)?.ten || '',
      // capDanhGia: capDanhGiaMap.find(capDanhGia => capDanhGia.ma === formData.maCapDanhGia)?.ten|| '',
      // donViDanhGia: groups?.find(donVi => donVi.groupCode === formData.maDonViDanhGia)?.groupName || '',
      // caNhanDanhGia:lstuserss?.find(item => item.groupCode === formData.maCaNhanDanhGia)?.fullName || '',

      tenChucVuDanhGia: JSON.stringify(lstName_ChuVuDanhGia),
      tenChucDanhDanhGia: JSON.stringify(lstName_ChuDanhDanhGia),
      donViDanhGia: JSON.stringify(lstName_DonViDanhGia),
      caNhanDanhGia: JSON.stringify(lstName_CaNhanDanhGia),
      capDanhGia: JSON.stringify(lstName_CapDanhGia),
      //maBoTieuChi: JSON.stringify(formData.maBoTieuChi),
      maChucVuDanhGia: JSON.stringify(formData.maChucVuDanhGia) || "[]",
      maChucDanhDanhGia: JSON.stringify(formData.maChucDanhDanhGia)|| "[]",
      maCaNhanDanhGia: JSON.stringify(selectedUsers)|| "[]",
      maDonViDanhGia: JSON.stringify(formData.maDonViDanhGia)|| "[]",
      maCapDanhGia: JSON.stringify(formData.maCapDanhGia)|| "[]",
      // maChucDanhDanhGia:JSON.stringify(formData.maChucDanhDanhGia),
    };

    if (danhMuc_PhieuDanhGiaContext?.danhMuc_PhieuDanhGiaId) {
      dispatch(
        UpdateDanhMuc_PhieuDanhGia({
          id: danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId,
          data: mappedData,
        })
      );
    } else {
      dispatch(AddDanhMuc_PhieuDanhGia({ ...mappedData }));
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(false);
    danhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(undefined);
    danhMuc_PhieuDanhGiaContext.setLstCaNhanDanhGia([]);
    setSelectedUsers([]);
    danhMuc_PhieuDanhGiaContext.setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible(false);
  };
  useEffect(() => {
    if (danhMuc_PhieuDanhGiaContext.lstCaNhanDanhGia.length > 0) {
      const names = danhMuc_PhieuDanhGiaContext.lstCaNhanDanhGia.map(user => user.userName).join(', ');
      // toast.success(`Danh sách người dùng được thêm: ${names}`);
      const userCodes = danhMuc_PhieuDanhGiaContext.lstCaNhanDanhGia.map(user => user.id);
      setSelectedUsers(userCodes);
      form.setFieldValue("maCaNhanDanhGia", userCodes);
  }
  }, [danhMuc_PhieuDanhGiaContext.lstCaNhanDanhGia]);
  useEffect(() => {
    dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 500,type: "don-vi" }));
    dispatch(SearchDanhMuc_ChucDanh({ pageNumber: 1, pageSize: 500 }));
    dispatch(SearchDanhMuc_ChucVu({ pageNumber: 1, pageSize: 500 }));
    dispatch(SearchDanhMuc_CacCap({ pageNumber: 1, pageSize: 500 ,type:"CapDanhGia"}));
    danhMuc_PhieuDanhGiaContext.setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible(false);
  }, []);

  useEffect(() => {
    if (danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId) {
      dispatch(
        GetDanhMuc_PhieuDanhGia(
          danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId
        )
      );
    }
  }, [danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId]);

  useEffect(() => {
    if (danhMuc_PhieuDanhGia) {
      setSelectedUsers(JSON.parse(danhMuc_PhieuDanhGia.maCaNhanDanhGia || '[]'));
      const dataFields = {
        ...danhMuc_PhieuDanhGia,
        //maBoTieuChi: JSON.parse(danhMuc_PhieuDanhGia.maBoTieuChi),
        maChucVuDanhGia: JSON.parse(danhMuc_PhieuDanhGia.maChucVuDanhGia || '{}'),
        maChucDanhDanhGia: JSON.parse(danhMuc_PhieuDanhGia.maChucDanhDanhGia || '{}'),
      //maCaNhanDanhGia: JSON.parse(danhMuc_PhieuDanhGia.maCaNhanDanhGia),
        maCaNhanDanhGia: selectedUsers,
        maDonViDanhGia: JSON.parse(danhMuc_PhieuDanhGia.maDonViDanhGia || '{}'),
        maCapDanhGia: JSON.parse(danhMuc_PhieuDanhGia.maCapDanhGia || '{}'),
      };
      form.setFieldsValue(dataFields);
    }
  }, [danhMuc_PhieuDanhGia]);
  const handleAddCaNhan = () => {
    danhMuc_PhieuDanhGiaContext.setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible(true);
  };
  const closeAddModal = () => {
    danhMuc_PhieuDanhGiaContext.setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible(false);
  };
  const handleSelectChange = (value : string[]) => {
    setSelectedUsers(value); // Cập nhật state
    form.setFieldValue("maCaNhanDanhGia", value); // Cập nhật giá trị trong form
  };
  return (
    <AntdModal
      title={
        danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaId
          ? "Sửa thông tin phiếu đánh giá"
          : "Thêm mới phiếu đánh giá"
      }
      visible={danhMuc_PhieuDanhGiaContext.danhMuc_PhieuDanhGiaModalVisible}
      onCancel={handleCancel}
      footer={null}
      width="60%"
      
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Thứ tự" name="thuTu">
              <InputNumber placeholder="0" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Phiên bản" name="levelBoTieuChi">
              <Input
                placeholder="1/2/....Mặc định để trống"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} >
            <Form.Item
              label="Mẫu phiếu"
              name="ten"
              rules={[{ required: true, message: "Mẫu phiếu!" }]}
            >
              <Input placeholder="Tên" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Thuộc bộ tiêu chuẩn" name="maBoTieuChi"  rules={[{ required: true, message: "Yêu cầu chọn mẫu phiếu" }]}>
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
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
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
        </Row>
        <Row gutter={16}>
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
          </Col>

          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Chức vụ" name="maChucVuDanhGia">
              {/* <Select
                mode="multiple"
                placeholder="Gõ để tìm kiếm chức vụ"
                allowClear
                showSearch
                style={{ width: "100%" }}
              >
                {danhMuc_ChucVus?.map((chucVu) => (
                  <Select.Option key={chucVu.ma} value={chucVu.ma}>
                    {chucVu.ten}
                  </Select.Option>
                ))}
              </Select> */}
              <AntdSelect
              mode="multiple"
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: danhMuc_ChucVus,
                  label: "ten",
                  value: "ma",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Chức danh" name="maChucDanhDanhGia">
              {/* <Select
                mode="multiple"
                placeholder="Chọn chức danh"
                style={{ width: "100%" }}
                allowClear
                showSearch
              >
                {danhMuc_ChucDanhs?.map((chucDanh) => (
                  <Select.Option key={chucDanh.ma} value={chucDanh.ma}>
                    {chucDanh.ten}
                  </Select.Option>
                ))}
              </Select> */}
              <AntdSelect
              mode="multiple"
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: danhMuc_ChucDanhs,
                  label: "ten",
                  value: "ma",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Cá nhân đánh giá"
              name="maCaNhanDanhGia"
            >
             <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                mode="multiple"
                placeholder="Chọn người đánh giá"
                style={{ width: "100%" }}
                value={selectedUsers} // Sử dụng state để theo dõi
                allowClear
                showSearch
                onChange={handleSelectChange} // Gọi hàm xử lý khi có sự thay đổi
                // dropdownRender={() => <></>} // Ẩn dropdown bằng cách trả về một thành phần trống
              >
                {lstuserss?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.fullNameWithGroup}
                  </Select.Option>
                ))}
              </Select>
              <AntdButton
              type="primary"
              style={{ marginLeft: "8px" }}
              icon={<PlusOutlined />} 
              onClick={handleAddCaNhan} 
            ></AntdButton>
            </div>
            </Form.Item>
          </Col>
        </Row>
        <AddCaNhanOfDanhMucPhieuDanhGia
        visible={danhMuc_PhieuDanhGiaContext.addCaNhanOfDanhMucPhieuDanhGiaModalVisible}
        onClose={closeAddModal}
      />
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Đính kèm" name="dinhKem">
              {/* <Upload name="file" action="/upload.do" listType="picture">
                                <Button>Chọn tệp</Button>
                            </Upload> */}
               <RegularUpload
                                        // kySo={KY_SO}
                                       // hideUpload={true}
                                        dinhKem={dinhKem}
                                        fieldName={'dinhKem'}
                                        folderName={'MauPhieuDanhGia'}
                                        form={form}
                                    /> 
              {/* <AntdUploadPublicFile
                form={form}
                fieldName="dinhKem"
                folderName="MauPhieuDanhGia"
                dinhKem={dinhKem}
              /> */}
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="suDung" valuePropName="checked" label="Sử dụng">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
         
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Điểm đạt yêu cầu"
              name="diemDatYeuCau"
              rules={[
              ]}
            >
              <InputNumber placeholder="0" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Điểm thưởng"
              name="diemThuong"
            >
              <InputNumber placeholder="0" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Điểm trừ"
              name="diemTru"
            >
              <InputNumber placeholder="0" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
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
