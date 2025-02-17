import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const UserContext = createContext<IUserContext | null>(null)

export interface IUserContext{
    UserId: string | undefined;
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
    UserModalVisible: boolean;
    setUserModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context)
        throw new Error("UserContext must be used inside UserContext.Provider")
    return context
}

export const UserProvider = ({children}: IWithChildren) => {
    const [UserId, setUserId] = useState<string>()
    const [UserModalVisible, setUserModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <UserContext.Provider value={{UserId, setUserId, UserModalVisible, setUserModalVisible}}>
        {children}
    </UserContext.Provider> 
}