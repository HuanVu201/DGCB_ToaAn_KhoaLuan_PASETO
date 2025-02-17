import { AntdSelect, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useCoCauUser } from "../../hooks/useNguoiDungCoCauColumn";
import { useEffect, useMemo, useState } from "react";
import { coCauToChucService } from "../../services/index";
import { useFolderContext } from "@/contexts/FolderContext";
import {
  Form,
  Row,
  Col,
  Input,
  SelectProps,
  Divider,
  Button,
  Checkbox,
  InputNumber,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICoCauToChuc } from "../../models";
import { ID_SEPARATE_ONE_THUNK } from "@/data";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UpdateCoCauToChuc } from "../../redux/crud";
import { IOmitUpdate } from "@/models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { from } from "form-data";
import { EditOutlined } from "@ant-design/icons";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
import { SearchListAUGOfGroupQuery } from "@/features/lstusers/redux/action";
// import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action";

const TYPE_OPTIONS: SelectProps["options"] = [
  { label: "Đơn vị", value: "don-vi" },
  { label: "Nhóm", value: "nhom" },
];

const ThongTin = () => {
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  // const {
  //   datas: users,
  //   count,
  //   loading,
  // } = useAppSelector((state) => state.user);
  const coCauToChucContext = useCoCauModalContext()
  const dispatch = useAppDispatch();
  const [loaiBienLaiThanhToan, setLoaiBienLaiThanhToan] = useState<string>()
  const { datas: danhMucChungs, data: danhMucChung } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const { datas: users, data: user } = useAppSelector(
    (state) => state.lstusers
  );
  const [searchDanhMucParams, setSearchDanhMucParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 1000,
    });
  const [searchDanhMucDiaBanParams, setSearchDanhMucDiaBanParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 200000,
    });
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucChung(searchDanhMucParams));
    })();
  }, [searchDanhMucParams]);

  // const [tinhs, setTinhs] = useState<IDanhMucDiaBan[]>([]);
  // const [huyens, setHuyens] = useState<IDanhMucDiaBan[]>([]);
  // const [xas, setXas] = useState<IDanhMucDiaBan[]>([]);

  const [isDisabled, setIsDisabled] = useState(true);
  const folderContext = useFolderContext();
  const [form] = Form.useForm<
    Omit<ICoCauToChuc, "maNhomLienThong" | "otherCatalog"> & {
      maNhomLienThong?: string[];
      otherCatalog?: string[];
    }
  >();
  const selectedTinh = Form.useWatch("MaTinh", form);
  const selectedHuyen = Form.useWatch("MaHuyen", form);
  useEffect(() => {
    (async () => {
      if (folderContext?.selectedGroup) {
        var coCauToChuc = await coCauToChucService.Get(
          folderContext?.selectedGroup.id
        );
      const GroupCodeselect = folderContext.selectedGroup.id;
      await dispatch(SearchListAUGOfGroupQuery({GroupId:GroupCodeselect}))
        //   setCauHinhHeThong(coCauToChuc);
        const respData = coCauToChuc.data?.data;
        if (respData) {
          setLoaiBienLaiThanhToan(respData.loaiBienLaiThanhToan)
          form.setFieldsValue({
            ...coCauToChuc.data.data,
            maNhomLienThong: respData.maNhomLienThong
              ? respData.maNhomLienThong
                .split(ID_SEPARATE_ONE_THUNK)
                .filter((x) => x != "")
              : undefined,
            otherCatalog: respData.otherCatalog
              ? respData.otherCatalog
                .split(ID_SEPARATE_ONE_THUNK)
                .filter((x) => x != "")
              : undefined,
          });
        }
      }
    })();
  }, [folderContext?.folderId]);
  // const nhomLienThongs = useMemo(() => {
  //   return coCauToChucs?.filter((coCau) => coCau.maDinhDanh !== null);
  // }, [coCauToChucs]);
  const [groupOthersOptions, groupOptions] = useMemo(() => {
    return [
      // danhMucChungs?.filter((e) => e.type === "nhom-co-cau-khac"),
      danhMucChungs?.filter((e) => e.type === "nhom-co-cau"),
      danhMucChungs?.filter((e) => e.type === "CapDanhGia"),
    ];
  }, [danhMucChungs]);

  const filterDonViQuanLy = useMemo(() => {
    return coCauToChucs?.filter((e) => e.type == "don-vi");
  }, [coCauToChucs]);

  const updateThongTinnDonVi = async () => {
    var updateData = {
      id: folderContext?.selectedGroup?.id,
      data: {
        ...form.getFieldsValue(),
        otherCatalog: form.getFieldValue("otherCatalog")
          ? form.getFieldValue("otherCatalog").join(ID_SEPARATE_ONE_THUNK)
          : undefined,
      },
    } as IOmitUpdate<ICoCauToChuc>;
    const res = await coCauToChucService.Update(updateData);
    if (res.status == 200) {
      toast.success("Đã lưu thông tin đơn vị");
      setIsDisabled(true);
    }
  };
  // const tinhs = useMemo(() => {
  //   return danhmucdiabans?.filter((x) => x.maTinh && !x.maHuyen && !x.maXa);
  // }, [danhmucdiabans]);
  // const huyens = useMemo(() => {
  //   if (selectedTinh)
  //     return (
  //       danhmucdiabans?.filter(
  //         (x) => x.maTinh == selectedTinh && x.maHuyen && !x.maXa
  //       ) ?? []
  //     );
  //   return [];
  // }, [selectedTinh]);
  // const xas = useMemo(() => {
  //   if (selectedTinh)
  //     return (
  //       danhmucdiabans?.filter((x) => x.maHuyen == selectedHuyen && x.maXa) ??
  //       []
  //     );
  //   return [];
  // }, [selectedHuyen]);

  // const suaCauHinhBienLaiThanhToan = () => {
  //   coCauToChucContext.setJsonBienLai(form.getFieldValue('cauHinhBienLaiThanhToan'))
  //   coCauToChucContext.setConfigBienLaiModalVisible(true)
  // }

  // useEffect(() => {
  //   if (coCauToChucContext.jsonBienLai && !coCauToChucContext.configBienLaiModalVisible) {
  //     form.setFieldValue('cauHinhBienLaiThanhToan', coCauToChucContext.jsonBienLai)
  //   }

  // }, [coCauToChucContext.jsonBienLai, coCauToChucContext.configBienLaiModalVisible])


  return folderContext?.folderId ? (
    <>
      <Form
        name="CoCauToChuc"
        layout="vertical"
        form={form}
        requiredMark={true}
        // onValuesChange={(changedvalues: any, values: any) => {
        //   var maDiaBan = "";
        //   if (changedvalues?.MaTinh) {
        //     form.setFieldValue("maHuyen", undefined);
        //     form.setFieldValue("maXa", undefined);
        //     maDiaBan = changedvalues?.MaTinh;
        //   }
        //   if (changedvalues?.MaHuyen) {
        //     form.setFieldValue("maXa", undefined);
        //     maDiaBan =
        //       form.getFieldValue("MaTinh") + "." + changedvalues.MaHuyen;
        //   }
        //   if (changedvalues?.MaXa) {
        //     maDiaBan =
        //       form.getFieldValue("MaTinh") +
        //       "." +
        //       form.getFieldValue("MaHuyen") +
        //       "." +
        //       changedvalues.MaXa;
        //   }
        //   form.setFieldValue("maDiaBan", maDiaBan);
        // }}
      >
        <Row gutter={[8, 8]}>
          <div
            style={{ display: "flex", justifyContent: "right", width: "99%" }}
          >
            {/* {
              coCauToChucContext.role == 'root.admin'
                ? */}
                <>
                  <Button
                    type="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => setIsDisabled(false)}
                  >
                    Sửa thông tin
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      if (!isDisabled) {
                        updateThongTinnDonVi();
                      }
                    }}
                  >
                    Lưu
                  </Button>
                </>
                :
                <></>
            {/* } */}
          </div>
          <Divider orientation="left">Thông tin đơn vị</Divider>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã đơn vị"
              name="groupCode"
              className="ant-col ant-form-item-label"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên đơn vị"
              name="groupName"
              className="ant-col ant-form-item-label"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Loại cơ cấu" name="type">
              <AntdSelect options={TYPE_OPTIONS} disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Cấp đánh giá" name="catalog">
              <AntdSelect
                generateOptions={{
                  model: groupOptions,
                  value: "code",
                  label: "tenDanhMuc",
                }}
                showSearch
                allowClear
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
           <Col md={12} span={24}>
           <Form.Item label="Lãnh đạo phụ trách" name="inChargeId">
              {/* <Input disabled={isDisabled} /> */}
              <AntdSelect
                generateOptions={{
                  model: users,
                  value: "id",
                  label: "fullNameWithGroup",
                }}
                showSearch
                allowClear
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mã định danh" name="maDinhDanh">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col style={{ flex: 1 }}>
              <Form.Item
                label="Không đánh giá"
                name="isKhongDanhGia"
                className="ant-col ant-form-item-label"
                valuePropName="checked"
                tooltip="Không đánh giá đơn vị"
              >
                <Checkbox disabled={isDisabled}></Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Không thống kê"
                name="isKhongThongKe"
                className="ant-col ant-form-item-label"
                valuePropName="checked"
                tooltip="Không thống kê đơn vị"
              >
                <Checkbox disabled={isDisabled}></Checkbox>
              </Form.Item>
            </Col>
         {/* <Col md={12} span={24}>
            <Form.Item
              label="Thứ tự"
              name="groupOrder"
            // className="ant-col ant-form-item-label"
            >
              <InputNumber style={{ width: "100%" }} disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Các nhóm khác"
              name="otherCatalog"
            // className="ant-col ant-form-item-label"
            >
              <AntdSelect
                mode="tags"
                generateOptions={{
                  model: groupOthersOptions,
                  value: "code",
                  label: "tenDanhMuc",
                }}
                showSearch
                allowClear
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Địa chỉ" name="diaChi">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Số điện thoại" name="soDienThoai">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label="Thời gian làm việc" name="thoiGianLamViec">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Email" name="email">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Website" name="website">
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col> */}
          {/* <Divider orientation="left">Thông tin thụ hưởng</Divider>

          <Col md={8} span={24}>
            <Form.Item
              label="Tên tài khoản thụ hưởng"
              name="tenTaiKhoanThuHuong"
              className="ant-col ant-form-item-label"
            >
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Mã ngân hàng"
              name="maNganHang"
              className="ant-col ant-form-item-label"
            >
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item
              label="Tài khoản thụ hưởng"
              name="taiKhoanThuHuong"
              className="ant-col ant-form-item-label"
            >
              <Input disabled={isDisabled} />
            </Form.Item>
          </Col>
          <Divider orientation="left">Cấu hình khác</Divider>
          <Col md={24} span={24}>
            <Form.Item label="Mã nhóm liên thông" name="maNhomLienThong">
              <AntdSelect
                mode="tags"
                generateOptions={{
                  model: nhomLienThongs,
                  value: "maDinhDanh",
                  label: "groupName",
                }}
                showSearch
                allowClear
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Row style={{ display: 'flex', width: '100%', gap: 10 }}>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Đơn vị quản lý"
                name="donViQuanLy"
                className="ant-col ant-form-item-label"
              >
                <AntdSelect
                  generateOptions={{
                    model: filterDonViQuanLy,
                    value: "groupCode",
                    label: "groupName",
                  }}
                  showSearch
                  allowClear
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            {loaiBienLaiThanhToan == 'local'
              ?
              <>
                <Col style={{ flex: 1 }}>
                  <Form.Item label="Mã số thuế đơn vị" name="maSoThue">
                    <Input disabled={isDisabled}></Input>
                  </Form.Item>
                </Col>
                <Col style={{ flex: 1 }}>
                  <Form.Item label="Mẫu số biên lai" name="mauSoBienLai">
                    <Input disabled={isDisabled}></Input>
                  </Form.Item>
                </Col>
                <Col style={{ flex: 1 }}>
                  <Form.Item label="Ký hiệu biên lai" name="kyHieuBienLai">
                    <Input disabled={isDisabled}></Input>
                  </Form.Item>
                </Col>
              </>
              :
              <Col style={{ flex: 1, display: 'flex' }}>
                <Form.Item label="Cấu hình biên lai thanh toán" name="cauHinhBienLaiThanhToan" style={{ flex: 1 }}>
                  <Input disabled={isDisabled} ></Input>
                </Form.Item>
              </Col>

            }


          </Row>

          <Row style={{ display: 'flex', width: '100%' }}>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Đơn vị quản lý trả hồ sơ:"
                name="donViQuanLyTraHoSo"
                className="ant-col ant-form-item-label"
                valuePropName="checked"
                tooltip="Cấu hình TTHCC trả hồ sơ hay đơn vị trả hồ sơ"
              >
                <Checkbox disabled={isDisabled}></Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Yêu cầu xác nhận có kết quả:"
                name="yeuCauXacNhanCoKetQua"
                className="ant-col ant-form-item-label"
                valuePropName="checked"
                tooltip="Cấu hình có cần xác nhận có kết quả hay không?"
              >
                <Checkbox disabled={isDisabled}></Checkbox>
              </Form.Item>
            </Col>

            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Đơn vị quản lý thu phí:"
                name="donViQuanLyThuPhi"
                className="ant-col ant-form-item-label"
                valuePropName="checked"
                tooltip=""
              >
                <Checkbox disabled={isDisabled}></Checkbox>
              </Form.Item>
            </Col>
          </Row> */}
        </Row>
      </Form>
    </>
  ) : (
    <></>
  );
};
export { ThongTin };
