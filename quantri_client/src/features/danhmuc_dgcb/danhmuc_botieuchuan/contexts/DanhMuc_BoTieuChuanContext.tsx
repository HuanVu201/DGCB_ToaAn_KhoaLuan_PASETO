import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_BoTieuChuanContext = createContext<IDanhMuc_BoTieuChuanContext | null>(null)

export interface IDanhMuc_BoTieuChuanContext{
    danhMuc_BoTieuChuanId: string | undefined;
    setDanhMuc_BoTieuChuanId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_BoTieuChuanModalVisible: boolean;
    setDanhMuc_BoTieuChuanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_BoTieuChuanContext = () => {
    const context = useContext(DanhMuc_BoTieuChuanContext)
    if(!context)
        throw new Error("DanhMuc_BoTieuChuanContext must be used inside DanhMuc_BoTieuChuanContext.Provider")
    return context
}

export const DanhMuc_BoTieuChuanProvider = ({children}: IWithChildren) => {
    const [danhMuc_BoTieuChuanId, setDanhMuc_BoTieuChuanId] = useState<string>()
    const [danhMuc_BoTieuChuanModalVisible, setDanhMuc_BoTieuChuanModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_BoTieuChuanContext.Provider value={{danhMuc_BoTieuChuanId, setDanhMuc_BoTieuChuanId, danhMuc_BoTieuChuanModalVisible, setDanhMuc_BoTieuChuanModalVisible}}>
        {children}
    </DanhMuc_BoTieuChuanContext.Provider> 
}