import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useMauPhoiColumn } from "@/features/quanlymauphoi/hooks/useMauPhoiColumn"
import { MauPhoiProvider, useMauPhoiContext } from "../../context/MauPhoiContext"
import { IMauPhoi, ISearchMauPhoi } from "../../models/mauPhoi"
import { MauPhoiSearch } from "./MauPhoiSearch"
import { MauPhoiDetail } from "./MauPhoiDetail"
import { MauPhoiApi } from "../../services/mauPhoi"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"

const MauPhoiTable = () => {
    const mauPhoiContext = useMauPhoiContext()
    const [mauPhois, setMauPhois] = useState<IMauPhoi[]>()
    const [totalCount, setTotalCount] = useState<number>()
    const searchParamsOrigins: ISearchMauPhoi = { pageNumber: 1, pageSize: 10 }
    const [searchParams, setSearchParams] = useState<ISearchMauPhoi>({ ...searchParamsOrigins })
    const { columns } = useMauPhoiColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        (async () => {
            mauPhoiContext.setLoading(true)
            const resSearchMauPhoi = await MauPhoiApi.Search(searchParams)
            if (resSearchMauPhoi.data) {
                setMauPhois(resSearchMauPhoi.data.data)
                setTotalCount(resSearchMauPhoi.data.totalCount)
            } else {
                toast.error("Lỗi truy vấn thông tin")
            }

            mauPhoiContext.setLoading(false)

        })()
    }, [mauPhoiContext.reload, searchParams])


    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={mauPhoiContext.loading}
                    indicator={<LoadingOutlined spin />}
                >
                    <MauPhoiSearch setSearchParams={setSearchParams} />
                    <AntdTable
                        columns={columns}
                        dataSource={mauPhois}
                        pagination={{
                            total: totalCount
                        }}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => { }}
                    />
                </Spin>
            </AntdSpace>
            <MauPhoiDetail searchParams={searchParams} setSearchParams={setSearchParams} />

        </>

    )
}
const MauPhoiTableWrapper = () => (<MauPhoiProvider>
    <MauPhoiTable />
</MauPhoiProvider>)
export default MauPhoiTableWrapper