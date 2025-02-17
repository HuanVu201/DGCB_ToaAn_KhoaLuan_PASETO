import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_BoTieuChuan } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_BoTieuChuan } from "../redux/action"
import { DanhMuc_BoTieuChuanSearch } from "./DanhMuc_BoTieuChuanSearch"
import { DanhMuc_BoTieuChuanProvider } from "../contexts/DanhMuc_BoTieuChuanContext"
import { DanhMuc_BoTieuChuanDetail } from "./DanhMuc_BoTieuChuanDetail"

const DanhMuc_BoTieuChuanTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_BoTieuChuans, count } = useAppSelector(state => state.danhmuc_botieuchuan)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_BoTieuChuan>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_BoTieuChuanSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_BoTieuChuans}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_BoTieuChuan(params))}
                />
            </AntdSpace>
            <DanhMuc_BoTieuChuanDetail/>
        </>
            
    )
}
const DanhMuc_BoTieuChuanTableWrapper = () => (<DanhMuc_BoTieuChuanProvider>
    <DanhMuc_BoTieuChuanTable/>
</DanhMuc_BoTieuChuanProvider>)
export default DanhMuc_BoTieuChuanTableWrapper