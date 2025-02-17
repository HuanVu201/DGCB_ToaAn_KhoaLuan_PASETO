import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../../hooks/useColumn"
import { ISearchLstUsers} from "../../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchListAUGNotPermissionDanhGia, SearchListAUGOfGroupQuery, SearchLstUsers, SearchUserNotBuocXuLy} from "../../redux/action"
import { LstUsersSearch } from "../LstUsersSearch"
import { LstUsersProvider } from "../../contexts/LstUsersContext"
import { LstUsersDetail } from "./UserNotBuocXulyDetail"
import { useColumnOfUserNotBuocXuLy } from "../../hooks/useColumnOfUserNotBuocXuLy"
import { UserNotBuocXuLySearch } from "./UserNotBuocXulySearch"

const UserNotBuocXulyTable = () => {
    const dispatch = useAppDispatch()
    const { datas: lstUserss, count } = useAppSelector(state => state.lstusers)
    const [searchParams, setSearchParams] = useState<ISearchLstUsers>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumnOfUserNotBuocXuLy({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <UserNotBuocXuLySearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={lstUserss}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchUserNotBuocXuLy(params))}
                />
            </AntdSpace>
            <LstUsersDetail/>
        </>
            
    )
}
const UserNotBuocXuLyWrapper = () => (<LstUsersProvider>
    <UserNotBuocXulyTable/>
</LstUsersProvider>)
export default UserNotBuocXuLyWrapper