import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDongBoDuLieu } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDongBoDuLieu } from "../redux/action"
import { DongBoDuLieuSearch } from "./DongBoDuLieuSearch"
import { DongBoDuLieuProvider } from "../contexts/DongBoDuLieuContext"
import { DongBoDuLieuDetail } from "./DongBoDuLieuDetail"

const DongBoDuLieuTable = () => {
    const dispatch = useAppDispatch()
    const { datas: DongBoDuLieus, count } = useAppSelector(state => state.dongbodulieu)
    const [searchParams, setSearchParams] = useState<ISearchDongBoDuLieu>({ pageNumber: 1, pageSize: 50 ,type:"DongBoDuLieu"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DongBoDuLieuSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={DongBoDuLieus}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDongBoDuLieu(params))}
                />
            </AntdSpace>
            <DongBoDuLieuDetail/>
        </>
            
    )
}
const DongBoDuLieuTableWrapper = () => (<DongBoDuLieuProvider>
    <DongBoDuLieuTable/>
</DongBoDuLieuProvider>)
export default DongBoDuLieuTableWrapper