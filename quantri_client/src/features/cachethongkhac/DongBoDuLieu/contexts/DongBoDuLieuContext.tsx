import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DongBoDuLieuContext = createContext<IDongBoDuLieuContext | null>(null)

export interface IDongBoDuLieuContext{
    DongBoDuLieuId: string | undefined;
    setDongBoDuLieuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    DongBoDuLieuModalVisible: boolean;
    setDongBoDuLieuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDongBoDuLieuContext = () => {
    const context = useContext(DongBoDuLieuContext)
    if(!context)
        throw new Error("DongBoDuLieuContext must be used inside DongBoDuLieuContext.Provider")
    return context
}

export const DongBoDuLieuProvider = ({children}: IWithChildren) => {
    const [DongBoDuLieuId, setDongBoDuLieuId] = useState<string>()
    const [DongBoDuLieuModalVisible, setDongBoDuLieuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DongBoDuLieuContext.Provider value={{DongBoDuLieuId, setDongBoDuLieuId, DongBoDuLieuModalVisible, setDongBoDuLieuModalVisible}}>
        {children}
    </DongBoDuLieuContext.Provider> 
}