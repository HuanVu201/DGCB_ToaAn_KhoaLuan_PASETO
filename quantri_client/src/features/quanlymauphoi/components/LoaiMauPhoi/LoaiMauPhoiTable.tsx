import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../../lib/antd/components"
import { useLoaiMauPhoiColumn } from "@/features/quanlymauphoi/hooks/useLoaiMauPhoiColumn"
import { MauPhoiProvider, useMauPhoiContext } from "../../context/MauPhoiContext"
import { IMauPhoi, ISearchMauPhoi } from "../../models/mauPhoi"
import { MauPhoiApi } from "../../services/mauPhoi"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { ILoaiMauPhoi, ISearchLoaiMauPhoi } from "../../models/loaiMauPhoi"
import { LoaiMauPhoiApi } from "../../services/loaiMauPhoi"
import { LoaiMauPhoiSearch } from "./LoaiMauPhoiSearch"
import { LoaiMauPhoiDetail } from "./LoaiMauPhoiDetail"
import { toast } from "react-toastify"

const LoaiMauPhoiTable = () => {
    const mauPhoiContext = useMauPhoiContext()
    const [loaiMauPhois, setLoaiMauPhois] = useState<ILoaiMauPhoi[]>()
    const [totalCount, setTotalCount] = useState<number>()
    const searchParamsOrigins: ISearchLoaiMauPhoi = { pageNumber: 1, pageSize: 10 }
    const [searchParams, setSearchParams] = useState<ISearchLoaiMauPhoi>({ ...searchParamsOrigins })
    const { columns } = useLoaiMauPhoiColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    useEffect(() => {
        (async () => {
            mauPhoiContext.setLoading(true)
            const resSearchMauPhoi = await LoaiMauPhoiApi.Search(searchParams)
            if (resSearchMauPhoi.data) {
                setLoaiMauPhois(resSearchMauPhoi.data.data)
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
                    <LoaiMauPhoiSearch setSearchParams={setSearchParams} />
                    <AntdTable
                        columns={columns}
                        dataSource={loaiMauPhois}
                        pagination={{
                            total: totalCount
                        }}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => { }}
                    />
                </Spin>
            </AntdSpace>
            <LoaiMauPhoiDetail searchParams={searchParams} setSearchParams={setSearchParams} />

        </>

    )
}
const LoaiMauPhoiTableWrapper = () => (<MauPhoiProvider>
    <LoaiMauPhoiTable />
</MauPhoiProvider>)
export default LoaiMauPhoiTableWrapper