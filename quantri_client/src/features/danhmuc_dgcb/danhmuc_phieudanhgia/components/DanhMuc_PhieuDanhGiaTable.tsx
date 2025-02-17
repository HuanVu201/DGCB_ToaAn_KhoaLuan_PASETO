import { useState,useEffect } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_PhieuDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_PhieuDanhGia } from "../redux/action"
import { DanhMuc_PhieuDanhGiaSearch } from "./DanhMuc_PhieuDanhGiaSearch"
import { DanhMuc_PhieuDanhGiaProvider } from "../contexts/DanhMuc_PhieuDanhGiaContext"
import { DanhMuc_PhieuDanhGiaDetail } from "./DanhMuc_PhieuDanhGiaDetail"
import { SearchLstUsers } from "@/features/lstusers/redux/action"
import { DanhMuc_PhieuDanhGiaHistoryDetail } from "../history/DanhMuc_PhieuDanhGiaHistoryDetail"
import { SearchDanhMuc_BoTieuChuan } from "../../danhmuc_botieuchuan/redux/action"

const DanhMuc_PhieuDanhGiaTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_PhieuDanhGias, count } = useAppSelector(state => state.danhmuc_phieudanhgia)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_PhieuDanhGia>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchLstUsers({ pageNumber: 1, pageSize: 50 }))
        dispatch(SearchDanhMuc_BoTieuChuan({ pageNumber: 1, pageSize: 500 }));
    },[]);
    return (
        <>
         <DanhMuc_PhieuDanhGiaDetail/>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_PhieuDanhGiaSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_PhieuDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_PhieuDanhGia(params))}
                />
            </AntdSpace>
            <DanhMuc_PhieuDanhGiaHistoryDetail/>
        </>
            
    )
}
const DanhMuc_PhieuDanhGiaTableWrapper = () => (<DanhMuc_PhieuDanhGiaProvider>
    <DanhMuc_PhieuDanhGiaTable/>
</DanhMuc_PhieuDanhGiaProvider>)
export default DanhMuc_PhieuDanhGiaTableWrapper