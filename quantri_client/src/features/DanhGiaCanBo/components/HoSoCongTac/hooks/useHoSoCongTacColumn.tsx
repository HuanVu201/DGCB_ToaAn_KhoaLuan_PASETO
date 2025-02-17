import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Popconfirm, Space } from 'antd';
import { DanhGiaTableActions } from '../../common/DanhGiaCommon';
import { IHoSoCongTacDanhGia } from '../models';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { HoSoCongTacServiceApi } from '../services/hoSoCongTacServices';
import { useHoSoCongTacDanhGiaContext } from '../contexts/useHoSoCongTacDanhGiaContext';
import { reconnectEdge } from 'reactflow';

export const useHoSoCongTacColumn = ({ pageNumber = 1, pageSize = 10, }: {
    pageNumber: number, pageSize: number,
}) => {
    const hoSoContext = useHoSoCongTacDanhGiaContext()
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
                title: <p style={{ textAlign: 'center' }}>Trạng thái</p>,
                key: "trangThai",
                dataIndex: "trangThai",
                align: 'center',
            },
            {
                title: <p style={{ fontSize: 16, textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: '10%',
                align: 'center',
                key: '',
                render: (_, record) => {

                    return (
                        <Space direction="horizontal">
                            <EyeOutlined title="Xem thông tin đánh giá" onClick={() => {
                                buttonActionContext.setReadOnlyDanhGiaModalVisible(true)
                                buttonActionContext.setDanhGiaId(record.id)
                            }} />
                            <EditOutlined title="Xem chi tiết/Sửa" onClick={() => {
                                if (!record.hoSoCongTacId) {
                                    toast.error("Dữ liệu hồ sơ công tác chưa được khởi tạo")
                                    return
                                }
                                hoSoContext.setHoSoId(record.hoSoCongTacId)
                                hoSoContext.setHoSoModalVisible(true)
                            }} />
                        </Space>
                    )
                },
            },
        ]
    }, [pageNumber, pageSize])
    return columns;
}
