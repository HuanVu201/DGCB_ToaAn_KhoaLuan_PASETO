import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_KhoTieuChiContext = createContext<IDanhMuc_KhoTieuChiContext | null>(null)

export interface IDanhMuc_KhoTieuChiContext{
    danhMuc_KhoTieuChiId: string | undefined;
    setDanhMuc_KhoTieuChiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_KhoTieuChiModalVisible: boolean;
    setDanhMuc_KhoTieuChiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_KhoTieuChiContext = () => {
    const context = useContext(DanhMuc_KhoTieuChiContext)
    if(!context)
        throw new Error("DanhMuc_KhoTieuChiContext must be used inside DanhMuc_KhoTieuChiContext.Provider")
    return context
}

export const DanhMuc_KhoTieuChiProvider = ({children}: IWithChildren) => {
    const [danhMuc_KhoTieuChiId, setDanhMuc_KhoTieuChiId] = useState<string>()
    const [danhMuc_KhoTieuChiModalVisible, setDanhMuc_KhoTieuChiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_KhoTieuChiContext.Provider value={{danhMuc_KhoTieuChiId, setDanhMuc_KhoTieuChiId, danhMuc_KhoTieuChiModalVisible, setDanhMuc_KhoTieuChiModalVisible}}>
        {children}
    </DanhMuc_KhoTieuChiContext.Provider> 
}