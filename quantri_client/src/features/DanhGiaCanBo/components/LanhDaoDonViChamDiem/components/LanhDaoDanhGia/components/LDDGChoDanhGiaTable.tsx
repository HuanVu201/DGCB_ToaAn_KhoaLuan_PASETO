import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";

import VetXuLyDanhGiaTable from "@/features/DanhGiaCanBo/components/common/VetXuLyModal/VetXuLyDanhGiaTable";
import { DanhGiaCommonSearch } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommonSearch";
import { LanhDaoDanhGiaChamDiemProvider, useLanhDaoDanhGiaChamDiemContext } from "../contexts/useLDDGChamDiemContext";
import LanhDaoDanhGiaChamDiemDetailModal from "./LanhDaoDanhGiaDetailModal/LDDGDanhGiaDetailModal";
import TraLaiChamDiemModal from "@/features/DanhGiaCanBo/components/common/components/TralaiChamDiem/TraLaiChamDiemModal";
import { TableRowSelection } from "antd/es/table/interface";
import ReadOnlyDanhGiaDetailModal from "@/features/DanhGiaCanBo/components/common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { useAppSelector } from "@/lib/redux/Hooks";
import { YEAR } from "@/data";
import { useLDDGChoDanhGiaColumn } from "../hooks/useLDDGChoDanhGiaColumn";
import DuyetChamDiemModal from "@/features/DanhGiaCanBo/components/common/components/DuyetChamDiem/DuyetChamDiemModal";
import LichSuDanhGiaModal from "@/features/DanhGiaCanBo/components/common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { TrangThai_ChoDanhGia } from "@/features/DanhGiaCanBo/components/common/TenVetXuLyConstants";



function LanhDaoDanhGiaChoChamDiemTable() {
    const buttonActionContext = useButtonActionContext()
    const { parseToken } = useAppSelector((state) => state.auth);
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        trangThai: TrangThai_ChoDanhGia,
        loaiNgay: 'TuDanhGia',
        filterByUserRole: true,
        thoiGianQuery: YEAR.toString(),
        type: 'DanhGia',
        maDonVi: parseToken?.officeCode,
        toanBoDonVi: true
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useLanhDaoDanhGiaChamDiemContext()

    const tableActions: DanhGiaTableActions[] = useMemo(() => [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <EditOutlined title="Chấm điểm"
                onClick={() => {
                    buttonActionContext.setLanhDaoDanhGiaChamDiemModalVisible(true)
                }} />,
            key: 'CapNhat'
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
            icon: <RollbackOutlined title="Trả lại chấm điểm"
                onClick={() => {
                    buttonActionContext.setTraLaiChamDiemModalVisible(true)
                }} />
            ,
            key: 'TraLai'
        },
        {
            icon: <Popconfirm
                title='Xoá điểm đã chấm?'
                onConfirm={async () => {
                    buttonActionContext.setLoading(true)
                    if (!buttonActionContext.danhGiaId) {
                        toast.error('Không có ID của phiếu cần xóa')
                        return
                    }
                    const resDelete = await danhGiaCanBoServiceApi.XoaDiemLanhDaoCham({
                        danhGiaId: buttonActionContext.danhGiaId,
                        loaiDiem: 'DanhGia'
                    })

                    if (resDelete.data.succeeded) {
                        toast.success(resDelete.data.message)
                        danhGiaContext.setReload(!danhGiaContext.reload)
                    } else {
                        toast.error("Thao tác thất bại")
                        buttonActionContext.setLoading(false)
                    }
                    buttonActionContext.setDanhGiaId(undefined)
                    buttonActionContext.setLoading(false)
                }}
                okText='Xoá'
                cancelText='Huỷ'
            >
                <CloseCircleOutlined title='Xoá điểm đã chấm' />
            </Popconfirm>,
            key: 'XoaDiemDaCham'
        },
    ], [buttonActionContext.danhGiaId])

    const columns = useLDDGChoDanhGiaColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

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
        <AntdButton className="DuyetChamDiemButton"
            title="Chỉ duyệt phiếu đã lưu chấm điểm"
            onClick={() => {
                if (buttonActionContext.selectedDanhGias.length > 0)
                    buttonActionContext.setDuyetChamDiemModalVisible(true)
                else toast.info("Chưa chọn đánh giá để thực hiện duyệt")
            }}
            icon={<CheckOutlined />}
        > Duyệt chấm điểm</AntdButton>,
    ];

    const rowSelection: TableRowSelection<IDanhGiaCanBo> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedDanhGias(selectedRowKeys);
        },
        selectedRowKeys: buttonActionContext.selectedDanhGias,
        getCheckboxProps: (record) => ({
            disabled: record.diemLanhDaoDanhGia === null,
        }),
    };


    return (<div className="LanhDaoChoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} typeNgaySearch="chấm điểm" setLoading={buttonActionContext.setLoading} />
                <AntdTable
                    columns={columns}
                    dataSource={danhGias}
                    pagination={{
                        total: totalCount
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
            </AntdSpace>
            <VetXuLyDanhGiaTable />
            <LanhDaoDanhGiaChamDiemDetailModal />
            <TraLaiChamDiemModal reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
            <ReadOnlyDanhGiaDetailModal />
            <DuyetChamDiemModal loaiDiem="DanhGia" reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
        </Spin>
    </div>);
}

const LanhDaoDanhGiaChoChamDiemTableSwapper = () => (
    <ButtonActionProvider>
        <LanhDaoDanhGiaChamDiemProvider>
            <LanhDaoDanhGiaChoChamDiemTable />
        </LanhDaoDanhGiaChamDiemProvider>
    </ButtonActionProvider>
);


export default LanhDaoDanhGiaChoChamDiemTableSwapper;