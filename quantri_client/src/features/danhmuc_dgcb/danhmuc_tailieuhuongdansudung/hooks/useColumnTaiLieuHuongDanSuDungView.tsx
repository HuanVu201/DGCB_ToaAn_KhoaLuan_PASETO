import { useMemo } from 'react'
import { IDanhmuc_TaiLieuHuongDanSuDung } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhmuc_TaiLieuHuongDanSuDung } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhmuc_TaiLieuHuongDanSuDungContext } from '../contexts/DanhMuc_TaiLieuHuongDanSuDungContext'
import { ID_SEPARATE } from '@/data'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDownload } from '@/utils'

export const useColumnTaiLieuHuongDanSuDungView = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const Danhmuc_TaiLieuHuongDanSuDungContext = useDanhmuc_TaiLieuHuongDanSuDungContext()
    const columns = useMemo((): ColumnsType<IDanhmuc_TaiLieuHuongDanSuDung> => {
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
                title: "Tên tài liệu",
                key: "tenDanhMuc",
                dataIndex: "tenDanhMuc",
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
            //                 Danhmuc_TaiLieuHuongDanSuDungContext.setDanhmuc_TaiLieuHuongDanSuDungId(record.id)
            //                 Danhmuc_TaiLieuHuongDanSuDungContext.setDanhmuc_TaiLieuHuongDanSuDungModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteDanhmuc_TaiLieuHuongDanSuDung({ id: record.id, forceDelete: false }))
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