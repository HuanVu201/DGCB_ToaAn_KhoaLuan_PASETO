import { AntdButton, AntdModal, AntdSelect, AntdSpace, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row, Select, SelectProps } from "antd"
import { Rule } from "antd/es/form"
import { useDanhMuc_KhoTieuChiContext } from "../../contexts/DanhMuc_KhoTieuChiContext"
import { AddDanhMuc_KhoTieuChi } from "../../redux/action"
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data"
import { useEffect,useState } from "react"
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action"
import { IDanhMuc_KhoTieuChi } from "../../models"
import { DefaultOptionType } from "antd/es/select"
import { danhMuc_KhoTieuChiApi } from "../../services"
import { toast } from "react-toastify"
import TextArea from "antd/es/input/TextArea"
const { Option } = Select;
export const ThemDanhMuc_KhoTieuChi = ({ handlerClose, visible }: { handlerClose: () => void, visible: boolean }) => {
    const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
    const { datas: sideBarDanhMuc_KhoTieuChi } = useAppSelector(state => state.danhmuc_khotieuchi)
    const [lstDoiLaps, setLstDoiLap] = useState<IDanhMuc_KhoTieuChi[]>([]); // State lưu trữ ID tiêu chí đối lập
    const [form] = Form.useForm<Omit<IDanhMuc_KhoTieuChi, "permission" >& {permission?: string[]}>()
    const danhmuc_khotieuchiContext = useDanhMuc_KhoTieuChiContext()
    const dispatch = useAppDispatch()
    const { datas: danhmuc_donvitinhs } = useAppSelector(
        (state) => state.danhmuc_donvitinh
      );
    const { datas: danhmuc_loaidiem } = useAppSelector(
        (state) => state.danhmuc_loaidiem
      );
    useEffect(() => {
        if(dataPermissions === undefined){
            dispatch(SearchPermissionsVaiTro({}))
        }
    }, [dataPermissions])
    
    const onOk: FormProps["onFinish"] =async () => {
        const formData = form.getFieldsValue()
        const res = await danhMuc_KhoTieuChiApi.Create({...formData,thangDiem:formData.thangDiem?.toString()})
        if(res.data.succeeded){
            toast.success("Thêm thành công")
            handleCancel()
        }
    }
    const handleCancel = () => {
        form.resetFields()
        danhmuc_khotieuchiContext.setDanhMuc_KhoTieuChiId(undefined)
        handlerClose()
    }

    return (
        <AntdModal title="Thêm mới tiêu chí đánh giá gốc" handlerCancel={handleCancel} visible={visible} onOk={onOk} okText="Xác nhận" cancelText="Đóng"   width="100%"
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose >
            <Form name='DanhMuc_KhoTieuChiAdd' layout="vertical" form={form} requiredMark={true} >
            <Row gutter={[8, 8]} style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
    {/* <Col span={24}>
        <Form.Item
            label="Nhóm tiêu chí"
            name="tenDanhMuc_KhoTieuChi"
            rules={[{ required: true, message: "Vui lòng nhập tên danhmuc_khotieuchi" }]}
            style={{ textAlign: 'left' }}
        >
            <Input />
        </Form.Item>
    </Col>
    
    <Col span={24}>
        <Form.Item
            label="Tiêu chí"
            name="thuTuDanhMuc_KhoTieuChi"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: 'left' }}
        >
            <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
    </Col> */}

    <Col span={24}>
        <Form.Item
            label="Thứ tự sắp xếp"
            name="thuTu"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự sắp xếp" }]}
            style={{ textAlign: 'left' }}
        >
          <InputNumber />
        </Form.Item>
    </Col>

    <Col span={24}>
        <Form.Item
            label="Tên tiêu chí gốc"
            name="tenTieuChi"
            style={{ textAlign: 'left' }}
        >
            <Input />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Sử dụng"
            name="suDung"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <Checkbox />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="STT"
            name="stt"
            // rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
            style={{ textAlign: 'left' }}
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
              >  <Select placeholder="Chọn đơn vị tính" >
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
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm chức năng" }]}
            style={{ textAlign: 'left' }}
        >
            <InputNumber />
        </Form.Item>
    </Col>

    <Col span={24}>
        <Form.Item
            label="Ghi chú"
            name="ghiChu"
            style={{ textAlign: 'left' }}
        >
            <TextArea />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Kiêm nhiệm"
            name="kiemNhiem"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <Checkbox />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Tiêu chí đối lập"
            name="tieuChiLienKet"
            style={{ textAlign: 'left' }}
        >
           <Checkbox />
        </Form.Item>
    </Col>
</Row>

            </Form>
        </AntdModal>
    )
}
