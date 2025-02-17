import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { IMenu } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteMenu } from "../redux/action"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useMenuContext } from "../contexts/MenuContext"

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const menuContext = useMenuContext()
    const columns = useMemo((): ColumnsType<IMenu> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên",
                dataIndex: "ten",
                key: "ten"
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
                            menuContext.setMenuId(record.id)
                            menuContext.setMenuModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteMenu({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
} 