import { useMemo } from 'react'
import { IAuditLog } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteAuditLog } from '../redux/action'
import { IBasePagination } from '@/models'
import { useAuditLogContext } from '../contexts/AuditLogContext'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data'
export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const AuditLogContext = useAuditLogContext()
    const columns = useMemo((): ColumnsType<IAuditLog> => {
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
                title: "Tài khoản",
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: "Đối tượng",
                key: "tableName",
                dataIndex: "tableName",
            },
            // {
            //     title: "Thời điểm thực hiện",
            //     key: "dateTime",
            //     dataIndex: "dateTime",
            // },
            {
                title: (<p style={{textAlign : 'left'}}>Thời điểm thực hiện</p>),
                key: "dateTime",
                dataIndex: "dateTime",
                render: (_, record) => (
                    <div>
                        {record.dateTime ? dayjs(record.dateTime).format("HH") + " giờ " + dayjs(record.dateTime).format("mm") + " phút" : ""}
                        <br></br>
                        {record.dateTime ? "Ngày " + dayjs(record.dateTime).format(FORMAT_DATE_WITHOUT_TIME) : ""}
                    </div>
                )
            },
            {
                title: "Thao tác",
                key: "type",
                dataIndex: "type",
                render: (_, record) => {
                  // Lấy giá trị của "type"
                  const actionType = record.type;
              
                  // Kiểm tra và hiển thị tên tương ứng với các loại hành động
                  let displayAction = actionType;  // Mặc định hiển thị giá trị gốc
              
                  if (actionType === 'Create') {
                    displayAction = 'Tạo';
                  } else if (actionType === 'Update') {
                    displayAction = 'Cập nhật';
                  } else if (actionType === 'Delete') {
                    displayAction = 'Xóa';
                  }
              
                  return <>{displayAction}</>;
                },
              },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
            //                 AuditLogContext.setAuditLogId(record.id)
            //                 AuditLogContext.setAuditLogModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={() => {
            //                     dispatch(DeleteAuditLog({ id: record.id, forceDelete: false }))
            //                 }}
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{ color: "tomato" }} />
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}