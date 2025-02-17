import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Spin } from "antd";
import { DeliveredProcedureOutlined, EyeOutlined, FileAddOutlined, FileDoneOutlined, LoadingOutlined, OrderedListOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { DanhGiaCommonSearch } from "../../common/DanhGiaCommonSearch";
import VetXuLyDanhGiaTable from "../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import { TableRowSelection } from "antd/es/table/interface";
import ReadOnlyDanhGiaDetailModal from "../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { YEAR } from "@/data";
import { TTDVChamDiemProvider, useTTDVChamDiemContext } from "../contexts/useTTDVChamDiemContext";
import { useTTDVChamDiemTableColumn } from "../hooks/useTTDVChamDiemTableColumn";
import TTDVChamDiemDetailModal from "./TTDVChamDiemDetailModal/TTDVDanhGiaDetailModal";
import LichSuDanhGiaModal from "../../common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "../../common/DanhGiaCommon";
import { TrangThai_DaDanhGia } from "../../common/TenVetXuLyConstants";
import XuatDanhGiaCaNhanModal from "../../common/components/XuatDanhGiaCaNhan/XuatDanhGiaCaNhanModal";

function ChamDiemThuTruongDonViTable() {
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        trangThai: TrangThai_DaDanhGia,
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'DanhGia',
        getDataCurrentUser: true,
        differencePerson: true,
        truongDonVi: true,
        // thoiGianQuery: YEAR.toString(),
        type: 'DanhGia'
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useTTDVChamDiemContext()

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
    ], [buttonActionContext.danhGiaId])

    const columns = useTTDVChamDiemTableColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

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
        <AntdButton className="DuyetChamDiemButton" icon={<FileAddOutlined />} onClick={() => buttonActionContext.setThuTruongDonViChamDiemModalVisible(true)}>Thêm mới</AntdButton>,
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
            getCheckboxProps: (record) => ({
                disabled: !(record.trangThai == TrangThai_DaDanhGia ),
            }),
        };

    return (<div className="LanhDaoChoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} typeNgaySearch="chấm điểm" setLoading={buttonActionContext.setLoading}/>
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
            <TTDVChamDiemDetailModal />
            <ReadOnlyDanhGiaDetailModal />
            <LichSuDanhGiaModal />
            <XuatDanhGiaCaNhanModal />
        </Spin>
    </div>)
}

const ChamDiemThuTruongDonViTableSwapper = () => (
    <ButtonActionProvider>
        <TTDVChamDiemProvider>
            <ChamDiemThuTruongDonViTable />
        </TTDVChamDiemProvider>
    </ButtonActionProvider>
);


export default ChamDiemThuTruongDonViTableSwapper;