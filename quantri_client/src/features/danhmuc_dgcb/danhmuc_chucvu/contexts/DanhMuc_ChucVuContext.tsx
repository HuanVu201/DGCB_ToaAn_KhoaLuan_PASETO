import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_ChucVuContext = createContext<IDanhMuc_ChucVuContext | null>(null)

export interface IDanhMuc_ChucVuContext{
    danhMuc_ChucVuId: string | undefined;
    setDanhMuc_ChucVuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_ChucVuModalVisible: boolean;
    setDanhMuc_ChucVuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_ChucVuContext = () => {
    const context = useContext(DanhMuc_ChucVuContext)
    if(!context)
        throw new Error("DanhMuc_ChucVuContext must be used inside DanhMuc_ChucVuContext.Provider")
    return context
}

export const DanhMuc_ChucVuProvider = ({children}: IWithChildren) => {
    const [danhMuc_ChucVuId, setDanhMuc_ChucVuId] = useState<string>()
    const [danhMuc_ChucVuModalVisible, setDanhMuc_ChucVuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_ChucVuContext.Provider value={{danhMuc_ChucVuId, setDanhMuc_ChucVuId, danhMuc_ChucVuModalVisible, setDanhMuc_ChucVuModalVisible}}>
        {children}
    </DanhMuc_ChucVuContext.Provider> 
}