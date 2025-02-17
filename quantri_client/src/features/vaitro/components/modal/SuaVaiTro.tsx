import { useFolderContext } from "@/contexts/FolderContext"
import { AddVaiTro, GetVaiTro, UpdateVaiTro } from "@/features/vaitro/redux/action"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { SelectProps } from "antd/lib"
import { useEffect } from "react"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"
const INPUT_RULES = {
    name: [{ required: true, message: "Không được để trống!" }],
}
export const SuaVaiTro = ({ handlerClose, visible, folderId }: { handlerClose: () => void, visible: boolean, folderId: string }) => {
    const { datas: vaiTroes, data: vaiTro } = useAppSelector(state => state.vaitro)
    const [form] = Form.useForm()
    const vaiTroContext = useVaiTroModalContext()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = (values) => {
        if (folderId) {

            dispatch(UpdateVaiTro({ id: folderId, data: {...values,id:folderId } }))
        }

        vaiTroContext.setRoleId(undefined)
        handlerClose()
        form.resetFields()
    }
    const handleCancel = () => {
        form.resetFields()
        handlerClose()
    }

    useEffect(() => {
        if (folderId) {
            dispatch(GetVaiTro(folderId))
        }
    }, [folderId])
    console.log(vaiTro);
    
    useEffect(() => {
        if (vaiTro) {
            form.setFieldsValue(vaiTro)
        }
    }, [vaiTro])

    return (
      
        <> 
         <AntdModal title="Sửa vai trò" handlerCancel={handleCancel} visible={visible} footer={null}
        width="60%"
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose>
        <Form name='VaiTro' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
            <Row gutter={[8, 8]}>
                <Col md={24} span={24}>
                    <Form.Item
                        label="Tên vai trò"
                        name="name"
                        required
                        rules={INPUT_RULES['name']}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={24} span={24}>
                    <Form.Item
                        label="Mô tả"
                        name="description"
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
    </>
    )
}
