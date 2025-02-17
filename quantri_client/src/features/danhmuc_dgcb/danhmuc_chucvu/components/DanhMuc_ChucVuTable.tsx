import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_ChucVu } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_ChucVu } from "../redux/action"
import { DanhMuc_ChucVuSearch } from "./DanhMuc_ChucVuSearch"
import { DanhMuc_ChucVuProvider } from "../contexts/DanhMuc_ChucVuContext"
import { DanhMuc_ChucVuDetail } from "./DanhMuc_ChucVuDetail"

const DanhMuc_ChucVuTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_ChucVus, count } = useAppSelector(state => state.danhmuc_chucvu)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_ChucVu>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_ChucVuSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_ChucVus}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_ChucVu(params))}
                />
            </AntdSpace>
            <DanhMuc_ChucVuDetail/>
        </>
            
    )
}
const DanhMuc_ChucVuTableWrapper = () => (<DanhMuc_ChucVuProvider>
    <DanhMuc_ChucVuTable/>
</DanhMuc_ChucVuProvider>)
export default DanhMuc_ChucVuTableWrapper