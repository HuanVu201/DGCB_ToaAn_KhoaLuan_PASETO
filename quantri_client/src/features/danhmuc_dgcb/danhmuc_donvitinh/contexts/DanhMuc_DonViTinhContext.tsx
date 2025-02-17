import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_DonViTinhContext = createContext<IDanhMuc_DonViTinhContext | null>(null)

export interface IDanhMuc_DonViTinhContext{
    danhMuc_DonViTinhId: string | undefined;
    setDanhMuc_DonViTinhId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_DonViTinhModalVisible: boolean;
    setDanhMuc_DonViTinhModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_DonViTinhContext = () => {
    const context = useContext(DanhMuc_DonViTinhContext)
    if(!context)
        throw new Error("DanhMuc_DonViTinhContext must be used inside DanhMuc_DonViTinhContext.Provider")
    return context
}

export const DanhMuc_DonViTinhProvider = ({children}: IWithChildren) => {
    const [danhMuc_DonViTinhId, setDanhMuc_DonViTinhId] = useState<string>()
    const [danhMuc_DonViTinhModalVisible, setDanhMuc_DonViTinhModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_DonViTinhContext.Provider value={{danhMuc_DonViTinhId, setDanhMuc_DonViTinhId, danhMuc_DonViTinhModalVisible, setDanhMuc_DonViTinhModalVisible}}>
        {children}
    </DanhMuc_DonViTinhContext.Provider> 
}