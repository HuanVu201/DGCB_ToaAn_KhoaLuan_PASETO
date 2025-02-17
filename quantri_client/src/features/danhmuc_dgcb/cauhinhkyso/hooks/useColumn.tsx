import { useMemo } from 'react'
import { ICauHinhKySo } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteCauHinhKySo } from '../redux/action'
import { IBasePagination } from '@/models'
import { useCauHinhKySoContext } from '../contexts/CauHinhKySoContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const CauHinhKySoContext = useCauHinhKySoContext()
    const columns = useMemo((): ColumnsType<ICauHinhKySo> => {
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
                title: "Mã",
                key: "code",
                dataIndex: "code",
            },
            {
                title: "Tên",
                key: "tenDanhMuc",
                dataIndex: "tenDanhMuc",
            },
            // {
            //     title: "Thứ tự",
            //     key: "thuTu",
            //     dataIndex: "thuTu",
            // },
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
            // {
            //     title: "Chấm điểm nhiều lần",
            //     key: "duocChamNhieuLan",
            //     dataIndex: "duocChamNhieuLan",
            //     width: '5%',
            //     render: (_, record) => {
            //         return <Tag color={record.duocChamNhieuLan ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
            //             {record.duocChamNhieuLan ? "Có" : "Không"}
            //         </Tag>
            //     }
            // },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            CauHinhKySoContext.setCauHinhKySoId(record.id)
                            CauHinhKySoContext.setCauHinhKySoModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteCauHinhKySo({ id: record.id, forceDelete: false }))
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