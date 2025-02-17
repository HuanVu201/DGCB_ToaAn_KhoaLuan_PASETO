import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchMenu } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "../../../../contexts/FolderContext"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { MenuActionContextMenu } from "../MenuActionContext"
import { useMenuContext } from "../../contexts/MenuContext"
import { SearchMenu, SearchMenuAdmin } from "../../redux/action"
import { ThemMenu } from "../modals/ThemMenu"
// import { SuaMenuAction } from "../modals/SuaMenuAction"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree

export const Menu = () => {
  const { danhSachMenu } = useAppSelector(state => state.menu)
  const [searchParams, setSearchParams] = useState<ISearchMenu>({ pageNumber: 1, pageSize: 10000, reFetch: true })
  const MenuActionContext = useMenuContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themMenuActionModalVisible, setThemMenuActionModalVisible] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SearchMenuAdmin(searchParams))
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
  return <ZoomComponent title={"Danh sách Menu"} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}>
    <Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm Menu" onChange={onChangeFolder} onSearch={onSearchFolder} />
    <AntdDivider />
    <AntdSpace onClick={() => setThemMenuActionModalVisible(true)} style={{ cursor: "pointer" }}>
      <PlusCircleOutlined style={{ fontSize: "18px" }} />
      Thêm Menu
    </AntdSpace>
    <AntdDivider />
    <AntdDirectoryTree
      multiple={false}
      generateTree={{ data: danhSachMenu, title: "tenMenu", parentId: "parentId", id: 'id' }}
      searchParams={folderSearchParams}
      onSelect={(value) => MenuActionContext.setMenuId((value as string[])[0])}
      contextMenu={(setVisible, id, top, left) => {
        return <MenuActionContextMenu id={id} top={top} left={left} setVisible={setVisible} />
      }}
    />
    {/* modals */}
    {themMenuActionModalVisible ?
      <ThemMenu visible={themMenuActionModalVisible} handlerClose={() => setThemMenuActionModalVisible(false)} /> : <></>
    }

    {/* modals */}
  </ZoomComponent>
}