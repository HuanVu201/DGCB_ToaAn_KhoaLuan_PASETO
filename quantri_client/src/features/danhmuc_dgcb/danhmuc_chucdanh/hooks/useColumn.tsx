import { useMemo } from 'react'
import { IDanhMuc_ChucDanh } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_ChucDanh } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_ChucDanhContext } from '../contexts/DanhMuc_ChuDanhContext'
import { ChucDanh } from '@/models/chucDanh'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_ChucDanhContext = useDanhMuc_ChucDanhContext()
    const columns = useMemo((): ColumnsType<ChucDanh> => {
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
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Ma",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            DanhMuc_ChucDanhContext.setDanhMuc_ChucDanhId(record.id)
                            DanhMuc_ChucDanhContext.setDanhMuc_ChucDanhModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMuc_ChucDanh({ id: record.id, forceDelete: false }))
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