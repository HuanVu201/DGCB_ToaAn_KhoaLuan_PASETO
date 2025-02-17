import { IWithChildren } from "@/types";
import React,{ createContext, PropsWithChildren, useContext, useState } from "react";

const NhomDonViContext = createContext<INhomDonViContext | null>(null)

export interface INhomDonViContext{
    NhomDonViId: string | undefined;
    setNhomDonViId: React.Dispatch<React.SetStateAction<string | undefined>>;
    NhomDonViModalVisible: boolean;
    setNhomDonViModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNhomDonViContext = () => {
    const context = useContext(NhomDonViContext)
    if(!context)
        throw new Error("NhomDonViContext must be used inside NhomDonViContext.Provider")
    return context
}

export const NhomDonViProvider = ({children}: PropsWithChildren ) => {
    const [NhomDonViId, setNhomDonViId] = useState<string>()
    const [NhomDonViModalVisible, setNhomDonViModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <NhomDonViContext.Provider value={{
        NhomDonViId, 
        setNhomDonViId, 
        NhomDonViModalVisible, 
        setNhomDonViModalVisible
        }}>
        {children}
    </NhomDonViContext.Provider> 
}