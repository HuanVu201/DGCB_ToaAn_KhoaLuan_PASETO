import { useMemo } from 'react'
import { IAction } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteAction } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useActionContext } from '../contexts/ActionContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const actionContext = useActionContext()
    const columns = useMemo(() : ColumnsType<IAction> => {
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
                title: "Tên action",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Hiển thị trên modal",
                key: "ten",
                render: (_, record) => {
                    return <Tag color={record.showInModal ? "green" : "red"}>{record.showInModal ? "Có": "Không"}</Tag>
                }
            },
            {
                title: "Hiển thị trên table",
                key: "ten",
                render: (_, record) => {
                    return <Tag color={record.showInTable ? "green" : "red"}>{record.showInTable ? "Có": "Không"}</Tag>
                }
            },
            
            // {
            //     title: "Mã action",
            //     key: "ma",
            //     dataIndex: "ma",
            // },
            // {
            //     title: "Độ ưu tiên",
            //     key: "uuTien",
            //     dataIndex: "uuTien",
            // },
            {
                title: "Quyền",
                key: "quyen",
                dataIndex: "quyen",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            actionContext.setActionId(record.id)
                            actionContext.setActionModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteAction({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}