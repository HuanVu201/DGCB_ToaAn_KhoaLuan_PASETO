import { useMemo } from 'react'
import { IThongKeKhieuNai } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteThongKeKhieuNai } from '../redux/action'
import { IBasePagination } from '@/models'
import { useThongKeKhieuNaiContext } from '../contexts/ThongKeKhieuNaiContext'
import { ChucDanh } from '@/models/chucDanh'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ThongKeKhieuNaiContext = useThongKeKhieuNaiContext()
    const columns = useMemo((): ColumnsType<IThongKeKhieuNai> => {
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
                title: "Họ và tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Số liệu",
                key: "soLieu",
                dataIndex: "soLieu",
            },
            // {
            //     title: "Phòng ban",
            //     key: "tenPhongBan",
            //     dataIndex: "tenPhongBan",
            // },
            // {
            //     title: "Trạng thái",
            //     key: "trangThai",
            //     dataIndex: "trangThai",
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
                            ThongKeKhieuNaiContext.setThongKeKhieuNaiId(record.id)
                            ThongKeKhieuNaiContext.setThongKeKhieuNaiModalVisible(true)
                        }} />
                        {/* <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteThongKeKhieuNai({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm> */}
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}