import { Modal } from "antd"
import {useScanContext} from "../../contexts/ScanContext"

export const PreviewFile = ({visible} : { visible: boolean}) => {
    const {closePreviewModal, previewFile} = useScanContext()
    return <Modal title={previewFile?.name} open={visible} onCancel={closePreviewModal} footer={null}>
      {previewFile ? <img src={previewFile.base64} style={{width:"100%"}}/> : null}
    </Modal>
  }