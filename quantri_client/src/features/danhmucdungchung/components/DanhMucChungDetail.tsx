import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IDanhMucChung, ISearchDanhMucChung } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "@/lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddDanhMucChung, GetDanhMucChung, SearchDanhMucChung, UpdateDanhMucChung } from "../redux/action"
import { useDanhMucChungContext } from "../context/DanhMucChungContext"
import { useSearchParams } from "react-router-dom"
import { resetData } from "../redux/slice"
import { danhMucChungApi } from "../services"
import { toast } from "react-toastify"

export const DanhMucChungDetail = ({ searchParams, setSearchParams }: {
    searchParams: ISearchDanhMucChung | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMucChung>>
}) => {
    const dispatch = useAppDispatch()
    const { data: danhMucChung, datas: danhMucChungs, loading } = useAppSelector(state => state.danhmucdungchung)
    const danhMucChungContext = useDanhMucChungContext()
    let [searchRouterParams] = useSearchParams();
    const [form] = Form.useForm<IDanhMucChung>()
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (danhMucChungContext?.danhMucChungId) {

            const res = await danhMucChungApi.Update({ id: danhMucChungContext.danhMucChungId, data: { ...formData, type: searchRouterParams.get("type") || "" } });
            if (res.status === 200) {
                toast.success("Cập nhật thành công")
                dispatch(SearchDanhMucChung({ ...searchParams, reFetch: true }))
            } else {
                toast.error('Thao tác thất bại!')
            }

        } else {
            const res = await danhMucChungApi.Create({ ...formData, type: searchRouterParams.get("type") || "" });
            if (res.status === 201) {
                toast.success("Thêm mới thành công")
                dispatch(SearchDanhMucChung({ ...searchParams, reFetch: true }))
            } else {
                toast.error('Thao tác thất bại!')
            }
        }
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        danhMucChungContext.setDanhMucChungModalVisible(false)
        danhMucChungContext.setDanhMucChungId(undefined)
    };
    useEffect(() => {
        if (danhMucChungContext.danhMucChungId) {
            dispatch(GetDanhMucChung(danhMucChungContext.danhMucChungId))
        }
    }, [danhMucChungContext.danhMucChungId])

    useEffect(() => {
        if (danhMucChung) {
            form.setFieldsValue({ ...danhMucChung })
        }
    }, [danhMucChung])

    return (
        <AntdModal title="Thêm mới danh mục" visible={danhMucChungContext.danhMucChungModalVisible} handlerCancel={handleCancel} footer={null}>
            <Form name='danhmucdungchung' layout="vertical" onFinish={onFinish} form={form} requiredMark={danhMucChungContext.danhMucChungId === null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã danh mục"
                            name="code"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên danh mục"
                            name="tenDanhMuc"
                            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự hiển thị"
                            name="thuTu"
                            rules={[{ required: true, message: 'Vui lòng nhập thứ tự hiển thị' }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị menu phụ"
                            name="hienThiMenuPhu"
                        >
                            <AntdSelect options={}>
                            </AntdSelect>
                        </Form.Item>
                    </Col> */}
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish}>
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