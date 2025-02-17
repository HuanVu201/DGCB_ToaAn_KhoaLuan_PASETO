import { useMemo } from "react"
import { AntdSpace } from "../.."
import { ID_SEPARATE } from "@/data"
import { callApiAndDisplayFile, callApiAndDisplayPublicFile, getFileName, getFileNameWithFixedLength } from "@/utils"
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons"
import { FormInstance, Popconfirm } from "antd"

export const useUploadPublicFile = ({dinhKem, hideUpload, onRemoveFile, form, fieldName}: {fieldName: string; form: FormInstance<any>;dinhKem: string | undefined; hideUpload: boolean | undefined; onRemoveFile?: (fileName: string) => void}) => {
    const removeFileHandler = (fileName: string) => {
        onChangeDinhKem(fileName, undefined, "remove")
        onRemoveFile ? onRemoveFile(fileName) : null
    }
    const onChangeDinhKem = (fileName: string, oldFileName?: string, flag: "add" | "remove" | "override" = "add") => {
        const dinhKem: string | undefined = form.getFieldValue(fieldName)
        let newDinhKem = undefined;
        const danhSachDinhKem = dinhKem?.split(ID_SEPARATE)

        if (flag == "add") {
            newDinhKem = dinhKem ? dinhKem + ID_SEPARATE + fileName : fileName
        } else if (flag == "override" && oldFileName !== undefined) { // ký số thành công
            newDinhKem = danhSachDinhKem?.map(dinhKem => dinhKem == oldFileName ? fileName : dinhKem).join(ID_SEPARATE)
        } else if (flag == "remove") {
            newDinhKem = danhSachDinhKem?.filter(x => x != fileName).join(ID_SEPARATE)
        }
        form.setFieldValue(fieldName, newDinhKem ? newDinhKem : undefined)
    }
    
    const danhSachDinhKems = useMemo(() => {
        const danhSach: string[] = dinhKem ? dinhKem?.split(ID_SEPARATE) : []
        return <AntdSpace direction="vertical">
        {danhSach?.map((fileName, index) => {
            const fileTitle = getFileName(fileName)
            return <AntdSpace direction="horizontal" key={index}>
                <AntdSpace title={fileTitle} direction="horizontal" role="button" onClick={() => {
                    //callApiAndDisplayPublicFile(fileName)
                    callApiAndDisplayFile(fileName)
                }}>
                    <LinkOutlined title={fileTitle}/>
                    <>{getFileNameWithFixedLength(fileName)}</>
                </AntdSpace>
                {hideUpload ? null : <Popconfirm
                    title='Xoá?'
                    onConfirm={() => {
                        removeFileHandler(fileName)
                    }}
                    okText='Xoá'
                    cancelText='Huỷ'
                >
                    <DeleteOutlined style={{ color: "tomato" }} />
                </Popconfirm>}
            </AntdSpace>
        })}

    </AntdSpace>
    }, [dinhKem, hideUpload])
    return {danhSachDinhKems, onChangeDinhKem}
}