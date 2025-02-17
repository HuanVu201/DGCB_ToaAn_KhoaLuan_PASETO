import { AntdModal, AntdTable } from "@/lib/antd/components";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { vetXuLyServiceApi } from "@/features/vetXuLy/services";
import { ISearchVetXuLyDanhGia, IVetXuLyDanhGia } from "@/features/vetXuLy/models";
import { toast } from "react-toastify";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useVetXuLyDanhGiaColumn } from "@/features/DanhGiaCanBo/components/common/VetXuLyModal/hooks";



function VetXuLyDanhGiaTable({ typeDonVi = false }: { typeDonVi?: boolean }) {
    const buttonActionContext = useButtonActionContext()
    const [vetXuLys, setVetXuLys] = useState<IVetXuLyDanhGia[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [searchVetXuLyParams, setSearchVetXuLyParams] = useState<ISearchVetXuLyDanhGia>({
        pageSize: 10, pageNumber: 1
    })

    const columns = useVetXuLyDanhGiaColumn({ pageNumber: searchVetXuLyParams.pageNumber ?? 1, pageSize: searchVetXuLyParams.pageSize ?? 10 })
    useEffect(() => {
        (async () => {
            if (buttonActionContext.vetXuLyDanhGiaModalVisible && (buttonActionContext.danhGiaId || buttonActionContext.maPhieu)) {
                buttonActionContext.setLoading(true)
                if (!typeDonVi) {
                    const resGetvetDanhGia = await vetXuLyServiceApi.Search({
                        ...searchVetXuLyParams,
                        danhGiaId: buttonActionContext.danhGiaId
                    })

                    if (resGetvetDanhGia.data.data) {
                        setVetXuLys(resGetvetDanhGia.data.data)
                        setTotalCount(resGetvetDanhGia.data.totalCount)
                    } else {
                        toast.error("Không có thông tin vết xử lý")
                        buttonActionContext.setLoading(false)
                    }
                } else {
                    // const resGetvetDanhGia = await vetXuLyDanhGiaDonViServiceApi.Search({
                    //     ...searchVetXuLyParams,
                    //     maPhieu: buttonActionContext.maPhieu
                    // })

                    // if (resGetvetDanhGia.data.data) {
                    //     setVetXuLys(resGetvetDanhGia.data.data)
                    //     setTotalCount(resGetvetDanhGia.data.totalCount)
                    // } else {
                    //     toast.error("Không có thông tin vết xử lý")
                    //     buttonActionContext.setLoading(false)
                    // }
                }
                buttonActionContext.setLoading(false)
            }
        })()

    }, [buttonActionContext.vetXuLyDanhGiaModalVisible, buttonActionContext.danhGiaId, buttonActionContext.maPhieu])

    const handlerCancel = () => {
        buttonActionContext.setDanhGiaId(undefined)
        buttonActionContext.setMaPhieu(undefined)
        buttonActionContext.setVetXuLyDanhGiaModalVisible(false)
    }

    return (<>
        <AntdModal className="vetXuLyModal" visible={buttonActionContext.vetXuLyDanhGiaModalVisible} title="Xem thông tin vết xử lý chấm điểm" width="50vw" handlerCancel={handlerCancel}
            footer={[
                <Button key="back" onClick={handlerCancel} loading={buttonActionContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
        >
            <Spin spinning={buttonActionContext.loading}
                indicator={<LoadingOutlined spin />}
            >
                <AntdTable
                    columns={columns}
                    dataSource={vetXuLys}
                    pagination={{
                        total: totalCount
                    }}
                    searchParams={searchVetXuLyParams}
                    setSearchParams={setSearchVetXuLyParams}
                    onSearch={() => { }}
                />

            </Spin>
        </AntdModal>
    </>);
}

export default VetXuLyDanhGiaTable;