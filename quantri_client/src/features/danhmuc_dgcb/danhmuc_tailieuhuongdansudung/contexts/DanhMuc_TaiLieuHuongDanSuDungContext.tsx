import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const Danhmuc_TaiLieuHuongDanSuDungContext = createContext<IDanhmuc_TaiLieuHuongDanSuDungContext | null>(null)

export interface IDanhmuc_TaiLieuHuongDanSuDungContext{
    danhmuc_TaiLieuHuongDanSuDungId: string | undefined;
    setDanhmuc_TaiLieuHuongDanSuDungId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhmuc_TaiLieuHuongDanSuDungModalVisible: boolean;
    setDanhmuc_TaiLieuHuongDanSuDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhmuc_TaiLieuHuongDanSuDungContext = () => {
    const context = useContext(Danhmuc_TaiLieuHuongDanSuDungContext)
    if(!context)
        throw new Error("Danhmuc_TaiLieuHuongDanSuDungContext must be used inside Danhmuc_TaiLieuHuongDanSuDungContext.Provider")
    return context
}

export const Danhmuc_TaiLieuHuongDanSuDungProvider = ({children}: IWithChildren) => {
    const [danhmuc_TaiLieuHuongDanSuDungId, setDanhmuc_TaiLieuHuongDanSuDungId] = useState<string>()
    const [danhmuc_TaiLieuHuongDanSuDungModalVisible, setDanhmuc_TaiLieuHuongDanSuDungModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <Danhmuc_TaiLieuHuongDanSuDungContext.Provider value={{danhmuc_TaiLieuHuongDanSuDungId, setDanhmuc_TaiLieuHuongDanSuDungId, danhmuc_TaiLieuHuongDanSuDungModalVisible, setDanhmuc_TaiLieuHuongDanSuDungModalVisible}}>
        {children}
    </Danhmuc_TaiLieuHuongDanSuDungContext.Provider> 
}