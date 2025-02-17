import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchVaiTro } from "../../redux/action"
import { useEffect, useState } from "react"
import { ISearchVaiTro } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "../../../../contexts/FolderContext"
import { ThemVaiTro } from "../modal"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { VaiTroContextMenu } from "../VaiTroContextMenu"
import { SuaVaiTro } from "../modal/SuaVaiTro"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree

export const VaiTro = () => {
  const { datas: roles, data: role } = useAppSelector(state => state.vaitro)
  const [searchParams, setSearchParams] = useState<ISearchVaiTro>({ pageNumber: 1, pageSize: 10000, reFetch: true })
  const roleContext = useVaiTroModalContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themVaiTroModalVisible, setThemVaiTroModalVisible] = useState(false)

  const dispatch = useAppDispatch()
  const handleClick = (value: any) => {
    roleContext.setRoleId(value)
  }
  useEffect(() => {
    dispatch(SearchVaiTro(searchParams))
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
  return <ZoomComponent title={"Danh sách vai trò"} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}>
    <Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm thư mục" onChange={onChangeFolder} onSearch={onSearchFolder} />
    <AntdDivider />
    <AntdSpace onClick={() => setThemVaiTroModalVisible(true)} style={{ cursor: "pointer" }}>
      <PlusCircleOutlined style={{ fontSize: "18px" }} />
      Thêm thư mục gốc
    </AntdSpace>
    <AntdDivider />
    <AntdDirectoryTree
      multiple={false}
      generateTree={{ data: roles, title: "name", parentId: "createdOn", type: "flat" }}
      searchParams={folderSearchParams}
      onSelect={handleClick}
      contextMenu={(setVisible, id, top, left) => {
        return <VaiTroContextMenu id={id} top={top} left={left} setVisible={setVisible} />
      }}
    />
    {/* modals */}
    <ThemVaiTro visible={themVaiTroModalVisible} handlerClose={() => setThemVaiTroModalVisible(false)} />

    {/* modals */}
  </ZoomComponent>
}