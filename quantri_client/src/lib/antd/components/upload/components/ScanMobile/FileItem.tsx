import { Col, Modal } from "antd";
import { ScanFileList, useScanContext } from "../../contexts/ScanContext";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { AntdSpace } from "../../../space/Space";

export const FileItem = ({file, index}: {index: number; file: ScanFileList}) => {
  const {onDeleteFile, hanlerPreviewFile} = useScanContext()
  const deleteHandler = () => {
    Modal.confirm({
      title: "Xác nhận xóa tệp: " + file.name,
      cancelText:"Hủy",
      okText:"Xác nhận",
      onOk: () => {
        onDeleteFile(file)
      }
    })
  }
    return (
      <Col span={24} >
          <div style={{border: "1px solid #ccc", padding:10, marginBottom: 10}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span style={{color:"#ccc"}}>Trang {index + 1}</span>
              <AntdSpace >
                <EyeOutlined style={{color:"cadetblue", fontSize:"1.1rem"}} onClick={() => hanlerPreviewFile(file)} role="button"/>
                <DeleteOutlined style={{color:"tomato", fontSize:"1.1rem"}} onClick={deleteHandler} role="button"/>
              </AntdSpace>
            </div>
            <img src={file.base64} style={{width:"100%", objectFit: "contain", aspectRatio: "16/9"}}/>
          </div>
        </Col>
    )
  }

// export const DragItem = ({provided, index, file, snapShot, portalRef}: {snapShot: DraggableStateSnapshot;provided: DraggableProvided; index: number; file: ScanFileList; portalRef: React.MutableRefObject<Element | undefined>}) => {
//   const {onDeleteFile, hanlerPreviewFile} = useScanContext()
//     const deleteHandler = () => {
//       Modal.confirm({
//         title: "Xác nhận xóa tệp: " + file.name,
//         cancelText:"Hủy",
//         okText:"Xác nhận",
//         onOk: () => {
//           onDeleteFile(file)
//         }
//       })
//     }
//   const child = <Col span={24} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//     <div style={{border: "1px solid #ccc", padding:10, marginBottom: 10}}>
//       <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
//         <span style={{color:"#ccc"}}>Trang {index + 1}</span>
//         <AntdSpace >
//           <EyeOutlined style={{color:"cadetblue", fontSize:"1.1rem"}} onClick={() => hanlerPreviewFile(file)} role="button"/>
//           <DeleteOutlined style={{color:"tomato", fontSize:"1.1rem"}} onClick={deleteHandler} role="button"/>
//         </AntdSpace>
//       </div>
//       <img src={file.base64} style={{width:"100%", objectFit: "contain", aspectRatio: "16/9"}}/>
//     </div>
//   </Col>
//   if(snapShot.isDragging) {
//     return (
//       ReactDOM.createPortal(child, portalRef.current!)
//     )
//   }else {
//     return<>{child}</>
//   }
// }