import { GetUserById } from "@/features/user/redux/Actions"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, AntdTab, AntdUpLoad, IAntdTabsProps } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { useEffect } from "react"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"
import { DeleteVaiTro } from "../../redux/action"


export const XoaVaiTro = ({ handlerClose, visible, id }: { handlerClose: () => void, visible: boolean, id: string }) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = (values) => {
        // console.log(id);
        dispatch(DeleteVaiTro({ id: id, forceDelete: false }))
        handlerClose()
    }
    const handleCancel = () => {
        form.resetFields()
        handlerClose()
    }
    return (
        <AntdModal title="Xóa vai trò" handlerCancel={handleCancel} visible={visible} footer={null}
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose>
            <Form name='users' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Form.Item>
                    <div style={{textAlign :'center'}}>
                        <h4>Bạn có muốn xóa vai trò này không?</h4>
                    </div>
                </Form.Item>
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
