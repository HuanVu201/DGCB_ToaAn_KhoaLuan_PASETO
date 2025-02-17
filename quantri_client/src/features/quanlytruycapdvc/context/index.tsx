import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const LogAuthenContext = createContext<ILogAuthenContext | null>(null)

export interface ILogAuthenContext {
    idLogAuthen: string | undefined;
    setIdLogAuthen: React.Dispatch<React.SetStateAction<string | undefined>>;
    logAuthenModalVisible: boolean;
    setLogAuthenModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLogAuthenContext = () => {
    const context = useContext(LogAuthenContext)
    if (!context)
        throw new Error("LogAuthenContext must be used inside LogAuthenContext.Provider")
    return context
}

export const LogAuthenProvider = ({ children }: IWithChildren) => {
    const [idLogAuthen, setIdLogAuthen] = useState<string>()
    const [logAuthenModalVisible, setLogAuthenModalVisible] = useState<boolean>(false)
    return <LogAuthenContext.Provider value={{
        idLogAuthen, setIdLogAuthen,
        logAuthenModalVisible, setLogAuthenModalVisible
    }}>
        {children}
    </LogAuthenContext.Provider>
}