import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_CacCap } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_CacCap } from "../redux/action"
import { DanhMuc_CacCapSearch } from "./DanhMuc_CacCapSearch"
import { DanhMuc_CacCapProvider } from "../contexts/DanhMuc_CacCapContext"
import { DanhMuc_CacCapDetail } from "./DanhMuc_CacCapDetail"

const DanhMuc_CacCapTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_CacCaps, count } = useAppSelector(state => state.danhmuc_caccap)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_CacCap>({ pageNumber: 1, pageSize: 50 , type: "CapDanhGia"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_CacCapSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_CacCaps}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_CacCap(params))}
                />
            </AntdSpace>
            <DanhMuc_CacCapDetail/>
        </>
            
    )
}
const DanhMuc_CacCapTableWrapper = () => (<DanhMuc_CacCapProvider>
    <DanhMuc_CacCapTable/>
</DanhMuc_CacCapProvider>)
export default DanhMuc_CacCapTableWrapper