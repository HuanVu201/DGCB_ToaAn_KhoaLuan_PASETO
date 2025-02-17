import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const LstUsersContext = createContext<ILstUsersContext | null>(null)

export interface ILstUsersContext{
    lstUsersId: string | undefined;
    setLstUsersId: React.Dispatch<React.SetStateAction<string | undefined>>;
    lstUsersModalVisible: boolean;
    setLstUsersModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useLstUsersContext = () => {
    const context = useContext(LstUsersContext)
    if(!context)
        throw new Error("LstUsersContext must be used inside LstUsersContext.Provider")
    return context
}

export const LstUsersProvider = ({children}: IWithChildren) => {
    const [lstUsersId, setLstUsersId] = useState<string>()
    const [lstUsersModalVisible, setLstUsersModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <LstUsersContext.Provider value={{lstUsersId, setLstUsersId, lstUsersModalVisible, setLstUsersModalVisible}}>
        {children}
    </LstUsersContext.Provider> 
}