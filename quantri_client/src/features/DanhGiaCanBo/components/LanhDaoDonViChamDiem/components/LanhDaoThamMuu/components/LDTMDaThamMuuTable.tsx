import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, FileDoneOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";

import { YEAR } from "@/data";
import { LanhDaoThamMuuChamDiemProvider, useLanhDaoThamMuuChamDiemContext } from "../contexts/useLDTMChamDiemContext";
import { DanhGiaCommonSearch } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommonSearch";
import VetXuLyDanhGiaTable from "@/features/DanhGiaCanBo/components/common/VetXuLyModal/VetXuLyDanhGiaTable";
import ReadOnlyDanhGiaDetailModal from "@/features/DanhGiaCanBo/components/common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { useLDTMDaThamMuuColumn } from "../hooks/useLDTMDaThamMuuColumn";
import ThuHoiChamDiemModal from "@/features/DanhGiaCanBo/components/common/components/ThuHoiChamDiem/ThuHoiChamDiemModal";
import LichSuDanhGiaModal from "@/features/DanhGiaCanBo/components/common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { useAppSelector } from "@/lib/redux/Hooks";
import { TableRowSelection } from "antd/es/table/interface";
import { TrangThai_DaDanhGia } from "@/features/DanhGiaCanBo/components/common/TenVetXuLyConstants";
import XuatDanhGiaCaNhanModal from "@/features/DanhGiaCanBo/components/common/components/XuatDanhGiaCaNhan/XuatDanhGiaCaNhanModal";

function LanhDaoThamMuuDaChamDiemTable() {
    const { parseToken } = useAppSelector((state) => state.auth);
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'ThamMuu',
        type: 'ThamMuuDanhGia',
        thoiGianQuery: YEAR.toString(),
        filterByUserRole: false,
        maDonVi: parseToken?.officeCode,
        toanBoDonVi: true
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useLanhDaoThamMuuChamDiemContext()

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

    const columns = useLDTMDaThamMuuColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

    useEffect(() => {
        (async () => {
            if (!searchParams.maDonVi) {
                toast.error("Không có thông tin đơn vị người dùng hiện tại")
                return
            }
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
        //     disabled: !(record.trangThai == TrangThai_DaDanhGia),
        //     // disabled: !(record.trangThai == TrangThai_DaDanhGia && record.urlPdf),
        // }),
    };

    return (<div className="LanhDaoChoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} typeNgaySearch="tham mưu" setLoading={buttonActionContext.setLoading} />
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

const LanhDaoThamMuuDaChamDiemTableSwapper = () => (
    <ButtonActionProvider>
        <LanhDaoThamMuuChamDiemProvider>
            <LanhDaoThamMuuDaChamDiemTable />
        </LanhDaoThamMuuChamDiemProvider>
    </ButtonActionProvider>
);


export default LanhDaoThamMuuDaChamDiemTableSwapper;