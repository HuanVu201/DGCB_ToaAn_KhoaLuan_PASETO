import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const CauHinhKySoContext = createContext<ICauHinhKySoContext | null>(null)

export interface ICauHinhKySoContext{
    cauHinhKySoId: string | undefined;
    setCauHinhKySoId: React.Dispatch<React.SetStateAction<string | undefined>>;
    cauHinhKySoModalVisible: boolean;
    setCauHinhKySoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useCauHinhKySoContext = () => {
    const context = useContext(CauHinhKySoContext)
    if(!context)
        throw new Error("CauHinhKySoContext must be used inside CauHinhKySoContext.Provider")
    return context
}

export const CauHinhKySoProvider = ({children}: IWithChildren) => {
    const [cauHinhKySoId, setCauHinhKySoId] = useState<string>()
    const [cauHinhKySoModalVisible, setCauHinhKySoModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <CauHinhKySoContext.Provider value={{cauHinhKySoId, setCauHinhKySoId, cauHinhKySoModalVisible, setCauHinhKySoModalVisible}}>
        {children}
    </CauHinhKySoContext.Provider> 
}