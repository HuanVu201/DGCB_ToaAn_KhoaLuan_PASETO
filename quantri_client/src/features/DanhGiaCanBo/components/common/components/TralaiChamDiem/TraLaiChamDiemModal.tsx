import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { vetXuLyServiceApi } from "@/features/vetXuLy/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "@/features/vetXuLy/models";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import '../../PhieuChamDiem.scss'
import { ISearchDanhGiaCanBo } from "../../models";
import { danhGiaCanBoServiceApi } from "../../service/DanhGiaService";

function TraLaiChamDiemModal({ reload, setReload }: {
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm()

    const onFinish = async () => {
        if (!buttonActionContext.danhGiaId) {
            toast.error('Không có mã đánh giá')
            return
        }

        const data = await form.validateFields()
        if (data.lyDo) {
            try {
                buttonActionContext.setLoading(true)
                const resRollBackPhieu = await danhGiaCanBoServiceApi.TraLaiPhieuDanhGia({
                    id: buttonActionContext.danhGiaId,
                    tenBuocXuLy: `Trả lại chấm điểm với lý do: ${data.lyDo}`
                })
                if (resRollBackPhieu.data.succeeded) {
                    toast.success(resRollBackPhieu.data.message)
                    setReload(!reload)
                    handlerCancel()
                } else {
                    toast.error(resRollBackPhieu.data.message)
                }
                buttonActionContext.setLoading(false)
            } catch {
                toast.error("Thao tác thất bại")
            }
        } else {
            toast.warning("Vui lòng nhập lý do")
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setDanhGiaId(undefined)
        buttonActionContext.setTraLaiChamDiemModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={buttonActionContext.traLaiChamDiemModalVisible} title="Trả lại phiếu chấm điểm" width="50vw" handlerCancel={handlerCancel}
            footer={[
                <Button key="submit" onClick={onFinish} loading={buttonActionContext.loading} style={{ backgroundColor: '#36a3f7', color: '#fff' }}>
                    Xác nhận
                </Button>,
                <Button key="back" onClick={handlerCancel} loading={buttonActionContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
        >
            <Spin spinning={buttonActionContext.loading}
                indicator={<LoadingOutlined spin />}
            >
                <Form name='TuChamDiemSearch' layout="horizontal" onFinish={onFinish} form={form} style={{ marginTop: 10 }}>
                    <Row gutter={[0, 0]} style={{ display: 'flex' }}>
                        <Col style={{ display: 'flex', justifyContent: 'right' }}>
                            <Form.Item label="Lý do" />
                        </Col>
                        <Col style={{ flex: 1 }}>
                            <Form.Item
                                name="lyDo"
                            >
                                <Input.TextArea style={{ width: '100%' }} showCount maxLength={1500} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Spin>
        </AntdModal>
    </>);
}

export default TraLaiChamDiemModal;