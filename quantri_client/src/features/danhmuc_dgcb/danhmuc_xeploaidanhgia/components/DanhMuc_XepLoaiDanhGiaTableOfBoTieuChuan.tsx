import { useState,useEffect } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { ISearchDanhMuc_XepLoaiDanhGia } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { GetDanhMuc_XepLoaiDanhGia, SearchDanhMuc_XepLoaiDanhGia } from "../redux/action"
import { DanhMuc_XepLoaiDanhGiaProvider } from "../contexts/DanhMuc_XepLoaiDanhGiaContext"
import { DanhMuc_XepLoaiDanhGiaSearchOfBoTieuChuan } from "./DanhMuc_XepLoaiDanhGiaSearchOfBoTieuChuan"
import { DanhMuc_XepLoaiDanhGiaDetailOfBoTieuChuan } from "./DanhMuc_XepLoaiDanhGiaDetailOfBoTieuChuan"
import { useColumnOfBoTieuChuan } from "../hooks/useColumnOfBoTieuChuan"

const DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuan = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_XepLoaiDanhGias, count } = useAppSelector(state => state.danhmuc_xeploaidanhgia)
    const { data: danhMuc_BoTieuChuan } = useAppSelector(state => state.danhmuc_botieuchuan)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_XepLoaiDanhGia>({ pageNumber: 1, pageSize: 50 ,maBoTieuChi:danhMuc_BoTieuChuan?.maBoTieuChi})
    const { columns } = useColumnOfBoTieuChuan({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize,maBoTieuChi:danhMuc_BoTieuChuan?.maBoTieuChi })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_XepLoaiDanhGiaSearchOfBoTieuChuan setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_XepLoaiDanhGias}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_XepLoaiDanhGia(params))}
                />
            </AntdSpace>
            <DanhMuc_XepLoaiDanhGiaDetailOfBoTieuChuan/>
        </>
            
    )
}
const DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuanWrapper = () => (<DanhMuc_XepLoaiDanhGiaProvider>
    <DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuan/>
</DanhMuc_XepLoaiDanhGiaProvider>)
export default DanhMuc_XepLoaiDanhGiaTableOfBoTieuChuanWrapper