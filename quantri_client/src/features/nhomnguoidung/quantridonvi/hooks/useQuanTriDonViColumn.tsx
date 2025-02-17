import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { useNhomNguoiDungContext } from '../../contexts/NhomNguoiDungContext'
import { IBasePagination } from '@/models'
import { INhomNguoiDung } from '../../models'

export const useQuanTriDonViColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const nhomNguoiDungContext = useNhomNguoiDungContext()
    const columns = useMemo(() : ColumnsType<INhomNguoiDung> => {
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
                title: "Tên nhóm",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <UnorderedListOutlined  title="Danh sách người dùng" onClick={() => {
                            nhomNguoiDungContext.setNhomNguoiDungId(record.id)
                            nhomNguoiDungContext.setDanhSachNguoiDungDonViModalVisible(true)
                        }} />
                        {/* <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            nhomNguoiDungContext.setNhomNguoiDungId(record.id)
                            nhomNguoiDungContext.setNhomNguoiDungModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteNhomNguoiDung({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm> */}
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}