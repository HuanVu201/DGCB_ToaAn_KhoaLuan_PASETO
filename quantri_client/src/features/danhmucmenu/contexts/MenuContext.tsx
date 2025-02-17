import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const MenuContext = createContext<IMenuContext | null>(null)

export interface IMenuContext{
    menuId: string | undefined;
    setMenuId: React.Dispatch<React.SetStateAction<string | undefined>>;
    menuModalVisible: boolean;
    setMenuModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMenuContext = () => {
    const context = useContext(MenuContext)
    if(!context)
        throw new Error("MenuContext must be used inside MenuContext.Provider")
    return context
}

export const MenuProvider = ({children}: IWithChildren) => {
    const [menuId, setMenuId] = useState<string>()
    const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <MenuContext.Provider value={{menuId, setMenuId, menuModalVisible, setMenuModalVisible}}>
        {children}
    </MenuContext.Provider> 
}