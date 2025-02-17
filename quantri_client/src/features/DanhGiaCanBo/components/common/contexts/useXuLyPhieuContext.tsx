import { IWithChildren } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CURRENTTIME_ISOSTRING, ID_SEPARATE } from "@/data";
import { btnSignClick, getAutoPositionSigned } from "@/utils/common";
import axios from "axios";
import { fileApi } from "@/features/file/services";
import { useAppSelector } from "@/lib/redux/Hooks";
import { IDanhGia } from "../models/phieuDanhGia";
import { danhGiaCanBoServiceApi } from "../service/DanhGiaService";
import { ButtonActionProvider, useButtonActionContext } from "./useButtonActionContext";
import { danhGiaDonViServiceApi } from "../../DanhGiaDonViPhongBan/services/DanhGiaDonViService";

const XuLyPhieuContext = createContext<IXuLyPhieuContext | null>(null);

export interface IXuLyPhieuContext {
    danhGiaId: string | undefined,
    setDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;

    danhGia: IDanhGia | null,
    setDanhGia: React.Dispatch<React.SetStateAction<IDanhGia | null>>;

    pdfBlob: Blob | undefined,
    setPdfBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;

    urlDocxPhieu: string | undefined,
    setUrlDocxPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;

    urlPdfPhieu: string | undefined,
    setUrlPdfPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;

    isKySo: boolean
    setIsKySo: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    xuatLaiPhieu: boolean
    setXuatLaiPhieu: React.Dispatch<React.SetStateAction<boolean>>;

    handlerKySo: (signPos: string) => void;

}


export const useXuLyPhieuContext = () => {
    const context = useContext(XuLyPhieuContext);
    if (!context)
        throw new Error(
            "XuLyPhieuContext must be used inside XuLyPhieuContext.Provider"
        );
    return context;
};


export const XuLyPhieuProvider = ({ children }: IWithChildren) => {
    const { parseToken } = useAppSelector((state) => state.auth);
    const buttonActionContext = useButtonActionContext()

    const handlerKySo = async (signPos: string) => {

        let newUrlPdfPhieu: string = ''

        if (pdfBlob) {

            await btnSignClick(
                URL.createObjectURL(pdfBlob as Blob),
                'XuatPhieu',
                (urlFileSigned, oldFile) => {
                    newUrlPdfPhieu = urlFileSigned

                }, async (fileName: string) => {
                    const res = await axios.get(fileName, { responseType: "blob" })
                    return res.data
                }, [{
                    name: 'Chữ ký',
                    isDefault: true,
                    appearance: {
                    },
                    autoPosition: {
                        ...getAutoPositionSigned(parseToken?.fullName ?? "", signPos),
                    }
                }], true
            )
        }
        if (newUrlPdfPhieu) {
            setUrlPdfPhieu(newUrlPdfPhieu)
            if (buttonActionContext.inDanhGiaCaNhanModalVisible) {
                const resUpdateUrl = await danhGiaCanBoServiceApi.UpdateUrlPhieuDanhGia({
                    id: danhGiaId,
                    data: {
                        urlPdf: newUrlPdfPhieu
                    }
                })

                if (!resUpdateUrl.data.succeeded) {
                    toast.error("Cập nhập phiếu ký số không thành công")
                }
            } else if (buttonActionContext.inDanhGiaPhongBanDonViModalVisible) {
                const resUpdateUrl = await danhGiaDonViServiceApi.UpdateUrlPhieuDanhGia({
                    id: danhGiaId,
                    data: {
                        urlPdf: newUrlPdfPhieu
                    }
                })

                if (!resUpdateUrl.data.succeeded) {
                    toast.error("Cập nhập phiếu ký số không thành công")
                }
            }
        }
    }

    const base64transparent = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`
    const [danhGiaId, setDanhGiaId] = useState<string>()
    const [danhGia, setDanhGia] = useState<IDanhGia | null>(null)
    const [urlDocxPhieu, setUrlDocxPhieu] = useState<string>()
    const [pdfBlob, setPdfBlob] = useState<Blob>()
    const [urlPdfPhieu, setUrlPdfPhieu] = useState<string>()
    const [isKySo, setIsKySo] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [xuatLaiPhieu, setXuatLaiPhieu] = useState<boolean>(false)

    return (
        <XuLyPhieuContext.Provider
            value={{
                danhGiaId, setDanhGiaId,
                danhGia, setDanhGia,
                urlDocxPhieu, setUrlDocxPhieu,
                pdfBlob, setPdfBlob,
                urlPdfPhieu, setUrlPdfPhieu,
                isKySo, setIsKySo,
                reload, setReload,
                loading, setLoading,
                handlerKySo,
                xuatLaiPhieu, setXuatLaiPhieu
            }}
        >
            {children}
        </XuLyPhieuContext.Provider>
    );
};
