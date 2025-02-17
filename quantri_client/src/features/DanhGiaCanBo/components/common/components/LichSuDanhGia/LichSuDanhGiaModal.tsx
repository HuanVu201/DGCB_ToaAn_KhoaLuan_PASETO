import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { vetXuLyServiceApi } from "@/features/vetXuLy/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "@/features/vetXuLy/models";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useLichSuDanhGiaColumn } from "./hooks/useLichSuDanhGiaColumn";
import { ILichSuDanhGia } from "../../models/phieuDanhGia";


function LichSuDanhGiaModal() {
    const buttonActionContext = useButtonActionContext()
    const [datas, setDatas] = useState<ILichSuDanhGia[]>()
    const columns = useLichSuDanhGiaColumn({ pageNumber: 1, pageSize: 10 })
    useEffect(() => {
        (async () => {
            if (buttonActionContext.lichSuDanhGiaModalVisible && buttonActionContext.tieuChiId && buttonActionContext.lichSuDanhGias) {
                buttonActionContext.setLoading(true)
                let checkAvaliable = false
                buttonActionContext.lichSuDanhGias.forEach(item => {
                    if (item.tieuChiId == buttonActionContext.tieuChiId) {
                        checkAvaliable = true
                        setDatas(item.datas)
                    }
                })
                if (!checkAvaliable) {
                    toast.info("Không có thông tin nội dung giải trình/ý kiến")
                    // handlerCancel()
                }

                buttonActionContext.setLoading(false)
            }
        })()

    }, [buttonActionContext.lichSuDanhGiaModalVisible, buttonActionContext.tieuChiId])

    const handlerCancel = () => {
        setDatas(undefined)
        buttonActionContext.setTieuChiId(undefined)
        buttonActionContext.setLichSuDanhGiaModalVisible(false)
    }

    return (<>
        <AntdModal className="vetXuLyModal" visible={buttonActionContext.lichSuDanhGiaModalVisible} title="Nội dung giải trình/ý kiến" width="75vw" handlerCancel={handlerCancel}
            footer={[
                <Button key="back" onClick={handlerCancel} loading={buttonActionContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
            style={{zIndex: 1000}}
        >
            <Spin spinning={buttonActionContext.loading}
                indicator={<LoadingOutlined spin />}
            >
                <AntdTable
                    columns={columns}
                    dataSource={datas}
                    pagination={{
                        total: datas?.length
                    }}
                    searchParams={{}}
                    setSearchParams={() => { }}
                    onSearch={() => { }}
                />

            </Spin>
        </AntdModal>
    </>);
}

export default LichSuDanhGiaModal;