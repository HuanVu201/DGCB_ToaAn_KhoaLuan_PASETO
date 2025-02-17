import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const RolesContext = createContext<IRolesContext | null>(null)

export interface IRolesContext{
    RolesId: string | undefined;
    setRolesId: React.Dispatch<React.SetStateAction<string | undefined>>;
    RolesModalVisible: boolean;
    setRolesModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    RolesClaimModalVisible: boolean;
    setRolesClaimModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRolesContext = () => {
    const context = useContext(RolesContext)
    if(!context)
        throw new Error("RolesContext must be used inside RolesContext.Provider")
    return context
}

export const RolesProvider = ({children}: IWithChildren) => {
    const [RolesId, setRolesId] = useState<string>()
    const [RolesModalVisible, setRolesModalVisible] = useState<boolean>(false)
    const [RolesClaimModalVisible, setRolesClaimModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <RolesContext.Provider value={{RolesId, setRolesId, RolesModalVisible, setRolesModalVisible,RolesClaimModalVisible,setRolesClaimModalVisible}}>
        {children}
    </RolesContext.Provider> 
}