import { AntdModal, AntdSelect } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, InputNumber, Row } from "antd"
import { useCallback, useEffect } from "react"
import { resetData } from "@/features/quytrinhxuly/redux/slice"
import { AddNodeModalProps } from "./AddNodeModal"
import { GetQuyTrinhXuLy } from "@/features/quytrinhxuly/redux/action"
import { BuocXuLy } from "@/models/buocXuLy"
import { useQuyTrinhXuLyContext } from "../contexts/QuyTrinhXuLyContext"

export const EditStartNodeModal = ({ nodes, onChangeNode, laDonVi} : Omit<AddNodeModalProps, "addNode">) =>{
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const {data: quytrinhxuly} = useAppSelector(state => state.quytrinhxulys)
    const quyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const onFinish = useCallback(async () => {
        const formData: BuocXuLy = await form.validateFields()
        if(quyTrinhXuLyContext.buocXuLyId){
            // if(truongHopThuTucContext.truongHopThuTucId)
            // onChangeNode(truongHopThuTucContext.quyTrinhId, {...formData, truongHopId:truongHopThuTucContext.truongHopThuTucId})
            // if(quytrinhxuly){
            //     dispatch(UpdateQuyTrinhXuLyWithoutSearch({id: truongHopThuTucContext.quyTrinhId, data: formData}))
            // }
        }
        handlerCancel()
    }, [quytrinhxuly])
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        quyTrinhXuLyContext.setBuocXuLyId(undefined)
        quyTrinhXuLyContext.setEditStartModalVisible(false)
    }
    useEffect(() => {
        if(quyTrinhXuLyContext.buocXuLyId){
            dispatch(GetQuyTrinhXuLy(quyTrinhXuLyContext.buocXuLyId))
        }
    }, [quyTrinhXuLyContext.buocXuLyId])
    useEffect(() => {
        if(quytrinhxuly){
            form.setFieldsValue(quytrinhxuly)
        } else {
            const node = nodes.find(x => x.id === quyTrinhXuLyContext.buocXuLyId)
            form.setFieldsValue(node?.data)
        }
    }, [quytrinhxuly])
    return <AntdModal title="Thêm bước quy trình" onOk={onFinish} okText={"Lưu"}
    cancelText={"Đóng"} visible={true} handlerCancel={handlerCancel} >
    <Form name='TruongHopThuTuc_startNode'
            initialValues={{ thoiGianXuLy: 4}}
            layout="vertical" onFinish={onFinish} 
            form={form}  >
            <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Thời gian xử lý trực tiếp (giờ)"
                        name="thoiGianXuLy"
                        hasFeedback
                        rules={[
                            {  
                                required: true, 
                                message: 'Vui lòng nhập thời gian xử lý trực tiếp' 
                            }]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </Col>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Thời gian xử lý trực tuyến (giờ)"
                        name="thoiGianThucHienTrucTuyen"
                        hasFeedback
                        rules={[
                            {  
                                required: true, 
                                message: 'Vui lòng nhập thời gian xử lý trực tuyến' 
                            }]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
</AntdModal>
}