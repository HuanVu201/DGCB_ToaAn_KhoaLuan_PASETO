import { useFolderContext } from "@/contexts/FolderContext"
import { AddCoCauToChuc, GetCoCauToChuc, UpdateCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { SelectProps } from "antd/lib"
import { useEffect } from "react"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"
import { AddVaiTro } from "../../redux/action"
const TYPE_OPTIONS: SelectProps["options"] = [{ label: "Đơn vị", value: 'don-vi' }, { label: "Nhóm", value: 'nhom' }]
const CATALOG_OPTIONS: SelectProps["options"] = [{ label: "Sở ban ngành", value: 'so-ban-nganh' }, { label: "Huyện, thị xã, thành phố", value: 'quận huyện' }, { label: "Xã, phường, thị trấn", value: 'xa-phuong' }]
const INPUT_RULES = {
    name: [{ required: true, message: "Không được để trống!" }],
}
export const ThemVaiTro = ({ handlerClose, visible }: { handlerClose: () => void, visible: boolean }) => {
    const { datas: vaiTroes, data: coCauToChuc } = useAppSelector(state => state.vaitro)
    const [form] = Form.useForm()
    const roleContext = useVaiTroModalContext()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = (values) => {
        // console.log(values);
        // if (folderContext?.folderId) {

        //     dispatch(UpdateCoCauToChuc({ id: folderContext.folderId, data: values }))
        // } else {

        let postData = { ...values }
        dispatch(AddVaiTro(postData))


        roleContext.setRoleId(undefined)
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields()
        handlerClose()
    }

    // useEffect(() => {
    //     if(folderContext.folderId){
    //         dispatch(GetCoCauToChuc(folderContext.folderId))
    //     }
    // },[folderContext.folderId])

    // useEffect(() => {
    //     if(coCauToChuc){
    //         form.setFieldsValue(coCauToChuc)
    //     }
    // }, [coCauToChuc])

    return (
        <AntdModal title="Thêm mới vai trò" handlerCancel={handleCancel} visible={visible} footer={null}
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose>
            <Form name='VaiTro' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên vai trò"
                            name="name"
                            required
                            rules={INPUT_RULES['name']}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name='description'
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <AntdSpace >
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </AntdSpace>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}
