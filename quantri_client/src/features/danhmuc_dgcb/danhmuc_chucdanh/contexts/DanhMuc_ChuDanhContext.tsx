import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_ChucDanhContext = createContext<IDanhMuc_ChucDanhContext | null>(null)

export interface IDanhMuc_ChucDanhContext{
    danhMuc_ChucDanhId: string | undefined;
    setDanhMuc_ChucDanhId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_ChucDanhModalVisible: boolean;
    setDanhMuc_ChucDanhModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_ChucDanhContext = () => {
    const context = useContext(DanhMuc_ChucDanhContext)
    if(!context)
        throw new Error("DanhMuc_ChucDanhContext must be used inside DanhMuc_ChucDanhContext.Provider")
    return context
}

export const DanhMuc_ChucDanhProvider = ({children}: IWithChildren) => {
    const [danhMuc_ChucDanhId, setDanhMuc_ChucDanhId] = useState<string>()
    const [danhMuc_ChucDanhModalVisible, setDanhMuc_ChucDanhModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_ChucDanhContext.Provider value={{danhMuc_ChucDanhId, setDanhMuc_ChucDanhId, danhMuc_ChucDanhModalVisible, setDanhMuc_ChucDanhModalVisible}}>
        {children}
    </DanhMuc_ChucDanhContext.Provider> 
}