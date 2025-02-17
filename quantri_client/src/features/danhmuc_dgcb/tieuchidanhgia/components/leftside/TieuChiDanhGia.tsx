import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useRef, useState } from "react"
import { ISearchTieuChiDanhGia } from "../../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "@/contexts/FolderContext"
import { Col, Input, Row, Select } from "antd"
import { SearchProps } from "antd/es/input"
import { TieuChiDanhGiaActionContextTieuChiDanhGia } from "../TieuChiDanhGiaActionContext"
import { useTieuChiDanhGiaContext } from "../../contexts/TieuChiDanhGiaContext"
import { SearchTieuChiDanhGia, SearchTieuChiDanhGiaAdmin } from "../../redux/action"
import { ThemTieuChiDanhGia } from "../modals/ThemTieuChiDanhGia"
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action"
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action"
import { SearchDanhMuc_LoaiDiem } from "@/features/danhmuc_dgcb/danhmuc_loaidiem/redux/action"
import { SearchDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/redux/action"
// import { SuaTieuChiDanhGiaAction } from "../modals/SuaTieuChiDanhGiaAction"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree
const { Option } = Select;
export const TieuChiDanhGia = () => {
  const { danhSachTieuChiDanhGia } = useAppSelector(state => state.tieuchidanhgia)
  const {datas: danhMuc_BoTieuChuans } = useAppSelector(state => state.danhmuc_botieuchuan)
  const [searchParams, setSearchParams] = useState<ISearchTieuChiDanhGia>({ pageNumber: 1, pageSize: 10000,  loaiThoiGian: "Năm",reFetch: true })
  const TieuChiDanhGiaActionContext = useTieuChiDanhGiaContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themTieuChiDanhGiaActionModalVisible, setThemTieuChiDanhGiaActionModalVisible] = useState(false)
  const selectRef = useRef(null);  
  useEffect(() => {
    // dispatch(SearchDonVi({}));
     dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
     dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 100 }))
     dispatch(SearchDanhMuc_LoaiDiem({ pageNumber: 1, pageSize: 50,type:"LoaiDiem"}))
     dispatch(SearchDanhMuc_BoTieuChuan({ pageNumber: 1, pageSize: 50}))
 }, []);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SearchTieuChiDanhGiaAdmin({...searchParams}))
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
  const onSelectChange = (value : string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      loaiThoiGian: value,  // Lưu giá trị của select vào searchParams
      reFetch: true, // Đảm bảo data sẽ được tải lại khi chọn mới
    }))
  };

  const onSelectBoTieuChuan = (value : string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      maBoTieuChi: value,
      reFetch: true, // Đảm bảo data sẽ được tải lại khi chọn mới
    }))
  };
  return <ZoomComponent title={"Danh sách tiêu chí đánh giá"} onRefresh={() => setSearchParams((curr) => ({ ...curr,loaiThoiGian:curr.loaiThoiGian, reFetch: true }))}>
    <Row gutter={16}>
      <Col span={16}><Search style={{ marginBottom: 8 }} placeholder="Tìm kiếm tiêu chí đánh giá" onChange={onChangeFolder} onSearch={onSearchFolder} /></Col>
      <Col span={8}>
        <Select
          ref={selectRef}  
          value={searchParams.loaiThoiGian}  
          style={{ width: '100%' }}
          onChange={onSelectChange}
        >
          <Option value="Năm">Năm</Option>
          <Option value="6 Tháng">6 Tháng</Option>
          <Option value="Quý">Quý</Option>
          <Option value="Tháng">Tháng</Option>
        </Select>
      </Col>
      <Col xs={24} sm={24} md={24}>
              <Select
                placeholder="Chọn bộ tiêu chuẩn"
                style={{ width: "100%" }}
                allowClear
                onChange={onSelectBoTieuChuan}
              >
                {danhMuc_BoTieuChuans?.map((boTieuChuan) => (
                  <Select.Option
                    key={boTieuChuan.maBoTieuChi}
                    value={boTieuChuan.maBoTieuChi}
                  >
                    {boTieuChuan.tenBoTieuChi}
                  </Select.Option>
                ))}
              </Select> 
          </Col>
    </Row>
    
    <AntdDivider />
    {/* <AntdSpace onClick={() => setThemTieuChiDanhGiaActionModalVisible(true)} style={{ cursor: "pointer" }}>
      <PlusCircleOutlined style={{ fontSize: "18px" }} />
      Thêm Tiêu chí đánh giá
    </AntdSpace> */}
    <AntdDivider />
    <AntdDirectoryTree
      multiple={false}
      generateTree={{ data: danhSachTieuChiDanhGia, title: "titleTree", parentId: "parentCode", id: 'maTieuChi',point: "thangDiem" }}
      searchParams={folderSearchParams}
      onSelect={(value) => TieuChiDanhGiaActionContext.setTieuChiDanhGiaId((value as string[])[0])}
      contextMenu={(setVisible, id, top, left) => {
          return <TieuChiDanhGiaActionContextTieuChiDanhGia id={id} top={top} left={left} setVisible={setVisible} />
        }}
    />
    {/* modals */}
    {themTieuChiDanhGiaActionModalVisible ?
      <ThemTieuChiDanhGia visible={themTieuChiDanhGiaActionModalVisible} handlerClose={() => setThemTieuChiDanhGiaActionModalVisible(false)} /> : <></>
    }

    {/* modals */}
  </ZoomComponent>
}