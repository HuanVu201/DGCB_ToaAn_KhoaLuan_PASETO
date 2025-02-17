import { useMemo } from 'react'
import { ILstUsers} from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteLstUsers} from '../redux/action'
import { IBasePagination } from '@/models'
import { useLstUsersContext } from '../contexts/LstUsersContext'

export const useColumn = (pagination: IBasePagination) => {
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
                title: "Mã bộ tiêu chí",
                key: "maBoTieuChi",
                dataIndex: "maBoTieuChi",
            },
            {
                title: "Tên bộ tiêu chí",
                key: "tenBoTieuChi",
                dataIndex: "tenBoTieuChi",
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
                render: (text) => (text ? "Có" : "Không"),
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Ngày ban hành",
                key: "ngayBanHanh",
                dataIndex: "ngayBanHanh",
            },
            {
                title: "Cơ quan ban hành",
                key: "coQuanBanHanh",
                dataIndex: "coQuanBanHanh",
            },
            {
                title: "Loại thời gian",
                key: "loaiThoiGian",
                dataIndex: "loaiThoiGian",
            },
            {
                title: "Thời gian",
                key: "thoiGian",
                dataIndex: "thoiGian",
            },
            {
                title: "Đơn vị",
                key: "donVi",
                dataIndex: "donVi",
            },
            {
                title: "Từ ngày",
                key: "tuNgay",
                dataIndex: "tuNgay",
                render: (text) => (text ? text : "Chưa xác định"),
            },
            {
                title: "Đến ngày",
                key: "denNgay",
                dataIndex: "denNgay",
                render: (text) => (text ? text : "Chưa xác định"),
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
                            LstUsersContext.setLstUsersId(record.id)
                            LstUsersContext.setLstUsersModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLstUsers({ id: record.id, forceDelete: false }))
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