import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const KyDanhGiaContext = createContext<IKyDanhGiaContext | null>(null)

export interface IKyDanhGiaContext{
    kyDanhGiaId: string | undefined;
    setKyDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    kyDanhGiaModalVisible: boolean;
    setKyDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKyDanhGiaContext = () => {
    const context = useContext(KyDanhGiaContext)
    if(!context)
        throw new Error("KyDanhGiaContext must be used inside KyDanhGiaContext.Provider")
    return context
}

export const KyDanhGiaProvider = ({children}: IWithChildren) => {
    const [kyDanhGiaId, setKyDanhGiaId] = useState<string>()
    const [kyDanhGiaModalVisible, setKyDanhGiaModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <KyDanhGiaContext.Provider value={{kyDanhGiaId, setKyDanhGiaId, kyDanhGiaModalVisible, setKyDanhGiaModalVisible}}>
        {children}
    </KyDanhGiaContext.Provider> 
}