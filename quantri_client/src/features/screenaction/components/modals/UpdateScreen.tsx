import { GetScreen, UpdateScreen as DispatchUpdateScreen } from "@/features/screen/redux/action"
import { AddScreenAction, GetScreenAction } from "@/features/screenaction/redux/crud"
import { AntdButton, AntdModal, AntdSelect, AntdSpace,  } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { SelectProps } from "antd/lib"
import { useEffect } from "react"
import { INPUT_RULES } from "../../data"



export const UpdateScreen = ({handlerClose, folderId}: {handlerClose: () => void, folderId: string}) => {
    const {data: screen} = useAppSelector(state => state.screen)
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = (values) => {
        if (folderId) {
            dispatch(DispatchUpdateScreen({ id: folderId, data: values }))
        } 
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields()
        handlerClose()
    }
    useEffect(() => {
        if(folderId){
            dispatch(GetScreen(folderId))
        }
    },[folderId])

    useEffect(() => {
        if(screen){
            form.setFieldsValue(screen)
        }
    }, [screen])

    return (
        <AntdModal title="Sửa thư mục" handlerCancel={handleCancel} visible={true} footer={null} 
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose>
            <Form name='ScreenAction' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="moTa"
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã screen"
                            name="ma"
                            rules={INPUT_RULES['ma']}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị action trên Modal"
                            tooltip="Chỉ hiển thị những action đã được đánh dấu là hiển thị"
                            name="showActionInModal"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            tooltip="Chỉ hiển thị những action đã được đánh dấu là hiển thị"
                            label="Hiển thị action trên Table"
                            name="showActionInTable"
                            valuePropName="checked"
                        >
                            <Checkbox />
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
