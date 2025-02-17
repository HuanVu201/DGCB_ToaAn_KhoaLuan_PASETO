import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "@/components/common"
import { AntdButton } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { IDanhMuc_XepLoaiDanhGia, ISearchDanhMuc_XepLoaiDanhGia } from "../models"
import { useCallback } from "react"
import { DanhMuc_XepLoaiDanhGiaDetail } from "./DanhMuc_XepLoaiDanhGiaDetail"
import { useDanhMuc_XepLoaiDanhGiaContext } from "../contexts/DanhMuc_XepLoaiDanhGiaContext"

export const DanhMuc_XepLoaiDanhGiaSearchOfBoTieuChuan = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchDanhMuc_XepLoaiDanhGia>> }) => {
  const danhMuc_XepLoaiDanhGiaContext = useDanhMuc_XepLoaiDanhGiaContext()
  return (
    <AntdButton onClick={() => { danhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaModalVisible(true) }}>Thêm phân loại</AntdButton>
  )
}