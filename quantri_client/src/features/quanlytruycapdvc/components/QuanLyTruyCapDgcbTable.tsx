import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { LogAuthenProvider } from "../context"
import { ISearchLogAuthenParams } from "../model"
import { SearchLogAuthen } from "../redux/action"
import { LogAuthenSearch } from "./QuanLyTruyCapDgcbSearch"
import { LogAuthenDetail } from "./QuanLyTruyCapDgcbDetail"
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { getCurrencyThongKe } from "@/utils"

export const typeUsers = [
    {value: 'CanBo', label: 'Cán bộ'},
    {value: 'CongDan', label: 'Công dân'},
    {value: 'Admin', label: 'Quản trị hệ thống'},
]


const LogAuthenTable = () => {
    const dispatch = useAppDispatch()
    const { datas: logAuthens, count, loading } = useAppSelector(state => state.logAuthen)
    const [searchParams, setSearchParams] = useState<ISearchLogAuthenParams>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchDanhMucChung({ type: 'type-login', pageNumber: 1, pageSize: 200 }))
    }, [])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined spin />}
                >
                    <LogAuthenSearch setSearchParams={setSearchParams} />
                    <div style={{marginBottom: 8}}>
                        <b>Số lượng truy cập: {getCurrencyThongKe(count || 0)} lượt</b>
                    </div>
                    <AntdTable
                        columns={columns}
                        dataSource={logAuthens}
                        pagination={{
                            total: count
                        }}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => dispatch(SearchLogAuthen(params))}
                    />
                </Spin>
                <LogAuthenDetail />
            </AntdSpace>

        </>

    )
}
const LogAuthenTableWrapper = () => (<LogAuthenProvider>
    <LogAuthenTable />
</LogAuthenProvider>)
export default LogAuthenTableWrapper