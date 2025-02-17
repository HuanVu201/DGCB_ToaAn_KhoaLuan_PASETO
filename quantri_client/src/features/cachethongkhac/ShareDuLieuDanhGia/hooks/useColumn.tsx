import { useMemo } from 'react'
import { IShareDuLieuDanhGia } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteReFetchLoaiDichVu, DeleteShareDuLieuDanhGia } from '../redux/action'
import { IBasePagination } from '@/models'
import { useShareDuLieuDanhGiaContext } from '../contexts/ShareDuLieuDanhGiaContext'
import { useHistoryCallApiTichHopContext } from '../../HistoryCallApiTichHop/contexts/HistoryCallApiTichHopContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ShareDuLieuDanhGiaContext = useShareDuLieuDanhGiaContext()
    const columns = useMemo((): ColumnsType<IShareDuLieuDanhGia> => {
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
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Đường dẫn",
                key: "url",
                dataIndex: "url",
            },
            {
                title: "Phương thức",
                key: "phuongThuc",
                dataIndex: "phuongThuc",
            },
            {
                title: "Sử dụng",
                key: "active",
                dataIndex: "active",
                width: '5%',
                render: (_, record) => {
                    return <Tag color={record.suDung ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
                        {record.suDung ? "Có" : "Không"}
                    </Tag>
                }
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
                            ShareDuLieuDanhGiaContext.setShareDuLieuDanhGiaId(record.id)
                            ShareDuLieuDanhGiaContext.setShareDuLieuDanhGiaModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                //dispatch(DeleteShareDuLieuDanhGia({ id: record.id, forceDelete: false }))
                                dispatch(DeleteReFetchLoaiDichVu({ LoaiDichVu:ShareDuLieuDanhGiaContext.typeService,data:{id:record.id,forceDelete:false}}))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                        <HistoryOutlined title="Lịch sử gọi api"  onClick={() => {
                            ShareDuLieuDanhGiaContext.setShareDuLieuDanhGiaId(record.id)
                            ShareDuLieuDanhGiaContext.setHistoryCallApiTichHopModalVisible(true)
                        }}>
                        </HistoryOutlined>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}