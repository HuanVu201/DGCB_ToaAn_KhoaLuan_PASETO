import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ShareDuLieuDanhGiaContext = createContext<IShareDuLieuDanhGiaContext | null>(null)

export interface IShareDuLieuDanhGiaContext{
    shareDuLieuDanhGiaId: string | undefined;
    setShareDuLieuDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    shareDuLieuDanhGiaModalVisible: boolean;
    setShareDuLieuDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    typeService : string | undefined;
    setTypeService : React.Dispatch<React.SetStateAction<string| undefined>>;
    historyCallApiTichHopModalVisible: boolean;
    setHistoryCallApiTichHopModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useShareDuLieuDanhGiaContext = () => {
    const context = useContext(ShareDuLieuDanhGiaContext)
    if(!context)
        throw new Error("ShareDuLieuDanhGiaContext must be used inside ShareDuLieuDanhGiaContext.Provider")
    return context
}

export const ShareDuLieuDanhGiaProvider = ({children}: IWithChildren) => {
    const [shareDuLieuDanhGiaId, setShareDuLieuDanhGiaId] = useState<string>()
    const [shareDuLieuDanhGiaModalVisible, setShareDuLieuDanhGiaModalVisible] = useState<boolean>(false)
    const [typeService, setTypeService] = useState<string>()
    const [historyCallApiTichHopModalVisible, setHistoryCallApiTichHopModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ShareDuLieuDanhGiaContext.Provider value={{shareDuLieuDanhGiaId, setShareDuLieuDanhGiaId, shareDuLieuDanhGiaModalVisible, setShareDuLieuDanhGiaModalVisible,typeService,setTypeService,historyCallApiTichHopModalVisible,setHistoryCallApiTichHopModalVisible}}>
        {children}
    </ShareDuLieuDanhGiaContext.Provider> 
}