import { useEffect, useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchRoles } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchRoles } from "../redux/action"
import { RolesSearch } from "./RolesSearch"
import { RolesProvider } from "../contexts/RolesContext"
import { RolesDetail } from "./RolesDetail"
import { AddRolesClaim } from "./AddRoleClaim"

const RolesTable = () => {
    const dispatch = useAppDispatch()
    const { datas: Roless, count } = useAppSelector(state => state.roles)
    
    const [searchParams, setSearchParams] = useState<ISearchRoles>({ pageNumber: 1, pageSize: 50})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                 <RolesSearch setSearchParams={setSearchParams} /> 
                <AntdTable
                    columns={columns}
                    dataSource={Roless}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchRoles(params))}
                />
            </AntdSpace>
            <RolesDetail/>
            <AddRolesClaim/>
        </>
            
    )
}
const RolesTableWrapper = () => (<RolesProvider>
    <RolesTable/>
</RolesProvider>)
export default RolesTableWrapper