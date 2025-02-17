import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, FileDoneOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { DanhGiaCommonSearch } from "../../common/DanhGiaCommonSearch";
import VetXuLyDanhGiaTable from "../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import LanhDaoTrucTiepChamDiemDetailModal from "./LanhDaoChamDiemDetailModal/LDNXDanhGiaDetailModal";
import { LanhDaoTrucTiepChamDiemProvider, useLanhDaoTrucTiepChamDiemContext } from "../contexts/useLDNXChamDiemContext";
import { useLDNXDanhGiaTableColumn } from "../hooks/useLDNXChoDanhGiaColumn";
import TraLaiChamDiemModal from "../../common/components/TralaiChamDiem/TraLaiChamDiemModal";
import { TableRowSelection } from "antd/es/table/interface";
import { IDanhGia } from "../../common/models/phieuDanhGia";
import ReadOnlyDanhGiaDetailModal from "../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { YEAR } from "@/data";
import { useLDNXDaDanhGiaTableColumn } from "../hooks/useLDNXDaDanhGiaColumn";
import ThuHoiChamDiemModal from "../../common/components/ThuHoiChamDiem/ThuHoiChamDiemModal";
import LichSuDanhGiaModal from "../../common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "../../common/DanhGiaCommon";
import { TrangThai_ChoNhanXet, TrangThai_DaDanhGia, TrangThai_DangDanhGia } from "../../common/TenVetXuLyConstants";
import XuatDanhGiaCaNhanModal from "../../common/components/XuatDanhGiaCaNhan/XuatDanhGiaCaNhanModal";

function LanhDaoDaChamDiemTable() {
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'NhanXet',
        type: 'NhanXetDanhGia',
        filterByUserRole: false,
        thoiGianQuery: YEAR.toString(),
        // filterByUserRole: true
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useLanhDaoTrucTiepChamDiemContext()

    const tableActions: DanhGiaTableActions[] = useMemo(() => [
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
    ], [buttonActionContext.danhGiaId])

    const columns = useLDNXDaDanhGiaTableColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

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

        <AntdButton className="XuatDanhGiaButton" icon={<FileDoneOutlined />} onClick={() => {
            if (buttonActionContext.selectedDanhGias && buttonActionContext.selectedDanhGias.length == 1) {
                buttonActionContext.setInDanhGiaCaNhanModalVisible(true)
            } else {
                toast.info("Chọn đánh giá cần xuất thông tin")
            }
        }}>Xuất phiếu đánh giá</AntdButton>,
    ];


    const rowSelection: TableRowSelection<IDanhGiaCanBo> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedDanhGias(selectedRowKeys);
        },
        selectedRowKeys: buttonActionContext.selectedDanhGias,
        // getCheckboxProps: (record) => ({
        //     disabled: record.trangThai == TrangThai_DangDanhGia || record.trangThai == TrangThai_ChoNhanXet,
        //     // disabled: !(record.trangThai == TrangThai_DaDanhGia && record.urlPdf),
        // }),
    };

    return (<div className="LanhDaoChoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} typeNgaySearch="nhận xét" setLoading={buttonActionContext.setLoading} />
                <AntdTable
                    columns={columns}
                    dataSource={danhGias}
                    pagination={{
                        total: totalCount
                    }}
                    rowSelection={{ type: 'radio', ...rowSelection }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
            </AntdSpace>
            <VetXuLyDanhGiaTable />
            <ThuHoiChamDiemModal reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
            <ReadOnlyDanhGiaDetailModal />
            <XuatDanhGiaCaNhanModal />
        </Spin>
    </div>);
}

const LanhDaoDaChamDiemTableSwapper = () => (
    <ButtonActionProvider>
        <LanhDaoTrucTiepChamDiemProvider>
            <LanhDaoDaChamDiemTable />
        </LanhDaoTrucTiepChamDiemProvider>
    </ButtonActionProvider>
);


export default LanhDaoDaChamDiemTableSwapper;