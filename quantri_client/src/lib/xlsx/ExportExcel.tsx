import * as XLSX from 'xlsx'
import { AntdButton } from '../antd/components'
import { useCallback } from 'react';

export type ExportExcelProps = {
    btnTitle?: React.ReactNode;
    data: any[] | undefined;
    sheetName: string,
    fileName: string,
    header: string[],
    mergeData?: string[],
    mergeOpts?: {
        s: {
            r: number,
            c: number,
        },
        e: {
            r: number,
            c: number
        }
    }[],
    title?: string,
}

export const ExportExcel = ({
    btnTitle = "Xuất danh sách",
    data,
    fileName,
    sheetName,
    header,
    mergeData,
    mergeOpts,
    title,
} : ExportExcelProps) => {
    const onClick = useCallback(() => {
        if(data){
            const dataWithSTT = data.map((item, index) => {
                return { STT: index + 1, ...item }
            })
            const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet([]);
                XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: `A1` });
                let originIndex = 2
                if (mergeData) {
                    XLSX.utils.sheet_add_aoa(ws, [mergeData], { origin: `A${originIndex}` });
                    ws["!merges"] = mergeOpts
                    originIndex += 1
                }
                XLSX.utils.sheet_add_aoa(ws, [header], { origin: `A${originIndex}` });
                originIndex += 1
                XLSX.utils.sheet_add_json(ws, dataWithSTT, { origin: `A${originIndex}`, skipHeader: true });
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
                XLSX.writeFile(wb, fileName + ".xlsx")
        }
    }, [data])
    return (
        <AntdButton onClick={onClick}>
            {btnTitle}
        </AntdButton>
    )
}