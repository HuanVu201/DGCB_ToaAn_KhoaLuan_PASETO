import { Button, Upload } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getToken } from '@/lib/axios';
import { API_VERSION, HOST_PATH, ID_SEPARATE, UPLOADFILE_ENDPOINT } from '@/data';
import { callApiAndDisplayFile } from '@/utils';
import { fileApi } from '@/features/file/services';

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

//deprecated
export interface IUploadAntdProps<IModel> extends UploadProps {
    formInstance: FormInstance<IModel>, fieldName: string, folderName: string, maxFileSize?: number, useDefaultCustomEvent?: boolean,
    kySoHandler?: (newUrl: string, oldUrl: string) => void,
    fileSoHoa?: string;
    useDefaultRemove?: boolean;
    editing?: boolean;
    editingDinhKem?: string;
}

const AntdUpLoad = <IModel,>(props: IUploadAntdProps<IModel>) => {
    const { formInstance, fieldName, folderName, maxFileSize, listType, useDefaultCustomEvent, kySoHandler, fileSoHoa, useDefaultRemove, ...rest } = props
    const onChange: UploadProps["onChange"] = (info) => {
        // console.log(info);
        if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {

                formInstance.setFieldValue(fieldName as any, info.file.response.data)
            });
            // console.log(info.file.response.data);
            // message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
        }
    }


    // const beforeUpload = useCallback((file: RcFile) => {
    //     // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     // if (!isJpgOrPng) {
    //     //     message.error('Vui lòng chọn định dạng ảnh JPG hoặc PNG!');
    //     // }
    //     const max = maxFileSize != undefined ? maxFileSize : 2
    //     const isLt2M = file.size / 1024 / 1024 < max;
    //     // if (!isLt2M) {
    //     //     message.error('Kích thước ảnh nhỏ hơn 2MB!');
    //     // }
    //     // return isJpgOrPng && isLt2M;
    //     return isLt2M;
    // }, [])

    const onRemove: UploadProps["onRemove"] = async (file: UploadFile<any> | string) => {
        const res = await fileApi.RemoveFile({
            path: typeof file === "string" ? file : file.response.data
        })
        if (res.status === 200) {
            // toast.success("Xóa thành công")
            formInstance.setFieldValue(fieldName as any, undefined)
        }
    }
    // useEffect(() => {
    //     return () => {
    //         const fileData = formInstance.getFieldValue(fieldName)
    //         if (fileData?.file) {
    //             onRemove(fileData.file)
    //         } else if (fileData) {
    //             onRemove(fileData)
    //         }
    //     }
    // }, [])

    // const uploadButton = () => {
    //     const button = <Button icon={<UploadOutlined />}>Chọn tệp</Button>
    //     const fileUrl: string = formInstance.getFieldValue(fieldName)
    //     if (fileUrl) {
    //         return (<>
    //             {listType !== 'text' ? <img src={fileUrl} alt="ảnh đại diện" style={{ width: '100%' }} /> : button}
    //             {/* {listType ==="text" ? <a target="_blank" onClick={(e) => e.preventDefault()} href={HOST_PATH + fileUrl}>{typeof fileUrl === "string" ? fileUrl.substring(fileUrl.lastIndexOf("/") + 1): ""}</a> : ""} */}
    //         </>)
    //     } else {
    //         return (<>
    //             {/* {formInstance.getFieldValue(fieldName)?.fileList?.length == 0 || formInstance.getFieldValue(fieldName) ? button : null} */}
    //             {button}
    //         </>)
    //     }
    // }
    // const fileList = () => {
    //     const fileUrl: string = formInstance.getFieldValue(fieldName)
    //     if(fileUrl){
    //         if(listType === "text"){
    //             return <a target="_blank"  href={HOST_PATH + fileUrl}>{typeof fileUrl === "string" ? fileUrl.substring(fileUrl.lastIndexOf("/") + 1): ""}</a>
    //         }
    //         return <></>
    //     }
    //     return <></>
    // }
    return <>
    <Upload name='Files'
        // disabled={formInstance.getFieldValue(fieldName) != null}
        data={{ FolderName: folderName }}
        // defaultFileList={[
        //     {
        //         uid: '1',
        //         name: 'HDTaiApp.pdf',
        //         status: 'done',
        //         url: 'http://127.0.0.1:5173/Files/ThanhPhanHoSo/e0f52265-2cc2-4352-9a7a-f72b0546816c/HDTaiApp.pdf',
        //       },
        // ]}
        showUploadList={{ showRemoveIcon: true }}
        // beforeUpload={beforeUpload}
        action={HOST_PATH + API_VERSION + UPLOADFILE_ENDPOINT} headers={{
            Authorization: `Bearer ${getToken()}`
        }}
        listType={listType}
        itemRender={(originNode, file) => (
            <>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span id={`view_kySo${file?.response?.data || ""}`} data-href={file?.response?.data || "#"} onClick={(e) => {
                    if((e.target as any).nodeName === "svg" || (e.target as any).nodeName === "BUTTON"){
                        return;
                    }
                    const aTag = document.getElementById(`view_kySo${file?.response?.data}`) as HTMLSpanElement
                    if(aTag.dataset.href){
                        // window.open(aTag.dataset.href)
                        callApiAndDisplayFile(aTag.dataset.href)
                    }
                }}>{originNode}</span>
                {kySoHandler != undefined ? <span onClick={(e) => {
                    // const fileUrl = file.response.data
                    // if(fileUrl){
                        // signal(fileUrl, file.name, "KySo_" + folderName, (urlFileSigned, oldFileUrl) => kySoHandler(urlFileSigned, oldFileUrl))
                    // }
                    // btnSignClick(file, "KySo_" + folderName, (urlFileSigned, oldFileUrl) => kySoHandler(urlFileSigned, oldFileUrl))
                }} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth:45, cursor: "pointer" }}>
                    <><EditOutlined /><span id={`check_daKySo_${file?.response?.data || ""}`}>Ký số</span></>
                </span> : null}
            </span>
            </>
            // <DraggableUploadListItem originNode={originNode} file={file} />
        )}
        {...rest}
        onChange={useDefaultCustomEvent ? onChange : rest.onChange}
        onRemove={useDefaultCustomEvent || useDefaultRemove ? onRemove : rest.onRemove}
    >
        {/* {uploadButton()} */}
        <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        {/* {kySoHandler != undefined ? <span style={{backgroundColor:"#1677ff", borderRadius:4, padding:4}}>Ký số</span> : null} */}
        {/* {formInstance.getFieldValue(fieldName)?.fileList?.length == 0 || formInstance.getFieldValue(fieldName) === undefined ? uploadButton : null} */}
        {/* {uploadButton} */}
        {/* {formInstance.getFieldValue(fieldName) ? <img src={formInstance.getFieldValue(fieldName)} alt="ảnh đại diện" style={{ width: '100%' }} /> : uploadButton} */}
    </Upload>
    <div style={{display: "flex", flexDirection: "column"}}>
        {fileSoHoa?.split(ID_SEPARATE).map((file, idx) => 
            <span key={idx} onClick={() => callApiAndDisplayFile(file)}>{file?.substring(file.lastIndexOf("/") + 1)}</span>
        )}
    </div>
    {props.editing ? <div style={{display: "flex", flexDirection: "column"}}>
        {(props.editingDinhKem || (typeof formInstance.getFieldValue(fieldName as any) == "string" ? formInstance.getFieldValue(fieldName as any) : undefined))?.split(ID_SEPARATE).map((file: any, idx: any) => 
            <span key={idx} onClick={() => callApiAndDisplayFile(file)}>{file?.substring(file.lastIndexOf("/") + 1)}</span>
        )}
    </div>: null}
    
    </>

}
export { AntdUpLoad }