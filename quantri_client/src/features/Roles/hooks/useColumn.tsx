import { useMemo } from 'react'
import { IRoles } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import Icon, { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteRoles } from '../redux/action'
import { IBasePagination } from '@/models'
import { useRolesContext } from '../contexts/RolesContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const RolesContext = useRolesContext()
    const columns = useMemo((): ColumnsType<IRoles> => {
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
            // {
            //     title: "id",
            //     key: "id",
            //     dataIndex: "id",
            // },
            {
                title: "Tên nhóm quyền",
                key: "name",
                dataIndex: "name",
            },
            // {
            //     title: "Thứ tự",
            //     key: "thuTu",
            //     dataIndex: "thuTu",
            // },
            // {
            //     title: "Sử dụng",
            //     key: "active",
            //     dataIndex: "active",
            //     width: '5%',
            //     render: (_, record) => {
            //         return <Tag color={record.active ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
            //             {record.active ? "Có" : "Không"}
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
                            RolesContext.setRolesId(record.id)
                            RolesContext.setRolesModalVisible(true)
                        }} />
                        <PlusOutlined  type="ant-design" style={{ color: "yellowgreen" }} title='Phân quyền' onClick={() => {
                            RolesContext.setRolesId(record.id)
                            RolesContext.setRolesClaimModalVisible(true)
                        }}/>
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteRoles({ id: record.id, forceDelete: false }))
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