import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import { IDanhGiaCanBo } from '@/features/DanhGiaCanBo/components/common/models'
import dayjs from "dayjs";
import { useButtonActionContext } from '@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext'
import { Popconfirm, Space } from 'antd';
import { DanhGiaTableActions } from '../../common/DanhGiaCommon';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useKhieuNaiDanhGiaContext } from '../contexts/useKhieuNaiKienNghiContext';
import { IKhieuNaiDanhGia } from '../model';
import { KhieuNaiDanhGiaServiceApi } from '../services';

export const useKhieuNaiKienNghiColumn = ({ pageNumber = 1, pageSize = 10, }: {
    pageNumber: number, pageSize: number,
}) => {
    const khieuNaiContext = useKhieuNaiDanhGiaContext()
    const buttonActionContext = useButtonActionContext()
    const columns = useMemo((): ColumnsType<IKhieuNaiDanhGia> => {
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
                title: <p style={{ textAlign: 'center' }}>Họ và tên</p>,
                key: "hoVaTen",
                dataIndex: "hoVaTen",
                align: 'center',
            },


            {
                title: <p style={{ textAlign: 'center' }}>Kỳ đánh giá</p>,
                key: "type",
                dataIndex: "type",
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
                title: <p style={{ textAlign: 'center' }}>Số lượng nội dung kiến nghị</p>,
                key: "soLuongKhieuNai",
                dataIndex: "soLuongKhieuNai",
                align: 'center'
            },
            {
                title: <p style={{ textAlign: 'center' }}>Lý do</p>,
                key: "lyDo",
                dataIndex: "lyDo",
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
                            <EyeOutlined title="Xem thông tin chi tiết"
                                onClick={() => {
                                    buttonActionContext.setReadOnlyKhieuNaiModalVisible(true)
                                    buttonActionContext.setThemKhieuNaiDanhGiaModalVisible(true)
                                    buttonActionContext.setDanhGiaId(record.maPhieu)
                                    khieuNaiContext.setTrangThaiKhieuNai(record.trangThai)
                                    khieuNaiContext.setKhieuNaiId(record.id)
                                }} />

                            {record.trangThai != 'Chờ gửi' ? null :
                                <>
                                    <EditOutlined title="Cập nhật thông tin"
                                        onClick={() => {
                                            buttonActionContext.setThemKhieuNaiDanhGiaModalVisible(true)
                                            buttonActionContext.setDanhGiaId(record.maPhieu)
                                            khieuNaiContext.setKhieuNaiId(record.id)
                                            khieuNaiContext.setTrangThaiKhieuNai(record.trangThai)
                                        }} />
                                    <Popconfirm
                                        title='Xoá?'
                                        onConfirm={async () => {
                                            khieuNaiContext.setLoading(true)
                                            const resXoaDanhGia = await KhieuNaiDanhGiaServiceApi.Delete({
                                                id: record.id,
                                                forceDelete: false
                                            })
                                            if (resXoaDanhGia.data.succeeded) {
                                                toast.success("Thao tác thành công")
                                                khieuNaiContext.setReload(!khieuNaiContext.reload)
                                            } else {
                                                toast.error(resXoaDanhGia.data.message)
                                            }

                                            khieuNaiContext.setLoading(false)
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
