
import { useState } from "react"
import { AntdSpace, AntdTable } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchCauHinhHeThong } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchCauHinhHeThong } from "../redux/action"
import { CauHinhHeThongSearch } from "./CauHinhHeThongSearch"
import { CauHinhHeThongProvider } from "../contexts/CauHinhHeThongContext"
import { CauHinhHeThongDetail } from "./CauHinhHeThongDetail"

const CauHinhHeThongTable = () => {
    const dispatch = useAppDispatch()
    const { datas: cauHinhHeThongs, count } = useAppSelector(state => state.cauhinhhethong)
    const [searchParams, setSearchParams] = useState<ISearchCauHinhHeThong>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <CauHinhHeThongSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={cauHinhHeThongs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchCauHinhHeThong(params))}
                />
            </AntdSpace>
            <CauHinhHeThongDetail/>
        </>
    )
}
const CauHinhHeThongTableWrapper = () => (<CauHinhHeThongProvider>
    <CauHinhHeThongTable />
</CauHinhHeThongProvider>)

export default CauHinhHeThongTableWrapper