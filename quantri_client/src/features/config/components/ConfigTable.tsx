import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchConfig } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchConfig } from "../redux/action"
import { ConfigSearch } from "./ConfigSearch"
import { ConfigProvider, useConfigContext } from "../contexts/ConfigContext"
import { ConfigDetail } from "./ConfigDetail"

const ConfigTable = () => {
    const dispatch = useAppDispatch()
    const { datas: Configs, count, loading } = useAppSelector(state => state.config)
    const ConfigContext = useConfigContext()
    const [searchParams, setSearchParams] = useState<ISearchConfig>({ pageNumber: 1, pageSize: 100, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <ConfigSearch setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={Configs}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchConfig(params))}
                    scroll={{ x: 1500 }}
                />
            </AntdSpace>
            {ConfigContext.ConfigModalVisible ? <ConfigDetail /> : null}
        </>
    )
}
const ConfigTableWrapper = () => (<ConfigProvider>
    <ConfigTable />
</ConfigProvider>)
export default ConfigTableWrapper