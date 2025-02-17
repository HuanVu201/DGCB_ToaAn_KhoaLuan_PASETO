import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_TrangThaiCongViecContext = createContext<IDanhMuc_TrangThaiCongViecContext | null>(null)

export interface IDanhMuc_TrangThaiCongViecContext{
    danhMuc_TrangThaiCongViecId: string | undefined;
    setDanhMuc_TrangThaiCongViecId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_TrangThaiCongViecModalVisible: boolean;
    setDanhMuc_TrangThaiCongViecModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_TrangThaiCongViecContext = () => {
    const context = useContext(DanhMuc_TrangThaiCongViecContext)
    if(!context)
        throw new Error("DanhMuc_TrangThaiCongViecContext must be used inside DanhMuc_TrangThaiCongViecContext.Provider")
    return context
}

export const DanhMuc_TrangThaiCongViecProvider = ({children}: IWithChildren) => {
    const [danhMuc_TrangThaiCongViecId, setDanhMuc_TrangThaiCongViecId] = useState<string>()
    const [danhMuc_TrangThaiCongViecModalVisible, setDanhMuc_TrangThaiCongViecModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_TrangThaiCongViecContext.Provider value={{danhMuc_TrangThaiCongViecId, setDanhMuc_TrangThaiCongViecId, danhMuc_TrangThaiCongViecModalVisible, setDanhMuc_TrangThaiCongViecModalVisible}}>
        {children}
    </DanhMuc_TrangThaiCongViecContext.Provider> 
}