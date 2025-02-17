import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const ThongKeKhieuNaiContext = createContext<IThongKeKhieuNaiContext | null>(null)

export interface IThongKeKhieuNaiContext{
    thongKeKhieuNaiId: string | undefined;
    setThongKeKhieuNaiId: React.Dispatch<React.SetStateAction<string | undefined>>;
    thongKeKhieuNaiModalVisible: boolean;
    setThongKeKhieuNaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useThongKeKhieuNaiContext = () => {
    const context = useContext(ThongKeKhieuNaiContext)
    if(!context)
        throw new Error("ThongKeKhieuNaiContext must be used inside ThongKeKhieuNaiContext.Provider")
    return context
}

export const ThongKeKhieuNaiProvider = ({children}: IWithChildren) => {
    const [thongKeKhieuNaiId, setThongKeKhieuNaiId] = useState<string>()
    const [thongKeKhieuNaiModalVisible, setThongKeKhieuNaiModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <ThongKeKhieuNaiContext.Provider value={{thongKeKhieuNaiId, setThongKeKhieuNaiId, thongKeKhieuNaiModalVisible, setThongKeKhieuNaiModalVisible}}>
        {children}
    </ThongKeKhieuNaiContext.Provider> 
}