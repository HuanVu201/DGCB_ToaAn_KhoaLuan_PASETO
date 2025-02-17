import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_CongViecChuyenMon } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_CongViecChuyenMon } from "../redux/action"
import { DanhMuc_CongViecChuyenMonSearch } from "./DanhMuc_CongViecChuyenMonSearch"
import { DanhMuc_CongViecChuyenMonProvider } from "../contexts/DanhMuc_CongViecChuyenMonContext"
import { DanhMuc_CongViecChuyenMonDetail } from "./DanhMuc_CongViecChuyenMonDetail"

const DanhMuc_CongViecChuyenMonTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_CongViecChuyenMons, count } = useAppSelector(state => state.danhmuc_congviecchuyenmon)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_CongViecChuyenMon>({ pageNumber: 1, pageSize: 50 ,type:"CongViecChuyenMon"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_CongViecChuyenMonSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_CongViecChuyenMons}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_CongViecChuyenMon(params))}
                />
            </AntdSpace>
            <DanhMuc_CongViecChuyenMonDetail/>
        </>
            
    )
}
const DanhMuc_CongViecChuyenMonTableWrapper = () => (<DanhMuc_CongViecChuyenMonProvider>
    <DanhMuc_CongViecChuyenMonTable/>
</DanhMuc_CongViecChuyenMonProvider>)
export default DanhMuc_CongViecChuyenMonTableWrapper