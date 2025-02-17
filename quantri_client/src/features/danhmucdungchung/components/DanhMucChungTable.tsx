import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchDanhMucChung } from "../models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchDanhMucChung } from "../redux/action"
import { DanhMucChungSearch } from "./DanhMucChungSearch"
import { DanhMucChungProvider } from "../context/DanhMucChungContext"
import { DanhMucChungDetail } from "./DanhMucChungDetail"
import { useSearchParams } from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';


const DanhMucChungTable = () => {
    const dispatch = useAppDispatch()
    let [searchRouterParams] = useSearchParams();
    const queryParams = new URLSearchParams(window.location.search);
    const typeValue = queryParams.get('type');

    useEffect(() => {
        setSearchParams((curent) => ({ ...curent, type: searchRouterParams.get("type") || typeValue as any }))

    }, [searchRouterParams])
    const { datas: danhMucChungs, count } = useAppSelector(state => state.danhmucdungchung)
    const [searchParams, setSearchParams] = useState<ISearchDanhMucChung>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>

                <DanhMucChungSearch setSearchParams={setSearchParams} />
                {Object.keys(searchParams).includes("type") ? <AntdTable
                    bordered
                    columns={columns}
                    dataSource={danhMucChungs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhMucChung(params))}
                /> : <></>}

            </AntdSpace>
            <DanhMucChungDetail searchParams={searchParams} setSearchParams={setSearchParams} />
        </>

    )
}
const DichVuTableWrapper = () => (<DanhMucChungProvider>
    <DanhMucChungTable />
</DanhMucChungProvider>)
export default DichVuTableWrapper