import { ComponentProps, useEffect, useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchShareDuLieuDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchShareDuLieuDanhGia } from "../redux/action"
import { ShareDuLieuDanhGiaSearch } from "./ShareDuLieuDanhGiaSearch"
import { ShareDuLieuDanhGiaProvider, useShareDuLieuDanhGiaContext } from "../contexts/ShareDuLieuDanhGiaContext"
import { ShareDuLieuDanhGiaDetail } from "./ShareDuLieuDanhGiaDetail"
import ShareDuLieuDanhGiaStepPagination from "./ShareDuLieuDanhGiaStepPagination "
import HistoryCallApiTichHopTableWrapper from "../../HistoryCallApiTichHop/components/HistoryCallApiTichHopTable"

const ShareDuLieuDanhGiaTable = ({extraSearchParams}:{extraSearchParams:ISearchShareDuLieuDanhGia}) => {
    const dispatch = useAppDispatch()
    const { datas: shareDuLieuDanhGias, count } = useAppSelector(state => state.sharedulieudanhgia)
    const [searchParams, setSearchParams] = useState<ISearchShareDuLieuDanhGia>({ pageNumber: 1, pageSize: 50 ,...extraSearchParams})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const shareDuLieuDanhGiaContext = useShareDuLieuDanhGiaContext();
    console.log(searchParams)
    console.log("ex : " , extraSearchParams)
    useEffect(() => {
        setSearchParams({ pageNumber: 1, pageSize: 50 ,...extraSearchParams})
        shareDuLieuDanhGiaContext.setTypeService(extraSearchParams.loaiDichVu)
    },[extraSearchParams])
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <ShareDuLieuDanhGiaSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={shareDuLieuDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchShareDuLieuDanhGia(params))}
                />
            </AntdSpace>
            <ShareDuLieuDanhGiaDetail loaiDichVu={extraSearchParams.loaiDichVu} />
            <HistoryCallApiTichHopTableWrapper/>    
           <ShareDuLieuDanhGiaStepPagination/>
        </>
            
    )
}
const ShareDuLieuDanhGiaTableWrapper = (props: ComponentProps<typeof ShareDuLieuDanhGiaTable>) => (<ShareDuLieuDanhGiaProvider>
    <ShareDuLieuDanhGiaTable {...props}/>
</ShareDuLieuDanhGiaProvider>)
export default ShareDuLieuDanhGiaTableWrapper