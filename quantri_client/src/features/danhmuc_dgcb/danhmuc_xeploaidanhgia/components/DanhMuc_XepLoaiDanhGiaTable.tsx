import { useEffect, useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_XepLoaiDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_XepLoaiDanhGia } from "../redux/action"
import { DanhMuc_XepLoaiDanhGiaSearch } from "./DanhMuc_XepLoaiDanhGiaSearch"
import { DanhMuc_XepLoaiDanhGiaProvider } from "../contexts/DanhMuc_XepLoaiDanhGiaContext"
import { DanhMuc_XepLoaiDanhGiaDetail } from "./DanhMuc_XepLoaiDanhGiaDetail"
import { SearchDanhMuc_BoTieuChuan } from "../../danhmuc_botieuchuan/redux/action"

const DanhMuc_XepLoaiDanhGiaTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_XepLoaiDanhGias, count } = useAppSelector(state => state.danhmuc_xeploaidanhgia)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_XepLoaiDanhGia>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchDanhMuc_BoTieuChuan({reFetch : true}))
    },[])
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_XepLoaiDanhGiaSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_XepLoaiDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_XepLoaiDanhGia(params))}
                />
            </AntdSpace>
            <DanhMuc_XepLoaiDanhGiaDetail/>
        </>
            
    )
}
const DanhMuc_XepLoaiDanhGiaTableWrapper = () => (<DanhMuc_XepLoaiDanhGiaProvider>
    <DanhMuc_XepLoaiDanhGiaTable/>
</DanhMuc_XepLoaiDanhGiaProvider>)
export default DanhMuc_XepLoaiDanhGiaTableWrapper