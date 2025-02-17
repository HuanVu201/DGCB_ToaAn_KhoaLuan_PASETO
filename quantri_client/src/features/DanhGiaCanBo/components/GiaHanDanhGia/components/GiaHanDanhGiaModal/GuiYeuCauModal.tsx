import { AntdModal } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import { useGiaHanDanhGiaContext } from "../../contexts/useGiaHanDanhGiaContext";
import { GiaHanDanhGiaServiceApi } from "../../services";

function GuiYeuCauGiaHanModal() {
    const giaHanCOntext = useGiaHanDanhGiaContext()

    const onFinish = async () => {
        if (giaHanCOntext.selectedGiaHans.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện duyệt")
            return
        }
        giaHanCOntext.setLoading(true)
        try {
            const resUpdateTrangThai = await GiaHanDanhGiaServiceApi.GuiCapTren({
                ids: giaHanCOntext.selectedGiaHans as any
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
        giaHanCOntext.setGuiGiaHanModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={giaHanCOntext.guiGiaHanModalVisible} title="Xác nhận gửi yêu cầu gia hạn đánh giá" handlerCancel={handlerCancel}
            footer={[
                <Button key="submit" onClick={onFinish} loading={giaHanCOntext.loading} style={{ backgroundColor: '#36a3f7', color: '#fff' }}>
                    Xác nhận
                </Button>,
                <Button key="back" onClick={handlerCancel} loading={giaHanCOntext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
        >
            <Spin spinning={giaHanCOntext.loading}
                indicator={<LoadingOutlined spin />}
            />
        </AntdModal>
    </>);
}

export default GuiYeuCauGiaHanModal;