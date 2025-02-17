import React, { Dispatch, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteQuyTrinhXuLy, SearchQuyTrinhXuLyAction } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useQuyTrinhXuLyContext } from '../contexts/QuyTrinhXuLyContext'
import { QuyTrinhXuLy, SearchQuyTrinhXuLy } from '@/models/quytrinhxuly'
import { SetSearchParams } from '@/hooks/useSearchStateHolder'

export const useColumn = (pagination: IBasePagination, setSearchParams: Dispatch<React.SetStateAction<SearchQuyTrinhXuLy>>) => {
    const dispatch = useAppDispatch()
    const QuyTrinhXuLyContext = useQuyTrinhXuLyContext()
    const columns = useMemo(() : ColumnsType<Pick<QuyTrinhXuLy, "tenQuyTrinh" | "id">> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Tên quy trình",
                key: "tenQuyTrinh",
                dataIndex: "tenQuyTrinh",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        {/* <NodeIndexOutlined title="Xem quy trình xử lý" onClick={() => {
                            QuyTrinhXuLyContext.setQuyTrinhXuLyId(record.id)
                            QuyTrinhXuLyContext.setReactFlowModalVisible(true)
                        }} /> */}
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            QuyTrinhXuLyContext.setQuyTrinhXuLyId(record.id)
                            QuyTrinhXuLyContext.setReactFlowModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await dispatch(DeleteQuyTrinhXuLy({ id: record.id, forceDelete: false })).unwrap()
                                if (res.succeeded) {
                                    setSearchParams((curr) => ({ ...curr }))
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}