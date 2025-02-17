import { AntdModal } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import { useKhieuNaiDanhGiaContext } from "../../contexts/useKhieuNaiKienNghiContext";
import { KhieuNaiDanhGiaServiceApi } from "../../services";

function GuiKhieuNaiLenCapTrenModal() {
    const khieuNaiContext = useKhieuNaiDanhGiaContext()

    const onFinish = async () => {
        if (khieuNaiContext.selectedKhieuNais.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện duyệt")
            return
        }
        khieuNaiContext.setLoading(true)
        try {
            const resUpdateTrangThai = await KhieuNaiDanhGiaServiceApi.GuiCapTren({
                ids: khieuNaiContext.selectedKhieuNais as any
            })

            if (resUpdateTrangThai.data.succeeded) {
                toast.success(resUpdateTrangThai.data.message)
                handlerCancel()
                khieuNaiContext.setReload(!khieuNaiContext.reload)
            } else {
                toast.error(resUpdateTrangThai.data.message)
            }


            khieuNaiContext.setLoading(false)
        } catch {
            toast.error("Thao tác thất bại")
        }
        khieuNaiContext.setLoading(false)
    }

    const handlerCancel = () => {
        khieuNaiContext.setSelectedKhieuNais([])
        khieuNaiContext.setSendKhieuNaiModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={khieuNaiContext.sendKhieuNaiModalVisible} title="Xác nhận gửi kiếu nại, kiến nghị đánh giá" handlerCancel={handlerCancel}
            footer={[
                <Button key="submit" onClick={onFinish} loading={khieuNaiContext.loading} style={{ backgroundColor: '#36a3f7', color: '#fff' }}>
                    Xác nhận
                </Button>,
                <Button key="back" onClick={handlerCancel} loading={khieuNaiContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
        >
            <Spin spinning={khieuNaiContext.loading}
                indicator={<LoadingOutlined spin />}
            />
        </AntdModal>
    </>);
}

export default GuiKhieuNaiLenCapTrenModal;