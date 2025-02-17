import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhmuc_TaiLieuHuongDanSuDung } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhmuc_TaiLieuHuongDanSuDung } from "../redux/action"
import { Danhmuc_TaiLieuHuongDanSuDungSearch } from "./DanhMuc_TaiLieuHuongDanSuDungSearch"
import { Danhmuc_TaiLieuHuongDanSuDungProvider } from "../contexts/DanhMuc_TaiLieuHuongDanSuDungContext"
import { Danhmuc_TaiLieuHuongDanSuDungDetail } from "./DanhMuc_TaiLieuHuongDanSuDungDetail"

const Danhmuc_TaiLieuHuongDanSuDungTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhmuc_TaiLieuHuongDanSuDungs, count } = useAppSelector(state => state.danhmuc_tailieuhuongdansudung)
    const [searchParams, setSearchParams] = useState<ISearchDanhmuc_TaiLieuHuongDanSuDung>({ pageNumber: 1, pageSize: 50 ,type:"TaiLieuHuongDanSuDung"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <Danhmuc_TaiLieuHuongDanSuDungSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhmuc_TaiLieuHuongDanSuDungs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhmuc_TaiLieuHuongDanSuDung(params))}
                />
            </AntdSpace>
            <Danhmuc_TaiLieuHuongDanSuDungDetail/>
        </>
            
    )
}
const Danhmuc_TaiLieuHuongDanSuDungTableWrapper = () => (<Danhmuc_TaiLieuHuongDanSuDungProvider>
    <Danhmuc_TaiLieuHuongDanSuDungTable/>
</Danhmuc_TaiLieuHuongDanSuDungProvider>)
export default Danhmuc_TaiLieuHuongDanSuDungTableWrapper