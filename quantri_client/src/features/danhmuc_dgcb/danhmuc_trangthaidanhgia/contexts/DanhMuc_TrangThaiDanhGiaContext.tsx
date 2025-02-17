import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_TrangThaiDanhGiaContext = createContext<IDanhMuc_TrangThaiDanhGiaContext | null>(null)

export interface IDanhMuc_TrangThaiDanhGiaContext{
    danhMuc_TrangThaiDanhGiaId: string | undefined;
    setDanhMuc_TrangThaiDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_TrangThaiDanhGiaModalVisible: boolean;
    setDanhMuc_TrangThaiDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_TrangThaiDanhGiaContext = () => {
    const context = useContext(DanhMuc_TrangThaiDanhGiaContext)
    if(!context)
        throw new Error("DanhMuc_TrangThaiDanhGiaContext must be used inside DanhMuc_TrangThaiDanhGiaContext.Provider")
    return context
}

export const DanhMuc_TrangThaiDanhGiaProvider = ({children}: IWithChildren) => {
    const [danhMuc_TrangThaiDanhGiaId, setDanhMuc_TrangThaiDanhGiaId] = useState<string>()
    const [danhMuc_TrangThaiDanhGiaModalVisible, setDanhMuc_TrangThaiDanhGiaModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_TrangThaiDanhGiaContext.Provider value={{danhMuc_TrangThaiDanhGiaId, setDanhMuc_TrangThaiDanhGiaId, danhMuc_TrangThaiDanhGiaModalVisible, setDanhMuc_TrangThaiDanhGiaModalVisible}}>
        {children}
    </DanhMuc_TrangThaiDanhGiaContext.Provider> 
}