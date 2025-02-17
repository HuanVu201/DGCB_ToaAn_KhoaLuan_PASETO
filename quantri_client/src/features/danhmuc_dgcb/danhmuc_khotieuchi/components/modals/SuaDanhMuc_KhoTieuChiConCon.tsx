import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  SelectProps,
  Space,
  Table,
} from "antd";
import { Rule } from "antd/es/form";
import { useDanhMuc_KhoTieuChiContext } from "../../contexts/DanhMuc_KhoTieuChiContext";
import {
  AddDanhMuc_KhoTieuChi,
  GetDanhMuc_KhoTieuChi,
  UpdateDanhMuc_KhoTieuChi,
} from "../../redux/action";
import { IDiemLiet } from "@/features/danhmuc_dgcb/tieuchidanhgia/models";
import { ITieuChiDoiLap } from "@/features/danhmuc_dgcb/tieuchidanhgia/models";
import { DefaultOptionType } from "antd/es/select";
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action";
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { json } from "stream/consumers";
import { TieuChiDoiLap } from "@/features/danhmuc_dgcb/tieuchidanhgia/tieuchidoilap/TieuChiDoiLap";
import { DiemLiet } from "@/features/danhmuc_dgcb/tieuchidanhgia/diemliet/DiemLiet";
import { useDiemLietContext } from "@/features/danhmuc_dgcb/tieuchidanhgia/contexts/DiemLietContext";
import { DiemLietDetail } from "@/features/danhmuc_dgcb/tieuchidanhgia/diemliet/DiemLietDetail";
import { TieuChiDoiLapOfKho } from "../../tieuChiDoiLapOfKho/TieuChiDoiLapOfKho";
import { DiemLietOfKho } from "../../diemLietOfKho/DiemLietOfKho";
import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect";
const { Option } = Select;

