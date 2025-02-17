import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_CacCapContext = createContext<IDanhMuc_CacCapContext | null>(null)

export interface IDanhMuc_CacCapContext{
    danhMuc_CacCapId: string | undefined;
    setDanhMuc_CacCapId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_CacCapModalVisible: boolean;
    setDanhMuc_CacCapModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_CacCapContext = () => {
    const context = useContext(DanhMuc_CacCapContext)
    if(!context)
        throw new Error("DanhMuc_CacCapContext must be used inside DanhMuc_CacCapContext.Provider")
    return context
}

export const DanhMuc_CacCapProvider = ({children}: IWithChildren) => {
    const [danhMuc_CacCapId, setDanhMuc_CacCapId] = useState<string>()
    const [danhMuc_CacCapModalVisible, setDanhMuc_CacCapModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_CacCapContext.Provider value={{danhMuc_CacCapId, setDanhMuc_CacCapId, danhMuc_CacCapModalVisible, setDanhMuc_CacCapModalVisible}}>
        {children}
    </DanhMuc_CacCapContext.Provider> 
}