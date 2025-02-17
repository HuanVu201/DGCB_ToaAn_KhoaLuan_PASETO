import { useEffect, useState } from "react"
import { exportDataServiceApi } from "@/features/ExportData/ExportDataService"
import { toast } from "react-toastify"
import { fileApi } from "@/features/file/services"
import { useButtonActionContext } from "../../../common/contexts/useButtonActionContext"
import { useXuLyPhieuContext } from "../../../common/contexts/useXuLyPhieuContext"

export const XuatDanhGiaPhongBanDonVi = () => {
    const buttonActionContext = useButtonActionContext()
    const xuLyContext = useXuLyPhieuContext()


    useEffect(() => {
        (async () => {
            if (buttonActionContext.inDanhGiaPhongBanDonViModalVisible &&
                buttonActionContext.selectedDanhGias && buttonActionContext.selectedDanhGias.length > 0) {
                xuLyContext.setLoading(true)
                try {
                    const resGetPhieu = await exportDataServiceApi.ExportPhieuDanhGiaDonVi({
                        danhGiaId: buttonActionContext.selectedDanhGias[0].toString()
                    })

                    if (resGetPhieu.data.data) {
                        xuLyContext.setUrlPdfPhieu(resGetPhieu.data.data.urlPdf)
                        xuLyContext.setUrlDocxPhieu(resGetPhieu.data.data.urlDocx)
                        xuLyContext.setIsKySo(resGetPhieu.data.data.isKySo ?? false)
                        xuLyContext.setDanhGiaId(buttonActionContext.selectedDanhGias[0].toString())
                        toast.success(resGetPhieu.data.message)
                    } else {
                        toast.error(resGetPhieu.data.message)
                    }
                } catch {
                    toast.error("Có lỗi trong quá trình xuất phiếu đánh giá")
                    xuLyContext.setLoading(false)
                }
                xuLyContext.setLoading(false)
            }
        })()
    }, [buttonActionContext.inDanhGiaPhongBanDonViModalVisible])

    useEffect(() => {
        (async () => {
            if (xuLyContext.xuatLaiPhieu && buttonActionContext.inDanhGiaPhongBanDonViModalVisible &&
                buttonActionContext.selectedDanhGias && buttonActionContext.selectedDanhGias.length > 0) {
                xuLyContext.setLoading(true)
                try {
                    const resGetPhieu = await exportDataServiceApi.ExportPhieuDanhGiaDonVi({
                        danhGiaId: buttonActionContext.selectedDanhGias[0].toString(),
                        refresh: xuLyContext.xuatLaiPhieu
                    })

                    if (resGetPhieu.data.data) {
                        xuLyContext.setUrlPdfPhieu(resGetPhieu.data.data.urlPdf)
                        xuLyContext.setUrlDocxPhieu(resGetPhieu.data.data.urlDocx)
                        xuLyContext.setIsKySo(resGetPhieu.data.data.isKySo ?? false)
                        toast.success(resGetPhieu.data.message)
                    } else {
                        toast.error(resGetPhieu.data.message)
                    }
                } catch {
                    toast.error("Có lỗi trong quá trình xuất phiếu đánh giá")
                    xuLyContext.setLoading(false)
                }
                xuLyContext.setXuatLaiPhieu(false)
                xuLyContext.setLoading(false)
            }
        })()
    }, [xuLyContext.xuatLaiPhieu])

    useEffect(() => {
        (async () => {
            if (xuLyContext.urlPdfPhieu) {
                const valueGetPdfBlob = await fileApi.GetFileByte({ path: xuLyContext.urlPdfPhieu })
                if (valueGetPdfBlob.data) {
                    xuLyContext.setPdfBlob(valueGetPdfBlob.data)
                } else {
                    toast.error("Có lỗi trong quá trình đọc file PDF")
                }
            }
        })()
    }, [xuLyContext.urlPdfPhieu])

    return <>
        <div style={{ height: '75vh' }} id="ContainerSwapper">

            {xuLyContext.pdfBlob ? <><iframe id="iframePdf" width="100%" height={"100%"} src={URL.createObjectURL(xuLyContext.pdfBlob as any)} /></> : null}
        </div>
    </>

}