import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchCauHinhKySo } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchCauHinhKySo } from "../redux/action"
import { CauHinhKySoSearch } from "./CauHinhKySoSearch"
import { CauHinhKySoProvider } from "../contexts/CauHinhKySoContext"
import { CauHinhKySoDetail } from "./CauHinhKySoDetail"

const CauHinhKySoTable = () => {
    const dispatch = useAppDispatch()
    const { datas: cauHinhKySos, count } = useAppSelector(state => state.cauhinhkyso)
    const [searchParams, setSearchParams] = useState<ISearchCauHinhKySo>({ pageNumber: 1, pageSize: 50 , type: "CauHinhKySo"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <CauHinhKySoSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={cauHinhKySos}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchCauHinhKySo(params))}
                />
            </AntdSpace>
            <CauHinhKySoDetail/>
        </>
            
    )
}
const CauHinhKySoTableWrapper = () => (<CauHinhKySoProvider>
    <CauHinhKySoTable/>
</CauHinhKySoProvider>)
export default CauHinhKySoTableWrapper