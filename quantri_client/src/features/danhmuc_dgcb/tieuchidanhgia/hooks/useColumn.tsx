import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { ITieuChiDanhGia } from "../models"
import { IBasePagination } from "@/models"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteTieuChiDanhGia } from "../redux/action"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useTieuChiDanhGiaContext } from "../contexts/TieuChiDanhGiaContext"

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const tieuchidanhgiaContext = useTieuChiDanhGiaContext()
    const columns = useMemo((): ColumnsType<ITieuChiDanhGia> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên",
                dataIndex: "ten",
                key: "ten"
            },
          
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            tieuchidanhgiaContext.setTieuChiDanhGiaId(record.id)
                            tieuchidanhgiaContext.setTieuChiDanhGiaModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteTieuChiDanhGia({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
} 