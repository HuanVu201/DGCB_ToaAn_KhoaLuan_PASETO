import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { CheckOutlined, FileAddOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/Hooks";
import '../../../common/PhieuChamDiem.scss'
import { ButtonActionProvider } from "../../../common/contexts/useButtonActionContext";
import { GiaHanDanhGiaProvider, useGiaHanDanhGiaContext } from "../../contexts/useGiaHanDanhGiaContext";
import { IGiaHanDanhGia, ISearchGiaHanDanhGia } from "../../models";
import { useDanhSachGiaHanColumn } from "../../hooks/useDanhSachGiaHanColumn";
import { GiaHanDanhGiaServiceApi } from "../../services";
import { TableRowSelection } from "antd/es/table/interface";
import { GiaHanDanhGiaSearch } from "../SearchGiaHanDanhGia";
import { useXuLyGiaHanColumn } from "../../hooks/useXuLyGiaHanColumn";
import XuLyYeuCauGiaHanModal from "../GiaHanDanhGiaModal/XuLyYeuCauModal";
import GiaHanDanhGiaModal from "../GiaHanDanhGiaModal/DetailGiaHanDanhGiaModal";

function XuLyGiaHanDanhGiaTable() {
    const { parseToken } = useAppSelector((state) => state.auth);
    const giaHanContext = useGiaHanDanhGiaContext()
    const [hoSos, setHoSos] = useState<IGiaHanDanhGia[]>()
    const [totalCount, setTotalCount] = useState<number>(0)
    const searchParamOrigins: ISearchGiaHanDanhGia = {
        pageNumber: 1, pageSize: 10,
        maDonViCha: parseToken?.officeCode,
        filterByUserRole: true
    }
    const [searchParams, setSearchParams] = useState<ISearchGiaHanDanhGia>({ ...searchParamOrigins })

    const columns = useXuLyGiaHanColumn({ pageNumber: searchParams.pageNumber ?? 1, pageSize: searchParams.pageSize ?? 10 })


    const extraButtons = [
        <AntdButton className="DuyetChamDiemButton" icon={<CheckOutlined />}
            onClick={() => {
                if (giaHanContext.selectedGiaHans && giaHanContext.selectedGiaHans.length > 0)
                    giaHanContext.setDuyetGiaHanModalVisible(true)
                else
                    toast.info('Vui lòng chọn yêu cầu cần duyệt')
            }}
            title="Duyệt yêu cầu gia hạn đánh giá"
        >
            Duyệt yêu cầu
        </AntdButton>,
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
            disabled: record.trangThai !== 'Chờ xử lý',
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
                <XuLyYeuCauGiaHanModal />
            </AntdSpace>
        </Spin>
    </div>)
}

const XuLyGiaHanDanhGiaTableSwapper = () => (
    <ButtonActionProvider>
        <GiaHanDanhGiaProvider>
            <XuLyGiaHanDanhGiaTable />
        </GiaHanDanhGiaProvider>
    </ButtonActionProvider>
);


export default XuLyGiaHanDanhGiaTableSwapper;