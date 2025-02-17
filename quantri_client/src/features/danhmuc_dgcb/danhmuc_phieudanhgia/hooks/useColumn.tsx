import { useMemo } from 'react'
import { IDanhMuc_PhieuDanhGia } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_PhieuDanhGia } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_PhieuDanhGiaContext } from '../contexts/DanhMuc_PhieuDanhGiaContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_PhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext()
    const columns = useMemo((): ColumnsType<IDanhMuc_PhieuDanhGia> => {
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
            // {
            //     title: "Mã",
            //     key: "ma",
            //     dataIndex: "ma",
            // },
            {
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Điểm đạt yêu cầu",
                key: "diemDatYeuCau",
                dataIndex: "diemDatYeuCau",
            },
            {
                title: "Điểm thưởng",
                key: "diemThuong",
                dataIndex: "diemThuong",
            },
            {
                title: "Điểm trừ",
                key: "diemTru",
                dataIndex: "diemTru",
            },
            // {
            //     title: "level",
            //     key: "levelBoTieuChi",
            //     dataIndex: "levelBoTieuChi",
            // },
            // {
            //     title: "Xếp loại",
            //     key: "xepLoai",
            //     dataIndex: "xepLoai",
            // },
            // {
            //     title: "Cấp đánh giá",
            //     key: "capDanhGia",
            //     dataIndex: "capDanhGia",
            // },
            // {
            //     title: "Đơn vị đánh giá",
            //     key: "donViDanhGia",
            //     dataIndex: "donViDanhGia",
            // },
            // {
            //     title: "Tên chức vụ đánh giá",
            //     key: "tenChucVuDanhGia",
            //     dataIndex: "tenChucVuDanhGia",
            // },
            // {
            //     title: "Tên chức danh đánh giá",
            //     key: "tenChucDanhDanhGia",
            //     dataIndex: "tenChucDanhDanhGia",
            // },
            // {
            //     title: "Cá nhân đánh giá",
            //     key: "caNhanDanhGia",
            //     dataIndex: "caNhanDanhGia",
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
                            DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(record.id)
                            DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(true)
                            DanhMuc_PhieuDanhGiaContext.setLstCaNhanDanhGia([]);
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMuc_PhieuDanhGia({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                          <HistoryOutlined style={{ color: "cornflowerblue" }} title="Lịch sử thay đổi" onClick={() => {
                            DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(record.id)
                            DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaHistoryModalVisible(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}