import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '../../../models'
import { ISearchUser, IUser } from '@/features/user/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { useScreenActionContext } from '../contexts/ScreenActionContext'
import { IScreenAction, ISearchScreenAction } from '../models'
import { IAction } from '@/features/action/models'
import { DeleteScreenAction } from '../redux/crud'

export const useActionColumn = (pagination: ISearchScreenAction) => {
    const screenActionContext = useScreenActionContext()
    const dispatch = useAppDispatch()
    const columns = useMemo(() : ColumnsType<IScreenAction> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên action",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mã action",
                key: "maAction",
                dataIndex: "maAction",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        {/* <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            //TODO: view
                        }} /> */}
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteScreenAction({ id: record.id, forceDelete: true, searchParams: {screenId:screenActionContext.folderId} }))
                            }}
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
    return columns
}