import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_KieuTieuChiContext = createContext<IDanhMuc_KieuTieuChiContext | null>(null)

export interface IDanhMuc_KieuTieuChiContext{
    danhMuc_KieuTieuChiId: string | undefined;
    setDanhMuc_KieuTieuChiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_KieuTieuChiModalVisible: boolean;
    setDanhMuc_KieuTieuChiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_KieuTieuChiContext = () => {
    const context = useContext(DanhMuc_KieuTieuChiContext)
    if(!context)
        throw new Error("DanhMuc_KieuTieuChiContext must be used inside DanhMuc_KieuTieuChiContext.Provider")
    return context
}

export const DanhMuc_KieuTieuChiProvider = ({children}: IWithChildren) => {
    const [danhMuc_KieuTieuChiId, setDanhMuc_KieuTieuChiId] = useState<string>()
    const [danhMuc_KieuTieuChiModalVisible, setDanhMuc_KieuTieuChiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_KieuTieuChiContext.Provider value={{danhMuc_KieuTieuChiId, setDanhMuc_KieuTieuChiId, danhMuc_KieuTieuChiModalVisible, setDanhMuc_KieuTieuChiModalVisible}}>
        {children}
    </DanhMuc_KieuTieuChiContext.Provider> 
}