import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useMauPhoiContext } from '../context/MauPhoiContext'
import { IMauPhoi } from '../models/mauPhoi'
import { DeleteMauPhoi } from '../redux/action'
import { ILoaiMauPhoi, ISearchLoaiMauPhoi } from '../models/loaiMauPhoi'
import { LoaiMauPhoiApi } from '../services/loaiMauPhoi'
import { toast } from 'react-toastify'

export const useLoaiMauPhoiColumn = (pagination: IBasePagination) => {
    const mauPhoiContext = useMauPhoiContext()
    const columns = useMemo((): ColumnsType<ILoaiMauPhoi> => {
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
                title: <p style={{ textAlign: 'center' }}>Loại phôi</p>,
                key: "loaiPhoi",
                dataIndex: "loaiPhoi",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mã loại phôi</p>,
                key: "maMauPhoi",
                dataIndex: "maMauPhoi",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên loại phôi</p>,
                key: "tenMaMauPhoi",
                dataIndex: "tenMaMauPhoi",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined title="Xem chi tiết/Sửa" onClick={() => {
                            mauPhoiContext.setLoaiMauPhoiId(record.id)
                            mauPhoiContext.setLoaiMauPhoiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const resDelete = await LoaiMauPhoiApi.Delete({ id: record.id, forceDelete: false })
                                if (resDelete.data.succeeded) {
                                    toast.success("Thao tác thành công")
                                    mauPhoiContext.setReload(!mauPhoiContext.reload)
                                } else {
                                    toast.error("Thao tác thất bại")
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}