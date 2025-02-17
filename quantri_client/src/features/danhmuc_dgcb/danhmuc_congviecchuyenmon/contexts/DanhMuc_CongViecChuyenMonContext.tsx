import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_CongViecChuyenMonContext = createContext<IDanhMuc_CongViecChuyenMonContext | null>(null)

export interface IDanhMuc_CongViecChuyenMonContext{
    danhMuc_CongViecChuyenMonId: string | undefined;
    setDanhMuc_CongViecChuyenMonId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_CongViecChuyenMonModalVisible: boolean;
    setDanhMuc_CongViecChuyenMonModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_CongViecChuyenMonContext = () => {
    const context = useContext(DanhMuc_CongViecChuyenMonContext)
    if(!context)
        throw new Error("DanhMuc_CongViecChuyenMonContext must be used inside DanhMuc_CongViecChuyenMonContext.Provider")
    return context
}

export const DanhMuc_CongViecChuyenMonProvider = ({children}: IWithChildren) => {
    const [danhMuc_CongViecChuyenMonId, setDanhMuc_CongViecChuyenMonId] = useState<string>()
    const [danhMuc_CongViecChuyenMonModalVisible, setDanhMuc_CongViecChuyenMonModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <DanhMuc_CongViecChuyenMonContext.Provider value={{danhMuc_CongViecChuyenMonId, setDanhMuc_CongViecChuyenMonId, danhMuc_CongViecChuyenMonModalVisible, setDanhMuc_CongViecChuyenMonModalVisible}}>
        {children}
    </DanhMuc_CongViecChuyenMonContext.Provider> 
}