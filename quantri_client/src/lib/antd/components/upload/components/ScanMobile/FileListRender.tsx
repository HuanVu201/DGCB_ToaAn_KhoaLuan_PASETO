import { ComponentProps, useEffect, useRef } from "react";
import { useScanContext } from "../../contexts/ScanContext";
import { Row } from "antd";
import { FileItem } from "./FileItem";

export const FileListRender = () => {
    const {fileList, setFileList} = useScanContext()
    return (
      <>
        {fileList?.map((file, index) => {
          return (
            <FileItem file={file} index={index} key={index}/>
          );
        })}
      </>
    )
  }