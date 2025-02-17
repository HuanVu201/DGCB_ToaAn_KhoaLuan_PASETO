import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Space } from 'antd';
import { DanhGiaTableActions } from '@/features/DanhGiaCanBo/components/common/DanhGiaCommon';

export const useLDTMDaThamMuuColumn = ({ pageNumber = 1, pageSize = 10, tableActions }: {
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
                    {record.loaiThoiGian} {record.thoiGian}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Năm đánh giá</p>,
                key: "namDanhGia",
                dataIndex: "namDanhGia",
                align: 'center',
            },
            {
                title: <p style={{ textAlign: 'center' }}>Họ tên</p>,
                key: "hoVaTen",
                dataIndex: "hoVaTen",
                align: 'center',
            },
            {
                title: <p style={{ textAlign: 'center' }}>Điểm đánh giá</p>,
                key: "diemDanhGia",
                dataIndex: "diemDanhGia",
                align: 'center',
            },
            {
                title: <p style={{ textAlign: 'center' }}>Xếp loại</p>,
                key: "phanLoaiDanhGia",
                dataIndex: "phanLoaiDanhGia",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời điểm tự đánh giá</p>,
                key: "createdOn",
                dataIndex: "createdOn",
                align: 'center',
                render: (_, record) => (<>
                    {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                </>)
            },
            {
                title: <p style={{ fontSize: 16, textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: '10%',
                align: 'center',
                key: '',
                render: (_, record) => {
                    let newAction: DanhGiaTableActions[] = tableActions
                    if (!record.buocTruocId || (record.buocTruocId && record.daXem != '2'))
                        newAction = newAction.filter(x => x.key !== 'ThuHoi')
                    return (
                        <Space direction="horizontal">
                            {newAction?.map((item, index) => {
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
