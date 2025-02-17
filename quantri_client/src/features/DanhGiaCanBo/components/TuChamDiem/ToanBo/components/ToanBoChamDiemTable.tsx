import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import DanhGiaDetailModal from "./TuChamDiemDetailModal/DanhGiaDetailModal";
import '../../../common/PhieuChamDiem.scss'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { Button, Popconfirm, Spin } from "antd";
import { BranchesOutlined, CloseCircleFilled, CloseCircleOutlined, DeleteOutlined, DeliveredProcedureOutlined, EditOutlined, EyeOutlined, FileAddOutlined, FileDoneOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useDanhGiaTableColumn } from "../hooks/useDanhGiaTableColumn";
import { DanhGiaProvider, useDanhGiaContext } from "../contexts";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { DanhGiaCommonSearch } from "../../../common/DanhGiaCommonSearch";
import VetXuLyDanhGiaTable from "../../../common/VetXuLyModal/VetXuLyDanhGiaTable";
import TraLaiChamDiemModal from "../../../common/components/TralaiChamDiem/TraLaiChamDiemModal";
import ReadOnlyDanhGiaDetailModal from "../../../common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { YEAR } from "@/data";
import * as XLSX from 'xlsx';
import { DanhGiaToanBoCommonSearch } from "../../../common/DanhGiaToanBoCommonSearch";
import ThuHoiChamDiemModal from "../../../common/components/ThuHoiChamDiem/ThuHoiChamDiemModal";

import { saveAs } from 'file-saver';
import CapNhatTuChamDiemDetailModal from "./TuChamDiemDetailModal/CapNhatDiemTuDanhGia/CapNhatDanhGiaDetailModal";
import { CapNhatDanhGiaProvider, useCapNhatChamDiemContext } from "../contexts/useCapNhatChamDiemContext";
import LichSuDanhGiaModal from "../../../common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "../../../common/DanhGiaCommon";
import { TableRowSelection } from "antd/es/table/interface";
import XuatDanhGiaCaNhanModal from "../../../common/components/XuatDanhGiaCaNhan/XuatDanhGiaCaNhanModal";
import { KhieuNaiDanhGiaProvider, useKhieuNaiDanhGiaContext } from "../../../KhieuNaiKienNghiDanhGia/contexts/useKhieuNaiKienNghiContext";
import ThemDanhGiaKhieuNaiDetailModal from "../../../KhieuNaiKienNghiDanhGia/components/DanhGiaKhieuNai/ThemKhieuNaiDanhGia/ThemDanhGiaKhieuNaiDetailModal";
import { TrangThai_DaDanhGia, TrangThai_DangDanhGia } from "../../../common/TenVetXuLyConstants";


function ToanBoChamDiemTable() {
    const buttonActionContext = useButtonActionContext()
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [khieuNaiId, setKhieuNaiId] = useState<string>()
    const [trangThaiKhieuNai, setTrangThaiKhieuNai] = useState<string>()
    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        // trangThai: 'Đang đánh giá',
        loaiDanhGia: 'Cá nhân',
        loaiNgay: 'TuDanhGia',
        getDataCurrentUser: true,
    }

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useDanhGiaContext()
    const tableActions: DanhGiaTableActions[] = useMemo(() => [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <EditOutlined title="Cập nhật chấm điểm"
                onClick={() => {
                    buttonActionContext.setCapNhatDanhGiaModalVisible(true)
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
            icon: <UndoOutlined title="Thu hồi chấm điểm"
                onClick={() => {
                    buttonActionContext.setThuHoiChamDiemModalVisible(true)
                }} />
            ,
            key: 'ThuHoi'
        },
        {
            icon: <Popconfirm
                title='Xoá?'
                onConfirm={async () => {
                    buttonActionContext.setLoading(true)
                    if (!buttonActionContext.danhGiaId) {
                        toast.error('Không có ID của phiếu cần xóa')
                        return
                    }
                    const resDelete = await danhGiaCanBoServiceApi.Delete({ id: buttonActionContext.danhGiaId, forceDelete: false })

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
    ], [buttonActionContext.danhGiaId, khieuNaiId, trangThaiKhieuNai])


    const columns = useDanhGiaTableColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions, setKhieuNaiId, setTrangThaiKhieuNai })

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
        <AntdButton className="DuyetChamDiemButton" icon={<FileAddOutlined />} onClick={() => buttonActionContext.setDanhGiaModalVisible(true)}>Thêm mới</AntdButton>,
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
        //     // disabled: !(record.trangThai == TrangThai_DaDanhGia && record.urlPdf),
        //     disabled: !(record.trangThai == TrangThai_DangDanhGia),
        // }),
    };

    return (<div className="ToanBoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaToanBoCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} setLoading={buttonActionContext.setLoading} />
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
            <DanhGiaDetailModal />
            <CapNhatTuChamDiemDetailModal />
            <ThuHoiChamDiemModal reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
            <ReadOnlyDanhGiaDetailModal />
            <LichSuDanhGiaModal />
            <XuatDanhGiaCaNhanModal />
            <ThemDanhGiaKhieuNaiDetailModal />
        </Spin>
    </div>);
}

const ToanBoChamDiemTableSwapper = () => (
    <ButtonActionProvider>
        <DanhGiaProvider>
            <CapNhatDanhGiaProvider>
                <KhieuNaiDanhGiaProvider>
                    <ToanBoChamDiemTable />
                </KhieuNaiDanhGiaProvider>
            </CapNhatDanhGiaProvider>
        </DanhGiaProvider>
    </ButtonActionProvider>
);


export default ToanBoChamDiemTableSwapper;