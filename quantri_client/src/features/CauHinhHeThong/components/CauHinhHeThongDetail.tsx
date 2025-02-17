import { Col, Form, Input, InputNumber, Row, SelectProps, Space } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { ICauHinhHeThong, ISearchCauHinhHeThong } from "../models"
import { useEffect } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { AddCauHinhHeThong, GetCauHinhHeThong, UpdateCauHinhHeThong } from "../redux/action"
import { useCauHinhHeThongContext } from "../contexts/CauHinhHeThongContext"
import { resetData } from "@/features/CauHinhHeThong/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

const LINKTYPE_OPTIONS :SelectProps["options"] = [{
    label: "Trang hiện tại",
    value: "hien-tai"
}, {
    label: "Trang chi tiết",
    value: "chi-tiet"
}]

export const CauHinhHeThongDetail = () => {
    const dispatch = useAppDispatch()
    const { data: cauHinhHeThongs } = useAppSelector(state => state.cauhinhhethong)
    const cauHinhHeThongContext = useCauHinhHeThongContext()
    const [form] = Form.useForm<ICauHinhHeThong>()
    const dinhKem = Form.useWatch("imageUrl", form)
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (cauHinhHeThongContext?.cauHinhHeThongId) {
            dispatch(UpdateCauHinhHeThong({ id: cauHinhHeThongContext.cauHinhHeThongId, data: formData }))
        } else {
            dispatch(AddCauHinhHeThong(formData))
        }
        form.resetFields()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        cauHinhHeThongContext.setCauHinhHeThongId(undefined)
        cauHinhHeThongContext.setCauHinhHeThongModalVisible(false)
    };
    useEffect(() => {
        if (cauHinhHeThongContext.cauHinhHeThongId) {
            dispatch(GetCauHinhHeThong(cauHinhHeThongContext.cauHinhHeThongId))
        }
        
    }, [cauHinhHeThongContext.cauHinhHeThongId])

    useEffect(() => {
        if (cauHinhHeThongs) {
            form.setFieldsValue(cauHinhHeThongs)
        }
    }, [cauHinhHeThongs])

    return (
        <AntdModal visible={cauHinhHeThongContext.cauHinhHeThongModalVisible} title="Thêm mới loại dịch vụ" handlerCancel={handleCancel}>
        <Form name='dichvu' layout="vertical" form={form}>
            <Row gutter={[8, 8]}>
                <Col span={18}>
                    <Form.Item
                        label="Tên loại dịch vụ"
                        name="tenCauHinhHeThong"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Thứ tự"
                        name="thuTu"
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Liên kết tới"
                        name="linkTo"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Loại liên kết"
                        name="linkType"
                    >
                        <AntdSelect options={LINKTYPE_OPTIONS} defaultValue={"hien-tai"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Ảnh"
                        name="imageUrl"
                    >
                        <RegularUpload 
                            hideUpload={cauHinhHeThongContext.cauHinhHeThongId !== undefined}
                            dinhKem={dinhKem}
                            fieldName={"imageUrl"} 
                            folderName={"CauHinhHeThong"} 
                            maxCount={1}
                            form={form}/>
                        {/* <AntdUpLoad editing={cauHinhHeThongContext.cauHinhHeThongId !== undefined} formInstance={form} folderName="CauHinhHeThong" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture"/> */}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space >
                    <AntdButton type="primary" onClick={onFinish} >
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item>
        </Form>
        </AntdModal>
        
    )
}