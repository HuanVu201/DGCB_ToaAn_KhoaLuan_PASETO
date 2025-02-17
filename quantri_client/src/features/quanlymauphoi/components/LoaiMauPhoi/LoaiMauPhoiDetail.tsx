import { Button, Checkbox, Col, Form, Input, Row, Spin } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { IMauPhoi, ISearchMauPhoi } from "../../models/mauPhoi"
import { useEffect, useState } from "react"
import { AntdModal, AntdSelect } from "../../../../lib/antd/components"
import { GetMauPhoi, SearchMauPhoi } from "../../redux/action"
import { useMauPhoiContext } from "../../context/MauPhoiContext"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { IDanhMucChung } from "@/features/danhmucdungchung/models"
import { danhMucChungApi } from "@/features/danhmucdungchung/services"
import { MauPhoiApi } from "../../services/mauPhoi"
import { ILoaiMauPhoi, loaiPhois } from "../../models/loaiMauPhoi"
import { LoaiMauPhoiApi } from "../../services/loaiMauPhoi"



export const LoaiMauPhoiDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchMauPhoi | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>>
}) => {
    const dispatch = useAppDispatch()
    const mauPhoiContext = useMauPhoiContext()
    const [loaiMauPhoi, setLoaiMauPhoi] = useState<ILoaiMauPhoi>()
    const [form] = Form.useForm<ILoaiMauPhoi>()

    const onFinish = async () => {
        const formData = await form.validateFields()
        mauPhoiContext.setLoading(true)

        if (mauPhoiContext.loaiMauPhoiId) {
            const resUpdate = await LoaiMauPhoiApi.Update({
                id: mauPhoiContext.loaiMauPhoiId,
                data: { ...formData }
            })
            if (resUpdate.data.succeeded) {
                toast.success("Cập nhật thành công")
                mauPhoiContext.setReload(!mauPhoiContext.reload)
                handleCancel()
            } else {
                toast.error('Cập nhật thất bại')
            }
        } else {
            const resCreate = await LoaiMauPhoiApi.Create({ ...formData })
            console.log(resCreate)
            if (resCreate.data.succeeded) {
                toast.success("Thêm mới thành công")
                mauPhoiContext.setReload(!mauPhoiContext.reload)
                handleCancel()
            } else {
                toast.error("Thêm mới thất bại")
            }
        }

        mauPhoiContext.setLoading(false)
    }

    useEffect(() => {
        (async () => {
            if (mauPhoiContext.loaiMauPhoiId && mauPhoiContext.loaiMauPhoiModalVisible) {
                mauPhoiContext.setLoading(true)
                const resGet = await LoaiMauPhoiApi.Get(mauPhoiContext.loaiMauPhoiId)
                if (resGet.data.data) {
                    setLoaiMauPhoi(resGet.data.data)
                    form.setFieldsValue({ ...resGet.data.data })
                } else {
                    toast.error("Không có thông tin")
                    handleCancel()
                }

                mauPhoiContext.setLoading(false)
            }
        })()
    }, [mauPhoiContext.loaiMauPhoiId, mauPhoiContext.loaiMauPhoiModalVisible])

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        form.resetFields()
        mauPhoiContext.setLoaiMauPhoiModalVisible(false)
        mauPhoiContext.setLoaiMauPhoiId(undefined)
    };





    return (
        <AntdModal title={mauPhoiContext.loaiMauPhoiId ? "Sửa thông tin loại phôi" : "Thêm mới loại phôi"} visible={mauPhoiContext.loaiMauPhoiModalVisible} handlerCancel={handleCancel} width="50vw"
            footer={[
                <Button type="primary" onClick={onFinish} >
                    Xác nhận
                </Button>,
                <Button onClick={handleCancel} >
                    Hủy
                </Button>,

            ]}
        >
            <Spin spinning={mauPhoiContext.loading}
                indicator={<LoadingOutlined spin />}
            >
                <Form name='MauPhoi' layout="vertical" onFinish={onFinish} form={form} requiredMark={mauPhoiContext.mauPhoiId !== null}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Loại phôi"
                                name="loaiPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn loại phôi' }]}
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: loaiPhois,
                                        label: "label",
                                        value: "value",
                                    }}
                                    placeholder="Chọn loại phôi"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã loại phôi"
                                name="maMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn mã mẫu phôi' }]}
                            >
                                <Input placeholder="Nhập mã loại phôi..." />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Tên loại phôi"
                                name="tenMaMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng nhập tên loại phôi' }]}
                            >
                                <Input placeholder="Nhập tên loại phôi..." />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}