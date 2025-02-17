import { useState } from "react"
import { AntdModal } from "../../../modal/Modal"
import { useScanContext } from "../../contexts/ScanContext"
import { AntdSpace } from "../../../space/Space"
import { Input } from "antd"
import { fileApi } from "@/features/file/services"
import axiosInstance from "@/lib/axios"
import { API_VERSION, UPLOADFILE_ENDPOINT } from "@/data"
import { IResult } from "@/models"
import { AntdButton } from "../../../button/Button"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { togglerAppLoading } from "@/lib/redux/GlobalState"

const DEFAULT_FILENAME = "thanhphanhoso.pdf"

export const PickFileName = () => {
    const {pickFileNameModal, pdfData, setPickFileNameModal, onSuccess, clearState} = useScanContext()
    const [fileName, setFileName] = useState<string>(DEFAULT_FILENAME)
    const dispatch = useAppDispatch()
    const onOk = async () => {
        dispatch(togglerAppLoading(true))

        let name = fileName
        if(!pdfData){
            return;
        }
        if(!fileName){
            name = DEFAULT_FILENAME;
        }
        if(!fileName.toLocaleLowerCase().endsWith(".pdf")){
            name = fileName + ".pdf"
        }
        const bodyFormData = new FormData();
        bodyFormData.append('Files', pdfData.output("blob"), name);
        bodyFormData.append('FolderName', "Scanned");
        try {
            const res = await axiosInstance.post<IResult<any>>(API_VERSION + UPLOADFILE_ENDPOINT, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            onSuccess(res.data.data)
            clearState()
        } catch (error) {
            console.error(error)
            dispatch(togglerAppLoading(false))
        }
        
    }
    
    return (
        <AntdModal visible={pickFileNameModal} title="Nhập tên tệp" handlerCancel={() => setPickFileNameModal(false)} footer={
            <AntdSpace direction="horizontal">
                <AntdButton key={1} onClick={() => setPickFileNameModal(false)}>Đóng</AntdButton>
                <AntdButton key={2} onClick={onOk}>Đồng ý</AntdButton>
            </AntdSpace>
        }>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                <Input 
                    
                    placeholder="Nhập tên tệp"
                    defaultValue={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    />
            </AntdSpace>
        </AntdModal>
    )
}