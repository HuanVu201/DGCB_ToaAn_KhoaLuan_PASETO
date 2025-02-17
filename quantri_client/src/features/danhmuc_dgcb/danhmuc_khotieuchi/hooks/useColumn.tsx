import { useMemo } from 'react'
import { IDanhMuc_KhoTieuChi } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMuc_KhoTieuChi } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMuc_KhoTieuChiContext } from '../contexts/DanhMuc_KhoTieuChiContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch();
    const DanhMuc_KhoTieuChiContext = useDanhMuc_KhoTieuChiContext();

    const columns = useMemo<ColumnsType<IDanhMuc_KhoTieuChi>>(() => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1;
                    const pageSize = pagination.pageSize ?? 10;
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>;
                },
            },
            // {
            //     title: "Mã",
            //     key: "maTieuChi",
            //     dataIndex: "maTieuChi",
            // },
            {
                title: "Tên",
                key: "tenTieuChi",
                dataIndex: "tenTieuChi",
            },
            {
                title: "Thang điểm",
                key: "thangDiem",
                dataIndex: "thangDiem",
            },
            {
                title: "Sử dụng",
                key: "active",
                dataIndex: "active",
                width: '5%',
                render: (_, record) => {
                    return (
                        <Tag color={record.suDung ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
                            {record.suDung ? "Có" : "Không"}
                        </Tag>
                    );
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: 'actions',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined 
                            style={{ color: "cornflowerblue" }} 
                            title="Xem chi tiết/Sửa" 
                            onClick={() => {
                                DanhMuc_KhoTieuChiContext.setDanhMuc_KhoTieuChiId(record.id);
                                DanhMuc_KhoTieuChiContext.setDanhMuc_KhoTieuChiModalVisible(true);
                            }} 
                        />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMuc_KhoTieuChi({ id: record.id, forceDelete: false }));
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ];
    }, [pagination, dispatch, DanhMuc_KhoTieuChiContext]);

    return { columns };
};