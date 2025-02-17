import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_TrangThaiDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_TrangThaiDanhGia } from "../redux/action"
import { DanhMuc_TrangThaiDanhGiaSearch } from "./DanhMuc_TrangThaiDanhGiaSearch"
import { DanhMuc_TrangThaiDanhGiaProvider } from "../contexts/DanhMuc_TrangThaiDanhGiaContext"
import { DanhMuc_TrangThaiDanhGiaDetail } from "./DanhMuc_TrangThaiDanhGiaDetail"

const DanhMuc_TrangThaiDanhGiaTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_TrangThaiDanhGias, count } = useAppSelector(state => state.danhmuc_trangthaidanhgia)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_TrangThaiDanhGia>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_TrangThaiDanhGiaSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_TrangThaiDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_TrangThaiDanhGia(params))}
                />
            </AntdSpace>
            <DanhMuc_TrangThaiDanhGiaDetail/>
        </>
            
    )
}
const DanhMuc_TrangThaiDanhGiaTableWrapper = () => (<DanhMuc_TrangThaiDanhGiaProvider>
    <DanhMuc_TrangThaiDanhGiaTable/>
</DanhMuc_TrangThaiDanhGiaProvider>)
export default DanhMuc_TrangThaiDanhGiaTableWrapper