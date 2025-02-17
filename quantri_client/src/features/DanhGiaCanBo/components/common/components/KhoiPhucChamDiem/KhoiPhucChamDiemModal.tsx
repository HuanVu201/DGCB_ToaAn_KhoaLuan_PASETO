import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { danhGiaCanBoServiceApi } from "../../service/DanhGiaService";
import '../../PhieuChamDiem.scss'

function KhoiPhucChamDiemModal({ reload, setReload }: {
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const buttonActionContext = useButtonActionContext()

    useEffect(() => {
        if (buttonActionContext.khoiPhucChamDiemModalVisible && buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện khôi phục")
            handlerCancel()
        }
    }, [buttonActionContext.khoiPhucChamDiemModalVisible])

    const onFinish = async () => {
        if (buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện khôi phục")
            return
        }

        try {
            buttonActionContext.setLoading(true)
            const resKhoiPhucDanhGia = await danhGiaCanBoServiceApi.KhoiPhucDanhGiaByListId({
                ids: buttonActionContext.selectedDanhGias as any,
            })
            if (resKhoiPhucDanhGia.data.succeeded) {
                toast.success(resKhoiPhucDanhGia.data.message)
                setReload(!reload)
                handlerCancel()
            } else {
                toast.error(resKhoiPhucDanhGia.data.message)
            }
            buttonActionContext.setLoading(false)
        } catch {
            toast.error("Thao tác thất bại")
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setSelectedDanhGias([])
        buttonActionContext.setKhoiPhucChamDiemModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={buttonActionContext.khoiPhucChamDiemModalVisible} title="Xác nhận khôi phục chấm điểm" handlerCancel={handlerCancel}
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
            />
        </AntdModal>
    </>);
}

export default KhoiPhucChamDiemModal;