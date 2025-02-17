import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"
import { Col, Form, Input, Row } from "antd"
import { useCallback, useEffect} from 'react'
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"


export interface ChangeEdgeModalProps {
    changeEdge: (id: string, label: string) => void
}

export const ChangeEdgeModal = ({changeEdge} : ChangeEdgeModalProps) => {
    const [form] = Form.useForm()
    const quyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const handlerCancel = () => {
        quyTrinhXuLyContext.setChangeEdgeModalVisible(false)
        quyTrinhXuLyContext.setEdgeId(undefined)
        quyTrinhXuLyContext.setEdgeLabel(undefined)
    }
    const onFinish = useCallback((formData: {label: string}) => {
        if(quyTrinhXuLyContext.edgeId){
            changeEdge(quyTrinhXuLyContext.edgeId, formData.label)
        }
        handlerCancel()
    }, [])

    useEffect(() => {
        if(quyTrinhXuLyContext.edgeLabel){
            form.setFieldValue("label", quyTrinhXuLyContext.edgeLabel)
        }
    },[quyTrinhXuLyContext.edgeLabel])
    return <AntdModal title="Sửa liên kết" footer={null} visible={true} handlerCancel={handlerCancel}>
        <Form name='TruongHopThuTuc_change_edge'
                layout="vertical" onFinish={onFinish} 
                form={form}  >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên liên kết"
                            name="label"
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
                        <AntdButton type="default" onClick={handlerCancel}>
                            Đóng
                        </AntdButton>
                    </AntdSpace>
                </Form.Item>
            </Form>
    </AntdModal>
}