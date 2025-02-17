import { IUser } from "@/features/user/models";
import { IWithChildren } from "@/types"
import { createContext, useContext, useState } from "react"
const VaiTroModalContext = createContext<IVaiTroModalContext | null>(null)

export interface IVaiTroModalContext {
    RoleId: any | undefined;
    setRoleId: React.Dispatch<React.SetStateAction<string | undefined>>;
    showModalUserCU: { id: string; visible: boolean };
    setShowModalUserCU: React.Dispatch<
        React.SetStateAction<{ id: string; visible: boolean }>
    >;
    selectedUser: IUser | undefined;
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
    RoleModalVisible: boolean;
    setRoleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reloadTable: boolean;
    setReloadTable: React.Dispatch<React.SetStateAction<boolean>>;
    
}


export const useVaiTroModalContext = () => {
    const context = useContext(VaiTroModalContext)
    if (!context) throw new Error("VaiTroModalContext must be used in ")
    return context
}

export const VaiTroModalProvider = ({ children }: IWithChildren) => {
    const [RoleId, setRoleId] = useState<string>()
    const [showModalUserCU, setShowModalUserCU] = useState<{
        id: string;
        visible: boolean;
      }>({ id: "", visible: false });
      const [selectedUser, setSelectedUser] = useState<IUser>();
    const [RoleModalVisible, setRoleModalVisible] = useState<boolean>(false)
    const [reloadTable, setReloadTable] = useState<boolean>(false)
    return <VaiTroModalContext.Provider value={{ 
        RoleId, setRoleId, 
        showModalUserCU, setShowModalUserCU, 
        selectedUser, setSelectedUser, 
        RoleModalVisible, setRoleModalVisible, 
        reloadTable, setReloadTable}}>
        {children}
    </VaiTroModalContext.Provider>
}