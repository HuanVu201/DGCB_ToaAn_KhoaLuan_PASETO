import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { FileAddOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/Hooks";
import '../../../common/PhieuChamDiem.scss'
import { ButtonActionProvider } from "../../../common/contexts/useButtonActionContext";
import { GiaHanDanhGiaProvider, useGiaHanDanhGiaContext } from "../../contexts/useGiaHanDanhGiaContext";
import { IGiaHanDanhGia, ISearchGiaHanDanhGia } from "../../models";
import { useDanhSachGiaHanColumn } from "../../hooks/useDanhSachGiaHanColumn";
import { GiaHanDanhGiaServiceApi } from "../../services";
import { TableRowSelection } from "antd/es/table/interface";
import { GiaHanDanhGiaSearch } from "../SearchGiaHanDanhGia";
import GiaHanDanhGiaModal from "../GiaHanDanhGiaModal/DetailGiaHanDanhGiaModal";
import GuiYeuCauGiaHanModal from "../GiaHanDanhGiaModal/GuiYeuCauModal";

function DanhSachGiaHanDanhGiaTable() {
    const { parseToken } = useAppSelector((state) => state.auth);
    const giaHanContext = useGiaHanDanhGiaContext()
    const [hoSos, setHoSos] = useState<IGiaHanDanhGia[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchGiaHanDanhGia = {
        pageNumber: 1, pageSize: 10,
        maDonVi: parseToken?.officeCode
    }
    const [searchParams, setSearchParams] = useState<ISearchGiaHanDanhGia>({ ...searchParamOrigins })

    const columns = useDanhSachGiaHanColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })


    const extraButtons = [
        <AntdButton className="DuyetChamDiemButton" icon={<FileAddOutlined />}
            onClick={() => giaHanContext.setGiaHanModalVisible(true)}
        >
            Thêm mới
        </AntdButton>,
        <AntdButton className="KhoiPhucChamDiemButton" icon={<SendOutlined />}
            title="Gửi yêu cầu lên cấp trên"
            onClick={() => {
                if (giaHanContext.selectedGiaHans && giaHanContext.selectedGiaHans.length > 0)
                    giaHanContext.setGuiGiaHanModalVisible(true)
                else
                    toast.info('Vui lòng chọn yêu cầu cần gửi')
            }}
        >
            Gửi yêu cầu
        </AntdButton>
    ];


    useEffect(() => {
        (async () => {
            giaHanContext.setLoading(true)
            const res = await GiaHanDanhGiaServiceApi.Search(searchParams)
            if (res.status == 200) {
                setHoSos(res.data.data)
                setTotalCount(res.data.totalCount)
            } else {
                toast.error("Lỗi lấy thông tin gia hạn")
            }
            giaHanContext.setLoading(false)
        })()
    }, [searchParams, giaHanContext.reload])

    const rowSelection: TableRowSelection<IGiaHanDanhGia> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            giaHanContext.setSelectedGiaHans(selectedRowKeys);
        },
        selectedRowKeys: giaHanContext.selectedGiaHans,
        getCheckboxProps: (record) => ({
            disabled: record.trangThai !== 'Chờ gửi',
        }),
    };


    return (<div className="ToanBoDanhGiaDonViSwapper">
        <Spin spinning={giaHanContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <GiaHanDanhGiaSearch searchParams={searchParams} setSearchParams={setSearchParams} searchParamOrigins={searchParamOrigins} extraButtons={extraButtons} />
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
                <GiaHanDanhGiaModal />
                <GuiYeuCauGiaHanModal />
            </AntdSpace>
        </Spin>
    </div>)
}

const DanhSachGiaHanDanhGiaTableSwapper = () => (
    <ButtonActionProvider>
        <GiaHanDanhGiaProvider>
            <DanhSachGiaHanDanhGiaTable />
        </GiaHanDanhGiaProvider>
    </ButtonActionProvider>
);


export default DanhSachGiaHanDanhGiaTableSwapper;