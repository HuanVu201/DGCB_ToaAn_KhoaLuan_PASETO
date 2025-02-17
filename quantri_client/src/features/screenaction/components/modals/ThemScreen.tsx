import { IScreen } from "@/features/screen/models"
import { AddScreen } from "@/features/screen/redux/action"
import { AntdButton, AntdModal, AntdSpace,  } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, Col, Form, FormProps, Input, Row } from "antd"
import { Rule } from "antd/es/form"
import { useScreenActionContext } from "../../contexts/ScreenActionContext"
import { INPUT_RULES } from "../../data"

export const ThemScreen = ({handlerClose, visible}: {handlerClose: () => void, visible: boolean}) => {
    const {datas:screens} = useAppSelector(state => state.screen)
    const [form] = Form.useForm()
    const folderContext = useScreenActionContext()
    const dispatch = useAppDispatch()
    const onFinish: FormProps["onFinish"] = (values) => {
        dispatch(AddScreen(values))
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields()
        folderContext.setFolderId(undefined)
        handlerClose()
    }

    return (
        <AntdModal title="Thêm mới screen" handlerCancel={handleCancel} visible={visible} footer={null} 
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose>
            <Form name='ScreenAdd' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã screen"
                            name="ma"
                            required
                            rules={INPUT_RULES["ma"]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
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
