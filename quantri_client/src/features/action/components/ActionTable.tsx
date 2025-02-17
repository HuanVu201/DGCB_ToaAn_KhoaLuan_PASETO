import { useMemo, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { IAction, ISearchAction } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchAction } from "../redux/action"
import { ActionSearch } from "./ActionSearch"
import { ActionProvider, useActionContext } from "../contexts/ActionContext"
import { ActionDetail } from "./ActionDetail"
import { TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface"

export const ActionTable = () => {
    const dispatch = useAppDispatch()
    const { datas: actions, count } = useAppSelector(state => state.action)
    const [searchParams, setSearchParams] = useState<ISearchAction>({ pageNumber: 1, pageSize: 20, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const actionContext = useActionContext()
    // const rowSelection = useMemo(() =>({
    //     onChange: (selectedRowKeys: React.Key[]) => {
    //         actionContext.setSelectedActions ? actionContext.setSelectedActions(selectedRowKeys.map(x => x as string)) : null
    //     },
    // }), [])
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <ActionSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={actions}
                    pagination={{
                        total: count
                    }}
                    // rowSelection={{
                    //     ...rowSelection,
                    // }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchAction(params))}
                />
            </AntdSpace>
            {actionContext.ActionModalVisible ? <ActionDetail setSearchActionParams={setSearchParams}/> : null}
        </>
            
    )
}
const ActionTableWrapper = () => (
    <ActionProvider>
        <ActionTable/>
    </ActionProvider>
)
export default ActionTableWrapper