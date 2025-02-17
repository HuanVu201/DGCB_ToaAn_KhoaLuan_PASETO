import { useMemo } from 'react'
import { IDanhMuc_BoTieuChuan } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_BoTieuChuan } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_BoTieuChuanContext } from '../contexts/DanhMuc_BoTieuChuanContext'
import { AntdSpace } from '@/lib/antd/components'
import { ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile, callApiAndDownload } from '@/utils'
import dayjs from 'dayjs'; // Import Day.js
export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMuc_BoTieuChuanContext = useDanhMuc_BoTieuChuanContext()
    const columns = useMemo((): ColumnsType<IDanhMuc_BoTieuChuan> => {
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
            //     title: "Mã bộ tiêu chí",
            //     key: "maBoTieuChi",
            //     dataIndex: "maBoTieuChi",
            // },
            {
                title: "Tên bộ tiêu chí",
                key: "tenBoTieuChi",
                dataIndex: "tenBoTieuChi",
            },
            // {
            //     title: "Sử dụng",
            //     key: "suDung",
            //     dataIndex: "suDung",
            //     render: (text) => (text ? "Có" : "Không"),
            // },
           
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Ngày ban hành",
                key: "ngayBanHanh",
                dataIndex: "ngayBanHanh",
                render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : 'Chưa xác định', // Format date to "DD/YYYY"
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return (
                        <>
                            {/* {record.dinhKem ?
                                <div style={{ fontWeight: '500' }}>
                                    {record.dinhKem}
                                </div>
                                : null
                            } */}
                            {record.dinhKem ?
                                <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '500', alignItems: 'center' }}>
                                    {/* <span>- Đính kèm:</span> */}
                                    {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                         <AntdSpace direction="horizontal" onClick={async () => {  // Sử dụng async/await trong sự kiện onClick
                                            try {
                                                await callApiAndDownload(dinhKem);  // Đợi API tải tệp trước khi tiếp tục
                                            } catch (error) {
                                                console.error("Error while downloading file:", error);
                                            }
                                        }} key={idx}>
                                            {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                                        </AntdSpace>
                                    )}
                                </div> : null
                            }

                        </>
                    )
                }
            },
            {
                title: "Áp dụng",
                key: "suDung",
                dataIndex: "suDung",
                render: (isApplicable) => (
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
            // {
            //     title: "Cơ quan ban hành",
            //     key: "coQuanBanHanh",
            //     dataIndex: "coQuanBanHanh",
            // },
            // {
            //     title: "Loại thời gian",
            //     key: "loaiThoiGian",
            //     dataIndex: "loaiThoiGian",
            // },
            // {
            //     title: "Thời gian",
            //     key: "thoiGian",
            //     dataIndex: "thoiGian",
            // },
            // {
            //     title: "Đơn vị",
            //     key: "donVi",
            //     dataIndex: "donVi",
            // },
            // {
            //     title: "Từ ngày",
            //     key: "tuNgay",
            //     dataIndex: "tuNgay",
            //     render: (text) => (text ? text : "Chưa xác định"),
            // },
            // {
            //     title: "Đến ngày",
            //     key: "denNgay",
            //     dataIndex: "denNgay",
            //     render: (text) => (text ? text : "Chưa xác định"),
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
                            DanhMuc_BoTieuChuanContext.setDanhMuc_BoTieuChuanId(record.id)
                            DanhMuc_BoTieuChuanContext.setDanhMuc_BoTieuChuanModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMuc_BoTieuChuan({ id: record.id, forceDelete: false }))
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