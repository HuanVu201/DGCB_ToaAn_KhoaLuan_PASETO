import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { FileAddOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/Hooks";
import '../../../common/PhieuChamDiem.scss'
import { KhieuNaiDanhGiaProvider, useKhieuNaiDanhGiaContext } from "../../contexts/useKhieuNaiKienNghiContext";
import { IKhieuNaiDanhGia, ISearchKhieuNaiDanhGia } from "../../model";
import { useKhieuNaiKienNghiColumn } from "../../hooks/useKhieuNaiKienNghiColumn";
import { KhieuNaiDanhGiaServiceApi } from "../../services";
import { KhieuNaiKienNghiSearch } from "../KhieuNaiKienNghiSearch";
import { ButtonActionProvider } from "../../../common/contexts/useButtonActionContext";
import { TableRowSelection } from "antd/es/table/interface";
import GuiKhieuNaiLenCapTrenModal from "./GuiCapTrenModal";
import DanhGiaKhieuNaiTableModal from "../DanhGiaKhieuNai/ThemKhieuNaiDanhGia/DanhGiaKhieuNaiTableModal";
import ThemDanhGiaKhieuNaiDetailModal from "../DanhGiaKhieuNai/ThemKhieuNaiDanhGia/ThemDanhGiaKhieuNaiDetailModal";

function KhieuNaiKienNghiTable() {
    const khieuNaiContext = useKhieuNaiDanhGiaContext()
    const [hoSos, setHoSos] = useState<IKhieuNaiDanhGia[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchKhieuNaiDanhGia = {
        pageNumber: 1, pageSize: 10,
        getDataCurrentUser: true
    }
    const [searchParams, setSearchParams] = useState<ISearchKhieuNaiDanhGia>({ ...searchParamOrigins })

    const columns = useKhieuNaiKienNghiColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })


    const extraButtons = [
        <AntdButton className="DuyetChamDiemButton" icon={<FileAddOutlined />}
            onClick={() => khieuNaiContext.setDanhGiaModalVisible(true)}
        >
            Thêm mới
        </AntdButton>,
        <AntdButton className="KhoiPhucChamDiemButton" icon={<SendOutlined color="#ffa500;"/>}
            title="Gửi kiến nghị lên cấp trên"
            onClick={() => {
                if (khieuNaiContext.selectedKhieuNais && khieuNaiContext.selectedKhieuNais.length > 0)
                    khieuNaiContext.setSendKhieuNaiModalVisible(true)
                else
                    toast.info('Vui lòng chọn kiến nghị cần gửi')
            }}
        >
            Gửi cấp trên
        </AntdButton>
    ];


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

    const rowSelection: TableRowSelection<IKhieuNaiDanhGia> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            khieuNaiContext.setSelectedKhieuNais(selectedRowKeys);
        },
        selectedRowKeys: khieuNaiContext.selectedKhieuNais,
        getCheckboxProps: (record) => ({
            disabled: record.trangThai !== 'Chờ gửi',
        }),
    };


    return (<div className="ToanBoDanhGiaDonViSwapper">
        <Spin spinning={khieuNaiContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <KhieuNaiKienNghiSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} />
                <AntdTable
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: totalCount
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                />
                <DanhGiaKhieuNaiTableModal />
                <ThemDanhGiaKhieuNaiDetailModal />

                {/* <KhieuNaiKienNghiModal /> */}
                <GuiKhieuNaiLenCapTrenModal />
            </AntdSpace>
        </Spin>
    </div>)
}

const KhieuNaiKienNghiTableSwapper = () => (
    <ButtonActionProvider>
        <KhieuNaiDanhGiaProvider>
            <KhieuNaiKienNghiTable />
        </KhieuNaiDanhGiaProvider>
    </ButtonActionProvider>
);


export default KhieuNaiKienNghiTableSwapper;