import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchLstUsers} from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchLstUsers} from "../redux/action"
import { LstUsersSearch } from "./LstUsersSearch"
import { LstUsersProvider } from "../contexts/LstUsersContext"
import { LstUsersDetail } from "./LstUsersDetail"

const LstUsersTable = () => {
    const dispatch = useAppDispatch()
    const { datas: lstUserss, count } = useAppSelector(state => state.lstusers)
    const [searchParams, setSearchParams] = useState<ISearchLstUsers>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <LstUsersSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={lstUserss}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLstUsers(params))}
                />
            </AntdSpace>
            <LstUsersDetail/>
        </>
            
    )
}
const LstUsersTableWrapper = () => (<LstUsersProvider>
    <LstUsersTable/>
</LstUsersProvider>)
export default LstUsersTableWrapper