import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchKyDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchKyDanhGia } from "../redux/action"
import { KyDanhGiaSearch } from "./KyDanhGiaSearch"
import { KyDanhGiaProvider } from "../contexts/KyDanhGiaContext"
import { KyDanhGiaDetail } from "./KyDanhGiaDetail"

const KyDanhGiaTable = () => {
    const dispatch = useAppDispatch()
    const { datas: kyDanhGias, count } = useAppSelector(state => state.kydanhgia)
    const [searchParams, setSearchParams] = useState<ISearchKyDanhGia>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <KyDanhGiaSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={kyDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchKyDanhGia(params))}
                />
            </AntdSpace>
            <KyDanhGiaDetail/>
        </>
            
    )
}
const KyDanhGiaTableWrapper = () => (<KyDanhGiaProvider>
    <KyDanhGiaTable/>
</KyDanhGiaProvider>)
export default KyDanhGiaTableWrapper