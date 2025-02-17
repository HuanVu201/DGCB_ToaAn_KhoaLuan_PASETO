import { useMemo } from 'react'
import { IDanhMuc_CongViecChuyenMon } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_CongViecChuyenMon } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_CongViecChuyenMonContext } from '../contexts/DanhMuc_CongViecChuyenMonContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_CongViecChuyenMonContext = useDanhMuc_CongViecChuyenMonContext()
    const columns = useMemo((): ColumnsType<IDanhMuc_CongViecChuyenMon> => {
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
                key: "tenDanhMuc",
                dataIndex: "tenDanhMuc",
            },
            {
                title: "Mã",
                key: "code",
                dataIndex: "code",
            },
            {
                title: "Thứ tự",
                key: "thuTu",
                dataIndex: "thuTu",
            },
            {
                title: "Sử dụng",
                key: "active",
                dataIndex: "active",
                width: '5%',
                render: (_, record) => {
                    return <Tag color={record.active ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
                        {record.active ? "Có" : "Không"}
                    </Tag>
                }
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
                            DanhMuc_CongViecChuyenMonContext.setDanhMuc_CongViecChuyenMonId(record.id)
                            DanhMuc_CongViecChuyenMonContext.setDanhMuc_CongViecChuyenMonModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMuc_CongViecChuyenMon({ id: record.id, forceDelete: false }))
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