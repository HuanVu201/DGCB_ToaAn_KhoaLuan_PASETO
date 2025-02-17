import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const AuditLogContext = createContext<IAuditLogContext | null>(null)

export interface IAuditLogContext{
    auditLogId: string | undefined;
    setAuditLogId: React.Dispatch<React.SetStateAction<string | undefined>>;
    auditLogModalVisible: boolean;
    setAuditLogModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuditLogContext = () => {
    const context = useContext(AuditLogContext)
    if(!context)
        throw new Error("AuditLogContext must be used inside AuditLogContext.Provider")
    return context
}

export const AuditLogProvider = ({children}: IWithChildren) => {
    const [auditLogId, setAuditLogId] = useState<string>()
    const [auditLogModalVisible, setAuditLogModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <AuditLogContext.Provider value={{auditLogId, setAuditLogId, auditLogModalVisible, setAuditLogModalVisible}}>
        {children}
    </AuditLogContext.Provider> 
}