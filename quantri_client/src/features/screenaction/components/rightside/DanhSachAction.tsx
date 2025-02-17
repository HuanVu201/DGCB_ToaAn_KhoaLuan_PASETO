import { AntdButton, AntdDivider, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useActionColumn } from "../../hooks/useActionColumn"
import { useCallback, useEffect, useState } from "react"
import { SearchScreenAction } from "../../redux/crud"
import { ISearchScreenAction } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useScreenActionContext } from "../../contexts/ScreenActionContext"
import { AddAction } from "../modals/AddAction"


export const DanhSachAction = () => {
  const { datas: screenActions, count, loading } = useAppSelector(state => state.screenaction)
  const [searchParams, setSearchParams] = useState<ISearchScreenAction>({ pageNumber: 1, pageSize: 10, reFetch: true })
  const dispatch = useAppDispatch()
  const screenActionContext = useScreenActionContext()
  const columns = useActionColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize });
  useEffect(() => {
    if (screenActionContext.folderId) {
      setSearchParams((curr): ISearchScreenAction => ({ ...curr, screenId: screenActionContext.folderId }))
    }
  }, [screenActionContext.folderId])

  const onClickAddAction = () => {
    screenActionContext.setShowModalAddAction(curr => !curr)
  }

  return Object.keys(searchParams).includes("screenId") ?
    <>
      <AntdSpace>
        <AntdButton icon={<PlusCircleOutlined style={{fontSize:18}}/>} onClick={onClickAddAction}>Thêm action</AntdButton>
      </AntdSpace>
      <AntdDivider />
      <AntdTable
        loading={loading}
        onSearch={(params) => dispatch(SearchScreenAction(params))}
        dataSource={screenActions}
        columns={columns}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        pagination={{ total: count }} />
      {screenActionContext.showModalAddAction ? <AddAction handlerClose={onClickAddAction}/> : null}
    </>
    : null
}  