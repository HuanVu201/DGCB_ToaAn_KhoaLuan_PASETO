import { useState ,useEffect} from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_KhoTieuChi } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_KhoTieuChi } from "../redux/action"
import { DanhMuc_KhoTieuChiSearch } from "./DanhMuc_KhoTieuChiSearch"
import { DanhMuc_KhoTieuChiProvider } from "../contexts/DanhMuc_KhoTieuChiContext"
import { DanhMuc_KhoTieuChiDetail } from "./DanhMuc_KhoTieuChiDetail"
import { SearchDanhMuc_DonViTinh } from "../../danhmuc_donvitinh/redux/action"
import { Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const DanhMuc_KhoTieuChiTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_KhoTieuChis, count } = useAppSelector(state => state.danhmuc_khotieuchi)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_KhoTieuChi>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const totalStaff = 0; 
    useEffect(() => {
        // dispatch(SearchDonVi({}));
         dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
        // dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 50}))
     }, []);
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_KhoTieuChiSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_KhoTieuChis}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_KhoTieuChi(params))}
                />
            </AntdSpace>
            <DanhMuc_KhoTieuChiDetail/>    
        </>
            
    )
}
const DanhMuc_KhoTieuChiTableWrapper = () => (<DanhMuc_KhoTieuChiProvider>
    <DanhMuc_KhoTieuChiTable/>
</DanhMuc_KhoTieuChiProvider>)
export default DanhMuc_KhoTieuChiTableWrapper