import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { GetSignatureDataResponse } from '@/features/file/services'
import dayjs from "dayjs"
import { FORMAT_DATE } from '@/data'

export const useColumn = () => {
    const columns = useMemo(() : ColumnsType<GetSignatureDataResponse> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên",
                key: "name",
                dataIndex: "name",
            },
            {
                title: "Thông tin người phát hành chứng thư",
                key: "issuerDN",
                dataIndex: "issuerDN",
            },
            {
                title: "Thông tin đối tượng",
                key: "subjectDN",
                dataIndex: "subjectDN",
            },
            {
                title: "Ngày ký",
                key: "date",
                dataIndex: "date",
                render: (_, record) => {
                    return <>{record.date ? dayjs(record.date).format(FORMAT_DATE) : ""}</>
                }
            },
        ]
    }, [])
    return {columns}
}