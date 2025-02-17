import { IUser } from "@/features/user/models";
import { IWithChildren } from "@/types";
import React,{ createContext, useContext, useState } from "react";

const DanhMuc_PhieuDanhGiaContext = createContext<IDanhMuc_PhieuDanhGiaContext | null>(null)

export interface IDanhMuc_PhieuDanhGiaContext {
    danhMuc_PhieuDanhGiaId: string | undefined;
    setDanhMuc_PhieuDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;
    danhMuc_PhieuDanhGiaModalVisible: boolean;
    setDanhMuc_PhieuDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lstCaNhanDanhGia: IUser[];
    setLstCaNhanDanhGia: React.Dispatch<React.SetStateAction<IUser[]>>; // Hàm để cập nhật danh sách người dùng
    addCaNhanOfDanhMucPhieuDanhGiaModalVisible: boolean;
    setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    danhMuc_PhieuDanhGiaHistoryModalVisible: boolean;
    setDanhMuc_PhieuDanhGiaHistoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDanhMuc_PhieuDanhGiaContext = () => {
    const context = useContext(DanhMuc_PhieuDanhGiaContext)
    if(!context)
        throw new Error("DanhMuc_PhieuDanhGiaContext must be used inside DanhMuc_PhieuDanhGiaContext.Provider")
    return context
}

export const DanhMuc_PhieuDanhGiaProvider = ({children}: IWithChildren) => {
    const [danhMuc_PhieuDanhGiaId, setDanhMuc_PhieuDanhGiaId] = useState<string>()
    const [danhMuc_PhieuDanhGiaModalVisible, setDanhMuc_PhieuDanhGiaModalVisible] = useState<boolean>(false)
    const [lstCaNhanDanhGia, setLstCaNhanDanhGia] = useState<IUser[]>([]); // Thêm danh sách người dùng
    const [addCaNhanOfDanhMucPhieuDanhGiaModalVisible, setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible] = useState<boolean>(false)
    const [danhMuc_PhieuDanhGiaHistoryModalVisible, setDanhMuc_PhieuDanhGiaHistoryModalVisible] = useState<boolean>(false)
    // thêm các hàm search cho các tabs ở đây
    return (
        <DanhMuc_PhieuDanhGiaContext.Provider 
            value={{ 
                danhMuc_PhieuDanhGiaId, 
                setDanhMuc_PhieuDanhGiaId, 
                danhMuc_PhieuDanhGiaModalVisible, 
                setDanhMuc_PhieuDanhGiaModalVisible,
                lstCaNhanDanhGia, 
                setLstCaNhanDanhGia,
                addCaNhanOfDanhMucPhieuDanhGiaModalVisible,
                setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible,// Cung cấp hàm để cập nhật danh sách người dùng
                danhMuc_PhieuDanhGiaHistoryModalVisible,
                setDanhMuc_PhieuDanhGiaHistoryModalVisible
            }}>
            {children}
        </DanhMuc_PhieuDanhGiaContext.Provider>
    );
}