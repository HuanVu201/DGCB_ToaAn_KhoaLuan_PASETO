import { ZoomComponent } from "@/components/common"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { ISearchDanhMuc_KhoTieuChi, IDanhMuc_KhoTieuChi } from "../models"
import { PlusCircleOutlined } from "@ant-design/icons"
import { AntdDivider, AntdModal, AntdSpace, AntdTree } from "@/lib/antd/components"
import { useFolderContext } from "@/contexts/FolderContext"
import { Input } from "antd"
import { SearchProps } from "antd/es/input"
import { DanhMuc_KhoTieuChiActionContextDanhMuc_KhoTieuChi } from "../components/DanhMuc_KhoTieuChiActionContext"
import { useDanhMuc_KhoTieuChiContext } from "../contexts/DanhMuc_KhoTieuChiContext"
import { SearchDanhMuc_KhoTieuChi } from "../redux/action"
import { ThemDanhMuc_KhoTieuChi } from "../components/modals/ThemDanhMuc_KhoTieuChi"
import { SearchDanhMuc_DonViTinh } from "@/features/danhmuc_dgcb/danhmuc_donvitinh/redux/action"
import { SearchDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/redux/action"
import { toast } from "react-toastify"
// import { SuaDanhMuc_KhoTieuChiAction } from "../modals/SuaDanhMuc_KhoTieuChiAction"

const { Search } = Input
const { AntdDirectoryTree } = AntdTree

export const TieuChiDoiLapOfKho = ({
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
  const { datas:danhSachDanhMuc_KhoTieuChi,data:danhMuc_KhoTieuChi } = useAppSelector(state => state.danhmuc_khotieuchi)
  const [searchParams, setSearchParams] = useState<ISearchDanhMuc_KhoTieuChi>({ pageNumber: 1, pageSize: 10000, reFetch: true })
  const DanhMuc_KhoTieuChiActionContext = useDanhMuc_KhoTieuChiContext()
  const [folderSearchParams, setFolderSearchParams] = useState("")
  const [delayFolderSearch, setDelayFolderSearch] = useState("")
  const [themDanhMuc_KhoTieuChiActionModalVisible, setThemDanhMuc_KhoTieuChiActionModalVisible] = useState(false)
  const lstTieuChi = danhSachDanhMuc_KhoTieuChi?.filter(item => item.parrentCode === folderId) as IDanhMuc_KhoTieuChi[];
  const originTieuChi = danhSachDanhMuc_KhoTieuChi?.find(item => item.maTieuChi === folderId) as IDanhMuc_KhoTieuChi;
  const updatedLstTieuChi = originTieuChi ? [...lstTieuChi, originTieuChi] : lstTieuChi;
  useEffect(() => {
     dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
    //  dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 50}))
 }, []);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(SearchDanhMuc_KhoTieuChi(searchParams))
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
  const handleCancel = () => {
    if (handlerClose) {
      handlerClose(); // Đóng modal
    }
  };
  const handleOk = () => {
    const selectedId = DanhMuc_KhoTieuChiActionContext.danhMuc_KhoTieuChiId || "undifiend id "; // lấy ID đã lưu
    
    if(danhMuc_KhoTieuChi?.maTieuChi == selectedId)
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
      
      generateTree={{ data: updatedLstTieuChi, title: "tenTieuChi", parentId: "parrentCode", id: 'maTieuChi' }}
      //generateTree={{ data: updatedLstTieuChi, title: "tenTieuChi", parrentId: "parrentCode", id: 'maTieuChi' }}
      searchParams={folderSearchParams}
      onSelect={(value) => DanhMuc_KhoTieuChiActionContext.setDanhMuc_KhoTieuChiId((value as string[])[0])}
    />
    {/* modals */}
    {themDanhMuc_KhoTieuChiActionModalVisible ?
      <ThemDanhMuc_KhoTieuChi visible={themDanhMuc_KhoTieuChiActionModalVisible} handlerClose={() => setThemDanhMuc_KhoTieuChiActionModalVisible(false)} /> : <></>
    }

    {/* modals */}
  </AntdModal>
}