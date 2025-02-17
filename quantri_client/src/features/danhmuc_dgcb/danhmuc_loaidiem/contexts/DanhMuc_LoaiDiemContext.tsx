import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_LoaiDiemContext = createContext<IDanhMuc_LoaiDiemContext | null>(null)

export interface IDanhMuc_LoaiDiemContext{
    danhMuc_LoaiDiemId: string | undefined;
    setDanhMuc_LoaiDiemId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_LoaiDiemModalVisible: boolean;
    setDanhMuc_LoaiDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_LoaiDiemContext = () => {
    const context = useContext(DanhMuc_LoaiDiemContext)
    if(!context)
        throw new Error("DanhMuc_LoaiDiemContext must be used inside DanhMuc_LoaiDiemContext.Provider")
    return context
}

export const DanhMuc_LoaiDiemProvider = ({children}: IWithChildren) => {
    const [danhMuc_LoaiDiemId, setDanhMuc_LoaiDiemId] = useState<string>()
    const [danhMuc_LoaiDiemModalVisible, setDanhMuc_LoaiDiemModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_LoaiDiemContext.Provider value={{danhMuc_LoaiDiemId, setDanhMuc_LoaiDiemId, danhMuc_LoaiDiemModalVisible, setDanhMuc_LoaiDiemModalVisible}}>
        {children}
    </DanhMuc_LoaiDiemContext.Provider> 
}