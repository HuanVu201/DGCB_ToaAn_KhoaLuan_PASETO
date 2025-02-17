import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import '../../PhieuChamDiem.scss'
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";

function XoaChamDiemModal({ reload, setReload }: {
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const buttonActionContext = useButtonActionContext()

    useEffect(() => {
        if (buttonActionContext.xoaChamDiemModalVisible && buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện xóa")
            handlerCancel()
        }
    }, [buttonActionContext.xoaChamDiemModalVisible])

    const onFinish = async () => {
        if (buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện xóa")
            return
        }

        try {
            buttonActionContext.setLoading(true)
            const resXoaDanhGia = await danhGiaCanBoServiceApi.XoaDanhGiaByListId({
                ids: buttonActionContext.selectedDanhGias as any,
            })
            if (resXoaDanhGia.data.succeeded) {
                toast.success(resXoaDanhGia.data.message)
                setReload(!reload)
                handlerCancel()
            } else {
                toast.error(resXoaDanhGia.data.message)
            }
            buttonActionContext.setLoading(false)
        } catch {
            toast.error("Thao tác thất bại")
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setSelectedDanhGias([])
        buttonActionContext.setXoaChamDiemModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={buttonActionContext.xoaChamDiemModalVisible} title="Xác nhận xóa chấm điểm" handlerCancel={handlerCancel}
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

export default XoaChamDiemModal;