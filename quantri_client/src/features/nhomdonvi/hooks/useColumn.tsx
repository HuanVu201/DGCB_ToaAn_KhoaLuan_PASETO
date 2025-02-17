import React, { Dispatch, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, NodeIndexOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteNhomDonVi, SearchNhomDonViAction } from '../redux/action'
import { IBasePagination } from '../../../models'
import { SetSearchParams } from '@/hooks/useSearchStateHolder'
import { useNhomDonViContext } from '../contexts/QuyTrinhXuLyContext'
import { NhomDonVi, SearchNhomDonVi } from '@/models/nhomDonVi'

export const useColumn = (pagination: IBasePagination, setSearchParams: Dispatch<React.SetStateAction<SearchNhomDonVi>>) => {
    const dispatch = useAppDispatch()
    const NhomDonViContext = useNhomDonViContext()
    const columns = useMemo(() : ColumnsType<Pick<NhomDonVi, "tenNhom" | "moTa" | "id">> => {
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
                title: "Tên nhóm",
                key: "tenNhom",
                dataIndex: "tenNhom",
            },
            {
                title: "Mô tả",
                key: "moTa",
                dataIndex: "moTa",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            NhomDonViContext.setNhomDonViId(record.id)
                            NhomDonViContext.setNhomDonViModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await dispatch(DeleteNhomDonVi({ id: record.id, forceDelete: false })).unwrap()
                                if (res.succeeded) {
                                    setSearchParams((curr) => ({ ...curr }))
                                }
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