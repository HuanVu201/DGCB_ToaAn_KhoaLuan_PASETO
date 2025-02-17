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
import { useDanhMuc_KhoTieuChiContext } from "../../contexts/DanhMuc_KhoTieuChiContext";
import { danhMuc_KhoTieuChiApi } from "../../services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { TieuChiDoiLap } from "@/features/danhmuc_dgcb/tieuchidanhgia/tieuchidoilap/TieuChiDoiLap";
import { IDiemLiet } from "@/features/danhmuc_dgcb/tieuchidanhgia/models";
import { ITieuChiDoiLap } from "@/features/danhmuc_dgcb/tieuchidanhgia/models";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SearchDanhMuc_KhoTieuChi } from "../../redux/action";
import { DiemLiet } from "@/features/danhmuc_dgcb/tieuchidanhgia/diemliet/DiemLiet";
import { useDiemLietContext } from "@/features/danhmuc_dgcb/tieuchidanhgia/contexts/DiemLietContext";
import { DiemLietDetail } from "@/features/danhmuc_dgcb/tieuchidanhgia/diemliet/DiemLietDetail";
import { DiemLietOfKho } from "../../diemLietOfKho/DiemLietOfKho";
import { TieuChiDoiLapOfKho } from "../../tieuChiDoiLapOfKho/TieuChiDoiLapOfKho";
import { AntdTreeSelect } from "@/lib/antd/components/select/TreeSelect";
const { Option } = Select;

export const ThemDanhMuc_KhoTieuChiCon = ({
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
  const [isdiemLiet, setIsDiemLiet] = useState(false);
  const [lstDoiLaps, setLstDoiLap] = useState<ITieuChiDoiLap[]>([]); // State lưu trữ ID tiêu chí đối lập
  const [lstDiemLiet, setLstDiemLiet] = useState<IDiemLiet[]>([]); // State lưu trữ ID tiêu chí đối lập
  const diemLietContext = useDiemLietContext();
  const { datas: danhmuc_khotieuchis } = useAppSelector(
    (state) => state.danhmuc_khotieuchi
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
  const danhmuc_khotieuchiContext = useDanhMuc_KhoTieuChiContext();

  const [addTieuChiDoiLapModalVisible, setAddTieuChiDoiLapModalVisible] =
    useState(false);
  const [addDiemLietModalVisible, setAddDiemLietModalVisible] =
    useState(false);
  const parentTieuChi = danhmuc_khotieuchis?.find((item) => item.id == folderId);
  const [isDoiLap, setIsDoiLap] = useState(parentTieuChi?.tieuChiLienKet);

  let codeDayDu = null;
  let codeFather = null;
  let codeGruop = null;
  if (parentTieuChi?.fullCode != null) {
    codeDayDu = parentTieuChi?.fullCode;
    codeFather =
      parentTieuChi.fullCode.split(".")[
      parentTieuChi.fullCode.split(".").length - 1
      ];
    codeGruop = parentTieuChi.fullCode.split(".")[0];
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
    console.log(JSON.stringify(formData))
    const res = await danhMuc_KhoTieuChiApi.Create({
      ...formData,
      fullCode: maDayDus,
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
    if (res.status === 201) {
      dispatch(SearchDanhMuc_KhoTieuChi({ pageNumber: 1, pageSize: 1000, reFetch: true }));
    }
    if (res.data.succeeded) {
      toast.success("Thêm thành công");
      handleCancel();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    danhmuc_khotieuchiContext.setDanhMuc_KhoTieuChiId(undefined);
    handlerClose();
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
        TenCha: tenTieuChiCha || "",
      }
      setLstDoiLap((items) => [...items, objectDoiLap]);
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
      if (Array.isArray(diemLietContext.listDiemLiet)) {
        setLstDiemLiet([...diemLietContext.listDiemLiet])
      }
      else {
        const arry: IDiemLiet[] = Object.values(diemLietContext.listDiemLiet)
        setLstDiemLiet(arry)
      }

    }
  }, [diemLietContext.diemLietId]);

  const handleLoaiDiemChange = (value: string) => {
    if (value === "diemLiet") {
      setIsDiemLiet(true);
      form.setFieldsValue({ thangDiem: 0 });
      console.log("Đã chọn điểm liệt");
      // Có thể thêm hành động khác ở đây
    }
    else {
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
          name="AddSubDanhMuc_KhoTieuChi"
          layout="vertical"
          form={form}
          requiredMark={true}
          initialValues={{
            parentId: folderId,
            parrentCode: parentTieuChi?.maTieuChi,
            parrentName: parentTieuChi?.parrentName,
            suDung: true,
          }}
        >
          <Row gutter={[8, 8]} style={{ width: "100%" }}>
            {/* <Col span={24}>
              <Form.Item
                label="Tiêu chí cha"
                name="parrentCode"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tiêu chí" },
                ]}
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
                  generateOptions={{ model: danhmuc_khotieuchis, key: "maTieuChi", parentKey: "parrentCode", title: "tenTieuChi", value: "maTieuChi" }}
                  allowClear
                  showSearch treeLine treeDefaultExpandAll treeNodeFilterProp={"title"}
                  maxTagCount={20} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tên tiêu chí" name="tenTieuChi" rules={[{ required: true, message: 'Vui lòng nhập tên tiêu chí ' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thứ tự sắp xếp"
                name="thuTu"
                rules={[{ required: true, message: "Vui lòng nhập thứ tự sắp xếp" }]}
                style={{ textAlign: 'left' }}
              >
                <InputNumber min={0} />
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
              >  <Select placeholder="Chọn loại điểm" onChange={handleLoaiDiemChange}>
                  {danhmuc_loaidiem?.map((item) => (
                    <Option key={item.id} value={item.code}>
                      {item.tenDanhMuc}
                    </Option>
                  ))}
                </Select>
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
                <InputNumber disabled={isdiemLiet} min={0} />
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
                <Checkbox onChange={handleDoiLapChange} checked={isDoiLap} />
              </Form.Item>
            </Col>
          </Row>
          {isDoiLap && (
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
          {isdiemLiet && (
            <>
              <h5 style={{ marginTop: '10pt', color: '#1890ff' }} >Danh sách tiêu chí phụ thuộc điểm liệt</h5>
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
                          diemLietContext.setListDiemLiet({ ...lstDiemLiet })
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
              <DiemLietDetail />
            </>
          )}
        </Form>
      </AntdModal>
      <Space>
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
            folderId={parentTieuChi?.parrentCode ?? parentTieuChi?.id}
            onAddTieuChiDiemLiet={handleAddDiemLiet} // Gửi hàm vào đây
          />
        )}
      </Space>
    </>
  );
};