export const SuaDanhMuc_KhoTieuChiCon = ({
  handlerClose,
  visible,
  folderId,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
}) => {
  const [form] = Form.useForm();
  const { datas: danhmuc_khotieuchis, data: danhmuc_khotieuchi } =
    useAppSelector((state) => state.danhmuc_khotieuchi);
  const { datas: danhmuc_donvitinhs } = useAppSelector(
    (state) => state.danhmuc_donvitinh
  );
  const { datas: danhmuc_loaidiem } = useAppSelector(
    (state) => state.danhmuc_loaidiem
  );
  const [doiLapIds, setDoiLapIds] = useState<string[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [lstDoiLaps, setLstDoiLap] = useState<ITieuChiDoiLap[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [isDoiLap, setIsDoiLap] = useState(false);
  const [diemLietIds, setDiemLietIds] = useState<string[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [isdiemLiet,setIsDiemLiet]= useState(false);
  const [lstDiemLiet,setLstDiemLiet] = useState<IDiemLiet[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [addDiemLietModalVisible, setAddDiemLietModalVisible] = useState(false);
  const [addTieuChiDoiLapModalVisible, setAddTieuChiDoiLapModalVisible] = useState(false);
  const danhmuc_khotieuchiContext = useDanhMuc_KhoTieuChiContext();
  const diemLietContext = useDiemLietContext();
  const dispatch = useAppDispatch();
  const parentTieuChi = danhmuc_khotieuchis?.find((item) => item.id == folderId);
  // Đang để lộn gruop vs father
  let codeDayDu: string | null | undefined = null;
  let codeFather: string | null | undefined = null;
  let lstCode: string[] | null | undefined = null;
  let codeGruop: string | null | undefined = null; // Khai báo kiểu rõ ràng
  let idFather: string | null | undefined = null;
  if (parentTieuChi?.fullCode != null) {
    codeDayDu = parentTieuChi?.fullCode;
    lstCode = codeDayDu.split(".");
    codeFather = lstCode[0];
    codeGruop = lstCode[lstCode.length - 2];
    if (idFather == null) {
      idFather = "";
      idFather = danhmuc_khotieuchis?.find(
        (item) => item.maTieuChi == codeGruop
      )?.id;
    }
  } else {
    codeFather = parentTieuChi?.maTieuChi;
    codeDayDu = parentTieuChi?.maTieuChi;
    codeGruop = parentTieuChi?.maTieuChi;
  }
  useEffect(() => {
    dispatch(GetDanhMuc_KhoTieuChi(folderId));
  }, []);

  useEffect(() => {
    if (danhmuc_khotieuchi) {
      let loaiDiem;
      if (danhmuc_khotieuchi.diemLiet) {
        loaiDiem = "diemLiet";
      } else if (danhmuc_khotieuchi.diemThuong) {
        loaiDiem = "diemThuong";
      } else if (danhmuc_khotieuchi.diemTru) {
        loaiDiem = "diemTru";
      } else {
        loaiDiem = "diemDatYeuCau";
      }
      if (danhmuc_khotieuchi.jsonLienKet != null)
        setLstDoiLap(JSON.parse(danhmuc_khotieuchi.jsonLienKet));
      if (danhmuc_khotieuchi.jsonDiemLiet != null)
        setLstDiemLiet(JSON.parse(danhmuc_khotieuchi.jsonDiemLiet));
      form.setFieldsValue({ ...danhmuc_khotieuchi, loaiDiem});
    }
  }, [danhmuc_khotieuchi]);

  const onOk: FormProps["onFinish"] = async () => {
    const formData = form.getFieldsValue();
    let pointThuong = false;
    let pointLiet = false;
    let pointTru = false;
    if (formData.loaiDiem == "diemThuong") {
      pointThuong = true;
    }
    if (formData.loaiDiem == "diemTru") {
      pointTru = true;
    }
    if (formData.loaiDiem == "diemLiet") {
      pointLiet = true;
    }
    //  const res =  await DanhMuc_KhoTieuChiApi.Create({data : formData})

    const response = await dispatch(
      UpdateDanhMuc_KhoTieuChi({
        id: folderId,
        data: {
          ...formData,
          maDayDu: parentTieuChi?.fullCode,
          maTieuChi: parentTieuChi?.maTieuChi,
          diemLiet: pointLiet,
          diemTru: pointTru,
          diemThuong: pointThuong,
          JsonLienKet: JSON.stringify(lstDoiLaps), // Chuyển đổi mảng thành chuỗi JSON
          jsonDiemLiet:JSON.stringify(lstDiemLiet),
          thangDiem: formData.thangDiem.toString(),
        },
      })
    );
    if (response) {
      // Nếu cập nhật thành công
      toast.success("Cập nhật thành công!"); // Hiển thị thông báo
      handlerClose(); // Đóng modal
    }
  };
  const handleCancel = () => {
    form.resetFields();
    danhmuc_khotieuchiContext.setDanhMuc_KhoTieuChiId(undefined);
    handlerClose();
  };
  const handleDeleteTieuChiDoiLap = (id: string) => {
    setLstDoiLap((prev: ITieuChiDoiLap[]) =>
      prev.filter((item) => item.Ma !== id)
    ); // Xóa tiêu chí khỏi danh sách
  };
  const handleDeleteTieuChiDiemLiet = (id: string) => {
    setLstDiemLiet((prev: IDiemLiet[]) =>
      prev.filter((item) => item.Ma !== id)
    ); // Xóa tiêu chí khỏi danh sách
  };
  const handleDoiLapChange = (e: any) => {
    setIsDoiLap(e.target.checked);
  };

  const handleAddDoiLap = (id: string) => {
    setDoiLapIds((prev) => [...prev, id]); // Thêm ID vào danh sách
    const objectTieuChi = danhmuc_khotieuchis?.find((item) => item.maTieuChi === id);
    const maTieuChiCha =
    objectTieuChi?.fullCode?.split(".")[objectTieuChi.fullCode.split(".").length - 2];
      const tenTieuChiCha = danhmuc_khotieuchis?.find(
        (tieuchi) => tieuchi.maTieuChi === maTieuChiCha
      )?.tenTieuChi;
    if (objectTieuChi) {
      const objectDoiLap: ITieuChiDoiLap = {
        Ma: objectTieuChi.maTieuChi,
        Ten: objectTieuChi.tenTieuChi,
        TenCha: tenTieuChiCha|| "",
      }
      setLstDoiLap((items) => [...items, objectDoiLap]); // Thêm đối tượng vào danh sách
    } else {
      console.warn(`Không tìm thấy tiêu chí đối lập với ID: ${id}`);
    }
  };

  const handleAddDiemLiet = (id: string) => {
    setDiemLietIds((prev) => [...prev, id]); // Thêm ID vào danh sách
    const objectDiemLietOfTieuChi = danhmuc_khotieuchis?.find((item) => item.maTieuChi === id);
    const maTieuChiCha =
    objectDiemLietOfTieuChi?.fullCode?.split(".")[objectDiemLietOfTieuChi.fullCode.split(".").length - 2];
      const tenTieuChiCha = danhmuc_khotieuchis?.find(
        (tieuchi) => tieuchi.maTieuChi === maTieuChiCha
      )?.tenTieuChi;
    if (objectDiemLietOfTieuChi) {
      const objectDiemLiet: IDiemLiet = {
        Ma: objectDiemLietOfTieuChi.maTieuChi,
        Ten: objectDiemLietOfTieuChi.tenTieuChi,
        TenCha: tenTieuChiCha || "",
        SoLan: "1",
      }
      setLstDiemLiet((items) => [...items, objectDiemLiet]); // Thêm đối tượng vào danh sách
    } else {
      console.warn(`Không tìm thấy điểm liệt với ID: ${id}`);
    }
  };
  
  const handleLoaiDiemChange = (value : string) => {
    if (value === "diemLiet") {
     setIsDiemLiet(true);
     form.setFieldsValue({ thangDiem: 0 });
      console.log("Đã chọn điểm liệt");
    }
    else
    {
      setIsDiemLiet(false);
    }
  };

  useEffect(() => {
    console.log("parentTieuChi:", parentTieuChi);
    if (parentTieuChi) {
      if (parentTieuChi.tieuChiLienKet != null) {
        setIsDoiLap(parentTieuChi.tieuChiLienKet);
      }
      if (parentTieuChi.diemLiet == true) {
        setIsDiemLiet(true);
      }
    }
  }, [parentTieuChi]);

  useEffect(() => {
    if (lstDiemLiet) {
     diemLietContext.setListDiemLiet([...lstDiemLiet]);
    }
  }, [lstDiemLiet]);
  useEffect(() => {
    if (diemLietContext.listDiemLiet) {
      if(Array.isArray(diemLietContext.listDiemLiet))
      {
        setLstDiemLiet([...diemLietContext.listDiemLiet])
      }
      else
      {
        const arry : IDiemLiet[] = Object.values(diemLietContext.listDiemLiet)
        setLstDiemLiet(arry)
      }
      
    }
  }, [diemLietContext.diemLietId]);
  
  return (
    <>
      <AntdModal
        title="Sửa tiêu chí đánh giá con"
        handlerCancel={handleCancel}
        visible={visible}
        onOk={onOk}
        okText="Xác nhận"
        cancelText="Đóng"
        width="100%"
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose
      >
        <Form
          name="AddSubDanhMuc_KhoTieuChi"
          layout="vertical"
          form={form}
          requiredMark={true}
          initialValues={{
            parentId: folderId,
            parrentCode: parentTieuChi?.parrentCode,
            parrentName: parentTieuChi?.parrentName,
          }}
        >
          <Row
            gutter={[8, 8]}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            {/* <Col span={24}>
              <Form.Item
                label="Nhóm tiêu chí"
                name="nhomDanhMuc_KhoTieuChi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên danhmuc_khotieuchi",
                  },
                ]}
                style={{ textAlign: "left" }}
              >
                <Select >
                  {danhmuc_khotieuchis?.map((item) => (
                    <Option key={item.maTieuChi} value={item.maTieuChi}>
                      {item.tenTieuChi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
{/* 
            <Col span={24}>
              <Form.Item
                label="Tiêu chí cha"
                name="parrentCode"
                //rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
                style={{ textAlign: "left" }}
              >
                <Select >
                  {danhmuc_khotieuchis?.map((item) => (
                    <Option key={item.id} value={item.maTieuChi}>
                      {item.tenTieuChi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
            <Col span={24} md={24}>
                            <Form.Item name="parrentCode" label="Tiêu chí cha " rules={[{ required: true, message: 'Vui lòng chọn tiêu chí cha' }]}>
                                <AntdTreeSelect 
                                listHeight={380}
                                autoClearSearchValue={false}
                                // dropdownRender={(menu) => {
                                //     return <>
                                //     {danhMucCacCapDropDown}
                                //     <>{menu}</>
                                //     </>
                                // }}
                                generateOptions={{model: danhmuc_khotieuchis, key:"maTieuChi", parentKey: "parrentCode", title: "tenTieuChi", value: "maTieuChi"}} 
                                allowClear 
                                showSearch treeLine  treeDefaultExpandAll treeNodeFilterProp={"title"}
                                maxTagCount={20}/>
                            </Form.Item>
                        </Col>

            <Col span={24}>
              <Form.Item
                label="Tên tiêu chí"
                name="tenTieuChi"
                style={{ textAlign: "left" }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thứ tự sắp xếp"
                name="thuTu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số thứ tự sắp xếp",
                  },
                ]}
                style={{ textAlign: "left" }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sử dụng"
                name="suDung"
                valuePropName="checked"
                style={{ textAlign: "left" }}
              >
                <Checkbox />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="STT"
                name="stt"
                // rules={[
                //   { required: true, message: "Vui lòng nhập tên đường dẫn" },
                // ]}
                style={{ textAlign: "left" }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Đơn vị tính"
                name="donViTinh"
                style={{ textAlign: "left" }}
              >
                <Select placeholder="Chọn đơn vị tính">
                  {danhmuc_donvitinhs?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.tenDanhMuc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Loại điểm"
                name="loaiDiem"
                rules={[{ required: true, message: "Vui lòng nhập loại điểm" }]}
                style={{ textAlign: "left" }}
              >
                <Select placeholder="Chọn đơn vị tính"  onChange={handleLoaiDiemChange}>
                  {danhmuc_loaidiem?.map((item) => (
                    <Option key={item.id} value={item.code}>
                      {item.tenDanhMuc}
                    </Option>
                  ))}
                </Select>
                {/* <Select
                  options={[
                    { value: "diemDatYeuCau", label: "Điểm đạt yêu cầu" },
                    { value: "diemThuong", label: "Điểm thưởng" },
                    { value: "diemTru", label: "Điểm trừ" },
                    { value: "diemLiet", label: "Điểm liệt" },
                  ]}
                  
                /> */}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Thang điểm"
                name="thangDiem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhóm chức năng",
                  },
                ]}
                style={{ textAlign: "left" }}
              >
                <InputNumber disabled={isdiemLiet} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Ghi chú"
                name="ghiChu"
                style={{ textAlign: "left" }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Kiêm nhiệm"
                name="kiemNhiem"
                valuePropName="checked"
                style={{ textAlign: "left" }}
              >
                <Checkbox />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Tiêu chí đối lập"
                name="tieuChiLienKet"
                valuePropName="checked"
              >
                <Checkbox onChange={handleDoiLapChange} checked={isDoiLap} />
              </Form.Item>
            </Col>
          </Row>
          {isDoiLap && (
            <>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "flex-end" }} // Đổi từ "flex-start" thành "flex-end"
              >
                <Button
                  type="primary"
                  onClick={() => setAddTieuChiDoiLapModalVisible(true)}
                >
                  Thêm tiêu chí đối lập
                </Button>
              </Col>
              {/* Hiển thị danh sách tiêu chí đối lập */}
              <Table
                dataSource={lstDoiLaps}
                columns={[
                  {
                    title: "Tên tiêu chí cha",
                    dataIndex: "TenCha",
                    key: "TenCha",
                    render: (text, record, index) => {
                      // Xác định rowSpan
                      const current = lstDoiLaps[index];
                      const previous = index > 0 ? lstDoiLaps[index - 1] : null;
          
                      // Nếu tên giống nhau, gộp hàng
                      if (previous && previous.TenCha === current.TenCha) {
                        return {
                          children: null, // không hiển thị
                          props: {
                            rowSpan: 0, // gộp với hàng trước
                          },
                        };
                      }
          
                      // Tính số lượng hàng để gộp
                      let rowSpan = 1;
                      for (let i = index + 1; i < lstDoiLaps.length; i++) {
                        if (lstDoiLaps[i].TenCha === current.TenCha) {
                          rowSpan++;
                        } else {
                          break;
                        }
                      }
          
                      return {
                        children: text,
                        props: {
                          rowSpan: rowSpan, // số hàng để gộp
                        },
                      };
                    },
                  },
                  {
                    title: "Tên tiêu chí",
                    dataIndex: "Ten",
                    key: "Ten",
                  },
                  {
                    title: "Thao tác",
                    key: "action",
                    render: (_, record) => (
                      <Space direction="horizontal">
                        {/* <Button onClick={() => handleEditTieuChiDoiLap(record)}>Sửa</Button> */}
                        <Popconfirm
                          title="Xoá?"
                          onConfirm={() => {
                            handleDeleteTieuChiDoiLap(record.Ma);
                          }}
                          okText="Xoá"
                          cancelText="Huỷ"
                        >
                          <DeleteOutlined
                            size={30}
                            style={{ color: "tomato" }}
                          />
                        </Popconfirm>
                      </Space>
                    ),
                  },
                  // Có thể thêm các cột khác nếu cần
                ]}
                rowKey="maTieuChi" // Hoặc sử dụng thuộc tính duy nhất khác
                pagination={false} // Nếu không muốn phân trang
                bordered
                style={{ marginTop: 16 }} // Thêm khoảng cách phía trên bảng
              />
            </>
          )}
            {isdiemLiet && (
            <>
             <h5  style={{ marginTop: '10pt', color: '#1890ff' }} >Danh sách tiêu chí phụ thuộc điểm liệt</h5>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "flex-end" }} // Đổi từ "flex-start" thành "flex-end"
              >
                <Button
                  type="primary"
                  onClick={() => setAddDiemLietModalVisible(true)}
                >
                  Thêm tiêu chí phụ thuộc điểm liệt
                </Button>
              </Col>
              <Table
                dataSource={lstDiemLiet}
                columns={[
                  {
                    title: "Tên tiêu chí cha",
                    dataIndex: "TenCha",
                    key: "TenCha",
                    render: (text, record, index) => {
                      // Xác định rowSpan
                      const current = lstDiemLiet[index];
                      const previous = index > 0 ? lstDiemLiet[index - 1] : null;
          
                      // Nếu tên giống nhau, gộp hàng
                      if (previous && previous.TenCha === current.TenCha) {
                        return {
                          children: null, // không hiển thị
                          props: {
                            rowSpan: 0, // gộp với hàng trước
                          },
                        };
                      }
          
                      // Tính số lượng hàng để gộp
                      let rowSpan = 1;
                      for (let i = index + 1; i < lstDiemLiet.length; i++) {
                        if (lstDiemLiet[i].TenCha === current.TenCha) {
                          rowSpan++;
                        } else {
                          break;
                        }
                      }
          
                      return {
                        children: text,
                        props: {
                          rowSpan: rowSpan, // số hàng để gộp
                        },
                      };
                    },
                  },
                  {
                    title: "Tên tiêu chí",
                    dataIndex: "Ten",
                    key: "Ten",
                  },
                  {
                    title: "Số lần",
                    dataIndex: "SoLan",
                    key: "SoLan",
                  },
                  {
                    title: "Thao tác",
                    key: "action",
                    render: (_, record) => (
                      <Space direction="horizontal">
                         <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            diemLietContext.setListDiemLiet({...lstDiemLiet})
                            diemLietContext.setDiemLietId(record.Ma)
                            diemLietContext.setDiemLietModalVisible(true)
                        }} />
                        <Popconfirm
                          title="Xoá?"
                          onConfirm={() => {
                            handleDeleteTieuChiDiemLiet(record.Ma);
                          }}
                          okText="Xoá"
                          cancelText="Huỷ"
                        >
                          <DeleteOutlined
                            size={30}
                            style={{ color: "tomato" }}
                          />
                        </Popconfirm>
                      </Space>
                    ),
                  },
                  // Có thể thêm các cột khác nếu cần
                ]}
                rowKey="ma" // Hoặc sử dụng thuộc tính duy nhất khác
                pagination={false} // Nếu không muốn phân trang
                bordered
                style={{ marginTop: 16 }} // Thêm khoảng cách phía trên bảng
              />
              <DiemLietDetail/>
            </>
          )}
        </Form>
      </AntdModal>
      {addTieuChiDoiLapModalVisible && (
        <TieuChiDoiLapOfKho
          handlerClose={() => setAddTieuChiDoiLapModalVisible(false)}
          visible={addTieuChiDoiLapModalVisible}
          folderId={parentTieuChi?.parrentCode}
          onAddDoiLap={handleAddDoiLap} // Gửi hàm vào đây
        />
      )}
       {addDiemLietModalVisible && (
        <DiemLietOfKho
          handlerClose={() => setAddDiemLietModalVisible(false)}
          visible={addDiemLietModalVisible}
          folderId={parentTieuChi?.parrentCode}
          onAddTieuChiDiemLiet={handleAddDiemLiet} // Gửi hàm vào đây
        />
      )}
    </>
  );
};
