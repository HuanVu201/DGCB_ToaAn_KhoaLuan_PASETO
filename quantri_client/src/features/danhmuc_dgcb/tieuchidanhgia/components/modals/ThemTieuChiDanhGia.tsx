import { AntdButton, AntdModal, AntdSelect, AntdSpace, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row, Select, SelectProps } from "antd"
import { Rule } from "antd/es/form"
import { useTieuChiDanhGiaContext } from "../../contexts/TieuChiDanhGiaContext"
import { AddTieuChiDanhGia } from "../../redux/action"
import { ICON_HOLDER, ICON_HOLDER_KEYS, ID_SEPARATE_ONE_THUNK } from "@/data"
import { useEffect,useState } from "react"
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action"
import { ITieuChiDanhGia, TIEUCHIDANHGIAMODULE, TIEUCHIDANHGIAMODULES } from "../../models"
import { DefaultOptionType } from "antd/es/select"
import { TieuChiDanhGiaApi } from "../../services"
import { toast } from "react-toastify"
import TextArea from "antd/es/input/TextArea"

export const ThemTieuChiDanhGia = ({ handlerClose, visible }: { handlerClose: () => void, visible: boolean }) => {
    const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
    const { sideBarTieuChiDanhGia } = useAppSelector(state => state.tieuchidanhgia)
    const [lstDoiLaps, setLstDoiLap] = useState<ITieuChiDanhGia[]>([]); // State lưu trữ ID tiêu chí đối lập
    const [form] = Form.useForm<Omit<ITieuChiDanhGia, "permission" >& {permission?: string[]}>()
    const tieuchidanhgiaContext = useTieuChiDanhGiaContext()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(dataPermissions === undefined){
            dispatch(SearchPermissionsVaiTro({}))
        }
    }, [dataPermissions])
    
    const onOk: FormProps["onFinish"] =async () => {
        const formData = form.getFieldsValue()
        const res = await TieuChiDanhGiaApi.Create({...formData, permission: formData.permission?.join(ID_SEPARATE_ONE_THUNK) || undefined})
        if(res.data.succeeded){
            toast.success("Thêm thành công")
            handleCancel()
        }
    }
    const handleCancel = () => {
        form.resetFields()
        tieuchidanhgiaContext.setTieuChiDanhGiaId(undefined)
        handlerClose()
    }

    return (
        <AntdModal title="Thêm mới TieuChiDanhGia" handlerCancel={handleCancel} visible={visible} onOk={onOk} okText="Xác nhận" cancelText="Đóng"   width="100%"
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose >
            <Form name='TieuChiDanhGiaAdd' layout="vertical" form={form} requiredMark={true} >
            <Row gutter={[8, 8]} style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
    <Col span={24}>
        <Form.Item
            label="Nhóm tiêu chí"
            name="tenTieuChiDanhGia"
            rules={[{ required: true, message: "Vui lòng nhập tên tieuchidanhgia" }]}
            style={{ textAlign: 'left' }}
        >
            <Input />
        </Form.Item>
    </Col>
    
    <Col span={24}>
        <Form.Item
            label="Tiêu chí"
            name="thuTuTieuChiDanhGia"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: 'left' }}
        >
            <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
    </Col>

    <Col span={24}>
        <Form.Item
            label="Thứ tự sắp xếp"
            name="module"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm chức năng" }]}
            style={{ textAlign: 'left' }}
        >
          <InputNumber />
        </Form.Item>
    </Col>

    <Col span={24}>
        <Form.Item
            label="Tên tiêu chí"
            name="active"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <Input />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Sử dụng"
            name="isTopTieuChiDanhGia"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <Checkbox />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="STT"
            name="fullPath"
            rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
            style={{ textAlign: 'left' }}
        >
            <Input />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Đơn vị tính"
            name="tenTieuChiDanhGia"
            rules={[{ required: true, message: "Vui lòng nhập tên tieuchidanhgia" }]}
            style={{ textAlign: 'left' }}
        >
            <Select />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Loại điểm"
            name="thuTuTieuChiDanhGia"
            rules={[{ required: true, message: "Vui lòng nhập thứ tự" }]}
            style={{ textAlign: 'left' }}
        >
            <Select />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Thang điểm"
            name="module"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm chức năng" }]}
            style={{ textAlign: 'left' }}
        >
            <InputNumber />
        </Form.Item>
    </Col>

    <Col span={24}>
        <Form.Item
            label="Ghi chú"
            name="active"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <TextArea />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Kiêm nhiệm"
            name="isTopTieuChiDanhGia"
            valuePropName="checked"
            style={{ textAlign: 'left' }}
        >
            <Checkbox />
        </Form.Item>
    </Col>

    <Col span={8}>
        <Form.Item
            label="Tiêu chí đối lập"
            name="fullPath"
            rules={[{ required: true, message: "Vui lòng nhập tên đường dẫn" }]}
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
