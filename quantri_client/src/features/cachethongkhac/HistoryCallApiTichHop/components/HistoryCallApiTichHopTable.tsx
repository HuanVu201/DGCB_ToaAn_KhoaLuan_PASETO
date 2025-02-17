import { useState } from "react"
import { AntdTable,AntdSpace, AntdModal } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchHistoryCallApiTichHop } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchHistoryCallApiTichHop } from "../redux/action"
import { HistoryCallApiTichHopSearch } from "./HistoryCallApiTichHopSearch"
import { HistoryCallApiTichHopProvider } from "../contexts/HistoryCallApiTichHopContext"
import { HistoryCallApiTichHopDetail } from "./HistoryCallApiTichHopDetail"
import { useShareDuLieuDanhGiaContext } from "../../ShareDuLieuDanhGia/contexts/ShareDuLieuDanhGiaContext"

const HistoryCallApiTichHopTable = () => {
    const dispatch = useAppDispatch()
    const shareDuLieuDanhGiaContext = useShareDuLieuDanhGiaContext();
    const { datas: historyCallApiTichHops, count } = useAppSelector(state => state.historycallapitichhop)
    const [searchParams, setSearchParams] = useState<ISearchHistoryCallApiTichHop>({ pageNumber: 1, pageSize: 50,tableName:"DanhGia"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const handleCancel = () => {
        shareDuLieuDanhGiaContext.setHistoryCallApiTichHopModalVisible(false)
        shareDuLieuDanhGiaContext.setShareDuLieuDanhGiaId(undefined)
    };
    return (
        <>
        <AntdModal title={shareDuLieuDanhGiaContext.shareDuLieuDanhGiaId ? `Lịch sử` : `Không có thông tin dữ liệu`} visible={shareDuLieuDanhGiaContext.historyCallApiTichHopModalVisible} handlerCancel={handleCancel} footer={null}>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                {/* <HistoryCallApiTichHopSearch setSearchParams={setSearchParams} /> */}
                <AntdTable
                    columns={columns}
                    dataSource={historyCallApiTichHops}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHistoryCallApiTichHop(params))}
                />
            </AntdSpace>
            <HistoryCallApiTichHopDetail/>
            </AntdModal>
        </>
            
    )
}
const HistoryCallApiTichHopTableWrapper = () => (
<HistoryCallApiTichHopProvider>
    <HistoryCallApiTichHopTable/>
</HistoryCallApiTichHopProvider>
)
export default HistoryCallApiTichHopTableWrapper