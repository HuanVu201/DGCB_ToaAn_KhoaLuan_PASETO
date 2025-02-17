import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useScreenActionContext } from "../../contexts/ScreenActionContext"
import { useMemo, useState } from "react"
import { ActionProvider } from "@/features/action/contexts/ActionContext"
import {ActionTable} from "@/features/action/components/ActionTable"
import { IScreenAction, ISearchScreenAction } from "../../models"
import { AddScreenActions, SearchActionNotInScreenModal } from "../../redux/crud"
import { useAddActionColumn } from "../../hooks/useAddActionColumn"

export const AddAction = ({handlerClose}: {handlerClose: () => void}) => {
    const screenActionContext = useScreenActionContext()
    const dispatch = useAppDispatch()
    const {actions, actionCount} = useAppSelector(state => state.screenaction)
    const [selectedAction, setSelectedActions] = useState<string[]>([])
    const [searchParams, setSearchParams] = useState<Omit<ISearchScreenAction, "maScreen">>({ pageNumber: 1, pageSize: 10, reFetch: true, screenId: screenActionContext.folderId})
    const columns = useAddActionColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const handleCancel = () => {
        handlerClose()
    }
    
    const onOk = () => {
        if(screenActionContext.folderId){
            const screenActions = selectedAction.map((item): Pick<IScreenAction, "actionId" | "screenId">  => ({
                screenId: screenActionContext.folderId!,
                actionId: item
            }))
            dispatch(AddScreenActions({screenActions, searchParams: {screenId: screenActionContext.folderId} }))
            handleCancel()
        }
    }
    const rowSelection = useMemo(() =>({
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedActions(selectedRowKeys.map(x => x as string))
        },
    }), [])
    
    return (
        <AntdModal title="Thêm action vào screen" handlerCancel={handleCancel} visible={true} onOk={onOk} width={1000}
        // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
        destroyOnClose>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <AntdTable
                    columns={columns}
                    dataSource={actions}
                    pagination={{
                        total: actionCount
                    }}
                    rowSelection={{
                        ...rowSelection,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchActionNotInScreenModal(params))}
                />
            </AntdSpace>
        </AntdModal>
    )
}
