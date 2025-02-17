import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { IUserResponeOfGetDanhSach } from '../models'

export const useColumn = (pagination: IBasePagination) => {
    const columns = useMemo((): ColumnsType<IUserResponeOfGetDanhSach> => {
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
                key: "hoVaTen",
                dataIndex: "hoVaTen",
            },
            {
                title: "Đơn vị",
                key: "tenDonVi",
                dataIndex: "tenDonVi",
            },
            {
                title: "Chức vụ",
                key: "chucVu",
                dataIndex: "chucVu",
            },
            {
                title: "Phòng ban",
                key: "tenPhongBan",
                dataIndex: "tenPhongBan",
            },
            {
                title: "Điểm đánh giá",
                key: "diemDanhGia",
                dataIndex: "diemDanhGia",
            },
            {
                title: "Trạng thái",
                key: "trangThai",
                dataIndex: "trangThai",
            },
            {
                title: "Xếp loại",
                key: "phanLoaiDanhGia",
                dataIndex: "phanLoaiDanhGia",
            },  
            // {
            //     title: "Sử dụng",
            //     key: "active",
            //     dataIndex: "active",
            //     width: '5%',
            //     render: (_, record) => {
            //         return <Tag color={record.active ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
            //             {record.active ? "Có" : "Không"}
            //         </Tag>
            //     }
            // },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
            //                 DanhMuc_LoaiDiemContext.setDanhMuc_LoaiDiemId(record.id)
            //                 DanhMuc_LoaiDiemContext.setDanhMuc_LoaiDiemModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteDanhMuc_LoaiDiem({ id: record.id, forceDelete: false }))
            //                 }}
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{ color: "tomato" }} />
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}