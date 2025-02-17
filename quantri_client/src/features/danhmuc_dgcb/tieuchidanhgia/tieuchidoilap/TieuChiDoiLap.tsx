import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchTieuChiDanhGia, ITieuChiDanhGia } from "../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdModal, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "@/contexts/FolderContext"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { TieuChiDanhGiaActionContextTieuChiDanhGia } from "../components/TieuChiDanhGiaActionContext"
import { useTieuChiDanhGiaContext } from "../contexts/TieuChiDanhGiaContext"
import { SearchTieuChiDanhGia, SearchTieuChiDanhGiaAdmin } from "../redux/action"
import { ThemTieuChiDanhGia } from "../components/modals/ThemTieuChiDanhGia"
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action"
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action"
import { toast } from "react-toastify"
// import { SuaTieuChiDanhGiaAction } from "../modals/SuaTieuChiDanhGiaAction"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree

export const TieuChiDoiLap = ({
  handlerClose,
  visible,
  folderId,
  onAddDoiLap,
}: {
  handlerClose?: () => void;
  visible: boolean;
  folderId?: string;
  onAddDoiLap: (id: string) => void; // Thêm prop này
}) => {
  const { danhSachTieuChiDanhGia,data:tieuChiDanhGia } = useAppSelector(state => state.tieuchidanhgia)
  // const [searchParams, setSearchParams] = useState<ISearchTieuChiDanhGia>({ pageNumber: 1, pageSize: 10000, reFetch: true })
  const TieuChiDanhGiaActionContext = useTieuChiDanhGiaContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themTieuChiDanhGiaActionModalVisible, setThemTieuChiDanhGiaActionModalVisible] = useState(false)
  const lstTieuChi = danhSachTieuChiDanhGia?.filter(item => item.parentId === folderId) as ITieuChiDanhGia[];
  const originTieuChi = danhSachTieuChiDanhGia?.find(item => item.maTieuChi === folderId) as ITieuChiDanhGia;
  const updatedLstTieuChi = originTieuChi ? [...lstTieuChi, originTieuChi] : lstTieuChi;
  useEffect(() => {
     dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
    //  dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 50}))
 }, []);

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(SearchTieuChiDanhGiaAdmin(searchParams))
  // }, [searchParams])

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
  const handleCancel = () => {
    if (handlerClose) {
      handlerClose(); // Đóng modal
    }
  };
  const handleOk = () => {
    const selectedId = TieuChiDanhGiaActionContext.tieuchidanhgiaId || "undifiend id "; // lấy ID đã lưu
    
    if(tieuChiDanhGia?.maTieuChi == selectedId)
    {
      toast.warning("Không thể chọn tiêu chí đối lập của chính nó . Vui lòng thử lại")
    }
    else
    {
      onAddDoiLap(selectedId);
    }
   
    // Đóng modal sau khi xử lý xong
    handleCancel();
  };
  return <AntdModal
  title="Thêm tiêu chí đánh giá đối lập"
  handlerCancel={handleCancel}
  visible={visible}
  onOk={handleOk}
  okText="Xác nhận"
  cancelText="Đóng"
  width="100%"
  // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
  destroyOnClose
>
    <AntdDirectoryTree
      multiple={false}
      generateTree={{ data: updatedLstTieuChi, title: "tenTieuChi", parentId: "parentCode", id: 'maTieuChi' }}
      searchParams={folderSearchParams}
      onSelect={(value) => TieuChiDanhGiaActionContext.setTieuChiDanhGiaId((value as string[])[0])}
    />
    {/* modals */}
    {/* {themTieuChiDanhGiaActionModalVisible ?
      <ThemTieuChiDanhGia visible={themTieuChiDanhGiaActionModalVisible} handlerClose={() => setThemTieuChiDanhGiaActionModalVisible(false)} /> : <></>
    } */}

    {/* modals */}
  </AntdModal>
}