import { Modal, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import jsPDF from "jspdf";
import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { addImageFromBase64ToPDF } from "../ultis";
import { PreviewFile } from "../components/ScanMobile/ScanPreviewFile";
import { PickFileName } from "../components/ScanMobile/PickFileName";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { togglerAppLoading } from "@/lib/redux/GlobalState";

export type ScanFileList = {
  base64: any;
  name: string;
  uid: string;
  type: string;
};

export type ScanContextType = {
  fileList: ScanFileList[] | undefined;
  setFileList: React.Dispatch<React.SetStateAction<ScanFileList[] | undefined>>;
  onDeleteFile: (file: ScanFileList) => void;
  previewFile: ScanFileList | undefined;
  hanlerPreviewFile: (file: ScanFileList) => void;

  closePreviewModal: () => void;
  extractPdfFromImages: () => void;
  pdfData: jsPDF | undefined;

  pickFileNameModal: boolean;
  setPickFileNameModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (fileName: string) => void;
  clearState: () => void;
  scanModalWrapper: boolean;
  setScanModalWrapper: React.Dispatch<React.SetStateAction<boolean>>;
} | null


const ScanContext = React.createContext<ScanContextType>(null)

export const ScanProvider = ({ children, onSuccess }: { children: React.ReactNode; onSuccess: (fileName: string) => void }) => {
  const [fileList, setFileList] = useState<ScanFileList[]>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [pickFileNameModal, setPickFileNameModal] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<ScanFileList>();
  const [scanModalWrapper, setScanModalWrapper] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const [pdfData, setPdfData] = useState<jsPDF>()

  const onDeleteFile = (file: ScanFileList) => {
    setFileList((curr) => curr?.filter(f => f.uid != file.uid))
  }
  const hanlerPreviewFile = (file: ScanFileList) => {
    setPreviewFile(file)
    setPreviewVisible(true);
  }
  const closePreviewModal = () => {
    setPreviewVisible(false);
    setPreviewFile(undefined)
  }

  const clearState = () => {
    setFileList(undefined)
    setPdfData(undefined)
    setPickFileNameModal(false)
    setPreviewFile(undefined)
    setPreviewVisible(false)
    setScanModalWrapper(false)
    dispatch(togglerAppLoading(false))
  }

  const handleExtract = () => {
    const doc = new jsPDF();
    dispatch(togglerAppLoading(true))
    fileList?.forEach((file, idx) => {
      // addImageFromBase64ToPDF(doc, file).then(data => {
      //   if (idx > 0) {
      //     doc.addPage();
      //   }
      //   doc.addImage(data.base64, data.type, 10, 10, 180, 160);
      // });
      if (idx > 0) {
        doc.addPage();
      }
      doc.addImage(file.base64, file.type, 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    })
    // doc.save("to-khai.pdf");
    // doc.output()
    setPdfData(doc)
    dispatch(togglerAppLoading(false))

  }

  const extractPdfFromImages = () => {
    if (!fileList?.length) {
      // toast.warn("Vui lòng chọn ảnh muốn scan")
      return;
    }
    if (pdfData) {
      Modal.confirm({
        title: "Thao tác sẽ thay thế tệp vừa tạo",
        okText: "Tiếp tục",
        cancelText: "Hủy",
        onCancel: () => {
          return;
        },
        onOk: () => {
          handleExtract();
        }
      })
    }
    handleExtract();
  }

  return <ScanContext.Provider value={{
    fileList,
    setFileList,
    onDeleteFile,
    hanlerPreviewFile,
    closePreviewModal,
    previewFile,

    extractPdfFromImages,
    pdfData,
    pickFileNameModal,
    setPickFileNameModal,
    onSuccess,
    clearState,
    scanModalWrapper,
    setScanModalWrapper,
  }}>
    {children}
    <PickFileName />
    <PreviewFile visible={previewVisible} />
  </ScanContext.Provider>
}

export const useScanContext = () => {
  const scanContext = useContext(ScanContext)
  if (!scanContext) {
    throw new Error("useScanContext must be used inside ScanProvider")
  }
  return scanContext
}