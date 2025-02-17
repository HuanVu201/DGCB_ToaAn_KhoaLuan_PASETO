import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Popconfirm,
  Space,
} from "antd";
import { useTieuChiDanhGiaContext } from "../../contexts/TieuChiDanhGiaContext";
import { TieuChiDanhGiaApi } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { TieuChiDoiLap } from "../../tieuchidoilap/TieuChiDoiLap";
import { IDiemLiet, ISearchTieuChiDanhGia, ITieuChiDanhGia, ITieuChiDoiLap } from "../../models";
import { useColumnTieuChiDoiLap } from "../../hooks/useColumnTieuChiDoiLap";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SearchTieuChiDanhGia } from "../../redux/action";
import { DiemLiet } from "../../diemliet/DiemLiet";
import { DiemLietProvider, useDiemLietContext } from "../../contexts/DiemLietContext";
import { DiemLietDetail } from "../../diemliet/DiemLietDetail";
import { danhMuc_KhoTieuChiApi } from "@/features/danhmuc_dgcb/danhmuc_khotieuchi/services";
const { Option } = Select;

export const ThemTieuChiDanhGiaCon= ({
  handlerClose,
  visible,
  folderId,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
}) => {
  const [form] = Form.useForm();
  const [doiLapIds, setDoiLapIds] = useState<string[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [diemLietIds, setDiemLietIds] = useState<string[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [isdiemLiet,setIsDiemLiet]= useState(false);
  const [lstDoiLaps, setLstDoiLap] = useState<ITieuChiDoiLap[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [lstDiemLiet,setLstDiemLiet] = useState<IDiemLiet[]>([]); // State lưu trữ ID tiêu chí đối lập
  const diemLietContext = useDiemLietContext();
  const { danhSachTieuChiDanhGia: tieuchidanhgias } = useAppSelector(
    (state) => state.tieuchidanhgia
  );
  const { datas: danhmuc_donvitinhs } = useAppSelector(
    (state) => state.danhmuc_donvitinh
  );
  const { data: user } = useAppSelector(
    (state) => state.user
  );
  const { datas: danhmuc_loaidiem } = useAppSelector(
    (state) => state.danhmuc_loaidiem
  );
  const dispatch = useAppDispatch();
  const tieuchidanhgiaContext = useTieuChiDanhGiaContext();

  const [addTieuChiDoiLapModalVisible, setAddTieuChiDoiLapModalVisible] =
    useState(false);
    const [addDiemLietModalVisible, setAddDiemLietModalVisible] =
    useState(false);
  const parentTieuChi = tieuchidanhgias?.find((item) => item.id == folderId);
  const [isDoiLap, setIsDoiLap] = useState(parentTieuChi?.tieuChiLienKet);

  let codeDayDu = null;
  let codeFather = null;
  let codeGruop = null;
  if (parentTieuChi?.maDayDu != null) {
    codeDayDu = parentTieuChi?.maDayDu;
    codeFather =
      parentTieuChi.maDayDu.split(".")[
        parentTieuChi.maDayDu.split(".").length - 1
      ];
    codeGruop = parentTieuChi.maDayDu.split(".")[0];
  } else {
    codeFather = null;
    codeGruop = parentTieuChi?.maTieuChi;
  }

  const onOk = async () => {
    const gruopCode = user?.officeCode;
    const formData = form.getFieldsValue();
    const newGuid = uuidv4();
    const maDayDus = codeDayDu + "." + newGuid;
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
    const res = await TieuChiDanhGiaApi.Create({
      ...formData,
      maDayDu: maDayDus,
      maTieuChi: newGuid,
      //maMauPhieuDanhGia: codeFather,
      JsonLienKet: JSON.stringify(lstDoiLaps), // Chuyển đổi mảng thành chuỗi JSON
      JsonDiemLiet: JSON.stringify(lstDiemLiet),
      thangDiem: formData.thangDiem.toString(),
      diemLiet: pointLiet,
      diemTru: pointTru,
      diemThuong: pointThuong,
      maDonVi: gruopCode,
    });
    const reskho = await danhMuc_KhoTieuChiApi.Create({
      ...formData,
      fullCode: newGuid,
      maTieuChi: newGuid,
      //maMauPhieuDanhGia: codeFather,
      JsonLienKet: JSON.stringify(lstDoiLaps), // Chuyển đổi mảng thành chuỗi JSON
      JsonDiemLiet: JSON.stringify(lstDiemLiet),
      thangDiem: formData.thangDiem.toString(),
      diemLiet: pointLiet,
      diemTru: pointTru,
      diemThuong: pointThuong,
      maDonVi: gruopCode,
    })
    if (res.status === 201) {
      dispatch(SearchTieuChiDanhGia({ reFetch: true }));
    }
    if (res.data.succeeded) {
      toast.success("Thêm thành công");
      handleCancel();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    tieuchidanhgiaContext.setTieuChiDanhGiaId(undefined);
    handlerClose();
  };

  const handleDoiLapChange = (e: any) => {
    setIsDoiLap(e.target.checked);
  };

  const handleAddDoiLap = (id: string) => {
    setDoiLapIds((prev) => [...prev, id]); // Thêm ID vào danh sách
    const objectTieuChi = tieuchidanhgias?.find((item) => item.maTieuChi === id);
    const maTieuChiCha =
    objectTieuChi?.maDayDu.split(".")[objectTieuChi.maDayDu.split(".").length - 2];
      const tenTieuChiCha = tieuchidanhgias?.find(
        (tieuchi) => tieuchi.maTieuChi === maTieuChiCha
      )?.tenTieuChi;
    if (objectTieuChi) {
      const objectDoiLap: ITieuChiDoiLap = {
        Ma: objectTieuChi.maTieuChi,
        Ten: objectTieuChi.tenTieuChi,
        TenCha: tenTieuChiCha|| "",
      }
      setLstDoiLap((items) => [...items, objectDoiLap]);
    } else {
      console.warn(`Không tìm thấy tiêu chí đối lập với ID: ${id}`);
    }
  };

  const handleAddDiemLiet = (id: string) => {
    setDiemLietIds((prev) => [...prev, id]); // Thêm ID vào danh sách
    const objectDiemLietOfTieuChi = tieuchidanhgias?.find((item) => item.maTieuChi === id);
    const maTieuChiCha =
    objectDiemLietOfTieuChi?.maDayDu.split(".")[objectDiemLietOfTieuChi.maDayDu.split(".").length - 2];
      const tenTieuChiCha = tieuchidanhgias?.find(
        (tieuchi) => tieuchi.maTieuChi === maTieuChiCha
      )?.tenTieuChi;
    if (objectDiemLietOfTieuChi) {
      const objectDiemLiet: IDiemLiet = {
        Ma: objectDiemLietOfTieuChi.maTieuChi,
        Ten: objectDiemLietOfTieuChi.tenTieuChi,
        TenCha: tenTieuChiCha || "",
        SoLan:"1",
      }
      setLstDiemLiet((items) => [...items, objectDiemLiet]);
    } else {
      console.warn(`Không tìm thấy điểm liệt với ID: ${id}`);
    }
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

  useEffect(() => {
    if (parentTieuChi) {
      setIsDoiLap(parentTieuChi.tieuChiLienKet);
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

  const handleLoaiDiemChange = (value : string) => {
    if (value === "diemLiet") {
     setIsDiemLiet(true);
     form.setFieldsValue({ thangDiem: 0 });
      console.log("Đã chọn điểm liệt");
      // Có thể thêm hành động khác ở đây
    }
    else
    {
      setIsDiemLiet(false);
    }
  };
  return (
    <>
      <AntdModal
        title="Thêm mới Tiêu chí đánh giá"
        handlerCancel={handleCancel}
        visible={visible}
        onOk={onOk}
        okText="Xác nhận"
        cancelText="Đóng"
        width="100%"
        destroyOnClose
      >
        <Form
          name="AddSubTieuChiDanhGia"
          layout="vertical"
          form={form}
          requiredMark={true}
          initialValues={{
            parentId: folderId,
            active: true,
            maMauPhieuDanhGia: codeGruop,
            tieuchicha: folderId,
          }}
        >
          <Row gutter={[8, 8]} style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label="Nhóm tiêu chí"
                name="maMauPhieuDanhGia"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tiêu chí" },
                ]}
              >
                <Select disabled>
                  {tieuchidanhgias?.map((item) => (
                    <Option key={item.maTieuChi} value={item.maTieuChi}>
                      {item.tenTieuChi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tiêu chí cha"
                name="tieuchicha"
                rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
              >
                <Select disabled>
                  {tieuchidanhgias?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.tenTieuChi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Thứ tự sắp xếp"
                name="thuTu"
                rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tên tiêu chí" name="tenTieuChi">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Sử dụng" name="suDung" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="STT"
                name="stt"
                rules={[{ required: true, message: "Vui lòng nhập STT" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Đơn vị tính" name="donViTinh">
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
              >  <Select placeholder="Chọn đơn vị tính"  onChange={handleLoaiDiemChange}>
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
                  onChange={handleLoaiDiemChange} // Thêm hàm xử lý ở đây
                /> */}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Thang điểm"
                name="thangDiem"
                rules={[
                  { required: true, message: "Vui lòng nhập thang điểm" },
                ]}
              >
                <InputNumber disabled={isdiemLiet} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Ghi chú" name="ghiChu">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Kiêm nhiệm"
                name="kiemNhiem"
                valuePropName="checked"
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
                <Checkbox onChange={handleDoiLapChange}  checked={isDoiLap} />
              </Form.Item>
            </Col>
          </Row>
          {isDoiLap  && (
            <>
            <h5 style={{ marginTop: '10pt', color: '#1890ff' }} >Danh sách tiêu chí phụ thuộc đối lập</h5>
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
                rowKey="Ma" // Hoặc sử dụng thuộc tính duy nhất khác
                pagination={false} // Nếu không muốn phân trang
                bordered
                style={{ marginTop: 16 }} // Thêm khoảng cách phía trên bảng
              />
            </>
          )}
           {isdiemLiet  && (
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
              {lstDiemLiet && (<Table
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
                rowKey="Ma" // Hoặc sử dụng thuộc tính duy nhất khác
                pagination={false} // Nếu không muốn phân trang
                bordered
                style={{ marginTop: 16 }} // Thêm khoảng cách phía trên bảng
              />)}
              <DiemLietDetail/>
            </>
          )}
        </Form>
      </AntdModal>
          <Space>
          {addTieuChiDoiLapModalVisible && (
        <TieuChiDoiLap
          handlerClose={() => setAddTieuChiDoiLapModalVisible(false)}
          visible={addTieuChiDoiLapModalVisible}
          folderId={parentTieuChi?.parentId}
          onAddDoiLap={handleAddDoiLap} // Gửi hàm vào đây
        />
      )}

        {addDiemLietModalVisible && (
        <DiemLiet
          handlerClose={() => setAddDiemLietModalVisible(false)}
          visible={addDiemLietModalVisible}
          folderId={parentTieuChi?.parentId ?? parentTieuChi?.id}
          onAddTieuChiDiemLiet={handleAddDiemLiet} // Gửi hàm vào đây
        />
      )}
          </Space>
   

      
    </>
  );
};
