import { Col, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IConfig, ISearchConfig } from "../models"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddConfig, GetConfig, UpdateConfig } from "../redux/action"
import { useConfigContext } from "../contexts/ConfigContext"
import { resetData } from "@/features/config/redux/slice"



export const ConfigDetail = () => {
    const dispatch = useAppDispatch()
    const { data: Configs } = useAppSelector(state => state.config)
    const ConfigContext = useConfigContext()
    const [form] = Form.useForm<IConfig>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        if (ConfigContext?.ConfigId) {
            dispatch(UpdateConfig({ id: ConfigContext.ConfigId, data: formData }))
        } else {
            dispatch(AddConfig(formData))
        }
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        ConfigContext.setConfigId(undefined)
        ConfigContext.setConfigModalVisible(false)
    };
    useEffect(() => {
        if (ConfigContext.ConfigId) {
            dispatch(GetConfig(ConfigContext.ConfigId))
        }

    }, [ConfigContext.ConfigId])

    useEffect(() => {
        if (Configs) {
            form.setFieldsValue(Configs)
        }
    }, [Configs])

    return (
        <AntdModal visible={ConfigContext.ConfigModalVisible} title="Thêm mới cấu hình" handlerCancel={handleCancel} onOk={onFinish}>
            <Form name='config' layout="vertical" form={form}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên cấu hình"
                            name="ten"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber defaultValue={1} min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Chú ý"
                            name="note"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã cấu hình"
                            name="code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Module"
                            name="module"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Nội dung"
                            name="content"
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>

                </Row>
                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish} >
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item> */}
            </Form>
        </AntdModal>

    )
}