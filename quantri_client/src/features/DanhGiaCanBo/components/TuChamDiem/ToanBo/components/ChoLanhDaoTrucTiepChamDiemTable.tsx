import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import DanhGiaDetailModal from "./TuChamDiemDetailModal/DanhGiaDetailModal";
import '../../../common/PhieuChamDiem.scss'
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, LoadingOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { DanhGiaProvider, useDanhGiaContext } from "../contexts";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { DanhGiaCommonSearch } from "../../../common/DanhGiaCommonSearch";
import VetXuLyDanhGiaTable from "../../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import { YEAR } from "@/data";
import ReadOnlyDanhGiaDetailModal from "../../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { useChoLanhDaoTrucTiepChamDiemColumn } from "../hooks/useChoLanhDaoTrucTiepChamDiemColumn";
import LichSuDanhGiaModal from "../../../common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "../../../common/DanhGiaCommon";
import ThuHoiChamDiemModal from "../../../common/components/ThuHoiChamDiem/ThuHoiChamDiemModal";
import { TrangThai_ChoNhanXet } from "../../../common/TenVetXuLyConstants";
function ChoLanhDaoTrucTiepChamDiem() {
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        trangThai: TrangThai_ChoNhanXet,
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'TuDanhGia',
        getDataCurrentUser: true,
        thoiGianQuery: YEAR.toString(),
        type: 'TuDanhGia'
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useDanhGiaContext()
    const tableActions: DanhGiaTableActions[] = [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <UnorderedListOutlined title="Xem vết xử lý"
                onClick={() => {
                    buttonActionContext.setVetXuLyDanhGiaModalVisible(true)
                }} />
            ,
            key: 'VetXuLy'
        },
        {
            icon: <UndoOutlined title="Thu hồi chấm điểm"
                onClick={() => {
                    buttonActionContext.setThuHoiChamDiemModalVisible(true)
                }} />
            ,
            key: 'ThuHoi'
        },
    ]


    const columns = useChoLanhDaoTrucTiepChamDiemColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

    useEffect(() => {
        (async () => {
            buttonActionContext.setLoading(true)
            const res = await danhGiaCanBoServiceApi.Search(searchParams)
            if (res.status == 200) {
                setDanhGias(res.data.data)
                setTotalCount(res.data.totalCount)
            } else {
                toast.error("Lỗi lấy thông tin đánh giá")
            }
            buttonActionContext.setLoading(false)
        })()
    }, [searchParams, danhGiaContext.reload])

    const extraButtons = [
        <AntdButton onClick={() => buttonActionContext.setDanhGiaModalVisible(true)}>Thêm mới</AntdButton>
    ];

    return (<div className="ToanBoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={[]} typeNgaySearch="tự chấm điểm" setLoading={buttonActionContext.setLoading} />
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
            <VetXuLyDanhGiaTable />
            <DanhGiaDetailModal />
            <ReadOnlyDanhGiaDetailModal />
            <LichSuDanhGiaModal />
            <ThuHoiChamDiemModal reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
        </Spin>
    </div>);
}

const ChoLanhDaoTrucTiepChamDiemSwapper = () => (
    <ButtonActionProvider>
        <DanhGiaProvider>
            <ChoLanhDaoTrucTiepChamDiem />
        </DanhGiaProvider>
    </ButtonActionProvider>
);


export default ChoLanhDaoTrucTiepChamDiemSwapper;