import { useMemo } from 'react'
import { IDanhMuc_XepLoaiDanhGia } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_XepLoaiDanhGia, DeleteDanhMuc_XepLoaiDanhGiaNotReset } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_XepLoaiDanhGiaContext } from '../contexts/DanhMuc_XepLoaiDanhGiaContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_XepLoaiDanhGiaContext = useDanhMuc_XepLoaiDanhGiaContext()
    const columns = useMemo((): ColumnsType<IDanhMuc_XepLoaiDanhGia> => {
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
                title: "Thuộc bộ tiêu chuẩn",
                key: "tenBoTieuChi",
                dataIndex: "tenBoTieuChi",
            },
            {
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Điểm tối thiểu",
                key: "diemToiThieu",
                dataIndex: "diemToiThieu",
            },
            {
                title: "Điểm tối đa",
                key: "diemToiDa",
                dataIndex: "diemToiDa",
            },
            {
                title: "Sử dụng",
                key: "active",
                dataIndex: "active",
                width: '5%',
                render:(isApplicable) => (
                    <span style={{ 
                        display: 'inline-block', 
                        width: '100%', 
                        textAlign: 'center', 
                        fontWeight: 'bold', 
                        color: isApplicable ? '#4CAF50' : '#F44336' 
                    }}>
                        {isApplicable ? '✓' : '✗'}
                    </span>
                ),
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
                            DanhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaId(record.id)
                            DanhMuc_XepLoaiDanhGiaContext.setDanhMuc_XepLoaiDanhGiaModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                              dispatch(DeleteDanhMuc_XepLoaiDanhGia({ id: record.id, forceDelete: false }))
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