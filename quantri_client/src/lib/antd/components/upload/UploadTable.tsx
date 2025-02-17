import { Upload, UploadProps } from 'antd'
import { AntdButton, AntdSpace, FileUploadConfig } from '..'
import { UploadOutlined } from '@ant-design/icons'
import { getToken } from '@/lib/axios'
import { API_VERSION, HOST_PATH, HOST_PATH_FILE, UPLOADFILE_ENDPOINT } from '@/data'
import { useUploadTable, useUploadTableType } from './hooks/useUploadTable'
import { RcFile } from 'antd/es/upload'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/lib/redux/Hooks'
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Service } from '@/services'
import { SignSignature } from '@/utils/common'
import { scanPCHandler } from '@/utils/scanpc'

export interface UploadAntdTableProps<IModel> extends UploadProps {
  folderName: string | undefined
  kySoToken?: boolean
  scanPC?: boolean
  kySoNEAC?: boolean
  dinhKem?: string
  dataSource?: IModel[]
  setDataSource: React.Dispatch<React.SetStateAction<IModel[]>>
  colDinhKemName: keyof IModel
  rowNumber: number
  extraElement?: (loading: boolean) => React.ReactNode
  hideUpload?: boolean
  hideKySoWith?: React.ReactNode // khi trạng thái số hóa là tái sử dụng thì sẽ ẩn nút chọn tệp
  onCleanSoHoa?: () => void // khi xóa file mà dinhKem không còn file nào thì sẽ phải reset trạng thái số hóa để có thể hiện lại nút chọn tệp
  onRemoveFile?: (file: string) => void
  customSignature?: SignSignature[]
  customGetFileSignature?: (fileName: string) => Promise<any>
}
export const UploadTable = <IModel,>(props: UploadAntdTableProps<IModel>) => {
  const {
    folderName,
    kySoToken,
    kySoNEAC,
    dinhKem,
    dataSource,
    customSignature,
    onRemoveFile,
    setDataSource,
    colDinhKemName,
    rowNumber,
    extraElement,
    hideUpload,
    hideKySoWith,
    onCleanSoHoa,
    maxCount,
    accept,
    scanPC,
    ...rest
  } = props

  const { onChangeDinhKemTable, danhSachDinhKems } = useUploadTable({
    customSignature,
    kySoToken,
    kySoNEAC,
    dinhKem,
    setDataSource,
    colDinhKemName,
    folderName,
    rowNumber,
    hideUpload,
    hideKySoWith,
    onCleanSoHoa,
    onRemoveFile
  })

  const { publicModule } = useAppSelector((state) => state.config)
  const { pathname } = useLocation()
  const [btnLoading, setBtnLoading] = useState(false)

  //upload file lên server
  const onUploadFile: UploadProps['onChange'] = async (info) => {
    if(info.file.status == "uploading"){
      setBtnLoading(true)
    }
    else if (info.file.status === 'done') {
      if (maxCount && maxCount == 1 && dinhKem) {
        onChangeDinhKemTable(info.file.response.data, dinhKem, 'override')
      } else {
        onChangeDinhKemTable(info.file.response.data, undefined, 'add')
      }
      setBtnLoading(false)
    }
    else if (info.file.status == "error"){
      setBtnLoading(false)
    }
  }
  const onScanFile = (fileName : string) => {
    if(folderName){
      scanPCHandler(fileName ?? "to-khai.pdf", folderName, (newFile) => {
        onChangeDinhKemTable(newFile, undefined, "add")
      })
    } else {
      console.error("không tìm thấy file đã tải lên")
    }
  }


  const beforeUploadConfig = useMemo((): FileUploadConfig => {
    const fileConfig = publicModule?.find(
      (x) => x.code == 'file_upload'
    )?.content
    return fileConfig ? JSON.parse(fileConfig) : undefined
  }, [publicModule])

  const beforeUpload = (file: RcFile) => {
    if (!beforeUploadConfig) {
      return true
    }
    const accept = beforeUploadConfig.accept
    const fileSize = beforeUploadConfig.size
    // const isCorrectFileType = file.type === 'image/jpeg' || file.type === 'image/png';
    const isCorrectFileType = pathname.includes(
      Service.primaryRoutes.portaldvc.root
    )
      ? accept.includes(file.type)
      : true
    if (!isCorrectFileType) {
      toast.error(`Vui lòng chọn đúng định dạng tệp ${accept.join(', ')}`)
    }
    const isCorrectFileSize = file.size / 1024 / 1024 < fileSize
    if (!isCorrectFileSize) {
      toast.error(
        `Vui lòng chọn tệp đính kèm có kích thước nhỏ hơn ${fileSize} MB`
      )
    }
    return isCorrectFileType && isCorrectFileSize
  }

  // thêm sửa xóa trường dinhKem trên row của dataSource.
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      {hideUpload ? null : (
        <>
        <AntdSpace direction={'horizontal'}>
          <Upload
            accept={
              accept
                ? accept
                : beforeUploadConfig?.accept &&
                  pathname.includes(Service.primaryRoutes.portaldvc.root)
                ? beforeUploadConfig?.accept.join(', ')
                : '*/*'
            }
            name="Files"
            action={HOST_PATH_FILE + API_VERSION + UPLOADFILE_ENDPOINT}
            headers={{
              Authorization: `Bearer ${getToken()}`,
            }}
            beforeUpload={beforeUpload}
            showUploadList={false}
            maxCount={maxCount ?? 20}
            data={{ FolderName: folderName }}
            onChange={onUploadFile}
          >
            {/* khi có trạng thái số hóa => có đính kèm số hóa => không cho chọn tệp bth nữa */}
            {hideKySoWith === undefined ? (
              <>
                <AntdButton loading={btnLoading} icon={<UploadOutlined />}>Chọn tệp</AntdButton>
              </>
            ) : null}
          </Upload>
          {hideKySoWith === undefined ? <>
            {extraElement ? extraElement(btnLoading) : null}
          </> : null}
          
        </AntdSpace>
        
        </>
      )}
      {beforeUploadConfig?.size  && !hideUpload ? <i className='warningDungLuong' style={{fontSize:13, color: "tomato", marginTop: 0}}>Dung lượng tối đa: {beforeUploadConfig.size} MB</i> : null}
      
      {/* {beforeUploadConfig?.size && pathname.includes(Service.primaryRoutes.portaldvc.root) && !hideUpload ?  : null} */}
      <div style={{marginTop:2}}>{dinhKem ? danhSachDinhKems : null}</div>
    </div>
  )
}