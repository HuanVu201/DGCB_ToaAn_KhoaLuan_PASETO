import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const CauHinhHeThongContext = createContext<ICauHinhHeThongContext | null>(null)

export interface ICauHinhHeThongContext{
    cauHinhHeThongId: string | undefined;
    setCauHinhHeThongId: React.Dispatch<React.SetStateAction<string | undefined>>;
    cauHinhHeThongModalVisible: boolean;
    setCauHinhHeThongModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCauHinhHeThongContext = () => {
    const context = useContext(CauHinhHeThongContext)
    if(!context)
        throw new Error("CauHinhHeThongContext must be used inside CauHinhHeThongContext.Provider")
    return context
}

export const CauHinhHeThongProvider = ({children}: IWithChildren) => {
    const [cauHinhHeThongId, setCauHinhHeThongId] = useState<string>()
    const [cauHinhHeThongModalVisible, setCauHinhHeThongModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <CauHinhHeThongContext.Provider value={{cauHinhHeThongId, setCauHinhHeThongId, cauHinhHeThongModalVisible, setCauHinhHeThongModalVisible}}>
        {children}
    </CauHinhHeThongContext.Provider> 
}