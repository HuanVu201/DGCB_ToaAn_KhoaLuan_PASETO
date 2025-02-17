import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import '../../../common/PhieuChamDiem.scss'
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { Button, Popconfirm, Spin } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddOutlined, FileDoneOutlined, LoadingOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import VetXuLyDanhGiaTable from "../../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import ReadOnlyDanhGiaDetailModal from "../../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { DanhGiaToanBoCommonSearch } from "../../../common/DanhGiaToanBoCommonSearch";
import ThuHoiChamDiemModal from "../../../common/components/ThuHoiChamDiem/ThuHoiChamDiemModal";
import LichSuDanhGiaModal from "../../../common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "../../../common/DanhGiaCommon";
import { TableRowSelection } from "antd/es/table/interface";
import XuatDanhGiaCaNhanModal from "../../../common/components/XuatDanhGiaCaNhan/XuatDanhGiaCaNhanModal";
import { TaoDanhGiaDonViPhongBanrovider, useTaoDanhGiaDonViPhongBanContext } from "../../contexts/useTaoDanhGiaDonViPhongBanContext";
import { CapNhatDanhGiaDonViPhongBanProvider } from "../../contexts/useCapNhatDanhGiaDonViPhongBanContext";
import { useTableToanBoDanhGiaDonViPhongBanColumn } from "../../hooks/useTableToanBoDanhGiaDonViPhongBanColumn";
import { danhGiaDonViServiceApi } from "../../services/DanhGiaDonViService";
import DanhGiaDonViPhongBanDetailModal from "./TaoDanhGiaDonViPhongBanDetailModal/DanhGiaDonViPhongBanDetailModal";
import CapNhatDanhGiaDonViPhongBanDetailModal from "../CapNhatDanhGiaDonViPhongBan/CapNhatDanhGiaDonViPhongBanDetailModal";
import ReadOnLyDanhGiaDonViPhongBanDetailModal from "../ReadonlyDanhGiaDonViPhongBan/ReadOnLyDanhGiaDonViPhongBanDetailModal";
import XuatDanhGiaPhongBanDonViModal from "../XuatDanhGiaPhongBanDonVi/XuatDanhGiaPhongBanDonViModal";
import { TrangThai_DaDanhGia, TrangThai_DangDanhGia } from "../../../common/TenVetXuLyConstants";


function DanhGiaDonViPhongBanTable() {
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        loaiNgay: 'TuDanhGia',
        getDataCurrentUser: true,
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useTaoDanhGiaDonViPhongBanContext()
    const tableActions: DanhGiaTableActions[] = useMemo(() => [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaDonViPhongBanModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <EditOutlined title="Cập nhật chấm điểm"
                onClick={() => {
                    buttonActionContext.setCapNhatDanhGiaDonViPhongBanModalVisible(true)
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
        // {
        //     icon: <UndoOutlined title="Thu hồi chấm điểm"
        //         onClick={() => {
        //             buttonActionContext.setThuHoiChamDiemModalVisible(true)
        //         }} />
        //     ,
        //     key: 'ThuHoi'
        // },
        {
            icon: <Popconfirm
                title='Xoá?'
                onConfirm={async () => {
                    buttonActionContext.setLoading(true)
                    if (!buttonActionContext.danhGiaId) {
                        toast.error('Không có ID của phiếu cần xóa')
                        return
                    }
                    const resDelete = await danhGiaDonViServiceApi.Delete({ id: buttonActionContext.danhGiaId, forceDelete: false })

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
                <DeleteOutlined title="Xóa đánh giá chấm điểm" />
            </Popconfirm>,
            key: 'XoaDanhGia'
        },
    ], [buttonActionContext.danhGiaId])


    const columns = useTableToanBoDanhGiaDonViPhongBanColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

    useEffect(() => {
        (async () => {
            buttonActionContext.setLoading(true)
            const res = await danhGiaDonViServiceApi.Search(searchParams)
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
        <AntdButton className="DuyetChamDiemButton" icon={<FileAddOutlined />} onClick={() => buttonActionContext.setDanhGiaDonViPhongBanModalVisible(true)}>Thêm mới</AntdButton>,
        <AntdButton className="XuatDanhGiaButton" icon={<FileDoneOutlined />} onClick={() => {
            if (buttonActionContext.selectedDanhGias && buttonActionContext.selectedDanhGias.length == 1) {
                buttonActionContext.setInDanhGiaPhongBanDonViModalVisible(true)
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
        //     disabled: !(record.trangThai == TrangThai_DangDanhGia),
        //     // disabled: !(record.trangThai == TrangThai_DaDanhGia && record.urlPdf),
        // }),
    };

    return (<div className="ToanBoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaToanBoCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} setLoading={buttonActionContext.setLoading} isDanhGiaDonVi={true}/>
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
            <DanhGiaDonViPhongBanDetailModal />
            <CapNhatDanhGiaDonViPhongBanDetailModal />
            <ReadOnLyDanhGiaDonViPhongBanDetailModal />
            <VetXuLyDanhGiaTable typeDonVi={true} />
            <XuatDanhGiaPhongBanDonViModal />
        </Spin>
    </div>);
}

const DanhGiaDonViPhongBanTableSwapper = () => (
    <ButtonActionProvider>
        <TaoDanhGiaDonViPhongBanrovider>
            <CapNhatDanhGiaDonViPhongBanProvider>
                <DanhGiaDonViPhongBanTable />
            </CapNhatDanhGiaDonViPhongBanProvider>
        </TaoDanhGiaDonViPhongBanrovider>
    </ButtonActionProvider>
);


export default DanhGiaDonViPhongBanTableSwapper;