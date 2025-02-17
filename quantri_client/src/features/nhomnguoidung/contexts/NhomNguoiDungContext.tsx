import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const NhomNguoiDungContext = createContext<INhomNguoiDungContext | null>(null)

export interface INhomNguoiDungContext{
    nhomNguoiDungId: string | undefined;
    setNhomNguoiDungId: React.Dispatch<React.SetStateAction<string | undefined>>;
    nhomNguoiDungModalVisible: boolean;
    setNhomNguoiDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhSachNguoiDungModalVisible: boolean;
    setDanhSachNguoiDungModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhSachNguoiDungDonViModalVisible: boolean;
    setDanhSachNguoiDungDonViModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNhomNguoiDungContext = () => {
    const context = useContext(NhomNguoiDungContext)
    if(!context)
        throw new Error("NhomNguoiDungContext must be used inside NhomNguoiDungContext.Provider")
    return context
}

export const NhomNguoiDungProvider = ({children}: IWithChildren) => {
    const [nhomNguoiDungId, setNhomNguoiDungId] = useState<string>()
    const [nhomNguoiDungModalVisible, setNhomNguoiDungModalVisible] = useState<boolean>(false)
    const [danhSachNguoiDungModalVisible, setDanhSachNguoiDungModalVisible] = useState<boolean>(false)
    const [danhSachNguoiDungDonViModalVisible, setDanhSachNguoiDungDonViModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return <NhomNguoiDungContext.Provider value={{danhSachNguoiDungDonViModalVisible,setDanhSachNguoiDungDonViModalVisible,nhomNguoiDungId, setNhomNguoiDungId, nhomNguoiDungModalVisible, setNhomNguoiDungModalVisible, danhSachNguoiDungModalVisible, setDanhSachNguoiDungModalVisible}}>
        {children}
    </NhomNguoiDungContext.Provider> 
}