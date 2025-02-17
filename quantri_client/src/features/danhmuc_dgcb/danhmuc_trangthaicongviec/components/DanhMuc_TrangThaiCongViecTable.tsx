import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_TrangThaiCongViec } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_TrangThaiCongViec } from "../redux/action"
import { DanhMuc_TrangThaiCongViecSearch } from "./DanhMuc_TrangThaiCongViecSearch"
import { DanhMuc_TrangThaiCongViecProvider } from "../contexts/DanhMuc_TrangThaiCongViecContext"
import { DanhMuc_TrangThaiCongViecDetail } from "./DanhMuc_TrangThaiCongViecDetail"

const DanhMuc_TrangThaiCongViecTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_TrangThaiCongViecs, count } = useAppSelector(state => state.danhmuc_trangthaicongviec)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_TrangThaiCongViec>({ pageNumber: 1, pageSize: 50 ,type:"TrangThaiCongViec"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_TrangThaiCongViecSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_TrangThaiCongViecs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_TrangThaiCongViec(params))}
                />
            </AntdSpace>
            <DanhMuc_TrangThaiCongViecDetail/>
        </>
            
    )
}
const DanhMuc_TrangThaiCongViecTableWrapper = () => (<DanhMuc_TrangThaiCongViecProvider>
    <DanhMuc_TrangThaiCongViecTable/>
</DanhMuc_TrangThaiCongViecProvider>)
export default DanhMuc_TrangThaiCongViecTableWrapper