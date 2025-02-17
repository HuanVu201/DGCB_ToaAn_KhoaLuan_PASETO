import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { vetXuLyServiceApi } from "@/features/vetXuLy/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "@/features/vetXuLy/models";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { Form, Input, Space, Row, Col, DatePicker } from "antd"
import { danhGiaCanBoServiceApi } from "../../service/DanhGiaService";
import '../../PhieuChamDiem.scss'
import { ISearchDanhGiaCanBo } from "../../models";
import { Gui_Danh_Gia_Xep_Loai, Gui_Nhan_Xet, Gui_Tham_Muu } from "../../TenVetXuLyConstants";

function DuyetChamDiemModal({ reload, setReload, loaiDiem }: {
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    loaiDiem: string
}) {
    const buttonActionContext = useButtonActionContext()

    useEffect(() => {
        if (buttonActionContext.duyetChamDiemModalVisible && buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện duyệt")
            handlerCancel()
        }
    }, [buttonActionContext.duyetChamDiemModalVisible])

    const onFinish = async () => {
        if (buttonActionContext.selectedDanhGias.length == 0) {
            toast.warning("Vui lòng chọn đánh giá để thực hiện duyệt")
            return
        }

        try {
            buttonActionContext.setLoading(true)
            const resDuyetDanhGia = await danhGiaCanBoServiceApi.DuyetDanhGia({
                ids: buttonActionContext.selectedDanhGias as any,
                loaiDiem: loaiDiem,
                tenThaoTac: loaiDiem == "NhanXet" ? Gui_Nhan_Xet
                    : loaiDiem == "ThamMuu" ? Gui_Tham_Muu
                        : loaiDiem == "DanhGia" ? Gui_Danh_Gia_Xep_Loai : ''
            })
            if (resDuyetDanhGia.data.succeeded) {
                toast.success(resDuyetDanhGia.data.message)
                setReload(!reload)
                handlerCancel()
            } else {
                toast.error(resDuyetDanhGia.data.message)
            }
            buttonActionContext.setLoading(false)
        } catch {
            toast.error("Thao tác thất bại")
        }
    }

    const handlerCancel = () => {
        buttonActionContext.setSelectedDanhGias([])
        buttonActionContext.setDuyetChamDiemModalVisible(false)
    }

    return (<>
        <AntdModal className="ChamDiemModalHandler" visible={buttonActionContext.duyetChamDiemModalVisible} title="Xác nhận duyệt chấm điểm" handlerCancel={handlerCancel}
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

export default DuyetChamDiemModal;