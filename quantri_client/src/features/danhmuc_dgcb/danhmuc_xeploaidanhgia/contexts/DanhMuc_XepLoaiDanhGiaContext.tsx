import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_XepLoaiDanhGiaContext = createContext<IDanhMuc_XepLoaiDanhGiaContext | null>(null)

export interface IDanhMuc_XepLoaiDanhGiaContext{
    danhMuc_XepLoaiDanhGiaId: string | undefined;
    setDanhMuc_XepLoaiDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_XepLoaiDanhGiaModalVisible: boolean;
    setDanhMuc_XepLoaiDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_XepLoaiDanhGiaContext = () => {
    const context = useContext(DanhMuc_XepLoaiDanhGiaContext)
    if(!context)
        throw new Error("DanhMuc_XepLoaiDanhGiaContext must be used inside DanhMuc_XepLoaiDanhGiaContext.Provider")
    return context
}

export const DanhMuc_XepLoaiDanhGiaProvider = ({children}: IWithChildren) => {
    const [danhMuc_XepLoaiDanhGiaId, setDanhMuc_XepLoaiDanhGiaId] = useState<string>()
    const [danhMuc_XepLoaiDanhGiaModalVisible, setDanhMuc_XepLoaiDanhGiaModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_XepLoaiDanhGiaContext.Provider value={{danhMuc_XepLoaiDanhGiaId, setDanhMuc_XepLoaiDanhGiaId, danhMuc_XepLoaiDanhGiaModalVisible, setDanhMuc_XepLoaiDanhGiaModalVisible}}>
        {children}
    </DanhMuc_XepLoaiDanhGiaContext.Provider> 
}