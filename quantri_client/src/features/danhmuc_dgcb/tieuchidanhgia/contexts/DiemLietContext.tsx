import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";
import { IDiemLiet } from "../models";

const DiemLietContext = createContext<IDiemLietContext | null>(null)

export interface IDiemLietContext{
    diemLietId: string | undefined;
    setDiemLietId: React.Dispatch<React.SetStateAction<string | undefined>>;
    diemlietModalVisible: boolean;
    setDiemLietModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    listDiemLiet: IDiemLiet[]| undefined;
    setListDiemLiet: React.Dispatch<React.SetStateAction<IDiemLiet[]>>;
}

export const useDiemLietContext = () => {
    const context = useContext(DiemLietContext)
    if(!context)
        throw new Error("DiemLietContext must be used inside DiemLietContext.Provider")
    return context
}

export const DiemLietProvider = ({children}: IWithChildren) => {
    const [diemLietId, setDiemLietId] = useState<string>()
    const [diemlietModalVisible, setDiemLietModalVisible] = useState<boolean>(false)
    const [listDiemLiet,setListDiemLiet] = useState<IDiemLiet[]>([])
    // thêm các hàm search cho các tabs ở đây
    return <DiemLietContext.Provider value={{diemLietId, setDiemLietId, diemlietModalVisible, setDiemLietModalVisible,listDiemLiet,setListDiemLiet}}>
        {children}
    </DiemLietContext.Provider> 
}