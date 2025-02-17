import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { ILogAuthen } from '../model'
import { useLogAuthenContext } from '../context'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { DeleteLogAuthenDetail } from '../redux/action'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const logAuthenContext = useLogAuthenContext()
    const columns = useMemo((): ColumnsType<ILogAuthen> => {
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
                title: (<p style={{textAlign : 'center'}}>Tên đăng nhập</p>),
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: (<p style={{textAlign : 'center'}}>Họ và tên</p>),
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: (<p style={{textAlign : 'center'}}>Đăng nhập qua</p>),
                key: "typeLogin",
                dataIndex: "typeLogin",
            },
            {
                title: (<p style={{textAlign : 'center'}}>Thời điểm thực hiện</p>),
                key: "createdAt",
                dataIndex: "typeLogin",
                render: (_, record) => (
                    <div>
                        {record.createdAt ? dayjs(record.createdAt).format("HH") + " giờ " + dayjs(record.createdAt).format("mm") + " phút" : ""}
                        <br></br>
                        {record.createdAt ? "Ngày " + dayjs(record.createdAt).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                    </div>
                )
            },
            {
                title: (<p style={{textAlign : 'center'}}>IP</p>),
                key: "ip",
                dataIndex: "ip",
            },
            {
                title: (<p style={{textAlign : 'center'}}>Thiết bị</p>),
                key: "device",
                dataIndex: "device",
            },
            {
                title: (<p style={{textAlign : 'center'}}>Thao tác</p>),
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeFilled style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
                            logAuthenContext.setIdLogAuthen(record.id)
                            logAuthenContext.setLogAuthenModalVisible(true)
                        }} />
                         <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLogAuthenDetail({ id: record.id ,forceDelete: false}))
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