import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import '../../../../common/PhieuChamDiem.scss'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useKhieuNai_DanhGiaTableColumn } from "../../../hooks/useDanhGia_KhieuNaiColumn";
import { useKhieuNaiDanhGiaContext } from "../../../contexts/useKhieuNaiKienNghiContext";
import { DanhGiaToanBoCommonSearch } from "@/features/DanhGiaCanBo/components/common/DanhGiaToanBoCommonSearch";
import ReadOnlyDanhGiaDetailModal from "@/features/DanhGiaCanBo/components/common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import ThemDanhGiaKhieuNaiDetailModal from "./ThemDanhGiaKhieuNaiDetailModal";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { SearhDanhGiaKhieuNaiTableModal } from "./SearchDanhGiaKhieuNaiTableModal";
import { TrangThai_DaDanhGia } from "@/features/DanhGiaCanBo/components/common/TenVetXuLyConstants";
function DanhGiaKhieuNaiTableModal() {
    const khieuNaiContext = useKhieuNaiDanhGiaContext()
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'TuDanhGia',
        getDataCurrentUser: true,
        trangThai: TrangThai_DaDanhGia,
        chuaKhieuNai: true
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })


    const columns = useKhieuNai_DanhGiaTableColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })

    useEffect(() => {
        (async () => {
            if (khieuNaiContext.danhGiaModalVisible) {
                khieuNaiContext.setLoading(true)
                const res = await danhGiaCanBoServiceApi.Search(searchParams)
                if (res.status == 200) {
                    setDanhGias(res.data.data)
                    setTotalCount(res.data.totalCount)
                } else {
                    toast.error("Lỗi lấy thông tin đánh giá")
                }
                khieuNaiContext.setLoading(false)
            }
        })()
    }, [searchParams, khieuNaiContext.danhGiaModalVisible])

    const handlerCancel = () => {
        khieuNaiContext.setDanhGiaModalVisible(false)

    }

    return (
        <AntdModal className="" visible={khieuNaiContext.danhGiaModalVisible} title={"Danh sách đánh giá"} fullsizeScrollable handlerCancel={handlerCancel}
            style={{zIndex: 500}}    
        footer={[
                <Button key="back" onClick={handlerCancel} loading={khieuNaiContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            ]}
        >
            <div className="ToanBoChamDiemSwapper">
                <Spin spinning={khieuNaiContext.loading}
                    indicator={<LoadingOutlined spin />}
                >
                    <AntdSpace direction="vertical" style={{ width: "100%" }}>
                        <SearhDanhGiaKhieuNaiTableModal searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={[]} defaultVisible={true} />
                        <AntdTable
                            columns={columns}
                            dataSource={danhGias}
                            pagination={{
                                total: totalCount
                            }}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            onSearch={() => { }}
                        />
                    </AntdSpace>
                    <ReadOnlyDanhGiaDetailModal />
                </Spin>
            </div>
        </AntdModal>);
}


export default DanhGiaKhieuNaiTableModal;