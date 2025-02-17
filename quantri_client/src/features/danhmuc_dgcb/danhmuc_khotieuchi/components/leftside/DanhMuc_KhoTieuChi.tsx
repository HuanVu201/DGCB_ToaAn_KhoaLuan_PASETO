import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useRef, useState } from "react"
import { ISearchDanhMuc_KhoTieuChi } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "@/contexts/FolderContext"
import { Col, Input, Row, Select } from "antd"
import { SearchProps } from "antd/es/input"
import { DanhMuc_KhoTieuChiActionContextDanhMuc_KhoTieuChi } from "../DanhMuc_KhoTieuChiActionContext"
import { useDanhMuc_KhoTieuChiContext } from "../../contexts/DanhMuc_KhoTieuChiContext"
import { SearchDanhMuc_KhoTieuChi } from "../../redux/action"
import { ThemDanhMuc_KhoTieuChi } from "../modals/ThemDanhMuc_KhoTieuChi"
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action"
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action"
import { SearchDanhMuc_LoaiDiem } from "@/features/danhmuc_dgcb/danhmuc_loaidiem/redux/action"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree
const { Option } = Select;
export const DanhMuc_KhoTieuChi = () => {
  const { datas: danhSachDanhMuc_KhoTieuChi } = useAppSelector(state => state.danhmuc_khotieuchi)
  const [searchParams, setSearchParams] = useState<ISearchDanhMuc_KhoTieuChi>({ pageNumber: 1, pageSize: 10000, reFetch: true })
  const DanhMuc_KhoTieuChiActionContext = useDanhMuc_KhoTieuChiContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themDanhMuc_KhoTieuChiActionModalVisible, setThemDanhMuc_KhoTieuChiActionModalVisible] = useState(false)
  useEffect(() => {
    // dispatch(SearchDonVi({}));
    dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type: "DonViTinh" }))
    dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 100 }))
    dispatch(SearchDanhMuc_LoaiDiem({ pageNumber: 1, pageSize: 50, type: "LoaiDiem" }))
  }, []);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SearchDanhMuc_KhoTieuChi({ ...searchParams }))
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

  return <ZoomComponent title={"Danh sách tiêu chí đánh giá"} onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}>
    <Row gutter={16}>
      <Col span={16}><Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm tiêu chí đánh giá" onChange={onChangeFolder} onSearch={onSearchFolder} /></Col>
    </Row>

    <AntdDivider />
    <AntdSpace onClick={() => setThemDanhMuc_KhoTieuChiActionModalVisible(true)} style={{ cursor: "pointer" }}>
      <PlusCircleOutlined style={{ fontSize: "18px" }} />
      Thêm Tiêu chí đánh giá
    </AntdSpace>
    <AntdDivider />
    <AntdDirectoryTree
      multiple={false}
      generateTree={{ data: danhSachDanhMuc_KhoTieuChi, title: "titleView", parentId: "parrentCode", id: 'maTieuChi' }}
      searchParams={folderSearchParams}
      onSelect={(value) => DanhMuc_KhoTieuChiActionContext.setDanhMuc_KhoTieuChiId((value as string[])[0])}
      contextMenu={(setVisible, id, top, left) => {
        return <DanhMuc_KhoTieuChiActionContextDanhMuc_KhoTieuChi id={id} top={top} left={left} setVisible={setVisible} />
      }}
    />
    {/* modals */}
    {themDanhMuc_KhoTieuChiActionModalVisible ?
      <ThemDanhMuc_KhoTieuChi visible={themDanhMuc_KhoTieuChiActionModalVisible} handlerClose={() => setThemDanhMuc_KhoTieuChiActionModalVisible(false)} /> : <></>
    }

    {/* modals */}
  </ZoomComponent>
}