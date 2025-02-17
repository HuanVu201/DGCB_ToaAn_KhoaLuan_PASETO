import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const HistoryCallApiTichHopContext = createContext<IHistoryCallApiTichHopContext | null>(null)

export interface IHistoryCallApiTichHopContext{
    historyCallApiTichHopId: string | undefined;
    setHistoryCallApiTichHopId: React.Dispatch<React.SetStateAction<string | undefined>>;
    historyCallApiTichHopModalVisible: boolean;
    setHistoryCallApiTichHopModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useHistoryCallApiTichHopContext = () => {
    const context = useContext(HistoryCallApiTichHopContext)
    if(!context)
        throw new Error("HistoryCallApiTichHopContext must be used inside HistoryCallApiTichHopContext.Provider")
    return context
}

export const HistoryCallApiTichHopProvider = ({children}: IWithChildren) => {
    const [historyCallApiTichHopId, setHistoryCallApiTichHopId] = useState<string>()
    const [historyCallApiTichHopModalVisible, setHistoryCallApiTichHopModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <HistoryCallApiTichHopContext.Provider value={{historyCallApiTichHopId, setHistoryCallApiTichHopId, historyCallApiTichHopModalVisible, setHistoryCallApiTichHopModalVisible}}>
        {children}
    </HistoryCallApiTichHopContext.Provider> 
}