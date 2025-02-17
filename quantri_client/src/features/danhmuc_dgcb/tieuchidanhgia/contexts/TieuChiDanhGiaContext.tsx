import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const TieuChiDanhGiaContext = createContext<ITieuChiDanhGiaContext | null>(null)

export interface ITieuChiDanhGiaContext{
    tieuchidanhgiaId: string | undefined;
    setTieuChiDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    tieuchidanhgiaModalVisible: boolean;
    setTieuChiDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTieuChiDanhGiaContext = () => {
    const context = useContext(TieuChiDanhGiaContext)
    if(!context)
        throw new Error("TieuChiDanhGiaContext must be used inside TieuChiDanhGiaContext.Provider")
    return context
}

export const TieuChiDanhGiaProvider = ({children}: IWithChildren) => {
    const [tieuchidanhgiaId, setTieuChiDanhGiaId] = useState<string>()
    const [tieuchidanhgiaModalVisible, setTieuChiDanhGiaModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <TieuChiDanhGiaContext.Provider value={{tieuchidanhgiaId, setTieuChiDanhGiaId, tieuchidanhgiaModalVisible, setTieuChiDanhGiaModalVisible}}>
        {children}
    </TieuChiDanhGiaContext.Provider> 
}