import { useMemo } from 'react'
import { ILstUsers} from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteLstUsers} from '../redux/action'
import { IBasePagination } from '@/models'
import { useLstUsersContext } from '../contexts/LstUsersContext'

export const useColumnOfUserNotBuocXuLy = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const LstUsersContext = useLstUsersContext()
    const columns = useMemo((): ColumnsType<ILstUsers> => {
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
                title: "Tên người dùng",
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: "Tên tài khoản",
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: "Chức vụ",
                key: "chucVuName",
                dataIndex: "chucVuName",
            },
            {
                title: "Chức danh",
                key: "chucDanhName",
                dataIndex: "chucDanhName",
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
            //                 LstUsersContext.setLstUsersId(record.id)
            //                 LstUsersContext.setLstUsersModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteLstUsers({ id: record.id, forceDelete: false }))
            //                 }}
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{ color: "tomato" }} />
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}