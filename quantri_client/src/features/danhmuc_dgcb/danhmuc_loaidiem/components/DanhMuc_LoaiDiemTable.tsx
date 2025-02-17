import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_LoaiDiem } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_LoaiDiem } from "../redux/action"
import { DanhMuc_LoaiDiemSearch } from "./DanhMuc_LoaiDiemSearch"
import { DanhMuc_LoaiDiemProvider } from "../contexts/DanhMuc_LoaiDiemContext"
import { DanhMuc_LoaiDiemDetail } from "./DanhMuc_LoaiDiemDetail"

const DanhMuc_LoaiDiemTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_LoaiDiems, count } = useAppSelector(state => state.danhmuc_loaidiem)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_LoaiDiem>({ pageNumber: 1, pageSize: 50 ,type:"LoaiDiem"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_LoaiDiemSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_LoaiDiems}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_LoaiDiem(params))}
                />
            </AntdSpace>
            <DanhMuc_LoaiDiemDetail/>
        </>
            
    )
}
const DanhMuc_LoaiDiemTableWrapper = () => (<DanhMuc_LoaiDiemProvider>
    <DanhMuc_LoaiDiemTable/>
</DanhMuc_LoaiDiemProvider>)
export default DanhMuc_LoaiDiemTableWrapper