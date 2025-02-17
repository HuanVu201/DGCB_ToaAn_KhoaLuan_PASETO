import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useMauPhoiContext } from '../context/MauPhoiContext'
import { IMauPhoi } from '../models/mauPhoi'
import { DeleteMauPhoi } from '../redux/action'
import { MauPhoiApi } from '../services/mauPhoi'
import { toast } from 'react-toastify'
import { ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { AntdSpace } from '@/lib/antd/components'

export const useMauPhoiColumn = (pagination: IBasePagination) => {
    const mauPhoiContext = useMauPhoiContext()
    const columns = useMemo((): ColumnsType<IMauPhoi> => {
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
                title: <p style={{ textAlign: 'center' }}>Mã mẫu phôi</p>,
                key: "maMauPhoi",
                dataIndex: "maMauPhoi",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên mẫu phôi</p>,
                key: "tenMauPhoi",
                dataIndex: "tenMauPhoi",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mẫu phôi</p>,
                key: "urlMauPhoi",
                dataIndex: "urlMauPhoi",
                align: 'center',
                render: (_, record) => (<>
                    {record.urlMauPhoi?.split(ID_SEPARATE).map((dinhKem, idx) =>
                        <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                            {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                        </AntdSpace>
                    )}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined title="Xem chi tiết/Sửa" onClick={() => {
                            mauPhoiContext.setMauPhoiId(record.id)
                            mauPhoiContext.setMauPhoiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const resDelete = await MauPhoiApi.Delete({ id: record.id, forceDelete: false })
                                if (resDelete.data.succeeded) {
                                    toast.success("Thao tác thành công")
                                    mauPhoiContext.setReload(!mauPhoiContext.reload)
                                } else {
                                    toast.error("Thao tác thất bại")
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}