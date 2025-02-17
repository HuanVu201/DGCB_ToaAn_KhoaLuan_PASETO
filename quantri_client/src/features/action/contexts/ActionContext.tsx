import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ActionContext = createContext<IActionContext | null>(null)

export interface IActionContext{
    ActionId: string | undefined;
    setActionId: React.Dispatch<React.SetStateAction<string | undefined>>;

    ActionModalVisible: boolean;
    setActionModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useActionContext = () => {
    const context = useContext(ActionContext)
    if(!context)
        throw new Error("ActionContext must be used inside ActionContext.Provider")
    return context
}

export const ActionProvider = ({children}: IWithChildren) => {
    const [ActionId, setActionId] = useState<string>()
    const [ActionModalVisible, setActionModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ActionContext.Provider value={{ActionId, setActionId, ActionModalVisible, setActionModalVisible}}>
        {children}
    </ActionContext.Provider> 
}