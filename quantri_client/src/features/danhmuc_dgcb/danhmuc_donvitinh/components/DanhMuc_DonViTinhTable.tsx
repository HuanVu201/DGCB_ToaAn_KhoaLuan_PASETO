import { useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMuc_DonViTinh } from "../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMuc_DonViTinh } from "../redux/action"
import { DanhMuc_DonViTinhSearch } from "./DanhMuc_DonViTinhVuSearch"
import { DanhMuc_DonViTinhProvider } from "../contexts/DanhMuc_DonViTinhContext"
import { DanhMuc_DonViTinhDetail } from "./DanhMuc_DonViTinhDetail"

const DanhMuc_DonViTinhTable = () => {
    const dispatch = useAppDispatch()
    const { datas: danhMuc_DonViTinhs, count } = useAppSelector(state => state.danhmuc_donvitinh)
    const [searchParams, setSearchParams] = useState<ISearchDanhMuc_DonViTinh>({ pageNumber: 1, pageSize: 50 , type: "DonViTinh"})
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <DanhMuc_DonViTinhSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={danhMuc_DonViTinhs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMuc_DonViTinh(params))}
                />
            </AntdSpace>
            <DanhMuc_DonViTinhDetail/>
        </>
            
    )
}
const DanhMuc_DonViTinhTableWrapper = () => (<DanhMuc_DonViTinhProvider>
    <DanhMuc_DonViTinhTable/>
</DanhMuc_DonViTinhProvider>)
export default DanhMuc_DonViTinhTableWrapper