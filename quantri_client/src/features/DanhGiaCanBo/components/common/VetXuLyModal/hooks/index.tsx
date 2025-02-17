import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import dayjs from "dayjs";
import { IVetXuLyDanhGia } from '@/features/vetXuLy/models'

export const useVetXuLyDanhGiaColumn = ({ pageNumber = 1, pageSize = 10 }: {
    pageNumber: number, pageSize: number,
}) => {
    const columns = useMemo((): ColumnsType<IVetXuLyDanhGia> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberr = pageNumber ?? 1
                    const pageSizee = pageSize ?? 10
                    return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Người xử lý</p>,
                key: "tenNguoiXuLy",
                dataIndex: "tenNguoiXuLy",
                align: 'center',
                render: (_, record) => (<>
                    {record.tenNguoiXuLy} ({record.taiKhoanXuLy})
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
                key: "tenBuocXuLy",
                dataIndex: "tenBuocXuLy",
                align: 'center',
            },
          
            {
                title: <p style={{ textAlign: 'center' }}>Thời điểm xử lý</p>,
                key: "createdOn",
                dataIndex: "createdOn",
                align: 'center',
                render: (_, record) => (<>
                    {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                </>)
            },
          
        ]
    }, [pageNumber, pageSize])

    // Trả về columns trực tiếp, thay vì trả về một đối tượng chứa columns
    return columns;
}
