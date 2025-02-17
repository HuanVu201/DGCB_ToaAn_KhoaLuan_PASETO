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



export const MauPhoiDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchMauPhoi | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchMauPhoi>>
}) => {
    const dispatch = useAppDispatch()
    const mauPhoiContext = useMauPhoiContext()
    const [mauPhoi, setMauPhoi] = useState<IMauPhoi>()
    const [maPhoiData, setMaPhoiData] = useState<ILoaiMauPhoi[]>()
    const [form] = Form.useForm<IMauPhoi>()
    const dinhKem = Form.useWatch('urlMauPhoi', form)

    const onFinish = async () => {
        const formData = await form.validateFields()

        mauPhoiContext.setLoading(true)
        if (mauPhoiContext.mauPhoiId) {
            const resUpdate = await MauPhoiApi.Update({
                id: mauPhoiContext.mauPhoiId,
                data: { ...formData }
            })
            if (resUpdate.data.succeeded) {
                toast.success("Cập nhật thành công")
                handleCancel()
                mauPhoiContext.setReload(!mauPhoiContext.reload)
            } else {
                toast.error("Thao tác thất bại")
            }
        } else {
            const resCreted = await MauPhoiApi.Create({ ...formData })
            if (resCreted.data.succeeded) {
                toast.success("Thêm mới thành công")
                handleCancel()
                mauPhoiContext.setReload(!mauPhoiContext.reload)
            } else {
                toast.error("Thao tác thất bại")
            }
        }
        mauPhoiContext.setLoading(false)
    }

    useEffect(() => {
        if (mauPhoiContext.mauPhoiModalVisible && !mauPhoiContext.mauPhoiId && !form.getFieldValue('loaiPhoi')) {
            form.setFieldValue('loaiPhoi', loaiPhois[0].value)
            onChangeLoaiPhoi(loaiPhois[0].value)
        }
    }, [mauPhoiContext.mauPhoiModalVisible])


    const onChangeLoaiPhoi = async (value: string) => {
        if (value) {
            mauPhoiContext.setLoading(true)
            const resGetMaPhoi = await LoaiMauPhoiApi.Search({ pageNumber: 1, pageSize: 1000, loaiPhoi: value })
            if (resGetMaPhoi.data.data) {
                setMaPhoiData(resGetMaPhoi.data.data)
                if (!mauPhoiContext.mauPhoiId)
                    form.setFieldValue('maMauPhoi', resGetMaPhoi.data.data[0].maMauPhoi)
            } else {
                toast.error("Không có thông tin mã phôi")
                form.setFieldValue('maMauPhoi', undefined)
                setMaPhoiData(undefined)
            }
            mauPhoiContext.setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            if (mauPhoiContext.mauPhoiModalVisible && mauPhoiContext.mauPhoiId) {
                mauPhoiContext.setLoading(true)
                const resGet = await MauPhoiApi.Get(mauPhoiContext.mauPhoiId)
                if (resGet.data.data) {
                    form.setFieldsValue({ ...resGet.data.data })
                    onChangeLoaiPhoi(resGet.data.data.loaiPhoi)
                } else {
                    toast.error("Không có thông tin phôi")
                    handleCancel()
                }

                mauPhoiContext.setLoading(false)
            }
        })()
    }, [mauPhoiContext.mauPhoiModalVisible, mauPhoiContext.mauPhoiId])

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        form.resetFields()
        setMaPhoiData(undefined)
        mauPhoiContext.setMauPhoiModalVisible(false)
        mauPhoiContext.setMauPhoiId(undefined)
    };


    return (
        <AntdModal title={mauPhoiContext.mauPhoiId ? "Sửa thông tin mẫu phôi" : "Thêm mới mẫu phôi"} visible={mauPhoiContext.mauPhoiModalVisible} handlerCancel={handleCancel} width="80vw"
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
                                    onChange={onChangeLoaiPhoi}
                                    disabled={mauPhoi ? true : false}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mã phôi"
                                name="maMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn mã phôi' }]}
                            >
                                <AntdSelect
                                    virtual={true}
                                    generateOptions={{
                                        model: maPhoiData,
                                        label: "tenMaMauPhoi",
                                        value: "maMauPhoi",
                                    }}
                                    onClick={() => {
                                        if (!maPhoiData)
                                            toast.error("Vui lòng chọn loại phôi trước")
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} span={24}>
                            <Form.Item
                                label="Tên mẫu phôi"
                                name="tenMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng nhập tên mẫu phôi' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col md={12} span={24}>
                            <Form.Item
                                label="Mẫu phôi"
                                name="urlMauPhoi"
                                rules={[{ required: true, message: 'Vui lòng chọn phôi' }]}
                            >
                                <RegularUpload
                                    form={form}
                                    fieldName="urlMauPhoi"
                                    folderName={`MauPhoi`}
                                    dinhKem={dinhKem}
                                    maxCount={1} />

                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Là phôi mặc định"
                                name="laPhoiMacDinh"
                                valuePropName="checked"

                            >
                                <Checkbox ></Checkbox>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}