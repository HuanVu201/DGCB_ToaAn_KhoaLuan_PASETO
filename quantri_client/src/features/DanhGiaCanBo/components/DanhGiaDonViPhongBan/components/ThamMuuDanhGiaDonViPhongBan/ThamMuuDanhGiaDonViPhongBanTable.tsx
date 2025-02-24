import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo, ISearchDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { Button, Popconfirm, Spin } from "antd";
import { CheckOutlined, CloseCircleOutlined, EditOutlined, EyeOutlined, FileDoneOutlined, LoadingOutlined, RollbackOutlined, UndoOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ButtonActionProvider, useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import VetXuLyDanhGiaTable from "@/features/DanhGiaCanBo/components/common/VetXuLyModal/VetXuLyDanhGiaTable";
import { DanhGiaCommonSearch } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommonSearch";
import TraLaiChamDiemModal from "@/features/DanhGiaCanBo/components/common/components/TralaiChamDiem/TraLaiChamDiemModal";
import { TableRowSelection } from "antd/es/table/interface";
import ReadOnlyDanhGiaDetailModal from "@/features/DanhGiaCanBo/components/common/components/ReadOnLyDanhGia/components/ReadOnLyDanhGiaDetailModal";
import { useAppSelector } from "@/lib/redux/Hooks";
import { YEAR } from "@/data";
import DuyetChamDiemModal from "@/features/DanhGiaCanBo/components/common/components/DuyetChamDiem/DuyetChamDiemModal";
import LichSuDanhGiaModal from "@/features/DanhGiaCanBo/components/common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { DanhGiaTableActions } from "@/features/DanhGiaCanBo/components/common/DanhGiaCommon";
import { ThamMuuDanhGiaDonViPhongBanProvider, useThamMuuDanhGiaDonViPhongBanContext } from "../../contexts/useThamMuuDanhGiaDonViPhongBanContext";
import { useTableThamMuuDanhGiaDonViPhongBanColumn } from "../../hooks/useTableThamMuuDanhGiaDonViPhongBanColumn";
import ThamMuuDanhGiaDonViPhongBanDetailModal from "./ThamMuuDanhGiaDonViPhongBanDetailModal/ThamMuuDGDVPBDetailModal";
import { danhGiaDonViServiceApi } from "../../services/DanhGiaDonViService";
import ReadOnLyDanhGiaDonViPhongBanDetailModal from "../ReadonlyDanhGiaDonViPhongBan/ReadOnLyDanhGiaDonViPhongBanDetailModal";
import { useSearchParams } from "react-router-dom";
import { TrangThai_ChoDanhGia, TrangThai_ChoThamMuu, TrangThai_DaDanhGia, TrangThai_DangDanhGia } from "../../../common/TenVetXuLyConstants";
import XuatDanhGiaPhongBanDonViModal from "../XuatDanhGiaPhongBanDonVi/XuatDanhGiaPhongBanDonViModal";


function ThamMuuDanhGiaDonViPhongBanTable() {
    const buttonActionContext = useButtonActionContext()
    const { parseToken } = useAppSelector((state) => state.auth);
    const [danhGias, setDanhGias] = useState<IDanhGiaCanBo[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const [queryStringParams, setQueryStringParams] = useSearchParams();
    const trangThai = queryStringParams.get('TrangThai');

    useEffect(() => {
        if (trangThai) {
            setSearchParams({ ...searchParams, trangThai: trangThai, trangThais: [trangThai] })
        }
    }, [trangThai])

    const searchParamOrigins: ISearchDanhGiaCanBo = {
        pageNumber: 1, pageSize: 10,
        trangThais: [TrangThai_ChoThamMuu, TrangThai_ChoDanhGia, TrangThai_DaDanhGia],
        loaiNgay: 'ThamMuu',
        type: 'ThamMuuDanhGia',
        // filterByUserRole: true,
        thoiGianQuery: YEAR.toString(),
        maDonVi: parseToken?.officeCode,
        toanBoDonVi: true
    }

    console.log('parseToken?.officeCode', parseToken?.officeCode)

    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCanBo>({ ...searchParamOrigins })
    const danhGiaContext = useThamMuuDanhGiaDonViPhongBanContext()

    const tableActions: DanhGiaTableActions[] = useMemo(() => [
        {
            icon: <EyeOutlined title="Xem chi tiết"
                onClick={() => {
                    buttonActionContext.setReadOnlyDanhGiaDonViPhongBanModalVisible(true)
                }} />,
            key: 'XemChiTietDanhGia'
        },
        {
            icon: <EditOutlined title="Tham mưu chấm điểm"
                onClick={() => {

                    buttonActionContext.setThamMuuDanhGiaDonViPhongBanModalVisible(true)
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
        //     icon: <RollbackOutlined title="Trả lại chấm điểm"
        //         onClick={() => {
        //             buttonActionContext.setTraLaiChamDiemModalVisible(true)
        //         }} />
        //     ,
        //     key: 'TraLai'
        // },
        {
            icon: <Popconfirm
                title='Xoá điểm đã chấm?'
                onConfirm={async () => {
                    buttonActionContext.setLoading(true)
                    if (!buttonActionContext.danhGiaId) {
                        toast.error('Không có ID của phiếu cần xóa')
                        return
                    }
                    const resDelete = await danhGiaDonViServiceApi.XoaDiemLanhDaoCham({
                        danhGiaId: buttonActionContext.danhGiaId,
                        loaiDiem: 'ThamMuu'
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


    const columns = useTableThamMuuDanhGiaDonViPhongBanColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10, tableActions })

    useEffect(() => {
        (async () => {
            console.log('searchParams', searchParams)
            if (!searchParams.maDonVi) {
                toast.error("Không có thông tin đơn vị người dùng hiện tại")
                return
            }

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


    return (<div className="LanhDaoChoChamDiemSwapper">
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <DanhGiaCommonSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} typeNgaySearch="chấm điểm" setLoading={buttonActionContext.setLoading} isDanhGiaDonVi={true} />
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
            {/* <VetXuLyDanhGiaTable /> */}
            <ThamMuuDanhGiaDonViPhongBanDetailModal />
            <TraLaiChamDiemModal reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} />
            <ReadOnLyDanhGiaDonViPhongBanDetailModal />
            <VetXuLyDanhGiaTable typeDonVi={true} />
            <XuatDanhGiaPhongBanDonViModal />
            {/* <ReadOnlyDanhGiaDetailModal />
            <DuyetChamDiemModal loaiDiem="ThamMuu" reload={danhGiaContext.reload} setReload={danhGiaContext.setReload} /> */}
        </Spin>
    </div>);
}

const ThamMuuDanhGiaDonViPhongBanTableSwapper = () => (
    <ButtonActionProvider>
        <ThamMuuDanhGiaDonViPhongBanProvider>
            <ThamMuuDanhGiaDonViPhongBanTable />
        </ThamMuuDanhGiaDonViPhongBanProvider>
    </ButtonActionProvider>
);


export default ThamMuuDanhGiaDonViPhongBanTableSwapper;