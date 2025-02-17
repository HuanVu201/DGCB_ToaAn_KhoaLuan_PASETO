import { useMemo } from 'react'
import { IScreen } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteScreen } from '../redux/action'
import { IBasePagination } from '../../../models'
// import { useScreenContext } from '../contexts/ScreenContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    // const ScreenContext = useScreenContext()
    const columns = useMemo(() : ColumnsType<IScreen> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên lĩnh vực",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mã lĩnh vực",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Mã ngành",
                key: "maNganh",
                dataIndex: "maNganh",
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
                            // ScreenContext.setScreenId(record.id)
                            // ScreenContext.setScreenModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteScreen({ id: record.id, forceDelete: false }))
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