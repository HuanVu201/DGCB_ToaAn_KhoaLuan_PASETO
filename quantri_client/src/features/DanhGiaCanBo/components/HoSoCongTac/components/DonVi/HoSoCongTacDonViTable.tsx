import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, FileAddOutlined, LoadingOutlined, PlusOutlined, RollbackOutlined, UndoOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";

import { HoSoCongTacSearch } from "../HoSoCongTacSearch";
import { useHoSoCongTacColumn } from "../../hooks/useHoSoCongTacColumn";
import '../../../common/PhieuChamDiem.scss'
import { HoSoCongTacDanhGiaProvider, useHoSoCongTacDanhGiaContext } from "../../contexts/useHoSoCongTacDanhGiaContext";
import HoSoCongTacDonViModal from "./HoSoCongTacDonViModal";
import ReadOnlyDanhGiaDetailModal from "../../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";

import { TrangThai_DaDanhGia } from "../../../common/TenVetXuLyConstants";
import { danhGiaDonViServiceApi } from "../../../DanhGiaDonViPhongBan/services/DanhGiaDonViService";

function HoSoCongTacDonViTable() {
    const hoSoContext = useHoSoCongTacDanhGiaContext()
    // const [hoSos, setHoSos] = useState<IHoSoCongTacDanhGia[]>()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiNgay: 'TuDanhGia',
        getDataCurrentUser: true,
        trangThai: TrangThai_DaDanhGia
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })

    const columns = useHoSoCongTacColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })

    useEffect(() => {
        (async () => {
            hoSoContext.setLoading(true)
            const res = await danhGiaDonViServiceApi.Search(searchParams)
            if (res.status == 200) {
                setDanhGias(res.data.data)
                setTotalCount(res.data.totalCount)
            } else {
                toast.error("Lỗi lấy thông tin đánh giá")
            }
            hoSoContext.setLoading(false)
        })()
    }, [searchParams, hoSoContext.reload])

    return (<div className="ToanBoDanhGiaDonViSwapper">
        <Spin spinning={hoSoContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <HoSoCongTacSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={[]} />
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
                <HoSoCongTacDonViModal />
                <ReadOnlyDanhGiaDetailModal />
            </AntdSpace>
        </Spin>
    </div>)
}

const HoSoCongTacDonViTableSwapper = () => (
    <ButtonActionProvider>
        <HoSoCongTacDanhGiaProvider>
            <HoSoCongTacDonViTable />
        </HoSoCongTacDanhGiaProvider>
    </ButtonActionProvider>
);


export default HoSoCongTacDonViTableSwapper;