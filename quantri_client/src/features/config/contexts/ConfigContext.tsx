import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ConfigContext = createContext<IConfigContext | null>(null)

export interface IConfigContext{
    ConfigId: string | undefined;
    setConfigId: React.Dispatch<React.SetStateAction<string | undefined>>;
    ConfigModalVisible: boolean;
    setConfigModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useConfigContext = () => {
    const context = useContext(ConfigContext)
    if(!context)
        throw new Error("ConfigContext must be used inside ConfigContext.Provider")
    return context
}

export const ConfigProvider = ({children}: IWithChildren) => {
    const [ConfigId, setConfigId] = useState<string>()
    const [ConfigModalVisible, setConfigModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ConfigContext.Provider value={{ConfigId, setConfigId, ConfigModalVisible, setConfigModalVisible}}>
        {children}
    </ConfigContext.Provider> 
}