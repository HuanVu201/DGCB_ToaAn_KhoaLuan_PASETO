import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_DATE_WITHOUT_TIME, FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Popconfirm, Space } from 'antd';
import { DanhGiaTableActions } from '../../common/DanhGiaCommon';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useGiaHanDanhGiaContext } from '../contexts/useGiaHanDanhGiaContext';
import { IGiaHanDanhGia } from '../models';
import { GiaHanDanhGiaServiceApi } from '../services';

export const useDanhSachGiaHanColumn = ({ pageNumber = 1, pageSize = 10, }: {
    pageNumber: number, pageSize: number,
}) => {
    const giaHanContext = useGiaHanDanhGiaContext()
    const columns = useMemo((): ColumnsType<IGiaHanDanhGia> => {
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
                title: <p style={{ textAlign: 'center' }}>Người yêu cầu</p>,
                key: "fullName",
                dataIndex: "fullName",
                align: 'center',
                render: (_, record) => (<>
                    {record.fullName} ({record.userName})
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thuộc phòng ban/đơn vị</p>,
                key: "tenDonVi",
                dataIndex: "tenDonVi",
                align: 'center',
                render: (_, record) => (<>
                    <p>Phòng ban: {record.tenPhongBan}</p>
                    <p>Đơn vị: {record.tenDonVi}</p>
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian</p>,
                key: "fullName",
                dataIndex: "fullName",
                align: 'center',
                render: (_, record) => (<>
                    {record.tuNgay ? <p>Từ ngày: {dayjs(record.tuNgay).format(FORMAT_DATE_WITHOUT_TIME)}</p> : null}
                    {record.denNgay ? <p>Đến ngày: {dayjs(record.denNgay).format(FORMAT_DATE_WITHOUT_TIME)}</p> : null}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Lý do</p>,
                key: "yKien",
                dataIndex: "yKien",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Trạng thái</p>,
                key: "trangThai",
                dataIndex: "trangThai",
                align: 'center'
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian yêu cầu</p>,
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
                align: 'center',
                key: '',
                render: (_, record) => {
                    return (
                        <Space direction="horizontal">
                            <EyeOutlined title="Xem thông tin chi tiết"
                                onClick={() => {
                                    giaHanContext.setReadOnlyGiaHanModalVisible(true)
                                    giaHanContext.setGiaHanModalVisible(true)
                                    giaHanContext.setGiaHanId(record.id)
                                }} />

                            {record.trangThai != 'Chờ gửi' ? null :
                                <>
                                    <EditOutlined title="Cập nhật thông tin"
                                        onClick={() => {
                                            giaHanContext.setGiaHanModalVisible(true)
                                            giaHanContext.setGiaHanId(record.id)
                                        }} />
                                    <Popconfirm
                                        title='Xoá?'
                                        onConfirm={async () => {
                                            giaHanContext.setLoading(true)
                                            const resXoaDanhGia = await GiaHanDanhGiaServiceApi.Delete({
                                                id: record.id,
                                                forceDelete: false
                                            })
                                            if (resXoaDanhGia.data.succeeded) {
                                                toast.success("Thao tác thành công")
                                                giaHanContext.setReload(!giaHanContext.reload)
                                            } else {
                                                toast.error(resXoaDanhGia.data.message)
                                            }

                                            giaHanContext.setLoading(false)
                                        }}
                                        okText='Xoá'
                                        cancelText='Huỷ'
                                    >
                                        <DeleteOutlined title="Xóa hồ sơ đánh giá" />
                                    </Popconfirm>
                                </>
                            }
                        </Space>
                    )
                },
            },
        ]
    }, [pageNumber, pageSize])

    // Trả về columns trực tiếp, thay vì trả về một đối tượng chứa columns
    return columns;
}
