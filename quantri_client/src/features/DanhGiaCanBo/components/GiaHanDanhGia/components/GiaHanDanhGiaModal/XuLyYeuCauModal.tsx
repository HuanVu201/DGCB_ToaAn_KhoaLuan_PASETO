import { AntdModal } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { toast } from "react-toastify";
import { useGiaHanDanhGiaContext } from "../../contexts/useGiaHanDanhGiaContext";
import { GiaHanDanhGiaServiceApi } from "../../services";
import { tap } from "node:test/reporters";

function XuLyYeuCauGiaHanModal() {
    const giaHanCOntext = useGiaHanDanhGiaContext()
    const [form] = Form.useForm<{ noiDung: string }>()
    const onFinish = async () => {
        const formData = await form.validateFields()
        if (!formData.noiDung) {
            toast.error('Nhập nội dung duyệt yêu cầu')
            return
        }

        giaHanCOntext.setLoading(true)
        try {
            const resUpdateTrangThai = await GiaHanDanhGiaServiceApi.DuyetGiaHanDanhGia({
                ids: giaHanCOntext.selectedGiaHans as any,
                noiDung: formData.noiDung
            })

            if (resUpdateTrangThai.data.succeeded) {
                toast.success(resUpdateTrangThai.data.message)
                handlerCancel()
                giaHanCOntext.setReload(!giaHanCOntext.reload)
            } else {
                toast.error(resUpdateTrangThai.data.message)
            }


            giaHanCOntext.setLoading(false)
        } catch {
            toast.error("Thao tác thất bại")
        }
        giaHanCOntext.setLoading(false)
    }

    const handlerCancel = () => {
        giaHanCOntext.setSelectedGiaHans([])
        giaHanCOntext.setDuyetGiaHanModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={giaHanCOntext.duyetGiaHanModalVisible} title="Xác nhận duyệt yêu cầu gia hạn đánh giá" handlerCancel={handlerCancel}
            footer={[
                <Button key="submit" onClick={onFinish} loading={giaHanCOntext.loading} style={{ backgroundColor: '#36a3f7', color: '#fff' }}>
                    Duyệt yêu cầu
                </Button>,
                <Button key="back" onClick={handlerCancel} loading={giaHanCOntext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Hủy
                </Button>
            ]}
        >
            <Spin spinning={giaHanCOntext.loading}
                indicator={<LoadingOutlined spin />}
            >
                <Form name='giaHanDanhGiaModal' layout="horizontal" form={form} >
                    <Row gutter={[0, 0]}>
                        <Col span={24} >
                            <Form.Item
                                label="Nội dung kết quả"
                                name="noiDung"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                            >
                                <Input.TextArea style={{ width: '100%' }} placeholder="Nhập nội dung kết quả..." maxLength={1000} showCount />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Spin>
        </AntdModal>
    </>);
}

export default XuLyYeuCauGiaHanModal;