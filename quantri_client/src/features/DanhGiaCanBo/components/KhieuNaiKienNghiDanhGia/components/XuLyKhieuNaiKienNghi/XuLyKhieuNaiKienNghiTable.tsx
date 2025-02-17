import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/Hooks";
import '../../../common/PhieuChamDiem.scss'
import { KhieuNaiDanhGiaProvider, useKhieuNaiDanhGiaContext } from "../../contexts/useKhieuNaiKienNghiContext";
import { IKhieuNaiDanhGia, ISearchKhieuNaiDanhGia } from "../../model";
import { KhieuNaiDanhGiaServiceApi } from "../../services";
import { KhieuNaiKienNghiSearch } from "../KhieuNaiKienNghiSearch";
import { ButtonActionProvider } from "../../../common/contexts/useButtonActionContext";
import { useXuLyKhieuNaiKienNghiColumn } from "../../hooks/useXuLyKhieuNaiColumn";
import ThemDanhGiaKhieuNaiDetailModal from "../DanhGiaKhieuNai/ThemKhieuNaiDanhGia/ThemDanhGiaKhieuNaiDetailModal";
import XuLyDanhGiaKhieuNaiDetailModal from "../DanhGiaKhieuNai/XuLyKhieuNaiDanhGia/XuLyDanhGiaKhieuNaiDetailModal";
import { useSearchParams } from "react-router-dom";

function XuLyKhieuNaiKienNghiTable() {
    const { parseToken } = useAppSelector((state) => state.auth);
    const khieuNaiContext = useKhieuNaiDanhGiaContext()
    const [hoSos, setHoSos] = useState<IKhieuNaiDanhGia[]>()
    const [totalCount, setTotalCount] = useState<number>(0)

    const searchParamOrigins: ISearchKhieuNaiDanhGia = {
        pageNumber: 1, pageSize: 10,
        maDonVi: parseToken?.officeCode,
        filterByUserRole: true
    }

    const [searchParams, setSearchParams] = useState<ISearchKhieuNaiDanhGia>({ ...searchParamOrigins })

    const columns = useXuLyKhieuNaiKienNghiColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })

    useEffect(() => {
        (async () => {
            khieuNaiContext.setLoading(true)
            const res = await KhieuNaiDanhGiaServiceApi.Search(searchParams)
            if (res.status == 200) {
                setHoSos(res.data.data)
                setTotalCount(res.data.totalCount)
            } else {
                toast.error("Lỗi lấy thông tin đánh giá")
            }
            khieuNaiContext.setLoading(false)
        })()
    }, [searchParams, khieuNaiContext.reload])



    return (<div className="ToanBoDanhGiaDonViSwapper">
        <Spin spinning={khieuNaiContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <KhieuNaiKienNghiSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={[]} />
                <AntdTable
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: totalCount
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
                {/* <XuLyKhieuNaiKienNghiModal /> */}
                <XuLyDanhGiaKhieuNaiDetailModal />
                <ThemDanhGiaKhieuNaiDetailModal />
            </AntdSpace>
        </Spin>
    </div>)
}

const KhieuNaiKienNghiTableSwapper = () => (
    <ButtonActionProvider>
        <KhieuNaiDanhGiaProvider>
            <XuLyKhieuNaiKienNghiTable />
        </KhieuNaiDanhGiaProvider>
    </ButtonActionProvider>
);


export default KhieuNaiKienNghiTableSwapper;