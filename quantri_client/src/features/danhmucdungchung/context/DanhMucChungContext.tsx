import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMucChungContext = createContext<IDanhMucChungContext | null>(null)

export interface IDanhMucChungContext{
    danhMucChungId: string | undefined;
    setDanhMucChungId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMucChungModalVisible: boolean;
    setDanhMucChungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMucChungContext = () => {
    const context = useContext(DanhMucChungContext)
    if(!context)
        throw new Error("DichVuContext must be used inside DichVuContext.Provider")
    return context
}

export const DanhMucChungProvider = ({children}: IWithChildren) => {
    const [danhMucChungId, setDanhMucChungId] = useState<string>()
    const [danhMucChungModalVisible, setDanhMucChungModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMucChungContext.Provider value={{danhMucChungId, setDanhMucChungId, danhMucChungModalVisible, setDanhMucChungModalVisible}}>
        {children}
    </DanhMucChungContext.Provider> 
}