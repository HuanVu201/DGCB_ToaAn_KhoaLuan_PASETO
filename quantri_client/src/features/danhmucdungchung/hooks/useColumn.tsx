import { useMemo } from 'react'
import { IDanhMucChung } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteDanhMucChung } from '../redux/action'
import { IBasePagination } from '@/models'
import { useDanhMucChungContext } from '../context/DanhMucChungContext'
import { useSearchParams } from 'react-router-dom'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const danhMucChungContext = useDanhMucChungContext()
    let [searchRouterParams] = useSearchParams();

    const columns = useMemo((): ColumnsType<IDanhMucChung> => {
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
                title: searchRouterParams.get("type") == 'quoc-tich' ? "Mã quốc tịch" : searchRouterParams.get("type") == 'dan-toc' ? "Mã dân tộc" : searchRouterParams.get("type") == 'hoc-van' ? "Mã học vấn" : searchRouterParams.get("type") == 'chuc-vu' ? "Mã chức vụ" : searchRouterParams.get("type") == 'hoc-vi' ? "Mã học vị" : searchRouterParams.get("type") == 'lanh-dao' ? "Mã lãnh đạo" : searchRouterParams.get("type") == 'nghe-nghiep' ? "Mã nghề nghiệp" : searchRouterParams.get("type") == 'ton-giao' ? "Mã tôn giáo" : searchRouterParams.get("type") == 'ngay-nghi' ? "Ngày nghỉ" : searchRouterParams.get("type")?.includes('mau-phoi') ? "Mã danh mục" : "",
                key: "type",
                dataIndex: "code",
            },
            {
                title: searchRouterParams.get("type") == 'quoc-tich' ? "Tên quốc tịch" : searchRouterParams.get("type") == 'dan-toc' ? "Tên dân tộc" : searchRouterParams.get("type") == 'hoc-van' ? "Tên học vấn" : searchRouterParams.get("type") == 'chuc-vu' ? "Tên chức vụ" : searchRouterParams.get("type") == 'hoc-vi' ? "Tên học vị" : searchRouterParams.get("type") == 'lanh-dao' ? "Tên lãnh đạo" : searchRouterParams.get("type") == 'nghe-nghiep' ? "Tên nghề nghiệp" : searchRouterParams.get("type") == 'ton-giao' ? "Tên tôn giáo" : searchRouterParams.get("type") == 'ngay-nghi' ? "Ngày nghỉ" : searchRouterParams.get("type")?.includes('mau-phoi') ? "Tên danh mục" : '',
                key: "type",
                dataIndex: "tenDanhMuc",
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
                            danhMucChungContext.setDanhMucChungId(record.id)
                            danhMucChungContext.setDanhMucChungModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMucChung({ id: record.id, forceDelete: false }))
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