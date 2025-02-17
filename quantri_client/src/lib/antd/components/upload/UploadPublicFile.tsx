import { FormInstance, Upload, UploadProps } from "antd";
import { AntdButton, AntdSpace, FileUploadConfig } from "..";
import { UploadOutlined } from "@ant-design/icons";
import { getToken } from "@/lib/axios";
import { API_VERSION, HOST_PATH, HOST_PATH_FILE, UPLOADFILE_ENDPOINT, UPLOADPUBLICFILE_ENDPOINT } from "@/data";
import { useUploadTable } from "./hooks/useUploadTable";
import { RcFile } from "antd/es/upload";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Service } from "@/services";
import { useUploadPublicFile } from "./hooks/useUploadPublicFile";

export interface AntdUploadPublicFileProps extends UploadProps {
    folderName: string | undefined;
    dinhKem?: string;
    extraElement?: React.ReactNode;
    hideUpload?: boolean;
    onRemoveFile?: (file: string) => void;
    form: FormInstance<any>;
    fieldName: string;
}
export const AntdUploadPublicFile = (props: AntdUploadPublicFileProps) => {
    const {folderName, dinhKem, extraElement, hideUpload, onRemoveFile, form, fieldName, ...rest} = props
    const {danhSachDinhKems, onChangeDinhKem} = useUploadPublicFile({dinhKem, hideUpload, onRemoveFile, form, fieldName})
    const {publicModule} = useAppSelector(state => state.config)
    const {pathname} = useLocation()
    
    //upload file lên server
    const onUploadFile : UploadProps["onChange"] = async (info) => {
        if (info.file.status === 'done') {
            onChangeDinhKem(info.file.response.data, undefined, "add")
        }
    }

    const beforeUploadConfig = useMemo(() : FileUploadConfig => {
        const fileConfig = publicModule?.find(x => x.code == "file_upload")?.content
        return fileConfig ? JSON.parse(fileConfig) : undefined
    }, [publicModule])

    const beforeUpload = (file: RcFile) => {
        if(!beforeUploadConfig){
            return true
        }
        const accept = beforeUploadConfig.accept
        const fileSize = beforeUploadConfig.size
        // const isCorrectFileType = file.type === 'image/jpeg' || file.type === 'image/png';
        const isCorrectFileType = pathname.includes(Service.primaryRoutes.portaldvc.root) ? accept.includes(file.type) : true;
        if (!isCorrectFileType) {
          toast.error(`Vui lòng chọn đúng định dạng tệp ${accept.join(", ")}`);
        }
        const isCorrectFileSize = file.size / 1024 / 1024 < fileSize;
        if (!isCorrectFileSize) {
            toast.error(`Vui lòng chọn tệp đính kèm có kích thước nhỏ hơn    ${fileSize} MB`);
        }
        return isCorrectFileType && isCorrectFileSize;
      };

    // thêm sửa xóa trường dinhKem trên row của dataSource.
    return <AntdSpace direction="vertical">
        {hideUpload ? null : <AntdSpace direction= {"horizontal"}>
            <Upload 
            accept={beforeUploadConfig?.accept && pathname.includes(Service.primaryRoutes.portaldvc.root) ? beforeUploadConfig?.accept.join(", ") : "*/*"}
            name='Files'
            action={HOST_PATH_FILE + API_VERSION + UPLOADPUBLICFILE_ENDPOINT} headers={{
                Authorization: `Bearer ${getToken()}`
            }} 
            beforeUpload={beforeUpload}
            showUploadList={false}
            maxCount={10} 
            data={{ FolderName: folderName }}
            onChange={onUploadFile}>
                {/* khi có trạng thái số hóa => có đính kèm số hóa => không cho chọn tệp bth nữa */}
                {<AntdButton icon={<UploadOutlined />}>Chọn tệp</AntdButton>}
            </Upload>
            {extraElement}
        </AntdSpace>}
        {beforeUploadConfig?.size  && !hideUpload ? <i className='warningDungLuong' style={{fontSize:13, color: "tomato", marginTop: 0}}>Dung lượng tối đa: {beforeUploadConfig.size} MB</i> : null}
        {danhSachDinhKems}
    </AntdSpace>
}
