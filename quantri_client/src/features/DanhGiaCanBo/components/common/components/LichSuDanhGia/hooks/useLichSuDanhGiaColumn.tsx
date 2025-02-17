import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FORMAT_TIME } from '@/data'
import dayjs from "dayjs";
import { IVetXuLyDanhGia } from '@/features/vetXuLy/models'
import { AntdButton } from '@/lib/antd/components';
import { callApiAndDisplayFile, getFileName, getFileNameWithFixedLength } from '@/utils';
import { useButtonActionContext } from '../../../contexts/useButtonActionContext';
import { ILichSuDanhGia } from '../../../models/phieuDanhGia';

export const useLichSuDanhGiaColumn = ({ pageNumber = 1, pageSize = 10 }: {
    pageNumber: number, pageSize: number,
}) => {
    const buttonActionContext = useButtonActionContext()
    const onViewFile = async (fileName: string) => {
        buttonActionContext.setLoading(true)
        await callApiAndDisplayFile(fileName)
        buttonActionContext.setLoading(false)
    }

    const columns = useMemo((): ColumnsType<ILichSuDanhGia> => {
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
                title: <p style={{ textAlign: 'center' }}>Các bước thực hiện</p>,
                key: "type",
                dataIndex: "type",
                render: (_, record) => (<>
                    {record.type ? `${record.type}: ` : ''}{record.fullName}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Nội dung giải trình/ý kiến</p>,
                key: "noiDungGiaTrinh",
                dataIndex: "noiDungGiaTrinh",
                align: 'center',
                render: (_, record) => (<>
                    {record.noiDungGiaiTrinh}
                </>)
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đính kèm</p>,
                key: "dinhKem",
                dataIndex: "dinhKem",
                align: 'center',
                render: (_, record) => (<>
                    <AntdButton disabled={false} style={{ marginTop: 0, padding: 0, height: "100%" }} loading={buttonActionContext.loading} type="link" title={getFileName(record.dinhKem || '')} onClick={() => onViewFile(record.dinhKem || '')}>
                        <p style={{ fontSize: '0.8rem' }}> {getFileNameWithFixedLength(record.dinhKem || '')}</p>

                    </AntdButton>
                </>)
            },



        ]
    }, [pageNumber, pageSize])

    // Trả về columns trực tiếp, thay vì trả về một đối tượng chứa columns
    return columns;
}
