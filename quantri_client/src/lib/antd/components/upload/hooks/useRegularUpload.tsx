import { Popconfirm, Spin } from "antd"
import { SoHoaData, TrichXuatOCRMode, UploadRegularUploadProps } from "../RegularUpload"
import { ID_SEPARATE } from "@/data"
import { ComponentProps, Suspense, useCallback, useMemo, useState } from "react"
import { AntdButton, AntdModal, AntdSpace } from "../.."
import { CheckCircleFilled, CloudDownloadOutlined, DeleteOutlined, EditOutlined, FileProtectOutlined, LinkOutlined } from "@ant-design/icons"
import { callApiAndDisplayFile, callApiAndDownload, getFileName, getFileNameWithFixedLength } from "@/utils"
import { btnSignClick } from "@/utils/common"
import React from "react"
import { toast } from "react-toastify"
import { fileApi, GetSignatureDataResponse } from "@/features/file/services"
import { lazy } from "@/utils/lazyLoading"


export const useRegularUpload = (props: Pick<UploadRegularUploadProps, "fieldName" | "maTTHC" | "folderName" | "kySoToken" | "kySoNEAC" | "dinhKem" | "form" | "hideUpload" | "useSoHoa"> & {
    trichXuatDuLieuOCRModalVisible?: boolean;
    setTrichXuatDuLieuOCRModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    soHoaVisible?: boolean;
    setSoHoaVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    showKetQuaThuTuc?: (dinhKemORC: string | undefined) => void;
    soHoaData?: SoHoaData; 
    dinhKemOCR?: string | undefined;
    setDinhKemOCR?: React.Dispatch<React.SetStateAction<string | undefined>>;
    dinhKemSoHoa?: string;
    setDetailSoHoaDataVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    detailSoHoaDataVisible?: boolean;
    
}) => {
    const { folderName, dinhKemSoHoa, setDinhKemOCR, setDetailSoHoaDataVisible, detailSoHoaDataVisible, dinhKemOCR, kySoToken, useSoHoa, soHoaData, showKetQuaThuTuc, maTTHC, kySoNEAC, dinhKem, hideUpload, fieldName, form, trichXuatDuLieuOCRModalVisible, setTrichXuatDuLieuOCRModalVisible, soHoaVisible, setSoHoaVisible } = props
    const onRemoveFile = async (fileName: string) => {
        // const res = await fileApi.RemoveFile({
        //     path: fileName
        // })
        // if (res.status === 200) {
            onChangeDinhKem(fileName, undefined, "remove")
            // setFileList ? setFileList((curr) => {
            //     return curr?.filter(file => file.response.data != fileName)
            // }) : null
        // }
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

    const onSignKySoToken = useCallback(async (fileName: string) => {

        // const file = fileList?.find(file => file.response.data == fileName)
        if (fileName) {
            await btnSignClick(fileName, "KySo_" + folderName, (urlFileSigned, oldFileUrl) => {

                onChangeDinhKem(urlFileSigned, oldFileUrl, "override")

            })
        } else {
            console.error("không tìm thấy file đã tải lên")
        }
    }, [])
    const danhSachDinhKems = useMemo(() => {
        const danhSach: string[] = dinhKem ? dinhKem?.split(ID_SEPARATE) : []
        return <AntdSpace direction="vertical">
            {danhSach?.map((fileName, index) => {
                return <DanhSachFile key={index} dinhKemSoHoa={dinhKemSoHoa} fileName={fileName} hideUpload={hideUpload} kySoToken={kySoToken} 
                onRemoveFile={onRemoveFile} onSignKySoToken={onSignKySoToken} useSoHoa={useSoHoa}/>
            })}

        </AntdSpace>

    }, [dinhKem, hideUpload, soHoaData, dinhKemSoHoa])


    return { onChangeDinhKem, danhSachDinhKems  }
}

const DanhSachFile = ({dinhKemSoHoa, fileName, hideUpload, onRemoveFile, kySoToken, onSignKySoToken, useSoHoa} : {
    dinhKemSoHoa: string | undefined; fileName: string; hideUpload: boolean | undefined; onRemoveFile: (fileName: string) => void; kySoToken: boolean | undefined;
    onSignKySoToken: (fileName: string) => Promise<void>;useSoHoa: boolean | undefined
}) => {
    const fileTitle = getFileName(fileName)
    const daSoHoa = dinhKemSoHoa?.includes(fileName)
    const [viewFileLoading, setViewFileLoading] = useState(false)
    const [signatureData, setSignatureData] = useState<GetSignatureDataResponse[]>()
    const [signatureDataModal, setSignatureDataModal] = useState<boolean>(false)
    
    const onViewFile = async (fileName: string) => {
        setViewFileLoading(true)
        await callApiAndDisplayFile(fileName)
        setViewFileLoading(false)
    }
    const getSignatureData = async (filePath: string) => {
        try {
            setViewFileLoading(true)
            var res = await fileApi.GetSignatureData(filePath)
            if(res.data.succeeded){
                setSignatureData(res.data.data)
                setSignatureDataModal(true)
            } else {
                toast.info(res.data.message || "Thao tác không thành công")
            }
            setViewFileLoading(false)
        } catch (error) {
            setViewFileLoading(false)
        }
    }

    const downloadFile = async (filePath: string) => {
        try {
            setViewFileLoading(true)
            await callApiAndDownload(filePath)
            setViewFileLoading(false)
        } catch (error) {
            toast.info("Có lỗi xảy ra khi lấy tệp")
            setViewFileLoading(false)
        }
    }
    return <>
    <AntdSpace direction="horizontal" >
        {/* <AntdButton disabled={false} style={{marginTop:0, padding:0, height:"100%"}} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => getSignatureData(fileName)}>
            <FileProtectOutlined title="Kiểm tra thông tin ký số" />
        </AntdButton> */}
        <AntdButton disabled={false} style={{marginTop:0, padding:0, height:"100%"}} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => downloadFile(fileName)}>
            <CloudDownloadOutlined title="Tải tệp tin về máy" />
        </AntdButton>
        <AntdButton disabled={false} style={{marginTop:0, padding:0, height:"100%"}} loading={viewFileLoading} type="link" title={fileTitle} onClick={() => onViewFile(fileName)}>
            <>{getFileNameWithFixedLength(fileName)}</>
        </AntdButton>
        {hideUpload ? null : <Popconfirm
            title='Xoá?'
            onConfirm={() => {
                onRemoveFile(fileName)
            }}
            okText='Xoá'
            cancelText='Huỷ'
        >
            <DeleteOutlined style={{ color: "tomato" }} />
        </Popconfirm>}
        {kySoToken && !daSoHoa ? <span role="button" onClick={async () => await onSignKySoToken(fileName)} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
            <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span id={`check_daKySo_${fileName || ""}`}>Ký số</span></span>
        </span> : null}
        {/* {soHoaData?.maOcr && fileName.toLowerCase().endsWith(".pdf") ? <span role="button" onClick={() => onClickTrichXuatOCR(fileName)} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
            <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span>Trích xuất OCR</span></span>
        </span> : null} */}
        {useSoHoa ? <span role="button" style={{ backgroundColor: daSoHoa ? "#10a338" : `#1677ff`, borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
            <span style={{ whiteSpace: "nowrap" }}>{daSoHoa ? <CheckCircleFilled/> : <EditOutlined />}<span>{daSoHoa ? `Đã số hóa` : "Số hóa"}</span></span>
        </span> : null}
    </AntdSpace>
    </>
}