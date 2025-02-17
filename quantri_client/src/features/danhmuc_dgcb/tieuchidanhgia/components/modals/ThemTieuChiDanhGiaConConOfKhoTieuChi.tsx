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
import { useTieuChiDanhGiaContext } from "../../contexts/TieuChiDanhGiaContext";
import { AddTieuChiDanhGia, SearchTieuChiDanhGia } from "../../redux/action";
import {
  IDiemLiet,
  ITieuChiDanhGia,
  ITieuChiDoiLap,
  TIEUCHIDANHGIAMODULE,
  TIEUCHIDANHGIAMODULES,
} from "../../models";
import { DefaultOptionType } from "antd/es/select";
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import { TieuChiDanhGiaApi } from "../../services";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action";
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action";
import { DanhMuc_KhoTieuChiDetail } from "@/features/danhmuc_dgcb/danhmuc_khotieuchi/components/DanhMuc_KhoTieuChiDetail";
import { IDanhMuc_KhoTieuChi } from "@/features/danhmuc_dgcb/danhmuc_khotieuchi/models";
import { ConsoleSqlOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TieuChiDoiLap } from "../../tieuchidoilap/TieuChiDoiLap";
import { DiemLiet } from "../../diemliet/DiemLiet";
import { useDiemLietContext } from "../../contexts/DiemLietContext";
const { Option } = Select;

const suDungPhiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];
export const ThemTieuChiDanhGiaConOfKhoTieuChi = ({
  handlerClose,
  visible,
  folderId,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);  // Trạng thái loading
  const { danhSachTieuChiDanhGia: tieuchidanhgias } = useAppSelector(
    (state) => state.tieuchidanhgia
  );
  const { datas: danhmuc_donvitinhs } = useAppSelector(
    (state) => state.danhmuc_donvitinh
  );
  const { datas: danhmuc_khotieuchis } = useAppSelector(
    (state) => state.danhmuc_khotieuchi
  );

  const [khoTieuChiData, setKhoTieuChiData] = useState<
    IDanhMuc_KhoTieuChi | null | undefined
  >(null);
  const tieuchidanhgiaContext = useTieuChiDanhGiaContext();
  const parentTieuChi = tieuchidanhgias?.find((item) => item.id == folderId);
  let codeDayDu = null;
  let codeFather = null;
  let lstCode = null;
  if (parentTieuChi?.maDayDu != null) {
    codeDayDu = parentTieuChi?.maDayDu;
    lstCode = codeDayDu.split(".");
    codeFather = lstCode[0];
  } else {
    codeFather = parentTieuChi?.maTieuChi;
    codeDayDu = parentTieuChi?.maTieuChi;
  }
  const onOk: FormProps["onFinish"] = async () => {
    const formData = form.getFieldsValue();
    setIsLoading(true); // Bật loading khi bắt đầu thao tác
    console.log(formData.maKhoTieuChi);
    console.log(codeFather);
    console.log(parentTieuChi?.maDayDu);
    console.log(parentTieuChi);
    // const res = await TieuChiDanhGiaApi.Create({
    //   ...formData,
    //   maDayDu: maDayDus,
    //   maTieuChi: newGuid,
    //   id: newGuid,
    //   maMauPhieuDanhGia: codeFather,
    //   diemLiet: pointLiet,
    //   diemTru: pointTru,
    //   diemThuong: pointThuong,
    //   thangDiem: formData.thangDiem.toString(),
    //   JsonLienKet: JSON.stringify(lstDoiLaps), // Chuyển đổi mảng thành chuỗi JSON
    //   JsonDiemLiet: JSON.stringify(lstDiemLiet),
    // });

    //  const res = await TieuChiDanhGiaApi.CopyTieuChiDanhGiaTuKho({
    //   id:formData.maKhoTieuChi,
    //   fullCode: formData.maKhoTieuChi,
    //   maMauPhieuDanhGia: codeFather,
    //   parrentFullCode:parentTieuChi?.maDayDu || parentTieuChi?.maTieuChi
    //  })
    // // if (res.status === 201) {
    // //   dispatch(SearchTieuChiDanhGia({ reFetch: true }));
    // // }
    // if (res.data.succeeded) {
    //   toast.success("Thêm thành công");
    //   handleCancel();
    // }
    try {
      // Thực hiện thao tác gọi API (ví dụ như CopyTieuChiDanhGiaTuKho)
      const res = await TieuChiDanhGiaApi.CopyTieuChiDanhGiaTuKho({
        id: formData.maKhoTieuChi,
        fullCode: formData.maKhoTieuChi,
        maMauPhieuDanhGia: codeFather,
        parrentFullCode: parentTieuChi?.maDayDu || parentTieuChi?.maTieuChi,
      });

      if (res.data.succeeded) {
        toast.success("Thêm thành công");
        handleCancel();
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false); // Tắt loading khi thao tác xong
    }
    
  };

  const handleCancel = () => {
    form.resetFields();
    tieuchidanhgiaContext.setTieuChiDanhGiaId(undefined);
    handlerClose();
  };

  const handleKhoTieuChiChange = (value: string) => {
    // Gọi API để lấy dữ liệu từ kho tiêu chí
    let kTC = danhmuc_khotieuchis?.find((item) => item.maTieuChi == value);
    setKhoTieuChiData(kTC);
  };

  return (
    <>
      <AntdModal
        title="Thêm mới Tiêu chí đánh giá từ kho "
        handlerCancel={handleCancel}
        visible={visible}
        onOk={onOk}
        okText="Xác nhận"
        cancelText="Đóng"
        width="100%"
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose
        okButtonProps={{
          loading: isLoading, // Bật loading khi đang xử lý
          disabled: isLoading, // Vô hiệu hóa nút khi đang xử lý
        }}
      >
        <Form
          name="AddSubTieuChiDanhGia"
          layout="vertical"
          form={form}
          requiredMark={true}
          initialValues={{
            parentId: folderId,
            active: true,
            nhomTieuChiDanhGia: codeFather,
            tieuchicha: folderId,
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
            <Col span={24}>
              <Form.Item
                label="Nhóm tiêu chí"
                name="nhomTieuChiDanhGia"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tieuchidanhgia",
                  },
                ]}
                style={{ textAlign: "left" }}
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
                style={{ textAlign: "left" }}
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
                label="Kho tiêu chí"
                name="maKhoTieuChi"
                rules={[{ required: true, message: "Vui lòng chọn kho" }]}
                style={{ textAlign: "left" }}
              >
                <Select onChange={handleKhoTieuChiChange}>
                  {danhmuc_khotieuchis?.map((item) => (
                    <Option key={item.maTieuChi} value={item.maTieuChi}>
                      {item.tenTieuChi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </AntdModal>
     <Space>
     </Space>

    </>
  );
};
