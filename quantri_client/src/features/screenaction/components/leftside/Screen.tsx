import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchScreenAction } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "../../../../contexts/FolderContext"
import { ThemScreen } from "../modals"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { ScreenActionContextMenu } from "../ScreenActionContextMenu"
import { SearchScreen } from "@/features/screen/redux/action"
import { ISearchScreen } from "@/features/screen/models"
import { useScreenActionContext } from "../../contexts/ScreenActionContext"
// import { SuaScreenAction } from "../modals/SuaScreenAction"

const {Search} = Input
const {AntdDirectoryTree} = AntdTree

export const Screen = () => {
  const {datas: screen} = useAppSelector(state => state.screen)
  const [searchParams, setSearchParams] = useState<ISearchScreen>({pageNumber:1, pageSize: 10000,reFetch:true})
  const screenActionContext = useScreenActionContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themScreenActionModalVisible, setThemScreenActionModalVisible] = useState(false)
 
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SearchScreen(searchParams))
  }, [searchParams])

  useEffect(() => {
    const timeOutId = setTimeout(() => setFolderSearchParams(delayFolderSearch), 1500)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [delayFolderSearch])
  const onChangeFolder: SearchProps["onChange"] = (e) => {
    setDelayFolderSearch(e.target.value)
  }
  const onSearchFolder: SearchProps["onSearch"] = (value) => {
    setFolderSearchParams(value)
  }
  return <ZoomComponent title={"Danh sách screen"} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}>
  <Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm screen" onChange={onChangeFolder} onSearch={onSearchFolder} />
  <AntdDivider />
  <AntdSpace onClick={() => setThemScreenActionModalVisible(true)} style={{cursor: "pointer"}}>
      <PlusCircleOutlined style={{fontSize: "18px"}} />
      Thêm screen
  </AntdSpace>
  <AntdDivider />
  <AntdDirectoryTree 
    multiple={false}
    generateTree={{data: screen, title: "ma", parentId: "createdOn", type:"flat"}} 
    searchParams={folderSearchParams}
    onSelect={(value) => screenActionContext.setFolderId((value as string[])[0])}
    contextMenu={(setVisible, id, top, left) => {
      return <ScreenActionContextMenu id={id} top={top} left={left} setVisible={setVisible}/>
    }}
  />
  {/* modals */}
  <ThemScreen visible={themScreenActionModalVisible} handlerClose={() => setThemScreenActionModalVisible(false)}/>
  
  {/* modals */}
</ZoomComponent>
}