import { useMemo } from 'react'
import { IDanhMuc_PhieuDanhGia, IDanhMuc_PhieuDanhGiaHistory } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_PhieuDanhGia } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_PhieuDanhGiaContext } from '../contexts/DanhMuc_PhieuDanhGiaContext'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data'
export const useColumnHistory = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_PhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext()
    const columns = useMemo((): ColumnsType<IDanhMuc_PhieuDanhGiaHistory> => {
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
            //     title: "Thời gian",
            //     key: "dateTime",
            //     dataIndex: "dateTime",
            // },
            {
                title: "Tài khoản",
                key: "userUserName",
                dataIndex: "userUserName",
            },
            {
                title: "Thao tác",
                key: "type",
                dataIndex: "type",
            },
            {
               // title: (<p style={{textAlign : 'center'}}>Thời điểm thực hiện</p>),
                title: "Thời điểm thực hiện",
                key: "dateTime",
                dataIndex: "dateTime",
                render: (_, record) => (
                    <div>
                        {record.dateTime ? dayjs(record.dateTime).format("HH") + " giờ " + dayjs(record.dateTime).format("mm") + " phút" : ""}
                        <br></br>
                        {record.dateTime ? "Ngày " + dayjs(record.dateTime).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                    </div>
                )
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
            //                 DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(record.id)
            //                 DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(true)
            //                 DanhMuc_PhieuDanhGiaContext.setLstCaNhanDanhGia([]);
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteDanhMuc_PhieuDanhGia({ id: record.id, forceDelete: false }))
            //                 }}
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{ color: "tomato" }} />
            //             </Popconfirm>
            //               <HistoryOutlined style={{ color: "cornflowerblue" }} title="Lịch sử thay đổi" onClick={() => {
            //                 DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaId(record.id)
            //                 DanhMuc_PhieuDanhGiaContext.setDanhMuc_PhieuDanhGiaModalVisible(true)
            //                 DanhMuc_PhieuDanhGiaContext.setLstCaNhanDanhGia([]);
            //             }} />
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}