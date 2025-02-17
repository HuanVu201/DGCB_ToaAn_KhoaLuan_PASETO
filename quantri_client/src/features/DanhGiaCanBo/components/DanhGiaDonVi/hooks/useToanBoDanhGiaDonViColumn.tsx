import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Space } from 'antd';
import { DanhGiaTableActions } from '../../common/DanhGiaCommon';

export const useToanBoDanhGiaDonViColumn = ({ pageNumber = 1, pageSize = 10, tableActions }: {
    pageNumber: number, pageSize: number, tableActions: DanhGiaTableActions[]
}) => {
    const buttonActionContext = useButtonActionContext()
    const columns = useMemo((): ColumnsType<IDanhGiaCanBo> => {
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
                title: <p style={{ textAlign: 'center' }}>Kỳ đánh giá</p>,
                key: "thoiGian",
                dataIndex: "thoiGian",
                align: 'center',
                render: (_, record) => (<>
                    {record.loaiThoiGian?.toLocaleLowerCase() == 'năm' ? `Năm ${record.namDanhGia}` : `${record.loaiThoiGian} ${record.thoiGian} - ${record.namDanhGia}`}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Họ tên</p>,
                key: "nguoiTuDanhGia",
                dataIndex: "nguoiTuDanhGia",
                align: 'center',
            },
            {
                title: <p style={{ textAlign: 'center' }}>Chức vụ</p>,
                key: "chucVu",
                dataIndex: "chucVu",
                align: 'center',
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đơn vị</p>,
                key: "tenDonVi",
                dataIndex: "tenDonVi",
                align: 'center',
            },

            {
                title: <p style={{ textAlign: 'center' }}>Xếp loại / Điểm đánh giá</p>,
                key: "diemDanhGia",
                dataIndex: "diemDanhGia",
                // align: 'center',
                render: (_, record) => (<>
                    {record.phanLoaiDanhGia} / {record.diemDanhGia}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian tự đánh giá</p>,
                key: "createdOn",
                dataIndex: "createdOn",
                align: 'center',
                render: (_, record) => (<>
                    {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Trạng thái</p>,
                key: "trangThai",
                dataIndex: "trangThai",
                align: 'center'
            },
            {
                title: <p style={{ fontSize: 16, textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                align: 'center',
                key: '',
                render: (_, record) => {
                    return (
                        <Space direction="horizontal">
                            {tableActions?.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            buttonActionContext.setDanhGiaId(record.id)
                                        }}
                                    >
                                        {item.icon}
                                    </span>
                                )
                            })}

                        </Space>
                    )
                },
            },
        ]
    }, [pageNumber, pageSize, buttonActionContext.danhGiaId])

    // Trả về columns trực tiếp, thay vì trả về một đối tượng chứa columns
    return columns;
}
