import { IWithChildren } from "@/types"
import { createContext, useContext, useState } from "react"

export interface IScreenActionContext {
    folderId: string | undefined;
    setFolderId: React.Dispatch<React.SetStateAction<string | undefined>>;


    showModalAddAction: boolean
    setShowModalAddAction: React.Dispatch<React.SetStateAction<boolean>> // CU: Create,Update
}

const ScreenActionContext = createContext<IScreenActionContext | null>(null)

export const useScreenActionContext = () => {
    const context = useContext(ScreenActionContext)
    if(!context)    throw new Error("ScreenActionContext must be used in ")
    return context 
}

export const ScreenActionProvider = ({children} : IWithChildren) => {
    const [folderId, setFolderId] = useState<string>()
    const [showModalAddAction, setShowModalAddAction] = useState<boolean>(false)
    return <ScreenActionContext.Provider value={{folderId, setFolderId, showModalAddAction, setShowModalAddAction}}>
        {children}
    </ScreenActionContext.Provider>
}