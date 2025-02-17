import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_KieuTieuChi } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_KieuTieuChi } from "../redux/action"
import { DanhMuc_KieuTieuChiSearch } from "./DanhMuc_KieuTieuChiSearch"
import { DanhMuc_KieuTieuChiProvider } from "../contexts/DanhMuc_KieuTieuChiContext"
import { DanhMuc_KieuTieuChiDetail } from "./DanhMuc_KieuTieuChiDetail"

const DanhMuc_KieuTieuChiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_KieuTieuChis, count } = useAppSelector(state => state.danhmuc_kieutieuchi)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_KieuTieuChi>({ pageNumber: 1, pageSize: 50 ,type: "KieuTieuChi"  })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_KieuTieuChiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_KieuTieuChis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_KieuTieuChi(params))}
                />
            </AntdSpace>
            <DanhMuc_KieuTieuChiDetail/>
        </>
            
    )
}
const DanhMuc_KieuTieuChiTableWrapper = () => (<DanhMuc_KieuTieuChiProvider>
    <DanhMuc_KieuTieuChiTable/>
</DanhMuc_KieuTieuChiProvider>)
export default DanhMuc_KieuTieuChiTableWrapper